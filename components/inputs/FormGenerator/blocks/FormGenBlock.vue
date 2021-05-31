<template>
  <div class="form-generator__block">
    <div v-if="item.title && !noTitle" class="form-generator__block__title">
      {{ item.title }}
    </div>
    <template v-if="item.inputs">
      <template v-for="(e, i) in item.inputs">
        <input-dispatcher
          ref="dispatcher"
          :key="i"
          :item="e"
          :filled-data="filledData"
          :return-value="changeHandler"
          :set-ref="setRef"
          @init="changeHandler(e.name, null, e.required)"
        />
      </template>
    </template>
    <input hidden :value="defaultSelected" />
    <template v-if="item.items && selected">
      <template v-for="e in item.items">
        <form-gen-block
          v-if="e.key === selected"
          :key="e.key"
          :item="e"
          :filled-data="filledData"
          :set-ref="setRef"
          :return-value="returnValue"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import InputDispatcher from './InputDispatcher.vue'

import { IComponent, InputValue } from '~/types'
import { EventTypes, InputTypes } from '~/types/enums'
import { FormValues, IFormGenBlock } from '~/types/registration'

@Component({
  name: 'FormGenBlock',
  components: { InputDispatcher },
})
export default class FormGenBlock extends Vue {
  selected: InputValue = null

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IFormGenBlock

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes,
    inputType?: InputTypes
  ) => void

  @Prop({ type: Function, default: () => null })
  readonly setRef!: (name: string, value?: Vue) => void

  @Prop({ type: Object, default: () => ({}) })
  readonly filledData!: FormValues

  @Prop({ type: Boolean, default: false })
  readonly noTitle!: boolean

  get defaultSelected() {
    if (this.item.items && !this.selected) {
      this.selected = this.item.items[0].key
      return this.item.items[0].key
    }
  }

  changeHandler(
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes,
    inputType?: InputTypes
  ) {
    if (this.item.items) {
      this.selected = value
    }
    this.returnValue(name, value, required, type, inputType)
  }
}
</script>

<style lang="scss" scoped>
.form-generator {
  &__block {
    &__title {
      font-family: $title-font;
      margin: 40px 0 20px;
      font-size: 24px;
      font-weight: 600;
      @media screen and (max-width: $sm) {
        margin: 32px 0 16px;
      }
    }
    .input-dispatcher {
      &:not(:last-of-type) {
        margin-bottom: 20px;
      }
      &.input-checkbox {
        margin-bottom: 8px;
      }
      &.input-hint {
        margin-bottom: 1px;
      }
      @media screen and (max-width: $sm) {
        margin-bottom: 16px;
      }
    }
    :not(.input-checkbox) {
      & + .input-hint {
        margin-top: -12px;
        margin-bottom: -8px;
      }
    }
  }
}
</style>
