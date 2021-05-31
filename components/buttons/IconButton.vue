<template>
  <button
    class="icon-button"
    :class="{ red_icon: red }"
    :title="title"
    @click="$emit('click')"
  >
    <slot />
    <span v-if="quantity" class="icon-button__quantity">{{ quantity }}</span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'IconButton',
  props: {
    quantity: { type: Number, default: 0 },
    red: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
.icon-button {
  position: relative;
  font-size: 18px;
  line-height: 19px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    svg {
      fill: $warning-color;
    }
  }
  svg {
    width: 30px;
    height: 30px;
    fill: #3399ff;
  }
  &__quantity {
    position: absolute;
    bottom: 0;
    right: -7px;
    padding: 0 5px;
    background: #fa0000;
    font-size: 12px;
    line-height: 18px;
    border-radius: 10px;
  }
  &--hide {
    @media (max-width: 767px) {
      display: none;
    }
  }
  &.red_icon {
    svg {
      fill: $warning-color;
    }
  }
}
</style>
