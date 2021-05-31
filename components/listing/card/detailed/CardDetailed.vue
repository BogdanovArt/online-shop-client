<template>
  <div v-if="item" class="product-list__item">
    <div class="product-list__item__image">
      <img
        :src="getResizedLink(item.image, 180)"
        :alt="item.title"
        @click="setFocusedImage(item.image)"
      />
    </div>
    <div class="product-list__item__title">
      <div v-show="item.sku" class="product-list__item__sku">
        Арт.: {{ item.sku }}
      </div>
      <a :href="item.link">
        <p :title="item.title" class="product-list__item__title--name">
          {{ item.title }}
        </p>
      </a>
      <p
        v-show="item.description"
        class="product-list__item__title--description"
      >
        {{ item.description }}
      </p>

      <div v-show="item.packing" class="product-list__item__packing">
        {{ item.packing }}
      </div>
    </div>

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

    <div class="product-list__item__controls">
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

      <div class="product-list__item__quantity">
        <quantity
          :value="givenQuantity"
          :max="item.stock"
          :on-change="quantityChange"
        />
      </div>

      <div class="product-list__item__button" @click="addAction">
        <i-btn item-card :active="isInCart">
          {{ isInCart ? 'В корзине' : 'В корзину' }}
        </i-btn>
      </div>
    </div>

    <v-dialog v-model="showPopUp">
      <template v-if="focusedImage">
        <div
          class="product-list__item__image-popup__close-button"
          @click="showPopUp = false"
        >
          <CloseIcon />
        </div>
        <div class="product-list__item__image-popup">
          <img :src="focusedImage" :alt="item.title" />
        </div>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import ProductCard from '~/components/listing/card'

import Resizer from '~/utils/resizer'

@Component({ name: 'CardDetailed' })
export default class CardDetailed extends ProductCard {
  resizedLink(link: string) {
    return Resizer({ link, size: 140 })
  }
}
</script>

<style lang="scss" scoped>
@import '../__popup.scss';

$dim: 140px;
.product-list__item {
  position: relative;
  display: grid;
  grid-template-columns: $dim 1fr 160px;
  grid-gap: 20px;
  margin: 0 0 15px;
  padding: 20px;
  max-height: 180px;
  height: 180px;
  border-radius: 5px;
  box-shadow: $shadow-main;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.2s;
  z-index: 2;
  overflow: hidden;
  &__sku {
    font-size: 14px;
    color: $hint-color;
  }
  &__tags {
    position: absolute;
    left: 0;
    top: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
  }
  &__tag {
    margin-bottom: 5px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
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
    height: $dim;
    width: $dim;
    cursor: pointer;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  &__title {
    height: 100%;
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
      -webkit-line-clamp: 3;
      overflow: hidden;
      word-break: break-word;
    }
    &--name {
      -webkit-line-clamp: 1;
    }
    &--description {
      font-weight: 400 !important;
      // color: $hint-color;
    }
  }
  &__prices {
    margin-bottom: auto;
  }
  &__price {
    font-size: 26px;
    line-height: 18px;
    white-space: nowrap;
    color: $text-color;
    .price-value,
    .price-currency {
      font-weight: 500;
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
