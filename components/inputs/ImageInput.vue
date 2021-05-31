<template>
  <div class="image-input">
    <template v-if="imageUrl">
      <div class="image-input__preview">
        <img :src="imageUrl" :alt="name" class="image-input__preview__image" />
        <v-icon
          title="удалить"
          class="image-input__preview__clear"
          @click="clearImage"
          >close</v-icon
        >
      </div>
    </template>
    <template v-else>
      <div
        ref="fileform"
        :class="['drop-zone', hovered && 'drop-zone--hovered']"
        @dragover.stop.prevent="onEnter"
        @dragleave.stop.prevent="onLeave"
        @drop.stop.prevent="dropHandler"
        @click="$refs.manual.click()"
      >
        <div class="image-input__info">
          <p v-if="placeholder">{{ placeholder }}, перетащив его в это поле</p>
          <p v-if="hint" class="image-input__hint">
            {{ hint }}
          </p>
        </div>
      </div>
    </template>

    <input
      v-show="false"
      ref="manual"
      type="file"
      :accept="types.join(', ')"
      @change="dropHandler"
    />

    <template v-if="error">
      <div class="image-input__error">
        {{ error }}
      </div>
    </template>

    <v-btn
      color="#39f"
      dark
      class="image-input__button"
      @click="$refs.manual.click()"
    >
      {{ $device.isMobile ? placeholder : placeholder + ' вручную' }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ImageValidations, IUploadImage } from '~/types'
import { EventTypes } from '~/types/enums'

const errorMessages = {
  multi: 'Выберите одно изображение',
  format: 'Загрузите файл в формате png или jpg',
  size: (size: number) => `Размер изображения не должен превышать ${size} мб`,
  max: (min: number, max: number) =>
    `Разрешение изображения должно быть не более ${min}x${max} px`,
  min: (min: number, max: number) =>
    `Разрешение изображения должно быть не менее ${min}x${max} px`,
  common: 'Ошибка загрузки файла',
  success: 'Изображение успешно загружено',
  server: 'Ошибка отправки изображения',
}

const defaultTypes = ['image/png', 'image/jpeg', 'image/jpg']

@Component
export default class ImageInput extends Vue {
  hovered = false
  imageUrl: string | ArrayBuffer | null = ''
  reader: FileReader | null = null
  error = ''

  @Prop({ type: String, default: '' })
  readonly name!: string

  @Prop({ type: String, default: 'Загрузите изображение' })
  readonly placeholder!: string

  @Prop({ type: String, default: '' })
  readonly hint!: string

  @Prop({ type: Boolean, default: false })
  readonly required!: boolean

  @Prop({ type: Object, default: () => ({}) })
  readonly validations!: ImageValidations

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean

  @Prop({ type: String, default: '' })
  readonly errorMessage!: string

  @Prop({ type: Function, default: () => null })
  readonly setRef!: (name: string, value?: Vue) => void

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    val: IUploadImage | null,
    type: EventTypes
  ) => void

  @Prop({ type: Object })
  readonly initial?: IUploadImage

  get types() {
    return this.validations?.formats || defaultTypes
  }

  async dropHandler(e: any) {
    const files = e.target.files || e.dataTransfer.files
    if (files && files.length) {
      const file = files[0]
      await this.validateFile(file)
      if (!this.error) {
        this.reader?.readAsDataURL(file)
        this.returnValue(this.name, file, EventTypes.MANUAL)
      }
    }
  }

  getImageSize(file: File): Promise<{ w: number; h: number }> {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = window.URL.createObjectURL(file)
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
    })
  }

  async validateFile(file: File) {
    if (!this.types.includes(file.type)) {
      this.setError(errorMessages.format)
      return
    }
    if (this.validations?.maxSize) {
      if (file.size > this.validations.maxSize) {
        this.setError(errorMessages.size(this.validations.maxSize / 1e6))
        return
      }
    }
    if (this.validations) {
      const resolution = await this.getImageSize(file)
      if (
        this.validations.maxWidth &&
        this.validations.maxHeight &&
        (resolution.w > this.validations.maxWidth ||
          resolution.h > this.validations.maxHeight)
      ) {
        this.setError(
          errorMessages.max(
            this.validations.maxWidth,
            this.validations.maxHeight
          )
        )
        return
      }
      if (
        this.validations.minWidth &&
        this.validations.minHeight &&
        (resolution.w < this.validations.minWidth ||
          resolution.h < this.validations.minHeight)
      ) {
        this.setError(
          errorMessages.min(
            this.validations.minWidth,
            this.validations.minHeight
          )
        )
        return
      }
    }
    this.setError('')
  }

  onEnter(e: any) {
    if (e.dataTransfer?.types?.length) this.hovered = true
  }

  onLeave() {
    this.hovered = false
  }

  setImageUrl() {
    this.imageUrl = this.reader?.result || null
  }

  clearImage() {
    this.imageUrl = null
    this.returnValue(this.name, null, EventTypes.MANUAL)
  }

  setError(error: string) {
    this.error = error
  }

  mounted() {
    this.reader = new FileReader()
    this.reader.onload = () => this.setImageUrl()
    setTimeout(() => {
      if (this.initial) {
        this.imageUrl = this.initial.src
        this.returnValue(this.name, this.initial, EventTypes.AUTO)
      }
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.image-input {
  .drop-zone {
    background-color: #f6f6f6;
    border: 1px dashed $main-color;
    margin-bottom: 20px;
    padding: 40px;
    text-align: center;
    line-height: 20px;
    &--hovered {
      border-color: $active-color;
    }
    p:last-of-type {
      margin: 0;
    }
    > * {
      pointer-events: none;
    }
  }
  &__hint {
    color: $hint-color;
  }
  &__preview {
    position: relative;
    display: block;
    width: 128px;
    margin-bottom: 20px;
    &__image {
      width: 100%;
    }
    &__clear {
      position: absolute;
      top: -10px;
      right: -10px;
      color: $warning-color;
      background-color: #fff;
      padding: 3px;
      border-radius: 50%;
    }
  }
  &__button {
    width: 100%;
    text-transform: none;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.1ch;
    margin-bottom: 20px;
  }
  &__error {
    color: $warning-color;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: $md) {
  .image-input {
    .drop-zone {
      display: none;
    }
    &__button {
      font-size: 16px;
      letter-spacing: 0ch;
      margin-bottom: 0;
    }
  }
}
</style>
