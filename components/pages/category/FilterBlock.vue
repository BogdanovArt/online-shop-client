<template>
  <div class="category-filters__inputs">
    <FilterGenerator
      :form-data="items"
      :return-value="formHandler"
      @input="inputEventHandler"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import FilterGenerator from './FilterGenerator.vue'
import { ChevronIcon } from '~/components/icons'

import { IFormGenBlock } from '~/types/registration'
import { IBasicObject, InputValue } from '~/types'
import { compare } from '~/utils'
import { Query } from '~/utils/query'
import { InputTypes } from '~/types/enums'

@Component({ components: { FilterGenerator, ChevronIcon } })
export default class Filters extends Vue {
  formValues = {}
  pushTimer: NodeJS.Timer | null = null

  @Prop({ type: Array, default: () => [] })
  readonly items!: IFormGenBlock[]

  @Watch('$route')
  routeWatcher() {
    this.clearTimer()
  }

  inputEventHandler(data: any) {
    this.clearTimer()
  }

  clearTimer() {
    if (this.pushTimer) global.clearTimeout(this.pushTimer)
  }

  formHandler(
    name: string,
    value: InputValue,
    required: boolean,
    type: InputTypes,
    delay: number
  ) {
    const form = JSON.parse(JSON.stringify(this.formValues))
    form[name] = value

    this.formValues = form
    this.setFilterQuery(form, delay)
  }

  setFilterQuery(query: IBasicObject, delay = 2000) {
    this.clearTimer()
    const currentQuery = this.$route.query
    const key = Object.keys(query)
    const value = Object.values(query)
    const newQuery = Query.set({
      query: currentQuery,
      key,
      value,
    })

    if (!compare(currentQuery, newQuery)) {
      this.pushTimer = global.setTimeout(() => {
        this.$router.replace({ path: this.$route.path, query: newQuery })
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-filters {
  &__inputs {
    padding: 20px;
  }
}
</style>
