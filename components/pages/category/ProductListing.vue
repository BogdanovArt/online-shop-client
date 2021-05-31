<template>
  <div :class="['product-listing', `product-listing--${viewType}`]">
    <template v-for="(product, index) in items">
      <div :key="index" class="product-listing__item">
        <component
          :is="viewType"
          :key="index"
          :item="product"
          :ids="productIds"
          class="products-block__item"
          @add="addToCart"
          @change="addToCart"
          @remove="removeFromCart"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Card from '~/components/listing/card/grid/Card.vue'
import CardDetailed from '~/components/listing/card/detailed/CardDetailed.vue'
import CardCompact from '~/components/listing/card/compact/CardCompact.vue'

import { cartStore } from '~/store'

import { ListingViewTypes } from '~/types/enums'
import { IProduct } from '~/types/search'

@Component({
  components: {
    [ListingViewTypes.COMPACT]: CardCompact,
    [ListingViewTypes.GRID]: Card,
    [ListingViewTypes.LIST]: CardDetailed,
  },
})
export default class ProductListing extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly items!: IProduct[]

  @Prop({ type: String, default: ListingViewTypes.GRID })
  readonly viewType!: ListingViewTypes

  get productIds() {
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
.product-listing {
  &--grid {
    display: grid;
    grid-template-columns: repeat(4, calc((100% - 45px) / 4));
    grid-gap: 15px;
    @media screen and (max-width: $xl) {
      grid-template-columns: repeat(3, calc((100% - 30px) / 3));
    }
    @media screen and (max-width: $sm) {
      padding: 15px 0;
      grid-gap: 0;
      grid-template-columns: 100%;
    }
  }
}
</style>
