<template>
  <div class="login-form">
    <iframe name="order-form" style="display: none" src="about:blank"></iframe>
    <form
      action="about:blank"
      target="order-form"
      :class="['login-form__wrapper', account && 'login-form__list']"
    >
      <drawer-heading
        :title="account ? shortName : 'Авторизация'"
        :bold="!account"
        @close="$emit('close')"
      >
        <template v-slot:icon>
          <user-icon :class="account && 'icon-active'" />
        </template>
      </drawer-heading>
      <template v-if="account">
        <menu-list :list="menuList" @logout="logout" />
      </template>
      <template v-else>
        <template v-for="input in inputs">
          <input-dispatcher
            :key="input.name"
            :item="input"
            :return-value="inputHandler"
            :set-ref="setRef"
            class="login-form__input"
          />
        </template>
        <button
          :disabled="!complete"
          class="login-form__button"
          @click="submit"
        >
          Войти
        </button>
        <div
          class="login-form__restore-link"
          @click.stop.prevent="$nuxt.$emit(events.restore)"
        >
          Забыли пароль?
        </div>
        <v-divider class="divider" />
        <p>У вас еще нет учетной записи?</p>
        <nuxt-link to="/registration">Зарегистрируйтесь сейчас!</nuxt-link>
      </template>
    </form>
  </div>
</template>
<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import FormBase from './FormBase'

import MenuList from '~/components/modals/user/MenuList.vue'

import { UserIcon } from '~/components/icons'

import { GlobalEvents, InputTypes } from '~/types/enums'
import { InputValue } from '~/types'
import { authStore } from '~/store'

enum Fields {
  phone = 'phone',
  password = 'password',
  remember = 'remember',
}

@Component({
  name: 'LoginForm',
  components: { UserIcon, MenuList },
})
export default class LoginForm extends FormBase {
  [Fields.phone]: InputValue = null;
  [Fields.password]: InputValue = null;
  [Fields.remember]: InputValue = null

  public events = GlobalEvents

  inputs = [
    {
      type: InputTypes.SIMPLE,
      name: Fields.phone,
      required: true,
      placeholder: 'Телефон',
      mask: {
        value: '+7 (###) ###-##-##',
        errorMessage: 'Некорректный телефон',
      },
      prefix: '+7 (',
    },
    {
      type: InputTypes.PASSWORD,
      name: Fields.password,
      required: true,
      placeholder: 'Пароль',
      min: {
        value: 6,
        errorMessage: 'Слишком короткий пароль',
      },
    },
    {
      type: InputTypes.CHECK_BOX,
      name: Fields.remember,
      required: false,
      label: 'Запомнить меня',
    },
  ]

  get complete() {
    return !!this[Fields.phone] && !!this[Fields.password]
  }

  get account() {
    return authStore.accountData
  }

  get shortName() {
    return authStore.shortName || 'Профиль'
  }

  get menuList() {
    return authStore.accountMenu
  }

  logout() {
    authStore.deauthorize()
  }

  async submit() {
    const pl = {
      [Fields.phone]: this[Fields.phone],
      [Fields.password]: this[Fields.password],
    }
    const res = await authStore.authorize(pl)
    if (!res.error) {
      this.$emit('close')
    } else {
      const errors = res.error?.errors
      if (errors) {
        const key = Object.keys(errors)[0]
        this.setError(key, errors[key])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 20px 0;
    max-height: 100%;
    overflow: hidden;
    > * {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
  &__list {
    padding-top: 90px;
  }
  &__button {
    color: #fff;
    padding: 5px 20px;
    background: $main-color;
    border-radius: 4px;
    font-size: 22px;
    font-weight: 500;
    width: $inputw;
    max-width: 300px;
    transition: $trns;
    text-transform: uppercase;
    &:hover {
      background: $hover-color;
    }
    &:focus {
      outline: none;
    }
    &:disabled {
      background: $hint-color;
    }
  }
  a,
  &__restore-link {
    color: $main-color;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: $hover-color;
    }
  }
  p {
    font-size: 14px;
  }
  .divider {
    align-self: stretch;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .icon-active {
    fill: $main-color;
  }
}
</style>
