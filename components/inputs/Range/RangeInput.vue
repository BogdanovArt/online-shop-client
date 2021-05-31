<template>
  <div class="range-input">
    <div class="range-input__inputs">
      <template v-for="(input, ind) in items">
        <RangeQuantity
          :key="ind"
          :ref="input.type"
          :item="input"
          :value="inputValueProvider[input.type]"
          :on-change="inputHandlers[input.type]"
        />
      </template>
    </div>
    <RangeTrack
      :min-value="min"
      :max-value="max"
      :range="sliderRange"
      @mousedown="dragging = true"
      @mouseup="dragging = false"
      @change="changeHandler"
      @input="dragHandler"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import RangeQuantity from './blocks/RangeQuantity.vue'
import RangeTrack from './blocks/RangeTrack.vue'

import { InputSimpleSchema, InputValue } from '~/types'
import { EventTypes, InputTypes } from '~/types/enums'

type RangeValue = Partial<Record<InputTypes, number>>
type Payload = Partial<Record<InputTypes, number | null>>

@Component({ components: { RangeQuantity, RangeTrack } })
export default class Quantity extends Vue {
  minValue = 0
  maxValue = 0

  dragging = false

  range: Array<number> = [0, 0]

  validationTimer: NodeJS.Timer | null = null

  inputDelay = 1000

  inputHandlers = {
    [InputTypes.MIN]: this.minHandler,
    [InputTypes.MAX]: this.maxHandler,
  }

  @Prop({ type: Array, default: () => [] })
  readonly items!: InputSimpleSchema[]

  @Prop({ type: String, default: 'range' })
  readonly name!: string

  @Prop({ type: Array, default: () => [] })
  readonly initial?: number[]

  @Prop({ type: Number, default: 0 })
  readonly max!: number

  @Prop({ type: Number, default: 0 })
  readonly min!: number

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes,
    delay?: number
  ) => void

  get sliderRange() {
    return [this.minValue, this.maxValue]
  }

  get inputValueProvider() {
    return {
      min: this.minValue,
      max: this.maxValue,
    }
  }

  get payload() {
    return {
      min: this.minValue === this.min ? null : this.minValue,
      max: this.maxValue === this.max ? null : this.maxValue,
    }
  }

  created() {
    if (!this.initialWatcher()) {
      this.setInitialValues()
    }
  }

  @Watch('initial')
  initialWatcher() {
    if (this.initial && this.initial.length) {
      let [min, max] = this.initial
      if (!min) min = this.min
      if (!max) max = this.max
      this.setValues(min, max)
      return true
    }
    return false
  }

  setInitialValues() {
    this.setValues(this.min, this.max)
  }

  setValues(min: number, max: number) {
    this.minValue = min
    this.maxValue = max
  }

  syncRangeSlider() {
    this.range = [this.minValue, this.maxValue]
  }

  validateValue(type: InputTypes) {
    type === InputTypes.MAX
      ? this.validateMax(this.maxValue)
      : this.validateMin(this.minValue)
  }

  validateMin(min: number) {
    switch (true) {
      case min < this.min:
        this.minValue = this.min
        break
      case min > this.maxValue:
        if (min > this.max) this.minValue = this.maxValue = this.max
        else this.maxValue = min
        break
    }
  }

  validateMax(max: number) {
    switch (true) {
      case max > this.max:
        this.maxValue = this.max
        break
      case max < this.minValue:
        if (max < this.min) this.minValue = this.maxValue = this.min
        else this.minValue = max
        break
    }
  }

  minHandler(value: number, type: InputTypes) {
    this.inputWrapper(type, () => {
      this.minValue = value
    })
  }

  maxHandler(value: number, type: InputTypes) {
    this.inputWrapper(type, () => {
      this.maxValue = value
    })
  }

  inputWrapper(type: InputTypes, func: () => void) {
    this.$emit('input')
    if (this.validationTimer) global.clearTimeout(this.validationTimer)
    func()
    this.validationTimer = global.setTimeout(() => {
      this.validateValue(type)
      this.sendValue(this.payload)
    }, this.inputDelay)
  }

  dragHandler(value: number[]) {
    const [min, max] = value
    if (this.dragging) {
      this.setValues(min, max)
    }
    this.$emit('input')
  }

  changeHandler() {
    this.sendValue(this.payload, 2000)
  }

  sendValue(value: Payload, delay: number = this.inputDelay) {
    this.items.forEach((input) => {
      this.returnValue(
        input.name,
        value[input.type],
        false,
        EventTypes.MANUAL,
        delay
      )
    })
  }
}
</script>

<style lang="scss" scoped>
$dim: 30px;
.range-input {
  padding-left: 1px;
  &__inputs {
    display: flex;
    grid-gap: 15px;
  }
  .range-slider {
    margin-top: 30px;
  }
}
</style>
