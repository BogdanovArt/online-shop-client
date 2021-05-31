<template>
  <router-link class="button-fluid" :to="href">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'ButtonFluid',
  props: {
    href: { type: String, default: '#' }
  }
}
</script>

<style lang="scss">
  .button-fluid {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    line-height: 19px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    background: #3399ff;
    color: #fff;
    transition: 0.3s;
    &:hover {
      background: #2572bf;
      color: #fff;
      box-shadow: 0 2px 5px 0 rgba(30, 53, 76, 0.25);
    }
    &:focus {
      background: #205b96;
      color: #fff;
    }
  }
</style>
