<template>
  <div class="products-list">
    <template v-for="item in items">
      <card-item
        :key="item.id"
        :item="item"
        :ids="cartIds"
        :query="query"
        @add="addToCart"
        @remove="removeFromCart"
        @change="addToCart"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CardItem from '~/components/listing/card/list/CardMicro.vue'

import { cartStore } from '~/store'

import { IProduct } from '~/types/search'

@Component({ components: { CardItem } })
export default class ProductsList extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly items!: IProduct[]

  @Prop({ type: String, default: '' })
  readonly query!: string

  get cartIds() {
    return cartStore.productIds
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
.products-list {
  position: relative;
  max-width: 100%;
  width: 100%;
}
</style>
