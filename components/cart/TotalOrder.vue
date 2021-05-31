<template>
  <div>
    <div v-if="!isMobile" class="total-order">
      <span class="total-order__price">
        <span class="total-order__price--bold">
          14 000 руб.
        </span>
        за
        <span class="total-order__price--bold">
          7 товаров
        </span>
        из
        <span class="total-order__price--bold">
          2 магазинов
        </span>
      </span>

      <button-vue class="total-order__button">
        Оформить все заказы
      </button-vue>

    </div>

    <div v-if="isMobile" class="total-order-mobile">
      <p class="total-order-mobile__info">
        <span class="total-order-mobile__info--bold">
          12 000
        </span>
        руб.
      </p>

      <p class="total-order-mobile__info">
        <span class="total-order-mobile__info--bold">
          7
        </span>
        товаров
      </p>

      <p class="total-order-mobile__info">
        Поставщик:
      </p>

      <select-input :listing="listing" />

      <button-vue class="total-order-mobile__button">
        Оформить весь заказ
      </button-vue>
    </div>
  </div>
</template>

<script>
import ButtonVue from '~/components/buttons/Button.vue'
import SelectInput from '~/components/inputs/SelectInput.vue'

export default {
  components: {
    ButtonVue,
    SelectInput
  },
  props: {
    listing: { type: Array, default: () => [] }
  },
  computed: {
    isMobile() {
      return this.$store.state.core.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>
  .total-order {
    display: flex;
    align-items: center;
    padding: 30px 20px;
    background: #ebedef;
    border-radius: 4px;
    &__price {
      font-size: 21px;
      line-height: 21px;
      color: #3a3f45;
      &--bold {
        font-weight: 700;
      }
    }
    &__button {
      margin-left: auto;
      font-size: 14px;
      line-height: 14px;
      font-weight: 500;
    }
  }

  .total-order-mobile {
    padding: 20px;
    background: #fff;
    box-shadow: 0px -3px 5px 0px rgba(30, 53, 76, 0.1);
    &__info {
      margin-bottom: 5px;
      font-size: 18px;
      line-height: 18px;
      &--bold {
        font-weight: bold;
      }
    }
    &__button {
      margin-top: 10px;
    }
  }
</style>
