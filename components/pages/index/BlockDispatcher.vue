<template>
  <div class="block-dispatcher">
    <template v-for="(item, ind) in items">
      <div :key="ind" class="block-wrapper">
        <component
          :is="item.type"
          :title="item.title"
          :content="item.content"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Slider from './Slider.vue'
import Placeholder from './Placeholder.vue'
import ProductsBlock from './ProductsBlock.vue'
import MapBlock from './MapBlock.vue'
import OffersBlock from './Offers.vue'

import { IPageBlock } from '~/types/main'

@Component({
  components: {
    slider: Slider,
    dealers: MapBlock,
    products: ProductsBlock,
    offers: OffersBlock,
  },
})
export default class BlockDispatcher extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly items!: IPageBlock[]
}
</script>
