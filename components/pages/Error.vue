<template>
  <div :class="errorData ? '' : 'error-page'">
    <template v-if="errorData">
      <v-container v-show="errorData">
        <div class="error-message">
          <div v-if="errorData" class="error-message__text">
            <div class="error-message__status">{{ errorData.status }}</div>
            <div class="error-message__message">
              <span class="error-message__label flex">Сообщение: </span>
              <span class="error-message__value flex">{{
                errorData.message
              }}</span>
            </div>
            <div class="error-message__route">
              <span class="error-message__label flex">Адрес запроса: </span>
              <span class="error-message__value flex">{{
                errorData.route
              }}</span>
            </div>
          </div>
        </div>
      </v-container>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { coreStore } from '~/store'

@Component
export default class ErrorMessage extends Vue {
  get errorData() {
    return coreStore.errorData
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  padding: 20px;
  box-shadow: $shadow-main;
  max-width: 500px;
  margin: 20px 0;
  overflow: hidden;
  &__text {
    > * {
      display: grid;
      grid-template-columns: 140px 1fr;
    }
  }
  &__status {
    margin: 0 0 10px 0;
    grid-template-columns: 100%;
    font-size: 80px;
    line-height: 80px;
    font-weight: 600;
    color: transparent;
    background-color: $hint-color;
    background-clip: text;
    text-shadow: rgb(245 245 245 / 50%) 1px 1px 1px;
  }
  &__message {
    color: $warning-color;
  }
  &__route {
    color: $hint-color;
    font-size: 12px;
  }
  &__label {
    font-size: 12px;
    color: $text-color;
    margin-right: 5px;
  }
}
</style>
