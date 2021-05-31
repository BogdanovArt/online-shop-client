<template>
  <div class="input-radio">
    <v-radio-group v-model="value" row @change="onChange">
      <v-radio
        v-for="(e, i) in items"
        :key="i"
        :ripple="false"
        :label="e.title"
        :value="e.key"
      >
        <template v-slot:label>
          <div class="input-radio__label">
            <div class="input-radio__label__title">{{ e.title }}</div>
            <div
              v-if="e.description"
              class="input-radio__label__description"
              @click.stop="() => null"
              v-html="e.description"
            />
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { EventTypes } from '~/types/enums'

import { InputRadioItem, InputValue } from '~/types'

@Component
export default class Radio extends Vue {
  value = ''

  @Prop({ type: Array, default: () => [] })
  readonly items!: InputRadioItem[]

  @Prop({ type: String, default: '' })
  readonly name!: string

  @Prop({ type: String, default: '' })
  readonly selected?: string

  @Prop({ type: Boolean, default: false })
  readonly required!: false

  @Prop({ type: String, default: undefined })
  readonly label?: string

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

  @Watch('items')
  setInitial() {
    if (this.selected) {
      setTimeout(() => {
        this.value = this.selected as string
        this.returnValue(this.name, this.value, EventTypes.AUTO)
      }, 0)
    }
  }

  created() {
    this.setInitial()
    this.init(this.name, this.forceErrorCheck)
  }

  onChange() {
    this.returnValue(this.name, this.value, EventTypes.MANUAL)
  }

  forceErrorCheck() {
    const errors: string[] = []
    const value = this.required && this.value
    if (this.required && !this.value) {
      errors.push('Не все обязательные поля заполнены')
    }
    this.returnValue(this.name, value, EventTypes.AUTO)
    return errors
  }
}
</script>

<style lang="scss">
.input-radio {
  > * {
    padding: 0;
  }
  .v-radio {
    border: 1px solid $border-color;
    border-radius: 2px;
    padding: 13px;
    background: #fff;
    max-width: 380px;
    width: 380px;
    font-size: 14px;
    &.v-item--active {
      border-color: $active-color;
    }
    @media screen and (max-width: $sm) {
      margin-right: 0 !important;
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
  .input-hint {
    color: $hint-color;
    font-size: 12px;
    text-align: left;
    margin: 8px 0 2px 0;
  }
  .v-messages {
    display: none;
  }
  .v-input__control,
  .v-input__slot {
    margin: 0;
  }
  &__label {
    &__title {
    }
    &__description {
      color: $hint-color;
      font-size: 14px;
    }
  }
}
</style>
