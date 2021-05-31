<template>
  <div v-if="filters" class="menu-modal">
    <drawer-heading title="Фильтры" centered bold @close="close" />
    <div class="menu-modal__content">
      <FilterBlock class="filter-content" :items="filters" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import FilterBlock from '~/components/pages/category/FilterBlock.vue'
import { ArrowIcon } from '~/components/icons'

import { categoryStore } from '~/store'

@Component({
  components: {
    DrawerHeading,
    FilterBlock,
    ArrowIcon,
  },
})
export default class FilterModal extends Vue {
  get filters() {
    return categoryStore.Filters
  }

  close() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.menu-modal {
  &__content {
    padding: 70px 0 0;
  }
  .radio-item {
    flex-direction: row-reverse;
  }
}
</style>
