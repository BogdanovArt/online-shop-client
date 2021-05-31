<template>
  <div
    :class="[
      'button-icon',
      itemCard && 'item-card-button',
      active && 'button-icon--active',
    ]"
    @click="$emit('click')"
  >
    <span class="button-icon__text">
      <slot />
    </span>

    <div class="button-icon__icon-wrap">
      <cart-add />
    </div>
  </div>
</template>

<script>
import CartAdd from '~/components/icons/CartAdd.vue'
export default {
  name: 'ButtonWithIcon',
  components: { CartAdd },
  props: {
    href: { type: String, default: '#' },
    itemCard: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
.button-icon {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
  text-decoration: none;
  background: #fff;
  color: $text-color;
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  @media (min-width: $md) {
    &:hover {
      background: $hover-color;
      color: #fff !important;
      box-shadow: 0 2px 5px 0 rgba(30, 53, 76, 0.25);
      .button-icon__text {
        border-color: $hover-color;
      }
    }
  }
  &__text {
    padding: 10px 15px;
    border: 1px solid $main-color;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    flex-grow: 1;
    @media (max-width: $md) {
      font-size: 16px;
      border-radius: 4px;
    }
  }
  &__icon-wrap {
    display: flex;
    align-items: center;
    background: $main-color;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0 12px;
    @media (max-width: $md) {
      display: none;
    }
  }
  &__icon {
    width: 16px;
    height: 16px;
    fill: #fff;
  }
  &--active {
    border-color: $active-color;
    background: $active-color;
    color: #fff !important;
    .button-icon__text {
      border-color: $active-color;
    }
    .button-icon__icon-wrap {
      background: #fa1111;
    }
    outline: none;
  }
}
.item-card-button {
  @media (max-width: $md) {
    color: black;
    box-shadow: 0 4px 0 -3px $main-color;
  }
}
</style>
