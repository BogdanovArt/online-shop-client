<template>
  <div class="save-template">
    <button v-if="!isMobile" class="save-template__save">
      Сохранить шаблон:
    </button>
    <span class="save-template__name"> Полный холодильник </span>

    <icon-button class="save-template__icon-button" v-if="isMobile" red>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.5 438.5">
        <path
          d="M432.8 121c-3.8-9.1-8.4-16.4-13.7-21.7l-79.9-79.9c-5.3-5.3-12.6-9.9-21.7-13.7C308.3 1.9 300 0 292.4 0H27.4C19.8 0 13.3 2.7 8 8c-5.3 5.3-8 11.8-8 19.4v383.7c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h383.7c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4V146.2C438.5 138.6 436.6 130.2 432.8 121zM182.7 45.7c0-2.5 0.9-4.6 2.7-6.4 1.8-1.8 3.9-2.7 6.4-2.7h54.8c2.5 0 4.6 0.9 6.4 2.7 1.8 1.8 2.7 3.9 2.7 6.4v91.4c0 2.5-0.9 4.6-2.7 6.4 -1.8 1.8-3.9 2.7-6.4 2.7h-54.8c-2.5 0-4.6-0.9-6.4-2.7 -1.8-1.8-2.7-3.9-2.7-6.4V45.7zM328.9 402H109.6V292.4h219.3V402zM402 402h-36.6 0V283.2c0-7.6-2.7-14.1-8-19.4 -5.3-5.3-11.8-8-19.4-8H100.5c-7.6 0-14.1 2.7-19.4 8 -5.3 5.3-8 11.8-8 19.4v118.8H36.5V36.5h36.5v118.8c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8h164.5c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4V36.5c2.9 0 6.6 1 11.1 2.9 4.6 1.9 7.8 3.8 9.7 5.7l80.2 80.2c1.9 1.9 3.8 5.2 5.7 9.9 1.9 4.7 2.9 8.3 2.9 11V402z"
        />
      </svg>
    </icon-button>

    <icon-button class="save-template__icon-button" red>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
        <path
          d="M0 362.1V459h96.9l280.5-283 -96.9-96.9L0 362.1zM451.4 102c10.2-10.2 10.2-25.5 0-35.7L392.7 7.6c-10.2-10.2-25.5-10.2-35.7 0l-45.9 45.9 96.9 96.9L451.4 102z"
        />
      </svg>
    </icon-button>

    <icon-button class="save-template__icon-button" red>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
        <path
          d="M76.5 408c0 28.1 23 51 51 51h204c28.1 0 51-22.9 51-51V102h-306V408zM408 25.5h-89.2L293.3 0h-127.5l-25.5 25.5H51v51h357V25.5z"
        />
      </svg>
    </icon-button>

    <icon-button class="save-template__icon-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
        <path
          d="M255 0C114.8 0 0 114.8 0 255s114.8 255 255 255 255-114.7 255-255S395.3 0 255 0zM280.5 433.5h-51v-51h51V433.5zM334.1 237.2L311.1 260.1c-20.4 17.9-30.6 33.2-30.6 71.4h-51v-12.7c0-28 10.2-53.5 30.6-71.4L290.7 214.2c10.2-7.6 15.3-20.4 15.3-35.7 0-28-22.9-51-51-51s-51 23-51 51h-51c0-56.1 45.9-102 102-102 56.1 0 102 45.9 102 102C357 201.5 346.8 221.9 334.1 237.2z"
        />
      </svg>
    </icon-button>

    <router-link class="save-template__my-cart" to="/">
      <icon-button red>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <path
            d="M50 14V32a6 6 0 0 1-5.8 6L9.5 34.8a6 6 0 0 1-5.5-6V20a6 6 0 0 1 6-6H50m4-4H10A10 10 0 0 0 0 20v8.9a10 10 0 0 0 9.1 10L44 42A10 10 0 0 0 54 32V10Z"
          />
          <path
            d="M15 50a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-4a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z"
          />
          <path
            d="M49 50a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-4a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z"
          />
          <path
            d="M53.4 13.4l-2.8-2.8L60.2 1A2 2 0 0 1 63 1h0a2 2 0 0 1 0 2.8Z"
          />
        </svg>
      </icon-button>
      <span v-if="!isMobile" class="save-template__my-cart-button">
        Мои корзины
      </span>
    </router-link>
  </div>
</template>

<script>
import IconButton from '~/components/buttons/IconButton.vue'

export default {
  components: {
    IconButton,
  },
  computed: {
    isMobile() {
      return this.$store.state.core.isMobile
    },
  },
}
</script>

<style lang="scss" scoped>
.save-template {
  position: relative;
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background: #f8f9fa;
  box-shadow: 0 3px 5px 0 rgba(58, 63, 69, 0.1);
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 20px;
  }
  &__save {
    font-size: 21px;
    line-height: 21px;
    font-weight: 500;
    text-decoration: underline;
    color: #3399ff;
    &:hover {
      color: #fa1111;
    }
    &:focus {
      outline: none;
    }
  }
  &__name {
    margin: 0 50px 0 5px;
    font-size: 21px;
    line-height: 21px;
    font-weight: 500;
    @media (max-width: 767px) {
      display: block;
      flex-basis: 100%;
      max-width: 100%;
      margin: 0 0 20px;
    }
  }
  &__my-cart {
    margin-left: auto;
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  &__my-cart-button {
    margin-left: 30px;
    font-size: 18px;
    line-height: 18px;
    font-weight: 500;
    color: #3399ff;
    &:hover {
      color: #fa1111;
    }
  }
  &__icon-button {
    margin: 0 5px;
  }
}
</style>
