<template>
  <div class="registration-block">
    <div v-if="item.image" class="registration-block__background">
      <img :src="item.image.src" :alt="item.image.name" />
    </div>
    <div class="registration-block__title">
      {{ item.title }}
    </div>
    <div class="registration-block__description">
      {{ item.description }}
    </div>
    <nuxt-link
      v-if="item.button"
      :to="item.button.link"
      class="registration-block__button"
    >
      {{ item.button.title }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { IRegistrationBlock } from '~/types/registration'

@Component
export default class RegistrationBlock extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IRegistrationBlock
}
</script>
<style lang="scss" scoped>
.registration-block {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #fff;
  background: linear-gradient(
    to bottom,
    transparent 10%,
    rgb(68, 68, 68) 55% 100%
  );
  &__title {
    margin: 150px 0 20px;
    font-weight: 500;
    font-size: 24px;
  }
  &__description {
    line-height: 20px;
    flex-grow: 1;
  }
  &__button {
    display: block;
    margin: 30px 0 20px;
    border-radius: 5px;
    font-size: 18px;
    background: $main-color;
    color: #fff;
    padding: 10px;
    text-decoration: none;
    font-weight: 500;
    text-align: center;
    transition: $trns;
    &:hover {
      color: #fff;
      background: $hover-color;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    bottom: 40%;
    left: 0;
    right: 0;
    z-index: -1;
    img {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(1);
      transition: $trns;
      z-index: 1;
    }

    &:before {
      content: '';
      position: absolute;
      background: #fff;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.25;
      transition: $trns;
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      background: $main-color;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 1;
      mix-blend-mode: multiply;
      transition: $trns;
      z-index: 3;
    }
  }
  &:hover {
    .registration-block {
      &__background {
        img {
          filter: grayscale(0);
        }

        &:before {
          opacity: 0;
        }

        &:after {
          opacity: 0;
        }
      }
    }
  }

  @media screen and (max-width: $md) {
    background: none;
    padding: 0;
    &__background {
      display: none;
    }
    &__title {
      display: none;
    }
    &__description {
      display: none;
    }
    &__button {
      margin: 0;
    }
  }
}
</style>
