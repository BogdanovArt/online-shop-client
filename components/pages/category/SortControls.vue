<template>
  <div class="sort-controls flex">
    <div class="sort-controls__heading">
      {{ item.title }}
    </div>
    <div class="sort-controls__items flex">
      <template v-if="item.items">
        <template v-for="(el, ind) in item.items">
          <div
            :key="ind"
            :class="[
              'sort-controls__item',
              active === ind && 'sort-controls__item--active',
            ]"
            @click="$emit('sort', { item: el, index: ind, active })"
          >
            {{ el.title }}
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ICategorySorts } from '~/types/category'

@Component
export default class SortControls extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ICategorySorts

  get active(): number {
    const sort = this.$route.query?.sort
    const order = this.$route.query?.order
    if (sort && order) {
      return this.item.items?.findIndex(
        (el) => el.params?.sort === sort && el.params?.order === order
      )
    } else if (typeof this.item.initial === 'number') {
      return this.item.initial
    } else {
      return -1
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-controls {
  &__heading {
    margin-right: 10px;
  }
  &__items {
    > * {
      margin-right: 5px;
    }
  }
  &__item {
    color: $main-color;
    text-decoration: underline;
    cursor: pointer;
    &--active {
      font-weight: 600;
    }
  }
}
</style>
