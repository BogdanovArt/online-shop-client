<template>
  <div :class="['personal-block', 'personal-block__edit']">
    <div v-if="fetching" class="preloader">
      <v-progress-circular indeterminate color="#3399ff" />
    </div>
    <div class="personal-block__title">
      <div class="personal-block__title__main">
        {{ item.title }}
        <span> — редактирование</span>
      </div>

      <div
        class="personal-block__action personal-block__action--label"
        @click="setView"
      >
        Отмена <v-icon>close</v-icon>
      </div>
    </div>
    <form-generator
      :item="item"
      :return-value="formHandler"
      class="personal-block__form"
      no-title
    />
    <div class="personal-block__button">
      <v-btn :disabled="!formIsValid" dark color="#39f" @click="save">
        {{ $device.isMobile ? 'Сохранить' : 'Сохранить изменения' }}
      </v-btn>
      <v-btn
        dark
        outlined
        color="#e62424"
        class="personal-block__button--cancel"
        @click="setView"
      >
        Отмена
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import FormGenerator from '~/components/inputs/FormGenerator/blocks/FormGenBlock.vue'
import { personalStore } from '~/store'

import { IBasicObject, InputValue } from '~/types'
import { IPersonalBlock } from '~/types/account/personal'
import { PersonalBlockViewType } from '~/types/account/personal/enums'
import { EventTypes, InputTypes } from '~/types/enums'

import { $axios } from '~/utils/api'

interface ExtendedFormData extends FormData {
  entries?: () => any[]
}

@Component({ components: { FormGenerator } })
export default class InfoBlockView extends Vue {
  formData: ExtendedFormData | null = null
  formValues: IBasicObject = {}
  formIsValid = false

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IPersonalBlock

  get fetching() {
    return personalStore.Fetching
  }

  setView() {
    this.$emit('toggle', PersonalBlockViewType.view)
  }

  async save() {
    personalStore.setFetching(true)
    try {
      const res = await $axios({
        url: this.item.action.url,
        method: this.item.action.type,
        data: this.formData,
      })
      if (res.data.data) {
        personalStore.setPageData(res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
    personalStore.setFetching(false)
    this.setView()
  }

  formHandler(
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes,
    inputType?: InputTypes
  ) {
    const form = JSON.parse(JSON.stringify(this.formValues))
    form[name] = value
    if (!value && !required) delete form[name]
    this.formValues = form
    this.formIsValid = true

    Object.values(form).forEach((value) => {
      if (!value) this.formIsValid = false
    })

    switch (inputType) {
      case InputTypes.IMAGE:
        if (value && (value as any).src) {
          this.setFormValue(name, JSON.stringify(value))
        } else {
          this.setFormValue(name, value, inputType)
        }
        break
      default:
        this.setFormValue(name, JSON.stringify(value))
        break
    }
  }

  setFormValue(name: string, value: InputValue, filename?: string) {
    if (this.formData) {
      this.formData?.delete(name)
      if (value) {
        if (filename) this.formData.append(name, value as Blob, filename)
        else this.formData.append(name, value.toString())
      }
    }
  }

  mounted() {
    this.formData = new FormData()
  }
}
</script>

<style lang="scss" scoped>
$width: 360px;

.preloader {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f945;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  color: $main-color;
  z-index: 20;
}
.personal-block {
  position: relative;
  box-shadow: $shadow-main;
  padding: 20px;
  border-radius: 5px;
  font-size: 18px;
  &__title {
    position: relative;
    display: flex;
    font-weight: 600;
    font-family: $main-font;
    margin-bottom: 20px;
    span {
      font-weight: 400;
      color: $hint-color;
    }
  }
  &__action {
    &--label {
      flex-grow: 1;
      text-align: right;
      font-weight: 400;
      right: 0;
      top: 0;
      color: $warning-color;
      cursor: pointer;
      user-select: none;
      i {
        color: inherit;
      }
    }
  }
  &__form {
    max-width: $width;
  }
  &__button {
    display: flex;
    flex-wrap: nowrap;
    max-width: $width;
    margin-top: 20px;
    user-select: none;
    .v-btn {
      width: 100%;
      text-transform: none;
      font-size: 20px;
      font-weight: 400;
      &--disabled {
        background-color: $disabled-color;
        color: $hint-color !important;
      }
    }
    &--cancel {
      display: none;
      border-color: $main-color !important;
    }
    > *:not(:last-child) {
      margin-right: 15px;
    }
  }
  &--errors {
    .personal-block__button {
      display: block;
    }
  }
}

@media screen and (max-width: $md) {
  .personal-block {
    padding: 20px 0;
    box-shadow: none;
    font-size: 14px;
    &__title {
      display: none;
    }
    &__button {
      display: flex;
      .v-btn {
        width: auto;
        text-transform: none;
        font-size: 16px;
        letter-spacing: 0ch;
        font-weight: 400;
      }
      > * {
        flex-grow: 1;
      }
      &--cancel {
        display: block;
      }
    }
  }
}
</style>
