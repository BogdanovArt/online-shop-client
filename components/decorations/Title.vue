<template>
  <h1 class="big-title">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
  .big-title {
    margin: 30px 0;
    font-size: 32px;
    line-height: 32px;
    font-weight: 500;
    color: #3a3f45;
    @media (max-width: 767px) {
      padding: 0 20px;
    }
  }
</style>
