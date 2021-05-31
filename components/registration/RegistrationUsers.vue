<template>
  <div>
    <div v-if="showForm && !isMobile" class="registration">
      <div
        class="registration__item registration__item--fiz"
        @click="openFizForm"
      >
        <h2 class="registration__title">Аккаунт физлица</h2>

        <p class="registration__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
          dolores doloribus ducimus eveniet harum officiis quaerat sint. A amet
          cupiditate deleniti deserunt enim id iure, necessitatibus veniam
          veritatis voluptatem. At aut cupiditate distinctio doloribus esse
          excepturi explicabo fugiat ipsa minus mollitia, numquam odit quam sed
          tempora voluptatum? Incidunt, ipsam ullam?
        </p>
        <button-fluid class="registration__button">
          Зарегистрироваться как физлицо
        </button-fluid>
      </div>

      <div
        class="registration__item registration__item--store"
        @click="openStoreForm"
      >
        <h2 class="registration__title">Аккаунт магазина</h2>

        <p class="registration__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
          dolores doloribus ducimus eveniet harum officiis quaerat sint. A amet
          cupiditate deleniti deserunt enim id iure, necessitatibus veniam
          veritatis voluptatem. At aut cupiditate distinctio doloribus esse
          excepturi explicabo fugiat ipsa minus mollitia, numquam odit quam sed
          tempora voluptatum? Incidunt, ipsam ullam?
        </p>
        <button-fluid class="registration__button">
          Зарегистрироваться как торговая точка
        </button-fluid>
      </div>

      <div
        class="registration__item registration__item--prov"
        @click="openProvForm"
      >
        <h2 class="registration__title">Аккаунт поставщика</h2>

        <p class="registration__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
          dolores doloribus ducimus eveniet harum officiis quaerat sint. A amet
          cupiditate deleniti deserunt enim id iure, necessitatibus veniam
          veritatis voluptatem. At aut cupiditate distinctio doloribus esse
          excepturi explicabo fugiat ipsa minus mollitia, numquam odit quam sed
          tempora voluptatum? Incidunt, ipsam ullam?
        </p>
        <button-fluid class="registration__button">
          Зарегистрироваться как поставщик
        </button-fluid>
      </div>
    </div>

    <div v-if="isMobile" class="registration-mobile">
      <button-fluid
        class="registration-mobile__item"
        @click.native="openFizForm"
      >
        Регистрация физлица
      </button-fluid>

      <button-fluid
        class="registration-mobile__item"
        @click.native="openStoreForm"
      >
        Регистрация магазина
      </button-fluid>

      <button-fluid
        class="registration-mobile__item"
        @click.native="openProvForm"
      >
        Регистрация поставщика
      </button-fluid>
    </div>

    <div v-if="form" class="registration-block">
      <div
        v-if="!isMobile"
        class="registration-block__item registration-block__item--left"
      >
        <img
          v-if="formFiz"
          class="registration-block__img"
          src="/img/image-1.jpg"
          alt="Изображение"
        />
        <img
          v-if="formStore"
          class="registration-block__img"
          src="/img/image-2.jpg"
          alt="Изображение"
        />
        <img
          v-if="formProv"
          class="registration-block__img"
          src="/img/image-3.jpg"
          alt="Изображение"
        />
      </div>

      <div class="registration-block__item registration-block__item--right">
        <div class="registration-block__head">
          <button
            v-if="isMobile"
            class="registration-block__info"
            @click="openInfo"
          >
            <svg
              class="registration-block__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path
                d="M54,4a6,6,0,0,1,6,6V54a6,6,0,0,1-6,6H10a6,6,0,0,1-6-6V10a6,6,0,0,1,6-6H54m0-4H10A10,10,0,0,0,0,10V54A10,10,0,0,0,10,64H54A10,10,0,0,0,64,54V10A10,10,0,0,0,54,0Z"
              />
              <path
                d="M24.75,45.16h4v-17h-4V24h10.5V45h4v4l-14.5.12ZM35.25,18H28.41V12.84h6.84Z"
              />
            </svg>
          </button>

          <h2 class="registration-block__title">
            {{ title }}
          </h2>

          <button class="registration-block__close" @click="closeForm">
            <svg
              class="registration-block__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
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

        <div class="registration-block__content">
          <form-registration-fiz v-if="formFiz" />
          <form-registration-store v-if="formStore" />
          <form-registration-prov v-if="formProv" />
        </div>
      </div>
    </div>

    <info-modal v-if="info" @close="closeInfo" />
  </div>
</template>

<script>
import ButtonFluid from '~/components/buttons/ButtonFluid.vue'
import FormRegistrationFiz from '~/components/forms/FormRegistrationFiz.vue'
import FormRegistrationStore from '~/components/forms/FormRegistrationStore.vue'
import FormRegistrationProv from '~/components/forms/FormRegistrationProv.vue'
import InfoModal from '~/components/modals/InfoModal.vue'

