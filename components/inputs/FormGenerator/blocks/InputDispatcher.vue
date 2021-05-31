<template>
  <div :class="['input-dispatcher', item.type]">
    <template v-if="inputComponent">
      <component
        :is="inputComponent"
        :id="item.name"
        ref="input"
        :disabled="disabled"
        v-bind="item"
        :mask="item.mask || dynamicMask"
        :set-ref="setRef"
        :return-value="onChange"
        :init="initHandler"
        :verify="verify"
      />
    </template>
    <template v-else-if="item.type === types.HINT">
      <hint v-bind="item" :filled-data="filledData" />
    </template>
    <template v-else-if="item.type === types.ROW">
      <div :class="item.type">
        <template v-for="(e, i) in item.inputs">
          <input-dispatcher
            :key="i"
            :item="e"
            :set-ref="setRef"
            :return-value="returnValue"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Hint from './Hint.vue'

import Dispatcher from '~/components/inputs/Dispatcher/Dispatcher'

import { innMask, symbolMask } from '~/utils/masks'

import { EventTypes, ValueTypes } from '~/types/enums'
import { InputSimpleSchema, InputValue } from '~/types'
import { FormValues } from '~/types/registration'

@Component({
  name: 'InputDispatcher',
  components: {
    Hint,
  },
})
export default class InputDispatcher extends Dispatcher {
  @Prop({ type: Function, default: () => null })
  readonly setRef!: (name: string, value?: Vue) => void

  @Prop({ type: Object, default: () => ({}) })
  readonly filledData!: FormValues

  get verify() {
    const verify = (this.item as InputSimpleSchema).confirm
    if (verify) {
      return this.filledData[verify]
    }
  }

  get disabled() {
    return (this.item as InputSimpleSchema).confirm && !this.verify
  }

  get dynamicMask() {
    const item = this.item as InputSimpleSchema
    switch (item.valueType) {
      case ValueTypes.INN:
        return {
          value: innMask(new RegExp(item.allowedCharacters || '^[0-9]+$')),
          errorMessage: 'Некорректное значение',
        }
      case ValueTypes.RESTRICTED:
        return {
          value: symbolMask(
            new RegExp(item.allowedCharacters || '^[a-zA-Z0-9]+$')
          ),
          errorMessage: 'Некорректное значение',
        }
      default:
        return null
    }
  }

  beforeDestroy() {
    const item = this.item as InputSimpleSchema
    this.sendInputData(item.name, undefined, false, EventTypes.AUTO)
  }

  onChange(name: string, value: InputValue, type: EventTypes) {
    this.sendInputData(name, value, true, type)
  }

  sendInputData(
    name: string,
    value: InputValue = null,
    required = false,
    type?: EventTypes
  ) {
    const item = this.item as InputSimpleSchema
    this.returnValue(
      name || item.name,
      value,
      required ? item.required : false,
      type,
      item.type
    )
  }

  initHandler(name: string, init: () => Array<string | undefined>) {
    this.$emit('init', name, init)
  }
}
</script>

<style lang="scss" scoped>
.input-dispatcher {
  &:not(.input-radio, .input-checkbox, .input-hint) {
  }
  .input-row {
    display: flex;
    justify-content: space-between;
    > *:not(:last-child) {
      margin-right: 20px;
      @media screen and (max-width: $sm) {
        margin-right: 16px;
      }
    }
  }
}
</style>
