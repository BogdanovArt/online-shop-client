<template>
  <div class="catalog-menu-list">
    <div v-show="active.title" class="catalog-menu-list__title">
      <div class="catalog-menu-list__title__text">{{ active.title }}</div>
      <div @click="$emit('reset')"><close-icon /></div>
    </div>
    <div class="catalog-menu-list__content">
      <template v-for="item in items">
        <a
          :key="item.id"
          :href="item.link"
          class="catalog-menu-list__item"
          @click.stop.prevent="$emit('select', item)"
        >
          <div class="catalog-menu-list__item__image">
            <img
              :src="item.image ? item.image.src : '/img/placeholder.png'"
              :alt="item.image && item.image.name"
            />
          </div>
          <div :to="item.link" class="catalog-menu-list__item__title">
            {{ item.title }}
          </div>
        </a>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { CloseIcon } from '~/components/icons'

import { IMenuItem } from '~/types/core'

@Component({ components: { CloseIcon } })
export default class MenuList extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly active!: IMenuItem

  @Prop({ type: Array, default: () => [] })
  readonly items!: IMenuItem[]
}
</script>

<style lang="scss" scoped>
.catalog-menu-list {
  $offset: 30px;
  padding: $offset 0;
  &__title {
    display: flex;
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 25px;
    &__text {
      flex-grow: 1;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7));
    @media screen and (max-width: $lg) {
      grid-template-columns: repeat(6, calc(100% / 6));
    }
    @media screen and (max-width: $md) {
      grid-template-columns: repeat(5, calc(100% / 5));
    }
    @media screen and (max-width: $sm) {
      padding: 0 20px;
      grid-template-columns: repeat(3, calc(100% / 3));
    }
    @media screen and (max-width: $xs) {
      grid-template-columns: repeat(1, calc(100%));
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 4px;
    text-decoration: none;
    color: $text-color;
    cursor: pointer;
    &__image {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: $shadow-main;
      margin-bottom: 18px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__title {
      text-align: center;
      font-size: 12px;
      @media screen and (max-width: $sm) {
        font-size: 16px;
      }
    }
    &:hover {
      background: $main-color;
      color: #fff;
    }
  }
  svg {
    width: $offset;
    height: $offset;
    fill: $main-color;
    cursor: pointer;
  }
}
</style>