export default {
  name: 'RegistrationUsers',
  components: {
    ButtonFluid,
    FormRegistrationFiz,
    FormRegistrationStore,
    FormRegistrationProv,
    InfoModal,
  },
  data() {
    return {
      title: '',
      img: '',
      showForm: true,
      form: false,
      formFiz: false,
      formStore: false,
      formProv: false,
      info: false,
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.core.isMobile
    },
  },
  methods: {
    openFizForm(event) {
      event.preventDefault()
      this.showForm = false
      this.form = true
      this.formFiz = true
      this.title = 'Аккаунт физлица'
    },
    openStoreForm(event) {
      event.preventDefault()
      this.showForm = false
      this.form = true
      this.formStore = true
      this.title = 'Аккаунт магазина'
    },
    openProvForm(event) {
      event.preventDefault()
      this.showForm = false
      this.form = true
      this.formProv = true
      this.title = 'Аккаунт поставщика'
    },
    closeForm() {
      this.showForm = true
      this.form = false
      this.formFiz = false
      this.formStore = false
      this.formProv = false
    },
    openInfo() {
      this.info = true
    },
    closeInfo() {
      this.info = false
    },
  },
}
</script>

<style lang="scss" scoped>
.registration {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  &__item {
    position: relative;
    flex-basis: calc((100% - 40px) / 3);
    max-width: calc((100% - 40px) / 3);
    display: flex;
    flex-direction: column;
    height: 450px;
    margin-right: 20px;
    padding: 20px;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
    }
    &--fiz {
      background: -moz-linear-gradient(
          top,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-1.jpg) center; /* FF3.6-15 */
      background: -webkit-linear-gradient(
          top,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-1.jpg) center; /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
          to bottom,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-1.jpg) center; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      background-size: cover;
      &:hover {
        background: -moz-linear-gradient(
            top,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-1.jpg) center; /* FF3.6-15 */
        background: -webkit-linear-gradient(
            top,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-1.jpg) center; /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
            to bottom,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-1.jpg) center; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        background-size: cover;
      }
    }
    &--store {
      background: -moz-linear-gradient(
          top,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-2.jpg) center; /* FF3.6-15 */
      background: -webkit-linear-gradient(
          top,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-2.jpg) center; /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
          to bottom,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-2.jpg) center; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      background-size: cover;
      &:hover {
        background: -moz-linear-gradient(
            top,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-2.jpg) center; /* FF3.6-15 */
        background: -webkit-linear-gradient(
            top,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-2.jpg) center; /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
            to bottom,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-2.jpg) center; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        background-size: cover;
      }
    }
    &--prov {
      background: -moz-linear-gradient(
          top,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-3.jpg) top; /* FF3.6-15 */
      background: -webkit-linear-gradient(
          top,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-3.jpg) top; /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(
          to bottom,
          rgba(64, 160, 255, 0.6) 0%,
          rgba(58, 63, 69, 1) 60%,
          rgba(58, 63, 69, 1) 100%
        ),
        url(/img/image-3.jpg) top; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      background-size: 100%;
      background-repeat: no-repeat;
      &:hover {
        background: -moz-linear-gradient(
            top,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-3.jpg) top; /* FF3.6-15 */
        background: -webkit-linear-gradient(
            top,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-3.jpg) top; /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
            to bottom,
            rgba(64, 160, 255, 0) 0%,
            rgba(58, 63, 69, 1) 60%,
            rgba(58, 63, 69, 1) 100%
          ),
          url(/img/image-3.jpg) top; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  &__title {
    margin-top: auto;
    margin-bottom: 30px;
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;
    color: #fff;
  }
  &__description {
    font-size: 18px;
    line-height: 18px;
    color: #fff;
    max-height: 110px;
    overflow: hidden;
  }
  &__button {
    margin: 10px 0;
    font-weight: 500;
    border-radius: 4px;
  }
}

.registration-block {
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    background: #fff;
  }
  &__item {
    flex-basis: calc(100% / 3);
    max-width: calc(100% / 3);
    @media (max-width: 1263px) {
      flex-basis: calc(100% / 2);
      max-width: calc(100% / 2);
    }
    @media (max-width: 767px) {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
  &__title {
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;
    @media (max-width: 767px) {
      font-size: 18px;
      line-height: 18px;
    }
  }
  &__head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    padding: 0 20px;
    @media (max-width: 767px) {
      padding: 15px 20px;
      box-shadow: 0px 3px 5px 0px rgba(30, 53, 76, 0.1);
    }
  }
  &__close,
  &__info {
    &:focus {
      outline: none;
    }
  }
  &__content {
    padding: 0 20px;
    @media (max-width: 767px) {
      max-height: calc(100% - 100px);
      overflow-y: auto;
    }
  }
  &__icon {
    width: 30px;
    height: 30px;
    @media (max-width: 767px) {
      width: 15px;
      height: 15px;
      fill: #3399ff;
    }
  }
}

.registration-mobile {
  padding: 0 20px;
  &__item {
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0px 2px 5px 0px rgba(28, 28, 27, 0.25);
  }
}
</style>
