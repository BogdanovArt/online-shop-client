<template>
  <div :class="['input-dispatcher', item.type]">
    <template v-if="inputComponent">
      <component
        :is="inputComponent"
        :id="item.name"
        ref="input"
        v-bind="item"
        :return-value="returnValue"
        @input="(pl) => $emit('input', pl)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'

import Dispatcher from '~/components/inputs/Dispatcher/Dispatcher'

import { InputValue } from '~/types'
import { EventTypes, InputTypes } from '~/types/enums'

@Component({
  name: 'FilterInputDispatcher',
})
export default class FilterInputDispatcher extends Dispatcher {
  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes,
    inputType?: InputTypes,
    delay?: number
  ) => void
}
</script>
