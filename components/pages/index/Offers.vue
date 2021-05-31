<template>
  <section class="offers-block">
    <div class="offers-block__title block-title">{{ title }}</div>
    <div class="offers-block__content">
      <template v-for="(item, ind) in content">
        <div :key="ind" class="offers-block__item">
          <nuxt-link :to="item.link">
            <img
              :src="item.image.src"
              :alt="item.title"
              class="offers-block__item__image"
            />
          </nuxt-link>
        </div>
      </template>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Card from '~/components/listing/card/grid/Card.vue'

import { IOffersBlock } from '~/types/main'

@Component({ components: { Card } })
export default class OffersBlock extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ type: Array, default: () => [] })
  readonly content!: IOffersBlock
}
</script>

<style lang="scss" scoped>
.offers-block {
  &__content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 150px;
    grid-gap: 20px;
  }
  &__item {
    a {
      display: block;
      height: 100%;
    }
    &__image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@media screen and (max-width: $md) {
  .offers-block {
    &__content {
      padding: 20px;
      grid-template-columns: repeat(2, calc((100% - 20px) / 2));
      grid-auto-rows: 80px;
    }
  }
}
</style>
