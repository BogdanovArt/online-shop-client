<template>
  <div class="range-slider">
    <div ref="track" class="range-slider__track">
      <div class="range-slider__track__line"></div>
      <div
        ref="min"
        :style="{ left: minKnobPosition + '%' }"
        :class="[
          'range-slider__knob',
          'range-slider__knob--min',
          'flex--centered',
          dragged && 'dragged',
          dragged === 'min' && 'active',
        ]"
      >
        <div
          class="range-slider__knob__handle flex--centered"
          @mousedown="mouseDownHandler('min')"
          @touchstart="mouseDownHandler('min')"
        >
          <knob-icon />
        </div>
      </div>
      <div
        ref="max"
        :style="{ left: maxKnobPosition + '%' }"
        :class="[
          'range-slider__knob',
          'range-slider__knob--max',
          'flex--centered',
          dragged && 'dragged',
          dragged === 'max' && 'active',
        ]"
      >
        <div
          class="range-slider__knob__handle flex--centered"
          @mousedown="mouseDownHandler('max')"
          @touchstart="mouseDownHandler('max')"
        >
          <knob-icon />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import { KnobIcon } from '~/components/icons'

import { Events } from '~/utils/events'

@Component({ components: { KnobIcon } })
export default class Test extends Vue {
  knobMin = this.$refs.min
  knobMax = this.$refs.max

  minKnobPosition: number | string = 40
  maxKnobPosition: number | string = 100

  baseOffset = 0
  baseWidth = 0

  dragged: string | null = null

  padding = 5

  @Prop()
  readonly minValue!: number

  @Prop()
  readonly maxValue!: number

  @Prop()
  readonly initial!: number[]

  @Prop()
  readonly range!: number[]

  created() {
    this.rangeWatcher(this.range)
  }

  mounted() {
    this.calculateBaseDimensions()
  }

  /* Watchers */

  @Watch('minValue')
  minwWatcher() {
    this.calculatePositions(this.range[0], this.range[1])
    this.sendInputEvent(true)
  }

  @Watch('maxValue')
  maxWatcher() {
    this.calculatePositions(this.range[0], this.range[1])
    this.sendInputEvent(true)
  }

  @Watch('range')
  rangeWatcher(range: Array<number>) {
    if (!this.dragged) {
      this.calculatePositions(range[0], range[1])
      this.sendInputEvent(true)
    }
  }

  /* Getters */

  get valueMargin() {
    return this.maxValue - this.minValue
  }

  /* Calculators */

  calculateValueFromPosition(position: number): string {
    return (this.minValue + (this.valueMargin / 100) * position).toFixed(0)
  }

  calculatePositionFromValue(value: number) {
    const discountedValue = value - this.minValue
    switch (true) {
      case value < this.minValue:
        return '0'
      case value > this.maxValue:
        return '100'
      default:
        return ((discountedValue * 100) / this.valueMargin).toFixed(6)
    }
  }

  calculatePositionFromOffset(offset: number): string {
    return (((offset - this.baseOffset) * 100) / this.baseWidth).toFixed(6)
  }

  calculateBaseDimensions() {
    const base = this.$refs.track as HTMLDivElement
    this.baseOffset = base.offsetLeft
    this.baseWidth = base.clientWidth
  }

  calculatePositions(min: number, max: number) {
    const newMin = this.calculatePositionFromValue(min)
    this.checkAndSetMinKnobPosition(parseFloat(newMin))
    const newMax = this.calculatePositionFromValue(max)
    this.checkAndSetMaxKnobPosition(parseFloat(newMax))
  }

  /* Setters */

  checkAndSetMinKnobPosition(position: number) {
    const paddedPosition = position + this.padding
    const max = this.maxKnobPosition as number
    switch (true) {
      case paddedPosition > max:
        this.minKnobPosition = this.checkAndSetMaxKnobPosition(paddedPosition)
          ? position
          : max - 5
        return false
      case position < 0:
        this.minKnobPosition = 0
        return false
      default:
        this.minKnobPosition = position
        return true
    }
  }

  checkAndSetMaxKnobPosition(position: number) {
    const paddedPosition = position - this.padding
    const min = this.minKnobPosition as number
    switch (true) {
      case paddedPosition < min:
        this.maxKnobPosition = this.checkAndSetMinKnobPosition(paddedPosition)
          ? position
          : min + 5
        return false
      case position > 100:
        this.maxKnobPosition = 100
        return false
      default:
        this.maxKnobPosition = position
        return true
    }
  }

  setMaxKnobPositionFromOffset(offset: number) {
    const newPosition = parseFloat(this.calculatePositionFromOffset(offset))
    this.checkAndSetMaxKnobPosition(newPosition)
  }

  setMinKnobPositionFromOffset(offset: number) {
    const newPosition = parseFloat(this.calculatePositionFromOffset(offset))
    this.checkAndSetMinKnobPosition(newPosition)
  }

  positionDispatcher(offset: number) {
    if (this.dragged) {
      switch (this.dragged) {
        case 'max':
          this.setMaxKnobPositionFromOffset(offset)
          break
        case 'min':
          this.setMinKnobPositionFromOffset(offset)
          break
      }
      this.sendInputEvent()
    }
  }

  /* Event Handlers */

  mouseDownHandler(type: string) {
    this.dragged = type
    this.$emit('mousedown')
    Events.set(['touchend', 'mouseup'], this.mouseUpHandler)
    Events.set('mousemove', this.mouseMovehandler)
    Events.set('touchmove', this.touchMoveHandler)
  }

  mouseUpHandler() {
    this.dragged = null
    this.$emit('mouseup')
    this.sendChangeEvent()
    Events.remove(['touchend', 'mouseup'], this.mouseUpHandler)
    Events.remove('mousemove', this.mouseMovehandler)
    Events.remove('touchmove', this.touchMoveHandler)
  }

  touchMoveHandler(e: TouchEvent) {
    const offset = e.targetTouches[0].pageX
    this.positionDispatcher(offset)
  }

  mouseMovehandler(e: MouseEvent) {
    const offset = e.pageX
    this.positionDispatcher(offset)
  }

  sendInputEvent(change?: boolean) {
    const newMin = parseInt(
      this.calculateValueFromPosition(this.minKnobPosition as number),
      10
    )

    const newMax = parseInt(
      this.calculateValueFromPosition(this.maxKnobPosition as number),
      10
    )
    this.$emit('input', [newMin, newMax])
    if (change) this.sendChangeEvent()
  }

  sendChangeEvent() {
    this.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
.range-slider {
  // margin: 20px 0;
  margin: 0 8px;
  &__track {
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    &__line {
      position: absolute;
      left: -8px;
      right: -8px;
      height: 1px;
      background: $main-color;
      z-index: 1;
    }
  }
  &__knob {
    position: absolute;
    width: 0px;
    height: 0px;
    transition: $trns;
    &__handle {
      position: absolute;
      min-width: 18px;
      min-height: 18px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid $main-color;
      user-select: none;
      cursor: pointer;
      z-index: 3;
      svg {
        fill: $main-color;
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: -5px;
      left: -20px;
      right: -20px;
      bottom: -5px;
      background: #fff;
      z-index: 2;
    }
    &.dragged {
      transition: none;
    }
    &.active {
      .range-slider__knob__handle {
        background: $main-color;
        svg {
          fill: #fff;
        }
      }
    }
  }
}
.flex {
  &--centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
