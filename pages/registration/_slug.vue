<template>
  <v-container class="registration-page">
    <template v-if="!$device.isMobile">
      <template v-if="pageMeta">
        <bread-crumbs
          :list="pageMeta.breadcrumbs"
          class="registration-page__breadcrumbs"
        />
        <h1 class="registration-page__title">{{ pageMeta.h1 }}</h1>
      </template>
      <template v-if="pageData">
        <div class="registration-page__form">
          <div class="registration-page__form__image">
            <img
              :src="pageData.image ? pageData.image.src : '/img/image-2.jpg'"
              :alt="
                pageData.image ? pageData.image.name : 'Изображение отсутствует'
              "
            />
          </div>

          <div class="registration-page__form__fields">
            <div class="registration-page__form__title">
              <h2>{{ pageData.title }}</h2>
              <v-btn icon @click="$router.go(-1)">
                <close-icon />
              </v-btn>
            </div>
            <form-generator
              ref="form"
              :form-data="pageData.form"
              :filled-data="values"
              :return-value="formHandler"
            />
            <div v-if="values" class="registration-page__form__hint">
              <span class="mark">*</span> - поля, обязательные к заполнению
            </div>
            <template v-if="pageData.action">
              <v-btn
                dark
                :disabled="!isValid"
                class="registration-page__form__submit"
                @click="submit"
              >
                {{ pageData.action.title }}
              </v-btn>
            </template>
            <div
              v-if="formError"
              class="registration-page__form__error"
              v-html="formError"
            />
          </div>
        </div>
      </template>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import Registration from '~/components/pages/registration/registration'

import { registrationStore } from '~/store'
import { Route } from '~/types'

@Component({
  name: 'registration-form-page',
})
export default class RegistrationFormPage extends Registration {
  beforeDestroy() {
    registrationStore.resetForm()
  }

  async asyncData({ route }: { route: Route }) {
    await registrationStore.getForm(route)
  }

  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.registration-page {
  &__form {
    display: flex;
    > * {
      width: 420px;
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__submit {
      color: #fff;
      font-size: 16px;
      text-transform: none;
      width: 100%;
      background-color: $main-color !important;
      &:disabled {
        color: $hint-color !important;
        background-color: $bg-row-color !important;
      }
    }
    &__error {
      color: $warning-color;
      a {
        color: #fff;
      }
    }
    &__fields {
      > *:not(:last-child) {
        margin-bottom: 20px;
      }
    }
    &__hint {
      span {
        color: $warning-color;
      }
    }
    &__image {
      position: relative;
      img {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__breadcrumbs {
    margin: 20px 0;
  }
  &__title {
    margin: 20px 0;
  }

  @media screen and (max-width: $md) {
    padding: 0 20px 20px;
  }
}
</style>
