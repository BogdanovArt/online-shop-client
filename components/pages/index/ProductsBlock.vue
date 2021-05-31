<template>
  <section class="products-block">
    <div class="products-block__title block-title">{{ title }}</div>
    <div class="products-block__content">
      <template v-for="(item, ind) in items">
        <card
          :key="ind"
          :item="item"
          :ids="productIds"
          class="products-block__item"
          @add="addToCart"
          @change="addToCart"
          @remove="removeFromCart"
        />
      </template>
      <div class="products-block__shadow"></div>
    </div>
    <nuxt-link to="/catalog" class="products-block__button">
      <span class="products-block__button__text">Посмотреть еще</span>
      <span class="products-block__button__text">
        более
        {{ content.total.toLocaleString('ru-RU') || '15 000' }} товаров</span
      >
    </nuxt-link>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Card from '~/components/listing/card/grid/Card.vue'

import { cartStore } from '~/store'

import { IProductsBlock } from '~/types/main'
import { IProduct } from '~/types/search'

@Component({ components: { Card } })
export default class ProductsBlock extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ type: Object, default: () => ({}) })
  readonly content!: IProductsBlock

  get productIds() {
    return cartStore.productIds
  }

  get items() {
    return this.content.items
  }

  addToCart(product: IProduct) {
    cartStore.changeProduct(product)
    cartStore.storeIds()
  }

  removeFromCart(product: IProduct) {
    cartStore.removeProduct(product)
    cartStore.storeIds()
  }
}
</script>

<style lang="scss" scoped>
.products-block {
  &__button {
    display: block;
    text-decoration: none;
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    width: 100%;
    padding: 5px 0;
    color: #fff !important;
    background-color: $main-color;
    border-radius: 4px;
    transition: $trns;
    &:hover {
      background-color: $hover-color;
    }
  }
  &__content {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    margin: 20px 0;
    @media screen and (max-width: $xl) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: $lg) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: $sm) {
      grid-template-columns: 100%;
      grid-gap: 0;
      margin: 20px -20px !important;
    }
    // @media screen and (max-width: $xs) {
    //   grid-template-columns: 100%;
    // }
  }
  &__shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 0, 0, 0.035);
    box-shadow: inset 0 0 100px 100px $bg-color;
  }
}
@media screen and (max-width: $sm) {
  .products-block {
    padding: 0 20px;
    &__title {
      margin: 20px 0;
      font-size: 26px;
    }
    &__content {
      margin: 0;
    }
    &__button {
      margin-top: 20px;
      font-size: 14px;
      &__text:not(:first-child) {
        display: none;
      }
    }
    &__shadow {
      display: none;
    }
  }
}
</style>
