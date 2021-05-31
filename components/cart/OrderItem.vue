<template>
  <div>
    <div v-if="!isMobile">
      <div
          v-for="(item, index) in list"
          :key="index"
          class="order-item"
      >
        <div class="order-item__item order-item__item--img-wrap">
          <img class="order-item__img" :src="item.image" alt="Товар">
        </div>

        <div class="order-item__item order-item__item--name">
          <div class="order-item__art">
            Арт. {{ item.art }}
          </div>
          <span class="order-item__product">
          {{ item.name }}
        </span>
        </div>

        <div class="order-item__item order-item__item--volume">
          {{ item.pack }} шт/ящик
        </div>

        <div class="order-item__item order-item__item--volume">
          {{ item.priceOne }} р/ящик
        </div>

        <div class="order-item__item order-item__item--quantity">
          <quantity :max="item.maxCount" />
        </div>

        <div class="order-item__item order-item__item--price">
          2 000 р.
        </div>

        <button class="order-item__item order-item__item--delete" @click="deleteEvent(index)">
          <svg class="order-item__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <defs>
              <style>
                .cls-1 {
                  fill: none;
                  stroke-miterlimit: 10;
                  stroke-width: 4px;
                }
              </style>
            </defs>
            <path d="M52.5,20V54a6,6,0,0,1-6,6h-29a6,6,0,0,1-6-6V20h41m4-4H7.5V54a10,10,0,0,0,10,10h29a10,10,0,0,0,10-10V16Z" />
            <path d="M46.5,4a6,6,0,0,1,5.66,4H11.84A6,6,0,0,1,17.5,4h29m0-4h-29a10,10,0,0,0-10,10v2h49V10a10,10,0,0,0-10-10Z" />
            <line class="cls-1" x1="32" y1="24" x2="32" y2="56" />
            <line class="cls-1" x1="21" y1="24" x2="21" y2="56" />
            <line class="cls-1" x1="43" y1="24" x2="43" y2="56" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else>
      <div
          v-for="(item, index) in list"
          :key="index"
          class="order-item-mobile"
      >
        <div class="order-item-mobile__img-wrap">
          <img class="order-item-mobile__img" :src="item.image" alt="Товар">
        </div>
        <div class="order-item-mobile__item">
          <div class="order-item-mobile__data order-item-mobile__data--gray">
          <span class="order-item-mobile__art">
            Арт. {{ item.art }}
          </span>

            <span class="order-item-mobile__pack">
            {{ item.pack }} шт/ящик
          </span>
          </div>
          <div class="order-item-mobile__data">
          <span class="order-item-mobile__name">
            {{ item.name }}
          </span>
          </div>
          <div class="order-item-mobile__data">
            <quantity class="order-item-mobile__quantity" :max="item.maxCount" />
            <span class="order-item-mobile__price">
            2 000 р.
          </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import Quantity from '~/components/inputs/Quantity.vue'

export default {
  name: 'OrderItem',
  components: {
    Quantity
  },
  props: {
    list: { type: Array, default: () => [] }
  },
  computed: {
    isMobile() {
      return this.$store.state.core.isMobile
    }
  },
  methods: {
    deleteEvent: function (event) {
      this.list.splice(event, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-item {
    display: flex;
    height: 80px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    color: #1e354c;
    &__img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
    &__icon {
      width: 16px;
      height: 16px;
      fill: #4da6ff;
      stroke: #4da6ff;
      &:hover {
        fill: #fa0000;
        stroke: #fa0000;
      }
    }
    &__item {
      display: flex;
      align-items: center;
      padding: 10px;
      &--img-wrap {
        flex-basis: 80px;
        max-width: 80px;
      }
      &--name {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex-basis: calc(100% - 570px);
        max-width: calc(100% - 570px);
      }
      &--price {
        flex-basis: 100px;
        max-width: 100px;
        text-align: right;
      }
      &--quantity {
        flex-basis: 110px;
        max-width: 110px;
      }
      &--delete {
        flex-basis: 36px;
        max-width: 36px;
        outline: none;
      }
      &--volume {
        flex-basis: 140px;
        max-width: 140px;
        color: #aab4bd;
        text-align: center;
      }
    }
    &__art {
      color: #aab4bd;
      margin-bottom: 3px;
      white-space: nowrap;
    }
    &__product {
      max-height: 42px;
      overflow: hidden;
    }
    &.smaller {
      height: auto;
      .order-item__item {
        padding: 5px 10px;
        &--name {
          flex-direction: row;
          align-items: center;
          flex-basis: calc(100% - 520px);
          max-width: calc(100% - 520px);
        }
      }
      .order-item__product {
        height: auto;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .order-item__art {
        margin-bottom: 0;
        margin-right: 30px;
      }
    }
  }

  .order-item-mobile {
    display: flex;
    align-items: center;
    &__img-wrap {
      flex-basis: 70px;
      max-width: 70px;
      padding: 10px;
    }
    &__item {
      flex-basis: calc(100% - 70px);
      max-width: calc(100% - 70px);
      padding: 10px;
    }
    &__img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    &__data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      font-size: 14px;
      line-height: 14px;
      white-space: nowrap;
      &--gray {
        color: #aab4bd;
      }
    }
    &__quantity {
      justify-content: flex-start;
      height: 20px;
    }
    &__name {
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      color: #1e354c;
    }
    &__price {
      font-size: 18px;
      line-height: 18px;
      font-weight: 500;
      color: #1e354c;
    }
  }
</style>
