<template>
  <div :class="['personal-block', item.errors && 'personal-block--errors']">
    <div class="personal-block__title">
      {{ item.title }}
      <template v-if="item.errors">
        <v-icon large> error </v-icon>
      </template>
      <template v-else>
        <div
          class="personal-block__action personal-block__action--label"
          @click="setView"
        >
          {{ item.button.title }}
        </div>
      </template>
    </div>
    <div v-if="item.errors" class="personal-block__errors">
      <v-icon large> error </v-icon>
      <div class="personal-block__errors__list">
        <template v-for="err in item.errors">
          <div :key="err" class="personal-block__error">{{ err }}</div>
        </template>
      </div>
    </div>
    <template v-for="el in item.inputs">
      <div :key="el.name" :class="['personal-block__item__wrapper', el.type]">
        <template v-if="el.type === 'input-image'">
          <div class="personal-block__item personal-block__item--image">
            <div class="personal-block__item__title">
              {{ el.label }}
            </div>
            <img
              v-if="el.initial"
              :src="el.initial.src"
              :alt="el.initial.name"
            />
          </div>
        </template>
        <template v-else>
          <div class="personal-block__item">
            <div class="personal-block__item__title">
              {{ el.label }}
            </div>
            <template v-if="el.initial">
              <div class="personal-block__item__content">
                {{ el.initial }}
              </div>
            </template>
            <template v-else>
              <div class="personal-block__item--empty">Не указано</div>
            </template>
          </div>
        </template>
      </div>
    </template>
    <div class="personal-block__button">
      <v-btn dark color="#39f" @click="setView">
        {{ item.button.title }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { IPersonalBlock } from '~/types/account/personal'
import { PersonalBlockViewType } from '~/types/account/personal/enums'

@Component
export default class InfoBlockEdit extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IPersonalBlock

  setView() {
    this.$emit('toggle', PersonalBlockViewType.edit)
  }
}
</script>

<style lang="scss" scoped>
.personal-block {
  box-shadow: $shadow-main;
  padding: 20px;
  border-radius: 5px;
  font-size: 18px;
  &__errors {
    color: $warning-color;
    margin-bottom: 20px;
    display: flex;
    i {
      display: none;
    }
  }
  &__title {
    position: relative;
    display: flex;
    font-weight: 600;
    font-family: $main-font;
    margin-bottom: 20px;
    i {
      margin-left: 10px;
      color: $warning-color;
    }
  }
  &__action {
    &--label {
      flex-grow: 1;
      text-align: right;
      right: 0;
      top: 0;
      color: $main-color;
      cursor: pointer;
      user-select: none;
    }
  }
  &__item {
    display: grid;
    grid-template-columns: 200px 1fr;
    &__wrapper {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    &__title {
      color: $hint-color;
    }
    &--image {
      img {
        width: 128px;
        max-width: 128px;
      }
    }
    &--empty {
      color: $warning-color;
    }
  }
  &__button {
    display: none;
    margin-top: 20px;
    user-select: none;
    .v-btn {
      text-transform: none;
      font-size: 20px;
      font-weight: 400;
    }
  }
  &--errors {
    .personal-block__button {
      display: block;
    }
  }
}

@media screen and (max-width: $md) {
  .personal-block {
    padding: 20px 0;
    box-shadow: none;
    font-size: 14px;
    &__title {
      display: none;
      i {
        display: none;
      }
    }
    &__action {
      &--label {
        display: none;
      }
    }
    &__item {
      grid-template-columns: repeat(2, 50%);
      &__content {
        word-break: break-word;
      }
      &--image {
        img {
          width: 100px;
          max-width: 100px;
        }
      }
    }
    &__errors {
      i {
        display: block;
        color: $warning-color;
        margin: 1px 10px 0 0;
      }
    }
    &__error {
      line-height: 18px;
    }
    &__button {
      display: block;
      .v-btn {
        width: 100%;
        text-transform: none;
        font-size: 16px;
        letter-spacing: 0ch;
        font-weight: 400;
      }
    }
    .input-text-field > * {
      grid-template-columns: 100%;
      grid-gap: 8px;
      line-height: 18px;
    }
  }
}
</style>
