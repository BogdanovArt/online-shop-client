<template>
  <div
    v-if="item"
    :class="['product-list__item', isInCart && 'product-list__item--in-cart']"
  >
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
    <div class="product-list__item__meta">
      <span class="product-list__item__sku"> Арт.: {{ item.sku }} </span>
      <span class="product-list__item__packing">
        {{ item.packing }}
      </span>
    </div>
    <div class="product-list__item__image">
      <img
        :src="getResizedLink(item.image, 120)"
        :alt="item.title"
        @click="setFocusedImage(item.image)"
      />
    </div>
    <div class="product-list__item__title">
      <nuxt-link :to="item.link || ''">
        <p :title="item.title">{{ item.title }}</p>
      </nuxt-link>
    </div>
    <div class="product-list__item__quantity">
      <quantity
        :value="ids[item.id] || quantity"
        :max="item.stock"
        :on-change="quantityChange"
      />
    </div>
    <div class="product-list__item__prices">
      <div
        v-if="item.price && item.price.main"
        class="product-list__item__price"
      >
        <span class="price-value">
          {{ item.price.main.value.toLocaleString('ru-RU') }}
        </span>
        <span class="price-currency">{{ item.price.main.currency }}</span>
        <span class="price-suffix">{{ item.price.main.suffix }}</span>
      </div>
      <div
        v-if="item.price && item.price.secondary"
        class="product-list__item__price product-list__item__price--secondary"
      >
        <span class="price-value">
          {{ item.price.secondary.value.toLocaleString('ru-RU') }}
        </span>
        <span class="price-currency">{{ item.price.secondary.currency }}</span>
        <span class="price-suffix">{{ item.price.secondary.suffix }}</span>
      </div>
    </div>
    <div class="product-list__item__button" @click="addAction">
      <i-btn item-card :active="isInCart">
        {{ isInCart ? 'В корзине' : 'В корзину' }}
      </i-btn>
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

@Component({ name: 'CardGrid' })
export default class CardGrid extends ProductCard {}
</script>

<style lang="scss" scoped>
@import '../__popup.scss';
.product-list__item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 20px 20px;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.2s;
  box-shadow: $shadow-card;
  height: 100%;
  z-index: 2;
  &--in-cart {
    background-color: rgb(255, 251, 214);
  }
  &__tags {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left: 0;
    top: 20px;
    color: #fff;
  }
  &__tag {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-bottom: 5px;
    padding: 0 7px;
    font-size: 12px;
    &--interactive {
      cursor: pointer;
    }
  }
  &__meta {
    position: absolute;
    right: 20px;
    top: 14px;
    font-size: 14px;
    font-weight: 500;
  }
  &__sku {
    display: none;
  }
  &__image {
    max-height: 120px;
    height: 120px;
    width: 100%;
    margin: 5px 0;
    cursor: pointer;
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
      margin: 12px 0;
      font-size: 17px;
      line-height: 24px;
      text-align: center;
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
  &__prices {
    margin: 10px 0;
  }
  &__price {
    text-align: center;
    font-size: 22px;
    line-height: 22px;
    color: $text-color;
    .price-value,
    .price-currency {
      font-weight: 500;
    }
    .price-suffix {
      font-size: 12px;
    }
    &--secondary {
      color: $hint-color;
      font-size: 18px;
    }
  }
  &__button {
    margin-top: auto;
  }
}
@media screen and (max-width: $sm) {
  .product-list__item {
    padding: 20px;
    display: grid;
    grid-template-areas: 'a b' 'a c' 'a d' 'a e' 'a f' 'a j';
    grid-template-columns: 50px calc(100% - 65px);
    column-gap: 15px;
    row-gap: 5px;
    box-shadow: none;
    &__tags {
      grid-area: d;
      position: relative;
      display: flex;
      flex-direction: row;
      left: auto;
      top: auto;
    }
    &__tag {
      border-radius: 4px;
      margin-right: 4px;
    }
    &__meta {
      grid-area: b;
      position: relative;
      right: auto;
      top: auto;
      color: $hint-color;
      font-size: 12px;
      line-height: 12px;
      > *:not(:last-child):after {
        content: ',';
        margin-right: 4px;
      }
    }
    &__sku {
      display: inline-block;
    }
    &__quantity {
      .quantity-controls {
        justify-content: flex-start;
      }
    }
    &__tags {
      position: relative;
    }
    &__packing {
      position: relative;
    }
    &__image {
      grid-area: a;
      margin: 0;
      img {
        height: auto;
      }
    }
    &__title {
      grid-area: c;
      p {
        display: block;
        text-align: left;
        margin: 0;
        font-weight: 500;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &__prices {
      margin: 0;
    }
    &__button {
      width: 120px;
    }
    &__price {
      text-align: left;
      font-size: 16px;
      line-height: 16px;
      font-weight: 600;
      .price-value,
      .price-suffix,
      .price-currency {
        font-weight: 600;
      }
      &--secondary {
        font-size: 14px;
        line-height: 14px;
        color: $hint-color;
      }
    }
  }
}
</style>
