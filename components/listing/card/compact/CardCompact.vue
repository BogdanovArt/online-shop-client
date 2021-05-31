<template>
  <div v-if="item" class="product-list__item">
    <div v-show="item.sku" class="product-list__item__sku">
      Арт.: {{ item.sku }}
    </div>

    <div class="product-list__item__title">
      <a :href="item.link">
        <p :title="item.title">{{ item.title }}</p>
      </a>

      <div class="product-list__item__tags">
        <template v-for="el in item.tags">
          <span
            :key="el.title"
            :class="[
              'product-list__item__tag',
              el.action && 'product-list__item__tag--interactive',
            ]"
            :style="{ background: el.color }"
            @click="tagAction(el)"
          >
            {{ el.title }}
          </span>
        </template>
      </div>
    </div>

    <div v-show="item.packing" class="product-list__item__packing">
      {{ item.packing }}
    </div>

    <div class="product-list__item__quantity">
      <quantity
        :value="givenQuantity"
        :max="item.stock"
        :on-change="quantityChange"
      />
    </div>

    <div class="product-list__item__prices">
      <div
        v-if="price"
        class="product-list__item__price"
        :title="priceValue.toLocaleString('ru-RU')"
      >
        <span class="price-value">
          {{ getPriceString(priceValue) }}
        </span>
        <span class="price-currency">{{ price.currency }}</span>
      </div>
    </div>

    <div
      :class="[
        'product-list__item__button',
        isInCart && 'product-list__item__button--active',
      ]"
      @click="addAction"
    >
      {{ isInCart ? 'В корзине' : 'В корзину' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import ProductCard from '~/components/listing/card'

@Component({ name: 'CardDetailed' })
export default class CardDetailed extends ProductCard {}
</script>

<style lang="scss" scoped>
$dim: 140px;
.product-list__item {
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr 100px 120px 100px 75px;
  grid-gap: 15px;
  margin: 0 0 5px;
  padding: 2px 20px;
  border-radius: 5px;
  box-shadow: $shadow-main;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.2s;
  z-index: 2;
  overflow: hidden;
  &__tags {
    display: flex;
    align-items: flex-start;
    color: #fff;
  }
  &__sku,
  &__packing {
    color: $hint-color;
  }
  &__tag {
    margin-bottom: 5px;
    border-radius: 20px;
    padding: 0 7px;
    font-size: 12px;
    &:not(:last-child) {
      margin-right: 5px;
    }
    &--interactive {
      cursor: pointer;
    }
  }
  &__title {
    a {
      color: $text-color;
      text-decoration: none;
    }
    p {
      margin: 0 0 6px 0;
      font-size: 16px;
      line-height: 18px;
      font-weight: 500;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-word;
    }
  }
  &__price {
    font-size: 18px;
    line-height: 18px;
    white-space: nowrap;
    color: $text-color;
    .price-value,
    .price-currency {
      font-weight: 600;
    }
    .price-suffix {
      font-size: 12px;
    }
    &--wholesale {
      color: $hint-color;
      font-size: 18px;
    }
  }
  &__button {
    width: 100%;
    color: $main-color;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: $hover-color;
    }
    &--active {
      color: $warning-color;
    }
  }
  &__controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 15px;
    height: 100%;
  }
}
@media screen and (max-width: $sm) {
}
</style>
