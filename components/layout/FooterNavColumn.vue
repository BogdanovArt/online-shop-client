<template>
  <div v-if="column" class="footer-nav-column">
    <h2 class="footer-nav-column__title">
      {{ column.title }}
    </h2>
    <ul class="footer-nav-column__list">
      <li
        v-for="(row, ind) in column.items"
        :key="ind"
        class="footer-nav-column__item"
      >
        <router-link :to="row.link" class="footer-nav-column__link link-hover">
          {{ row.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooterColumn',
  props: {
    column: {
      type: Object,
      default: () => null,
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-nav-column {
  &__title {
    padding-bottom: 16px;
    color: $text-color;
    font-family: $main-font;
    font-size: 18px;
    line-height: 16px;
    font-weight: 600;
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
    color: $text-color;
    text-decoration: none;
    &:hover {
      color: $hover-color;
    }
  }
}
</style>
