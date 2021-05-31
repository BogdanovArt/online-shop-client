<template>
  <div class="form-generator">
    <div class="form-wrapper">
      <template v-for="(e, i) in formData">
        <form-gen-block
          ref="gen-block"
          :key="i"
          :item="e"
          :filled-data="filledData"
          :return-value="returnValue"
          :set-ref="setRef"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import FormGenBlock from './blocks/FormGenBlock.vue'

import { InputValue } from '~/types'
import { EventTypes } from '~/types/enums'
import { FormValues, IFormGenBlock } from '~/types/registration'

@Component({
  components: { FormGenBlock },
})
export default class FormGenerator extends Vue {
  refs: { [key: string]: Vue | null } = {}

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes
  ) => void

  @Prop({ type: Array, default: () => [] })
  readonly formData!: IFormGenBlock[]

  @Prop({ type: Object, default: () => ({}) })
  readonly filledData!: FormValues

  setRef(name: string, value: Vue | null = null) {
    const chunk = { [name]: value }
    this.refs = { ...this.refs, ...chunk }
  }

  setError(name: string, value: string) {
    try {
      ;(this.refs[name] as any).setError(value)
      return true
    } catch (err) {
      console.info(err)
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  > *:not(:last-child) {
    margin-bottom: 40px;

    @media screen and (max-width: $md) {
      margin-bottom: 16px;
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
