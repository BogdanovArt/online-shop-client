<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="order-list"
    >
      <div v-if="!isMobile" class="order-list__header">
        <div class="order-list__name">
          <span class="order-list__name-store">
            {{ item.name }}
          </span>

          <span class="order-list__rating">
            {{ item.rating }}
          </span>
        </div>
        <router-link :to="item.link" class="order-list__link">
          Страница магазина
        </router-link>
      </div>
      <div class="order-list__item">
        <div  class="order-list__products">
          <order-section :sections="item.section" />
        </div>

        <div v-if="!isMobile" class="order-list__submit">
          <p class="order-list__text">
            + доставка 500 руб.
          </p>
          <p class="order-list__text">
            до 15 апреля
          </p>

          <p class="order-list__text order-list__text--margin">
            Доступен самовывоз
          </p>

          <p class="order-list__text">
            ИТОГО
          </p>

          <p class="order-list__text order-list__text--bold">
            10 000 руб.
          </p>

          <button-ghost class="order-list__button">
            Оформить заказ
          </button-ghost>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSection from '~/components/cart/OrderSection.vue'
import ButtonGhost from '~/components/buttons/ButtonGhost.vue'

export default {
  name: 'OrderList',
  components: {
    OrderSection,
    ButtonGhost
  },
  props: {
    listing: { type: Array, default: () => [] }
  },
  computed: {
    isMobile() {
      return this.$store.state.core.isMobile
    },
    items() {
      return this.listing.filter(el => el.section.length > 0)
    }
  }
}

</script>

<style lang="scss" scoped>
  .order-list {
    &__header {
      padding: 25px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      line-height: 18px;
      font-weight: 500;
      box-shadow: 0px 3px 5px 0px rgba(58, 63, 69, 0.1);
      background: #f8f9fa;
    }
    &__name {
      display: flex;
      align-items: center;
    }
    &__link {
      text-decoration: none;
      color: #3399ff;
      &:hover {
        color: #fa1111;
      }
    }
    &__rating {
      margin-left: 10px;
      padding: 3px 5px;
      font-size: 12px;
      line-height: 12px;
      color: #fff;
      background: #fa0000;
      border-radius: 4px;
    }
    &__item {
      display: flex;
      box-shadow: 0px 2px 5px 0px rgba(30, 53, 76, 0.1);
      margin-bottom: 20px;
      @media (max-width: 1263px) {
        flex-wrap: wrap;
      }
      @media (max-width: 767px) {
        box-shadow: none;
        margin-bottom: 0;
      }
    }
    &__products {
      flex-basis: calc(100% - 240px);
      max-width: calc(100% - 240px);
      @media (max-width: 1263px) {
        flex-basis: 100%;
        max-width: 100%;
      }
    }
    &__submit {
      flex-basis: 240px;
      max-width: 240px;
      padding: 10px;
      @media (max-width: 1263px) {
        flex-basis: 100%;
        max-width: 100%;
      }
    }
    &__text {
      margin: 0;
      font-size: 14px;
      &--margin {
        margin: 25px 0 40px;
      }
      &--bold {
        font-size: 18px;
        font-weight: 500;
      }
    }
    &__button {
      margin-top: 20px;
    }
  }
</style>
