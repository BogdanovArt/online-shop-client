<template>
  <div class="category-list">
    <template v-for="(item, ind) in items">
      <div :key="ind" class="category-list__item">
        <bread-crumbs :list="item" :query="query" />
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import BreadCrumbs from '~/components/pages/BreadCrumbs.vue'

import { ICrumb } from '~/types'

@Component({ components: { BreadCrumbs } })
export default class CategoryList extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly items!: ICrumb[][]

  @Prop({ type: String, default: '' })
  readonly query!: string
}
</script>
<style lang="scss" scoped>
.category-list {
  position: relative;
  max-width: 100%;
  width: 100%;
  text-align: left;
  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
@media screen and (max-width: $sm) {
  .category-list {
    &__item {
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
