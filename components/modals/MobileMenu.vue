<template>
  <transition name="slide-fade">
    <div class="mobile-menu">
      <div class="mobile-menu__title">
        <h2 class="mobile-menu__user-name">
          Константин К.
        </h2>
        <button class="mobile-menu__close" @click="close">
          <svg class="mobile-menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <rect
              x="-6.2"
              y="30"
              width="76.4"
              height="4"
              rx="2"
              ry="2"
              transform="translate(-13.25 32)rotate(-45)"
            />
            <rect
              x="30"
              y="-6.2"
              width="4"
              height="76.4"
              rx="2"
              ry="2"
              transform="translate(-13.25 32)rotate(-45)"
            />
          </svg>
        </button>
      </div>

      <div class="mobile-menu__content">
        <div class="mobile-menu__catalog catalog-buttons">
          <router-link to="/catalog/" tag="button" class="catalog-buttons__item">
            <svg
              class="catalog-buttons__icon mobile-menu-icon mobile-menu-icon--white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M22 5h40c1.1 0 2 0.9 2 2l0 0c0 1.1-0.9 2-2 2H22c-1.1 0-2-0.9-2-2l0 0C20 5.9 20.9 5 22 5z" />
              <path d="M22 55h40c1.1 0 2 0.9 2 2l0 0c0 1.1-0.9 2-2 2H22c-1.1 0-2-0.9-2-2l0 0C20 55.9 20.9 55 22 55z" />
              <path d="M22 30h40c1.1 0 2 0.9 2 2l0 0c0 1.1-0.9 2-2 2H22c-1.1 0-2-0.9-2-2l0 0C20 30.9 20.9 30 22 30z" />
              <path d="M8.8 4.2L8.8 4.2c1.6 1.6 1.6 4.1 0 5.7l0 0c-1.6 1.6-4.1 1.6-5.7 0l0 0c-1.6-1.6-1.6-4.1 0-5.7l0 0C4.7 2.6 7.3 2.6 8.8 4.2z" />
              <path d="M8.8 29.2L8.8 29.2c1.6 1.6 1.6 4.1 0 5.7l0 0c-1.6 1.6-4.1 1.6-5.7 0l0 0c-1.6-1.6-1.6-4.1 0-5.7l0 0C4.7 27.6 7.3 27.6 8.8 29.2z" />
              <path d="M8.8 54.2L8.8 54.2c1.6 1.6 1.6 4.1 0 5.7l0 0c-1.6 1.6-4.1 1.6-5.7 0l0 0c-1.6-1.6-1.6-4.1 0-5.7l0 0C4.7 52.6 7.3 52.6 8.8 54.2z" />
            </svg>

            <span class="catalog-buttons__text">
              Каталог товаров
            </span>
          </router-link>

          <router-link to="/catalog/" tag="button" class="catalog-buttons__item">
            <svg
              class="catalog-buttons__icon mobile-menu-icon mobile-menu-icon--white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M62.28,22.34a10,10,0,0,0-9.49-6.84H40v-8H0v40H5a9,9,0,0,0,18,0H41a9,9,0,0,0,18,0h5v-20ZM14,52.5a5,5,0,0,1-3-9,5,5,0,0,1,6,0,5,5,0,0,1-3,9Zm22-9H22.06a9,9,0,0,0-16.12,0H4v-32H36Zm14,9a5,5,0,0,1-3-9,5,5,0,0,1,6,0,5,5,0,0,1-3,9Zm10-9H58.06a9,9,0,0,0-16.12,0H40v-24H52.79a6,6,0,0,1,5.69,4.1L60,28.15Z" />
            </svg>

            <span class="catalog-buttons__text">
              Каталог поставщиков
            </span>
          </router-link>
        </div>

        <ul class="mobile-menu__section menu-section">
          <mobile-menu-list>
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M50,14V32a6,6,0,0,1-5.84,6L9.46,34.84a6,6,0,0,1-5.46-6V20a6,6,0,0,1,6-6H50m4-4H10A10,10,0,0,0,0,20v8.87a10,10,0,0,0,9.09,10L44,42A10,10,0,0,0,54,32V10Z" />
              <path d="M15,50a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-4a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" />
              <path d="M49,50a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-4a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" />
              <path d="M53.41,13.41l-2.82-2.82L60.17,1A2,2,0,0,1,63,1h0a2,2,0,0,1,0,2.83Z" />
            </svg>

            <span slot="name">
              Корзина
            </span>
          </mobile-menu-list>

          <mobile-menu-list>
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M47,9A13,13,0,0,1,60,21.38v.22l0,.21A1.09,1.09,0,0,1,60,22C60,33.94,41.34,48.34,32,54.33c-8.19-5-24.54-17.19-27.53-29-.07-.28-.14-.56-.2-.87,0-.12,0-.25-.07-.38l0-.23A13.3,13.3,0,0,1,4,22c0-.21,0-.41,0-.62a13,13,0,0,1,16.16-12,11.92,11.92,0,0,1,3.48,1.44,13.38,13.38,0,0,1,4.81,5.06l1.76,3.33a2,2,0,0,0,3.54,0l1.76-3.33a13.13,13.13,0,0,1,2.24-3A12.93,12.93,0,0,1,47,9m0-4a17,17,0,0,0-15,9A17,17,0,0,0,0,21.2c0,.27,0,.53,0,.8a18.18,18.18,0,0,0,.17,2.47c0,.29.09.58.15.86s.15.68.24,1C4.94,43.66,32,59,32,59S64,40,64,22a5.29,5.29,0,0,0-.06-.8A17,17,0,0,0,47,5Z" />
              <path d="M0,17a17.41,17.41,0,0,0,.32,3.33A17.11,17.11,0,0,1,0,17,5.29,5.29,0,0,1,0,16.2C0,16.47,0,16.73,0,17Z" />
            </svg>

            <span slot="name">
              Отложенные
            </span>
          </mobile-menu-list>

          <mobile-menu-list>
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M32,16.15a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-4a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" />
              <path d="M32,4A17,17,0,0,1,49,21c0,5.12-2.81,15.22-6.69,24C36.91,57.28,32.8,60,32,60s-4.91-2.72-10.31-15C17.81,36.22,15,26.12,15,21A17,17,0,0,1,32,4m0-4A21,21,0,0,0,11,21c0,11.6,12,43,21,43S53,32.6,53,21A21,21,0,0,0,32,0Z" />
            </svg>

            <span slot="name">
              Железногорск
            </span>
          </mobile-menu-list>
        </ul>

        <ul class="mobile-menu__section menu-section">
          <mobile-menu-list @click.native="openCabinet">
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M32,44c13.52,0,24.84,6.88,27.44,16H4.56C7.16,50.88,18.48,44,32,44m0-4C14.33,40,0,50.75,0,64H64c0-13.25-14.33-24-32-24Z" />
              <path d="M32,4A12,12,0,1,1,20,16,12,12,0,0,1,32,4m0-4A16,16,0,1,0,48,16,16,16,0,0,0,32,0Z" />
            </svg>
            <span slot="name">
              Личный кабинет
            </span>
          </mobile-menu-list>
        </ul>

        <ul class="mobile-menu__section menu-section">
          <mobile-menu-list @click.native="openInfo">
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M54,4a6,6,0,0,1,6,6V54a6,6,0,0,1-6,6H10a6,6,0,0,1-6-6V10a6,6,0,0,1,6-6H54m0-4H10A10,10,0,0,0,0,10V54A10,10,0,0,0,10,64H54A10,10,0,0,0,64,54V10A10,10,0,0,0,54,0Z" />
              <path d="M24.75,45.16h4v-17h-4V24h10.5V45h4v4l-14.5.12ZM35.25,18H28.41V12.84h6.84Z" />
            </svg>
            <span slot="name">
              Информация
            </span>
          </mobile-menu-list>

          <mobile-menu-list>
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M457.2 364.8c6.2-9.4 9.8-20.7 9.8-32.8 0-33.1-26.9-60-60-60 -5.5 0-10.9 0.8-16 2.2v-34.7c34.2-7 60-37.3 60-73.5v-61c0-41.4-33.6-75-75-75h-60C302.3 11.8 280.5 0 256 0H136C94.6 0 61 33.6 61 75v91c0 36.2 25.8 66.5 60 73.5v34.7c-5.1-1.4-10.5-2.2-16-2.2 -33.1 0-60 26.9-60 60 0 12.1 3.6 23.4 9.8 32.8C23.2 373.6 0 402.6 0 437v60c0 8.3 6.7 15 15 15h180c8.3 0 15-6.7 15-15v-60c0-34.4-23.2-63.4-54.8-72.2 6.2-9.4 9.8-20.7 9.8-32.8 0-15-5.5-28.7-14.6-39.2L202.2 241H256h53.8l51.8 51.8C352.5 303.3 347 317 347 332c0 12.1 3.6 23.4 9.8 32.8C325.2 373.6 302 402.6 302 437v60c0 8.3 6.7 15 15 15h180c8.3 0 15-6.7 15-15v-60C512 402.6 488.8 373.6 457.2 364.8zM105 302c16.5 0 30 13.5 30 30s-13.5 30-30 30 -30-13.5-30-30S88.5 302 105 302zM180 437v45H30v-45c0-24.8 20.2-45 45-45h60C159.8 392 180 412.2 180 437zM301 166c0 24.8-20.2 45-45 45h-60c-4 0-7.8 1.6-10.6 4.4L151 249.8V226c0-8.3-6.7-15-15-15 -24.8 0-45-20.2-45-45V75c0-24.8 20.2-45 45-45h120c24.8 0 45 20.2 45 45V166zM407 302c16.5 0 30 13.5 30 30s-13.5 30-30 30 -30-13.5-30-30S390.5 302 407 302zM361 226v23.8l-34.4-34.4C323.8 212.6 320 211 316 211h0C325.4 198.5 331 182.9 331 166V75c0-5.1-0.5-10.2-1.5-15H376c24.8 0 45 20.2 45 45v61c0 24.8-20.2 45-45 45C367.7 211 361 217.7 361 226zM482 482H332v-45c0-24.8 20.2-45 45-45h60c24.8 0 45 20.2 45 45V482z" />
              <path d="M251.6 64.4c-5.9-5.9-15.4-5.9-21.2 0L181 113.8l-19.4-19.4c-5.9-5.9-15.4-5.9-21.2 0 -5.9 5.9-5.9 15.4 0 21.2l30 30c5.9 5.9 15.4 5.9 21.2 0l60-60C257.5 79.7 257.5 70.3 251.6 64.4z" />
            </svg>

            <span slot="name">
              Поддержка
            </span>
          </mobile-menu-list>
        </ul>

        <ul class="mobile-menu__section menu-section">
          <mobile-menu-list>
            <svg
              slot="icon"
              class="mobile-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >

              <path d="M30.9 60.3H14.2A8.2 8.2 0 0 1 6 52.1V11.9a8.2 8.2 0 0 1 8.2-8.2h17A1.8 1.8 0 0 0 33 1.8 1.8 1.8 0 0 0 31.2 0h-17A11.9 11.9 0 0 0 2.3 11.9V52.1A11.9 11.9 0 0 0 14.2 64h16.7a1.8 1.8 0 0 0 0-3.7Z" />
              <path d="M61.1 30.7 49.5 19.1a1.8 1.8 0 1 0-2.6 2.6l8.5 8.5H18.2a1.8 1.8 0 0 0 0 3.7H55.4l-8.5 8.5a1.8 1.8 0 0 0 1.3 3.1A1.8 1.8 0 0 0 49.5 45L61.1 33.3A1.8 1.8 0 0 0 61.1 30.7Z" />
            </svg>

            <span slot="name">
              Выйти
            </span>
          </mobile-menu-list>
        </ul>
      </div>
      <modal-submenu v-if="opened && cabinet" cabinet @close="closeSub" />

      <modal-submenu v-if="opened && inform" inform @close="closeSub" />
    </div>
  </transition>
