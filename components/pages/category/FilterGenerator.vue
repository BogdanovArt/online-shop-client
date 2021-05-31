<template>
  <div class="filter-generator">
    <div class="filter-generator__wrapper">
      <template v-for="(group, index) in formData">
        <div :key="index" class="filter-group">
          <div v-show="group.title" class="filter-group__title">
            {{ group.title }}
          </div>
          <template v-for="(input, ind) in group.inputs">
            <FilterInputDispatcher
              :key="ind"
              :item="input"
              :return-value="returnValue"
              @input="(pl) => $emit('input', pl)"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import FilterInputDispatcher from '~/components/inputs/Filter/FilterInputDispatcher.vue'

import { InputValue } from '~/types'
import { EventTypes } from '~/types/enums'
import { IFormGenBlock } from '~/types/registration'

@Component({
  components: { FilterInputDispatcher },
})
export default class FormGenerator extends Vue {
  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    value: InputValue,
    required?: boolean,
    type?: EventTypes
  ) => void

  @Prop({ type: Array, default: () => [] })
  readonly formData!: IFormGenBlock[]
}
</script>

<style lang="scss" scoped>
.filter-generator {
  &__wrapper {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }
}
.filter-group {
  &__title {
    font-size: 18px;
    font-weight: 600;
  }
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
}
</style>
