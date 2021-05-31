<template>
  <div class="main-menu__wrapper">
    <ul class="main-menu">
      <template v-for="cat in mainList">
        <li :key="cat.id" class="main-menu__item">
          <span
            :class="[
              'main-menu__label',
              active && active.id === cat.id && 'main-menu__label--active',
            ]"
            @click="$emit('select', cat)"
          >
            {{ cat.title }}
          </span>
        </li>
      </template>

      <li
        v-if="items.length > mainList.length"
        class="main-menu__item main-menu__item--all"
      >
        <span class="main-menu__label" @click="more">
          Еще
          <span class="main-menu__counter">
            {{ items.length - mainList.length }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { IMenuItem } from '~/types/core'

@Component
export default class CatalogMenu extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly active!: IMenuItem

  @Prop({ type: Array, default: () => [] })
  readonly items!: IMenuItem[]

  get mainList() {
    return this.items.slice(0, 5)
  }

  more() {
    const placeholder = {
      id: null,
      title: 'Остальные разделы',
      items: this.items.slice(5, this.items.length),
    }
    this.$emit('select', placeholder)
  }
}
</script>

<style lang="scss" scoped>
.main-menu {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  &__item {
    list-style: none;
    font-size: 18px;
    line-height: 18px;
    color: #fff;
    font-weight: 500;
    &:focus {
      outline: none;
    }
    &--all {
      position: relative;
    }
  }
  &__label {
    display: block;
    padding: 9px 0;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: 0.3s;
    &--active {
      border-color: #fa0000;
    }
    &:hover {
      border-color: #fa0000;
    }
  }
}
</style>
