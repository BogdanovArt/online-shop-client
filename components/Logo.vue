<template>
  <div class="logo">
    <router-link :to="link" class="logo__link">
      <img :src="image.src" :alt="image.name" class="logo__img" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    image: { type: Object, default: () => ({}) },
    link: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
.logo {
  &__img {
    max-width: 200px;
    display: block;
    @media (max-width: 543px) {
      max-width: 170px;
    }
  }
}
</style>