</template>

<script>
import MobileMenuList from '~/components/menu/MobileMenuList.vue'
import ModalSubmenu from '~/components/menu/ModalSubmenu.vue'

export default {
  name: 'MobileMenu',
  components: {
    MobileMenuList,
    ModalSubmenu
  },
  data() {
    return {
      opened: false,
      cabinet: false,
      inform: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    openCabinet(event) {
      event.preventDefault()
      this.opened = true
      this.cabinet = true
    },
    openInfo(event) {
      event.preventDefault()
      this.opened = true
      this.inform = true
    },
    closeSub() {
      this.opened = false
      this.cabinet = false
      this.inform = false
    }
  }
}
</script>

<style lang="scss" scoped>

  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateX(-1000px);
    opacity: 0;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 100;
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      box-shadow: 0px 3px 5px 0px rgba(30, 53, 76, 0.1);
    }
    &__content {
      padding: 20px;
      overflow-y: auto;
      max-height: calc(100% - 58px);
    }
    &__user-name {
      font-size: 18px;
      line-height: 18px;
      font-weight: 400;
      color: #3a3f45;
    }
    &__close {
      display: flex;
      align-items: center;
      &:focus {
        outline: none;
      }
    }
  }

  .catalog-buttons {
    display: flex;
    justify-content: space-between;
    &__item {
      flex-basis: calc((100% - 20px) / 2);
      max-width: calc((100% - 20px) / 2);
      padding: 20px 15px;
      background: #3399ff;
      font-size: 16px;
      line-height: 16px;
      font-weight: 700;
      color: #fff;
      border-radius: 4px;
      box-shadow: 0px 2px 5px 0px rgba(28, 28, 27, 0.25);
      &:focus {
        outline: none;
      }
    }
    &__icon {
      margin-bottom: 10px;
    }
    &__text {
      display: block;
    }
  }

  .menu-section {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #dde1e4;
    &:last-of-type {
      border: none;
    }
  }

  .mobile-menu-icon {
    width: 15px;
    height: 15px;
    fill: #3399ff;
    &--white {
      fill: #fff;
    }
  }
</style>
