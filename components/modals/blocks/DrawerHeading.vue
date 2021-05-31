<template>
  <div class="drawer-heading">
    <div
      :class="[
        'drawer-heading__icon',
        !$slots.icon && 'drawer-heading__icon--hidden',
      ]"
      @click="$emit('icon')"
    >
      <slot name="icon"></slot>
    </div>
    <div
      :class="[
        'drawer-heading__title',
        bold && 'drawer-heading__title--bold',
        centered && 'drawer-heading__title--centered',
      ]"
    >
      {{ title }}
    </div>
    <v-btn
      icon
      :class="[
        'drawer-heading__button',
        $listeners.close && 'drawer-heading__button--visible',
      ]"
      @click="$emit('close')"
    >
      <v-icon size="30">mdi-close</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DrawerHeading extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ type: Boolean, default: true })
  readonly bold!: boolean

  @Prop({ type: Boolean, default: false })
  readonly centered!: boolean
}
</script>
<style lang="scss" scoped>
.drawer-heading {
  position: fixed;
  height: 70px;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: $bg-color;
  box-shadow: $shadow-main;
  z-index: 20;
  > *:not(:last-child) {
    margin-right: 10px;
  }

  &__icon {
    display: flex;
    align-items: center;
    svg {
      width: 35px;
    }
    &--hidden {
      display: none;
    }
  }
  &__title {
    flex-grow: 1;
    font-size: 20px;
    &--bold {
      font-weight: 600;
    }
    &--centered {
      text-align: center;
    }
  }
  &__button {
    color: $main-color !important;
    pointer-events: none;
    visibility: hidden;
    &--visible {
      pointer-events: all;
      visibility: visible;
    }
  }
}
</style>
