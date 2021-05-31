<template>
  <div class="input-checkbox">
    <div class="input-checkbox__flex">
      <input
        v-model="val"
        type="checkbox"
        :name="name"
        class="input-checkbox__input"
      />
      <div class="input-checkbox__icon" @click="val = !val">
        <template v-if="val"><CheckboxIcon /></template>
      </div>
      <template v-if="label">
        <div
          :class="[
            'input-checkbox__label',
            clickable && 'input-checkbox__label--clickable',
          ]"
          @click="clickHandler"
        >
          <div v-html="label" />
        </div>
      </template>
      <template v-if="tooltip">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" class="input-checkbox__tooltip" v-on="on">
              mdi-help-circle
            </v-icon>
          </template>
          <span>{{ tooltip }}</span>
        </v-tooltip>
      </template>
    </div>

    <transition name="slide-down">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import { CheckboxIcon } from '~/components/icons'

import { EventTypes } from '~/types/enums'
import { InputValue } from '~/types'

const defaultError = 'Это поле обязательно для заполнения'

@Component({ components: { CheckboxIcon } })
export default class Checkbox extends Vue {
  val = false
  error = ''

  @Prop({ type: String, default: '' })
  readonly name!: string

  @Prop({ type: String, default: '' })
  readonly tooltip!: string

  @Prop({ type: Boolean, default: false })
  readonly required!: false

  @Prop({ type: String, default: undefined })
  readonly label?: string

  @Prop({ type: String, default: defaultError })
  readonly errorMessage!: string

  @Prop()
  readonly value!: InputValue

  @Prop()
  readonly clickable!: boolean

  @Prop()
  readonly initial?: boolean | string

  @Prop({ type: Function, default: () => null })
  readonly setRef!: (name: string, value?: Vue) => void

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    val: InputValue,
    type: EventTypes
  ) => void

  @Prop({ type: Function, default: () => null })
  readonly init!: (name: string, init: () => Array<string | undefined>) => void

  get selectedValue() {
    return this.val ? this.value || this.val : false
  }

  created() {
    this.init(this.name, this.forceErrorCheck)
    if (this.initial) {
      this.initialSet(!!this.initial)
      this.returnValue(this.name, this.initial, EventTypes.AUTO)
    }
  }

  @Watch('initial')
  initialSet(n: boolean) {
    this.val = n
  }

  @Watch('val')
  onChange() {
    this.error = ''
    this.errorCheck()
    this.returnValue(this.name, this.selectedValue, EventTypes.MANUAL)
  }

  clickHandler() {
    if (this.clickable) {
      this.val = !this.val
    }
  }

  errorCheck() {
    if (this.required && !this.val) {
      this.error = this.errorMessage
    }
  }

  forceErrorCheck() {
    const errors: string[] = []
    const value = this.required && this.selectedValue
    this.errorCheck()
    if (this.error) errors.push(defaultError)
    this.returnValue(this.name, value, EventTypes.AUTO)
    return errors
  }
}
</script>

<style lang="scss">
.input-checkbox {
  position: relative;
  z-index: 16;
  .v-input--checkbox {
    height: 20px;
  }
  .v-messages {
    display: none;
  }
  .v-input__slot {
    margin: 0;
  }
  &__flex {
    display: flex;
    align-items: flex-start;
    grid-gap: 10px;
    line-height: 20px;
    margin-bottom: 10px;
    > * {
      margin: 0;
      padding: 0;
      color: $text-color;
    }
  }
  > * {
    margin: 0;
    padding: 0;
  }
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    width: 18px;
    min-width: 18px;
    min-height: 18px;
    border: 1px solid $main-color;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    svg {
      width: 20px;
      fill: $main-color;
    }
  }
  &__input {
    display: none;
  }
  &__label {
    cursor: default;
    user-select: none;
    &--clickable {
      cursor: pointer;
      &:hover {
        color: $active-color;
      }
    }
  }
  &__tooltip {
    position: relative;
    margin-left: 8px;
    transition: 0.2s;
    opacity: 0.65;
    font-size: 18px !important;
  }
  .error-message {
    width: 100%;
    color: $warning-color;
    font-size: 12px;
    text-align: left;
    opacity: 1;
    margin: 8px 0 2px 0;
    transition: 0.3s;
  }
  .input-hint {
    color: $hint-color;
    font-size: 12px;
    text-align: left;
    margin: 8px 0 2px 0;
  }

  .slide-down-enter {
    opacity: 0;
    max-height: 0;
    margin: 0;
  }

  .slide-down-leave-to {
    opacity: 0;
    max-height: 0;
    margin: 0;
  }

  .input-slot {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 15;
  }
}

.form-input--required {
  margin-left: 5px;
  color: $warning-color !important;
}
</style>
