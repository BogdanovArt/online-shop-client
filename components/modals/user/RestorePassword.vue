<template>
  <div class="restore-form">
    <iframe
      name="restore-form"
      style="display: none"
      src="about:blank"
    ></iframe>
    <form
      action="about:blank"
      target="restore-form"
      class="restore-form__wrapper"
    >
      <drawer-heading title="Забыли пароль ?" :bold="false" @close="onCLose">
        <template v-slot:icon>
          <user-icon />
        </template>
      </drawer-heading>
      <template>
        <template v-for="input in inputs">
          <input-dispatcher
            :key="input.name"
            :item="input"
            :return-value="inputHandler"
            :set-ref="setRef"
            class="restore-form__input"
          />
        </template>
        <button
          :disabled="!complete || success"
          class="restore-form__button"
          @click="submit"
        >
          Подтвердить
        </button>
      </template>
    </form>
    <template v-if="sent && success" class="restore-form__message">
      <v-divider class="divider" />
      <div class="restore-form__message">
        <div class="restore-form__success">
          Ваш новый пароль быль отправлен на указанный вами номер! <br />
          <span>это окно закроется автоматически через {{ count }} сек.</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'

import FormBase from './FormBase'

import { UserIcon } from '~/components/icons'

import { InputTypes } from '~/types/enums'
import { InputValue } from '~/types'
import { authStore } from '~/store'

enum Fields {
  phone = 'phone',
}

@Component({
  name: 'RestoreForm',
  components: { UserIcon },
})
export default class RestoreForm extends FormBase {
  [Fields.phone]: InputValue = null

  count = 5
  counter: any = null

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
  ]

  @Watch('active')
  stateWatcher(state: boolean) {
    if (!state) this.onCLose()
  }

  get complete() {
    return !!this[Fields.phone]
  }

  onCLose() {
    this.$emit('close')
    clearInterval(this.counter)
    this.sent = false
    this.success = false
    this.count = 5
    this.setError(Fields.phone, '')
  }

  startCountDown() {
    this.counter = setInterval(() => {
      if (this.count > 1) {
        this.count -= 1
      } else {
        this.onCLose()
      }
    }, 1000)
  }

  async submit() {
    const pl = {
      phone: this[Fields.phone],
    }
    const res = await authStore.restore(pl)
    this.sent = true
    if (!res.error) {
      this.success = res.data?.success
      this.startCountDown()
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
.restore-form {
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
  &__input {
    width: 280px;
    max-width: 280px;
  }
  &__button {
    color: #fff;
    padding: 5px 20px;
    background: $main-color;
    border-radius: 4px;
    font-size: 22px;
    font-weight: 500;
    width: $inputw;
    width: 280px;
    max-width: 280px;
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
  &__message {
    max-width: 320px;
    text-align: center;
    font-size: 14px;
    margin: 0 auto;
    span {
      display: block;
      color: $hint-color;
      margin-top: 10px;
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
