<template>
  <div
    :class="[
      'form-input',
      (isDisabled || disabled) && 'disabled',
      validationError && 'invalid',
      valid && !disabled && !empty && 'valid',
    ]"
  >
    <template v-if="isTextField">
      <textarea
        v-if="isTextField"
        ref="input"
        type="text"
        :value="val"
        :name="name"
        :disabled="isDisabled || disabled"
        :class="[!focus && empty && 'input-hidden', 'textarea']"
        @input="inputHandler"
        @focus="focusHandler"
        @blur="blurHandler"
        @mousedown="removeTransition"
        @mouseup="addTransition"
        @keyup="keyHandler"
      />
    </template>
    <template v-else>
      <template v-if="mask">
        <input
          ref="input"
          v-mask="mask && mask.value"
          :value="val"
          :type="type"
          :mode="mode"
          :name="name"
          :disabled="isDisabled || disabled"
          :class="[
            !focus && !unmaskedValue.length && 'input-hidden',
            isPhone && 'input-phone',
          ]"
          :placeholder="focus && prefix"
          :autocomplete="autocomplete || name"
          spellcheck="false"
          @input="inputHandler"
          @focus="focusHandler"
          @blur="blurHandler"
          @keyup="keyHandler"
          @keydown="keyDownHandler"
          @mousedown="mouseDownHandler"
          @mouseup="mouseUpHandler"
        />
      </template>
      <template v-else>
        <input
          ref="input"
          :value="val"
          :type="type"
          :mode="mode"
          :name="name"
          :autocomplete="autocomplete || name"
          :disabled="isDisabled || disabled"
          :class="[
            !focus && !val.length && 'input-hidden',
            isPhone && 'input-phone',
          ]"
          spellcheck="false"
          @input="inputHandler"
          @focus="focusHandler"
          @blur="blurHandler"
          @keyup="keyHandler"
        />
      </template>
    </template>

    <label :for="name" :class="(focus || unmaskedValue.length) && 'shrinked'">
      {{ placeholder }}
      <span v-if="required" class="form-input--required">*</span>
    </label>

    <template v-if="$slots.default">
      <div ref="slots" class="input-slot">
        <slot></slot>
      </div>
    </template>
    <template v-else-if="!isTextField">
      <span v-if="validationError" class="mark mark--invalid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </span>
      <span v-else-if="valid && !disabled && !empty" class="mark mark--valid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
          />
        </svg>
      </span>
    </template>

    <transition name="slide-down">
      <div
        v-if="validationError"
        :class="['error-message', isTextField && 'error-message--text']"
        v-html="validationError"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import { EventTypes, InputTypes, Validations } from '~/types/enums'

const defaultErr = 'Заполните поле'
const verifyErr = 'Пароли не совпадают'

type inputValue = string | number | null

interface IMaskValidation {
  value: string
  errorMessage: string
}

interface ILengthValidation {
  value: number
  errorMessage: string
}

type Reference = Vue | Vue[] | Element | Element[] | HTMLInputElement

@Component
export default class Input extends Vue {
  val = ''
  unmaskedValue = ''
  input: HTMLInputElement = this.$refs.input as HTMLInputElement
  valid = false
  isDisabled = false

  mouseDown = false
  touched = false
  focus = false

  validationErrors: Validations[] = []
  validationError = ''
  persistentError?: boolean = undefined
  errors: (string | undefined)[] = []

  @Prop({ type: String, default: '' })
  readonly name!: string

  @Prop({ type: String, default: 'text' })
  readonly type!: string

  @Prop({ type: String, default: '' })
  readonly autocomplete!: string

  @Prop({ type: String, default: 'Заполните это поле' })
  readonly placeholder!: string

  @Prop({ type: Boolean, default: false })
  readonly required!: boolean

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean

  @Prop({ type: String, default: defaultErr })
  readonly errorMessage!: string

