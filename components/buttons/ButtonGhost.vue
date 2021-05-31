<template>
  <a class="button-ghost" :href="href">
    <slot />
  </a>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ButtonGhost',
  props: {
    href: { type: String, default: '#' }
  }
})
</script>

<style lang="scss">
  .button-ghost {
    display: block;
    padding: 10px 15px;
    font-size: 18px;
    line-height: 19px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    background: #fff;
    color: #3399ff;
    border-radius: 4px;
    border: 2px solid #3399ff;
    transition: 0.3s;
    &:hover {
      border-color: #2572bf;
      background: #2572bf;
      color: #fff;
    }
    &:focus {
      border-color: #205b96;
      background: #205b96;
      color: #fff;
    }
  }
</style>
