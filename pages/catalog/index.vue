<template>
  <v-container>
    <div class="catalog-page">
      <Heading :page-meta="pageMeta" />
      <CatalogMenuList
        v-if="categories.length"
        :items="categories"
        class="catalog-page__list"
        @select="navigate"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Heading from '~/components/decorations/Heading.vue'
import CatalogMenuList from '~/components/menu/CatalogMenuList.vue'

import { catalogStore } from '~/store'
import { IMenuItem } from '~/types/core'

// @TODO add empty list message

@Component({
  components: { Heading, CatalogMenuList },
})
export default class CatalogIndexPage extends Vue {
  get categories() {
    return catalogStore.PageData?.categories || []
  }

  get pageMeta() {
    return catalogStore.PageMeta
  }

  navigate(item: IMenuItem) {
    this.$router.push({ path: item.link })
  }

  async asyncData() {
    await catalogStore.getData()
  }

  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog-page {
  &__list {
    padding: 20px 0;
  }
}
</style>