  @Prop({ type: Function, default: () => null })
  readonly setRef!: (name: string, value?: Vue) => void

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    val: inputValue,
    type: EventTypes
  ) => void

  @Prop({ type: Function, default: () => null })
  readonly init!: (name: string, init: () => Array<string | undefined>) => void

  @Prop({ type: String })
  readonly initial?: string

  @Prop({ type: String })
  readonly prefix?: string

  @Prop({ type: String })
  readonly mode?: string

  @Prop({ type: [String, Number] })
  readonly verify?: string | number

  @Prop({ type: Object })
  readonly mask?: IMaskValidation

  @Prop({ type: Object })
  readonly regex?: IMaskValidation

  @Prop({ type: Object })
  readonly max?: ILengthValidation

  @Prop({ type: Object })
  readonly min?: ILengthValidation

  get isLogin() {
    return this.name === 'login' || this.name === 'username'
  }

  get isPhone() {
    return this.name === 'phone'
  }

  get isTextField() {
    return this.type === InputTypes.TEXT
  }

  get empty() {
    return !this.val || this.prefix === this.val
  }

  created() {
    this.init(this.name, this.forceErrorCheck)
  }

  mounted() {
    this.input = this.$refs.input as HTMLInputElement
    this.valid = false
    this.isDisabled = false
    this.setPadding()
    this.setRef(this.name, this)
    if (this.initial) {
      const value = this.unmasked(this.initial)
      this.val = this.unmaskedValue = value
      setTimeout(() => {
        this.checkForValid()
        this.checkForErrors()
        this.returnValue(this.name, this.initial as inputValue, EventTypes.AUTO)
      }, 0)
    }
  }

  @Watch('val')
  valueWatcher(n: string) {
    this.unmaskedValue = this.unmasked(n)
  }

  @Watch('disabled')
  disabledWatcher(n: boolean) {
    if (n) {
      this.clear()
    }
  }

  @Watch('errorMessage')
  errorMessageWatcher(n: string | string[]) {
    if (n !== defaultErr) {
      if (typeof n === 'string') {
        this.setError(n)
      } else if (n.length) {
        this.setError(n.join(', '))
      }
    }
  }

  @Watch('verify')
  clear() {
    this.val = ''
    ;(this.$refs.input as HTMLInputElement).value = ''
    this.valid = false
    this.validationError = ''
    this.returnValue(this.name, null, EventTypes.AUTO)
  }

  clearString(str: string, sub: string): string {
    const newString = str.replace(sub, '')
    if (newString !== str) {
      return this.clearString(newString, sub)
    } else {
      return newString
    }
  }

  setPadding() {
    const slots = this.$refs.slots as HTMLElement
    if (slots) {
      this.input.style.paddingRight = slots.offsetWidth + 10 + 'px'
    }
  }

  public unmasked(value: string, caller?: string) {
    // @TODO redo unmasking method
    // Placeholder	Format
    // #	Number (0-9)
    // A	Letter in any case (a-z,A-Z)
    // N	Number or letter (a-z,A-Z,0-9)
    // X	Any symbol
    // ?	Optional (next character)
    if (this.mask && typeof this.mask.value === 'string') {
      const mask = this.mask.value
      const chars = mask.split('')
      const values = value.split('')
      const unmasked = chars
        .map((maskChar: string, index: number) => {
          return maskChar !== values[index] ? values[index] : ''
        })
        .join('')
      return unmasked
    } else {
      return value
    }
  }

  setError(msg: string, persistent?: boolean) {
    this.validationError = msg
    this.persistentError = persistent
    if (this.touched) this.valid = !msg
  }

  inputHandler(e: any) {
    this.val = e.target.value
    if (
      this.mask &&
      e.target.value.length > this.mask.value.length &&
      typeof this.mask.value === 'string'
    )
      return
    if (e.isTrusted) {
      this.touched = true
      this.validationError = ''
    }

    if (this.prefix) {
      if (e.inputType && e.inputType === 'insertFromPaste') {
        const cleared =
          this.prefix + this.clearString(e.target.value, this.prefix)
        this.val = cleared
      }
      if (e.target.value.length <= this.prefix.length) {
        if (e.data && e.data.length) {
          this.val = this.prefix + e.data
        } else {
          this.val = this.prefix
        }
      }
    }

    setTimeout(() => {
      this.checkForValid('ih')
      if (this.isTextField) {
        this.textScroller()
      }
      this.returnValue(
        this.name,
        this.valid ? this.unmaskedValue : null,
        EventTypes.MANUAL
      )
    }, 0)
  }

  keyDownHandler(e: any) {
    if (this.mouseDown) e.preventDefault()
  }

  keyHandler(e: any) {
    if (e.ctrlKey && e.key === 'z') {
      this.forceErrorCheck()
    }
    this.cursorReset(this.input)
  }

  focusHandler() {
    if (this.valid) this.input.select()
    if (!this.val && this.prefix) this.val = this.prefix // this line might break autofill - remove in case of bugs
    this.focus = true
    this.$emit('focus')
  }

  mouseDownHandler() {
    this.mouseDown = true
    if (!this.val && this.prefix) this.val = this.prefix
    this.cursorReset(this.input)
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false
    this.cursorReset(e.target)
  }

  blurHandler() {
    this.focus = false
    if (this.touched) {
      this.checkForErrors()
      setTimeout(() => {
        this.checkForErrors()
        this.$emit('blur')
      }, 10)
    }
  }

  cursorReset(input: HTMLInputElement) {
    if (this.prefix) {
      const cursorSelection = input.selectionStart === input.selectionEnd
      const emptySelected = input.selectionStart
        ? input.selectionStart <= this.prefix.length
        : true
      if (cursorSelection && emptySelected) {
        input.selectionStart = input.selectionEnd = this.prefix.length
      }
    }
  }

  maskIsFilled(value = ''): boolean {
    if (this.mask) {
      let maskLength = this.mask.value.length
      if (typeof this.mask.value === 'function') {
        maskLength = (this.mask.value as any)(value).length
      }
      return value.length >= maskLength
    } else {
      return false
    }
  }

  textScroller() {
    const scroll = this.input.scrollHeight
    const offset = this.input.offsetHeight
    if (scroll > 80 && scroll > offset) {
      this.input.scrollTop = scroll
    }
  }

  checkForValid(caller?: string) {
    this.validationErrors = []
    let valid = true

    if (this.required && !this.unmaskedValue) {
      valid = false
      this.validationErrors.push(Validations.required)
    }
    if (this.verify) {
      valid = this.unmaskedValue === this.verify
      if (!valid) this.validationErrors.push(Validations.verify)
    }
    if (this.min) {
      valid = this.unmaskedValue.length >= this.min.value
      if (!valid) this.validationErrors.push(Validations.min)
    }
    if (this.max) {
      valid = this.unmaskedValue.length <= this.max.value
      if (!valid) this.validationErrors.push(Validations.max)
    }
    if (this.regex && this.val) {
      const reg = new RegExp(this.regex.value, 'i')
      valid = reg.test(this.val)
      if (!valid) this.validationErrors.push(Validations.regex)
    }
    if (this.mask) {
      valid = this.maskIsFilled(this.val) || this.empty
      if (!valid) this.validationErrors.push(Validations.mask)
    }
    this.valid = !this.validationErrors.length
  }

  checkForErrors() {
    const errors = this.validationErrors.map((error: Validations) => {
      if (error === Validations.verify) {
        return verifyErr
      } else if (error === Validations.required) {
        return this.errorMessage || defaultErr
      } else {
        return this[error]?.errorMessage
      }
    })
    if (errors.length) {
      this.errors = errors
      if (errors[0]) this.setError(errors[0])
      return true
    } else {
      if (!this.persistentError) {
        this.errors = []
        this.setError('')
      }
      return false
    }
  }

  forceErrorCheck() {
    this.checkForValid('force')
    this.checkForErrors()
    this.returnValue(
      this.name,
      this.valid ? this.unmaskedValue : null,
      EventTypes.AUTO
    )
    return this.errors
  }

  removeTransition() {
    this.input.style.transition = 'none'
  }

  addTransition() {
    this.input.style.transition = '.2s'
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;
  border-radius: 2px;
  transition: 0.2s;
  width: 100%;
  max-width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  label {
    position: absolute;
    color: #a3a5a5;
    line-height: $main-dimension;
    z-index: 15;
    padding: 0 15px;
    left: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    pointer-events: none;
    transform-origin: top left;
    transition: 0.2s;
  }

  input,
  textarea {
    position: relative;
    height: $main-dimension;
    line-height: $main-dimension;
    width: 100%;
    padding: 0 30px 0 18px;
    border: 1px solid $main-color;
    border-radius: 4px;
    background: #fff;
    z-index: 10;
    transition: 0.2s;

    &:hover {
      border-color: $hover-color;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 1px 1px $main-color;
    }
  }

  textarea {
    display: block;
    height: 80px;
    min-height: 180px;
    max-height: 500px;
    padding: 12px 18px;
    line-height: 16px;
    resize: vertical;
  }

  input.input-hidden {
    color: transparent;
  }

  .mark {
    $dim: 16px;
    $mdim: 20px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: calc(20px - #{$dim} / 2);
    top: calc(20px - #{$dim} / 2);
    width: $dim;
    height: $dim;
    line-height: $dim;
    border-radius: 50%;
    color: #fff;
    z-index: 10;
    svg {
      width: 75%;
      height: 75%;
    }

    @media screen and (max-width: $md) {
      right: calc(20px - #{$mdim} / 2);
      top: calc(20px - #{$mdim} / 2);
      width: $mdim;
      height: $mdim;
      line-height: $mdim;
    }
  }

  .mark--valid {
    color: $main-color;
  }

  .mark--invalid {
    color: $warning-color;
  }

  .mark--disabled {
    z-index: 90;
    cursor: pointer;
  }

  .shrinked {
    opacity: 0;
  }

  .error-message {
    color: #fff;
    background-color: $warning-color;
    font-size: 12px;
    padding: 8px 12px 4px;
    border-radius: 4px;
    text-align: left;
    opacity: 1;
    line-height: 1;
    margin: -4px 0 4px 0;
    max-height: 40px;
    transition: 0.3s;
    &--text {
      // margin: -11px 0 4px 0;
    }
  }

  .slide-down-enter {
    opacity: 0;
    max-height: 0;
    margin: 0;
    padding: 0 12px;
  }

  .slide-down-leave-to {
    opacity: 0;
    max-height: 0;
    margin: 0;
    padding: 0 12px;
  }

  .input-slot {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    top: 0;
    height: 40px;
    z-index: 15;
  }
}

.form-input--required {
  color: $warning-color;
}

.form-input.valid {
  input,
  textarea {
    // border-color: $blue;
  }
}

.form-input.invalid {
  input,
  textarea {
    border-color: $warning-color !important;
    &:focus {
      outline: none;
      box-shadow: 0 0 1px 1px $warning-color;
    }
  }
}

.disabled {
  opacity: 0.5;
  input {
    border-color: $border-color !important;
  }

  label {
  }
}
</style>
