<template>
  <div class="quantity-controls">
    <button
      class="quantity-controls__button quantity-controls__button--minus"
      :disabled="isMin"
      @click="quantity--"
    >
      <svg viewBox="0 0 12 2" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8332 1.83164H0.166504V0.164978H11.8332V1.83164Z" />
      </svg>
    </button>
    <input
      v-model="quantity"
      v-mask="[/[1-9]/, /\d/, /\d/, /\d/, /\d/]"
      type="text"
      name="quantity"
      autocomplete="off"
      spellcheck="false"
      @input="setValue"
      @paste.stop.prevent="() => null"
    />
    <button
      class="quantity-controls__button quantity-controls__button--plus"
      :disabled="isMax"
      @click="quantity++"
    >
      <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.8332 6.83164H6.83317V11.8316H5.1665V6.83164H0.166504V5.16498H5.1665V0.164978H6.83317V5.16498H11.8332V6.83164Z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import { debounce } from '~/utils'

@Component
export default class Quantity extends Vue {
  quantity = '1'
  debouncedSetter = debounce(this.setQuantity, 200)

  @Prop({ type: Number, default: 1 })
  readonly value!: number

  @Prop({ type: Number || undefined, default: undefined })
  readonly max?: number

  @Prop({ type: Function, default: () => null })
  readonly onChange!: (quantity: number) => void

  get isMin() {
    return parseInt(this.quantity, 10) <= 1
  }

  get isMax() {
    return parseInt(this.quantity, 10) >= (this.max || 99999)
  }

  created() {
    if (this.value && this.value > 1) {
      this.quantity = this.value.toString()
    }
  }

  @Watch('quantity')
  quantityWatcher(n: string) {
    const value = parseInt(n, 10)
    this.debouncedSetter(value)
  }

  @Watch('value')
  valueWatcher(n: number) {
    if (n && n.toString() !== this.quantity) this.quantity = n.toString()
  }

  setQuantity(n: number) {
    if (n && n !== this.value) {
      this.onChange(n)
    }
  }

  setValue(e: any) {
    let value = 1
    if (e.target.value) {
      value = parseInt(e.target.value, 10)
      if (this.max && value > this.max) {
        value = this.max
      } else if (!value) {
        value = 1
      }
    }
    this.quantity = value.toString()
  }
}
</script>

<style lang="scss" scoped>
$dim: 30px;
.quantity-controls {
  display: flex;
  justify-content: center;
  &__button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid $main-color;
    height: $dim;
    width: $dim;
    z-index: 3;
    &:focus {
      outline: none;
    }
    &:disabled {
      border-color: $border-color;
    }
    &--plus {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &--minus {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    svg {
      width: 10px;
      height: 10px;
    }
  }
  input {
    position: relative;
    height: $dim;
    line-height: $dim;
    width: 52px;
    padding: 0;
    color: $hint-color;
    margin: 0 -1px;
    border: 1px solid transparent;
    background: #f5f5f5;
    border-radius: 2px;
    font-size: 14px;
    text-align: center;
    z-index: 1;
    transition: 0.2s;
    &:hover {
      color: $text-color;
      border-color: #aeaeae;
    }

    &:focus {
      outline: none;
      color: $text-color;
      border-color: #aeaeae;
    }
  }
}

@media screen and (max-width: $sm) {
  .quantity-controls {
    &__button {
      height: calc(#{$dim * 0.65});
      width: $dim;
    }
    input {
      height: calc(#{$dim * 0.65});
    }
  }
}
</style>
