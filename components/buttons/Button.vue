<template>
  <router-link class="button" :to="href">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'Button',
  props: {
    href: { type: String, default: '#' }
  }
}
</script>

<style lang="scss">
  .button {
    display: block;
    font-size: 18px;
    line-height: 19px;
    text-align: center;
    text-decoration: none;
    padding: 11px 15px;
    color: #fff;
    border-radius: 5px;
    background: #3399ff;
    transition: 0.3s;
    &:hover {
      background: #2572bf;
      color: #fff;
    }
    &:focus {
      background: #205b96;
      color: #fff;
    }
  }
</style>
