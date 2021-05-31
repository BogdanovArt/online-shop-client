<template>
  <div v-if="item" class="product-list__item">
    <div class="product-list__item__image">
      <img
        :src="item.image ? item.image.src : '/img/placeholder.png'"
        :alt="item.title"
      />
    </div>
    <div class="product-list__item__title">
      <div class="product-list__item__subtitle">
        <div v-show="item.sku" class="product-list__item__sku">
          Арт №: {{ item.sku }}
        </div>
        <div v-show="item.packing" class="product-list__item__sku">
          {{ item.packing }}
        </div>
      </div>
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
    <div class="product-list__item-quantity">
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
    <template v-if="$listeners.add && $listeners.remove">
      <div
        :class="[
          'product-list__item__button',
          isInCart && 'product-list__item__button--active',
        ]"
        :title="isInCart ? 'Удалить товар' : 'Добавить в корзину'"
        @click="addAction"
      >
        <cart-add v-show="!isInCart" />
        <remove-icon v-show="isInCart" />
      </div>
    </template>
    <template v-else-if="$listeners.remove">
      <div
        :class="['product-list__item__button']"
        title="Удалить товар"
        @click="$emit('remove', item)"
      >
        <remove-icon />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import ProductCard from '~/components/listing/card'

@Component({ name: 'CardMicro' })
export default class CardMicro extends ProductCard {}
</script>

<style lang="scss" scoped>
.product-list__item {
  position: relative;
  display: grid;
  grid-template-columns: 60px 1fr 18% 15% 5%;
  grid-gap: 20px;
  margin: 10px 0;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.2s;
  z-index: 2;
  &__subtitle {
    display: flex;
    > *:not(:last-child):after {
      content: ',';
      margin-right: 5px;
    }
  }
  &__sku {
    font-size: 12px;
    color: $hint-color;
  }
  &__tags {
    display: flex;
    color: #fff;
  }
  &__tag {
    border-radius: 20px;
    margin-bottom: 5px;
    padding: 0 7px;
    font-size: 12px;
    &:not(:last-child) {
      margin-right: 5px;
    }
    &--interactive {
      cursor: pointer;
    }
  }
  &__image {
    width: 100%;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
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
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-word;
      @media (max-width: 661px) {
        font-size: 14px;
      }
    }
  }
  &__button {
    display: flex;
    justify-content: center;
    color: $main-color;
    cursor: pointer;
    svg {
      width: 20px;
      fill: currentColor;
    }
    &:hover {
      color: $hover-color;
    }
    &--active {
      color: $warning-color !important;
    }
  }
  &__price {
    text-align: right;
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
}
@media screen and (max-width: $sm) {
  .product-list__item {
    $cell: calc((100% - 20px) / 3);
    grid-template-areas: 'a b b b' 'a e f g';
    grid-template-columns: 50px 90px $cell 25px;
    grid-gap: 0;
    column-gap: 10px;
    &__title {
      grid-area: b;
    }
    &__tags {
      display: none;
    }
    &__image {
      grid-area: a;
    }
    &__price {
      font-size: 16px;
    }
  }
}
</style>
