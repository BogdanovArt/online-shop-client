<template>
  <div class="category-menu">
    <div class="category-menu__wrapper">
      <nuxt-link :to="heading.link" class="category-menu__heading flex">
        <div><ArrowIcon /></div>
        <div class="category-menu__heading__title">{{ heading.title }}</div>
      </nuxt-link>
      <template v-if="item.items && item.items.length">
        <v-divider></v-divider>
        <div class="category-menu__items">
          <template v-for="(el, index) in item.items">
            <nuxt-link
              :key="index"
              :to="{ path: el.link, query }"
              class="category-menu__item flex"
            >
              <div class="category-menu__item__title">{{ el.title }}</div>
              <div><ChevronIcon /></div>
            </nuxt-link>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ArrowIcon, ChevronIcon } from '~/components/icons'

import { ICategoryMenu } from '~/types/category'
import { Query } from '~/utils/query'
import { GetParams } from '~/types/enums'

@Component({ components: { ArrowIcon, ChevronIcon } })
export default class CategoryMenu extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ICategoryMenu

  get query() {
    return Query.set({
      query: this.$route.query,
      key: GetParams.page,
      value: null,
    })
  }

  get heading() {
    return this.item.heading || {}
  }
}
</script>
<style lang="scss" scoped>
.category-menu {
  border: none !important;
  &__wrapper {
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    box-shadow: $shadow-main;
  }
  &__heading {
    font-weight: bold;
    text-decoration: none;
    color: $text-color;
    > *:not(:last-child) {
      margin-right: 10px;
    }
    svg {
      display: block;
      width: 16px;
      fill: $main-color;
      transform: rotate(180deg);
    }
  }
  &__items {
  }
  &__item {
    height: 25px;
    text-decoration: none;
    color: $text-color;
    &__title {
      flex-grow: 1;
    }
    svg {
      display: block;
      width: 16px;
      fill: $main-color;
      transform: rotate(-90deg);
    }
  }
  .v-divider {
    margin: 15px 0;
  }
}
</style>
