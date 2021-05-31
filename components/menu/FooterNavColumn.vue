<template>
  <div class="footer-nav-column">
    <h2 class="footer-nav-column__title">
      {{ column.name }}
    </h2>
    <ul class="footer-nav-column__list">
      <li v-for="(row, ind) in column.item" :key="ind" class="footer-nav-column__item">
        <a :href="row.link" class="footer-nav-column__link link-hover">
          {{ row.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterColumn',
  props: { column: { type: Array, default: () => [] } }
}
</script>

<style lang="scss" scoped>
  .footer-nav-column {
    &__title {
      padding-bottom: 16px;
      color: #3a3f45;
      font-size: 18px;
      line-height: 16px;
    }
    &__list {
      padding: 0;
      list-style: none;
      font-size: 18px;
      line-height: 16px;
    }
    &__item {
      padding-bottom: 16px;
    }
    &__link {
      color: #3a3f45;
      text-decoration: none;
    }
  }
</style>
