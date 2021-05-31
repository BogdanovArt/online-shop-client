<template>
  <div class="range-inputs__input">
    <input
      v-model="inputValue"
      v-mask="getRegEx(item.mask.value)"
      type="text"
      :name="item.name"
      :placeholder="item.placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="inputHandler"
      @paste.stop.prevent="() => null"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import { InputSimpleSchema } from '~/types'

@Component
export default class Quantity extends Vue {
  inputValue = ''
  trueValue = 0
  input: HTMLInputElement = this.$refs.input as HTMLInputElement

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: InputSimpleSchema

  @Prop({ type: Number, default: 0 })
  readonly value!: number

  @Prop({ type: Function, default: () => null })
  readonly onChange!: (inputValue: number, name: string) => void

  created() {
    this.externalValueWatcher(this.value)
  }

  @Watch('value')
  externalValueWatcher(value: number) {
    this.setInputValue(value)
  }

  setInputValue(n: number) {
    this.inputValue = n.toString()
  }

  setValue(n: number, src?: string) {
    this.trueValue = n
    this.setInputValue(n)
  }

  getRegEx(source: string[]) {
    return source.map((chunk) => new RegExp(chunk))
  }

  inputHandler(e: any) {
    const value = e.target?.value ? parseInt(e.target.value, 10) : 0
    if (e.isTrusted) {
      this.onChange(value, this.item.type)
    }
  }
}
</script>

<style lang="scss" scoped>
$dim: 40px;
.range-input {
  display: flex;
  justify-content: center;
  input {
    position: relative;
    height: $dim;
    line-height: $dim;
    width: 100%;
    padding: 0 15px;
    color: $text-color;
    margin: 0 -1px;
    border: 1px solid $main-color;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    z-index: 1;
    transition: 0.2s;
    &::placeholder {
      color: $hint-color;
      text-align: left;
    }
    &:hover {
      border-color: $hover-color;
    }

    &:focus {
      outline: none;
      border-color: $active-color;
    }
  }
}
</style>
