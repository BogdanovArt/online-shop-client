<template>
  <v-container>
    <div class="error-page__wrapper">
      <ErrorMessage>
        <div class="error-page">
          <div class="error-page__message error-page__text">
            Страница находится в разработке
          </div>
          <div class="error-page__animation">
            <div class="error-page__cog error-page__cog--big">
              <cog-big-icon />
            </div>
            <div class="error-page__cog error-page__cog--small">
              <cog-icon />
            </div>
          </div>
          <div class="error-page__actions error-page__text">
            Вы можете вернуться
            <span class="error-page__link" @click="back">назад</span>
            или на
            <nuxt-link to="/">главную страницу</nuxt-link>
          </div>
        </div>
      </ErrorMessage>
    </div>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import ErrorMessage from '~/components/pages/Error.vue'
import { CogIcon, CogBigIcon } from '~/components/icons'

import { IBasicObject } from '~/types'

@Component({ components: { CogIcon, CogBigIcon, ErrorMessage } })
export default class ErrorPage extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly error!: IBasicObject

  back() {
    this.$router.go(-1)
  }
}
</script>
<style lang="scss" scoped>
.error-page {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__text {
    font-size: 20px;
    color: $hint-color;
  }
  &__wrapper {
    padding: 20px 0;
    height: 60vh;
  }
  &__animation {
    position: relative;
    height: 200px;
    margin: 40px 0;
  }
  &__link {
    color: $main-color;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: $hover-color;
    }
  }
  &__cog {
    position: absolute;
    &--big {
      left: -150px;
      transform: rotate(15deg);
      svg {
        display: block;
        width: 150px;
        fill: $hint-color;
        animation: rotate 20s infinite linear;
      }
    }
    &--small {
      left: -20px;
      top: 50px;
      transform: rotate(20deg);
      svg {
        display: block;
        width: 120px;
        stroke: $main-color;
        stroke-width: 5;
        fill: $main-color;
        animation: rotate 16s infinite linear reverse;
      }
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}

@media screen and (max-width: $md) {
  .error-page {
    text-align: center;
    &__text {
      font-size: 16px;
    }
    &__animation {
      transform: scale(0.6) translateY(-25px);
    }
  }
}
</style>
