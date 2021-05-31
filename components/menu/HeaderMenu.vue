<template>
  <ul class="header-menu">
    <DropDownList v-for="(el, index) in items" :key="index" :item="el" />
  </ul>
</template>

<script lang="ts">
import DropDownList from '~/components/menu/DropDownList.vue'

export default {
  name: 'HeaderMenu',
  components: {
    DropDownList,
  },
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  padding: 0 0 3px;
  font-size: 18px;
  color: #fff;
}
</style>
