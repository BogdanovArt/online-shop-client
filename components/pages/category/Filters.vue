<template>
  <div class="category-filters">
    <div
      ref="filter"
      class="category-filters__wrapper"
      :style="{ height: height ? height + 'px' : 'auto' }"
    >
      <div ref="heading" class="category-filters__heading" @click="toggle">
        Фильтры <ChevronIcon :class="!expanded && 'flipped'" />
      </div>
      <v-divider></v-divider>
      <FilterBlock :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import FilterGenerator from './FilterGenerator.vue'
import FilterBlock from './FilterBlock.vue'
import { ChevronIcon } from '~/components/icons'

import { IFormGenBlock } from '~/types/registration'

// @TODO split expanding logic with form logic
// @TODO mobile component
// @TODO fix false validation pass when changing between fields

@Component({ components: { FilterGenerator, ChevronIcon, FilterBlock } })
export default class Filters extends Vue {
  expanded = true
  height = 0

  @Prop({ type: Array, default: () => [] })
  readonly items!: IFormGenBlock[]

  toggle() {
    this.expanded = !this.expanded
    this.setHeight()
  }

  setHeight() {
    const { filter, heading } = this.$refs
    this.height = this.expanded
      ? (filter as Element)?.scrollHeight
      : (heading as Element)?.scrollHeight
  }

  mounted() {
    this.setHeight()
  }
}
</script>

<style lang="scss" scoped>
.category-filters {
  &__wrapper {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: #fff;
    box-shadow: $shadow-main;
    overflow: hidden;
    transition: height $trns;
  }
  &__group {
    border: 1px solid black;
  }
  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: $hover-color;
    }
    svg {
      width: 18px;
      fill: $main-color;
      transition: transform $trns;
      transform: rotate(-180deg);
      &.flipped {
        transform: rotate(0);
      }
    }
  }
  &__inputs {
    padding: 20px;
  }
  .v-divider {
    margin: 0 20px;
  }
}
</style>
