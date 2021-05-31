<template>
  <div class="category-page">
    <v-container>
      <!-- <Test></Test> -->
      <Heading :page-meta="pageMeta" />
      <div class="category-page__content">
        <SortControls v-if="!$device.isMobile" :item="sorts" @sort="setSort" />
        <ViewTypeSelect
          v-if="!$device.isMobile"
          :view-type="viewType"
          @change="(type) => $emit('view', type)"
        />
        <div v-if="!$device.isMobile" class="category-controls">
          <CategoryMenu :item="menu" />
          <Filters v-if="filters" :items="filters" />
        </div>
        <div class="category-listing">
          <Pagination
            v-if="!$device.isMobile && pagination && pagination.total_pages > 1"
            :position="position"
            :pagination="pagination"
            :max="maxPaginationElements"
            @change="setPage"
            @position="setPaginationPosition"
          />
          <ProductListing :view-type="viewType" :items="products" />
          <Pagination
            v-if="!$device.isMobile && pagination && pagination.total_pages > 1"
            :position="position"
            :pagination="pagination"
            :max="maxPaginationElements"
            @change="setPage"
            @position="setPaginationPosition"
          />
          <v-btn
            v-if="
              $device.isMobile &&
              pagination &&
              pagination.total_pages > pagination.current_page
            "
            dark
            color="#3399ff"
            class="category-lazy-load"
            @click="paginationLazy"
          >
            Посмотреть ещё
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'nuxt-property-decorator'

import Test from '~/components/pages/category/Test.vue'

import Heading from '~/components/decorations/Heading.vue'
import CategoryMenu from '~/components/pages/category/CategoryMenu.vue'
import SortControls from '~/components/pages/category/SortControls.vue'
import ViewTypeSelect from '~/components/pages/category/ViewTypeSelect.vue'
import ProductListing from '~/components/pages/category/ProductListing.vue'
import Pagination from '~/components/pages/Pagination.vue'
import Filters from '~/components/pages/category/Filters.vue'

import { categoryStore } from '~/store'

import { Route } from '~/types'
import { GetParams, ListingViewTypes } from '~/types/enums'
import { Query } from '~/utils/query'
import { ICategorySort } from '~/types/category'

@Component({
  components: {
    Heading,
    CategoryMenu,
    SortControls,
    ViewTypeSelect,
    ProductListing,
    Pagination,
    Filters,
    Test,
  },
})
export default class CategoryPage extends Vue {
  position = 0
  maxPaginationElements = 11

  @Prop({ type: String, default: ListingViewTypes.GRID })
  readonly viewType!: ListingViewTypes

  get metaLinks() {
    const links = []
    const { query, path } = this.$route
    const current = this.pageMeta?.pagination?.current_page
    const total = this.pageMeta?.pagination?.total_pages
    if (current && total) {
      if (current > 1) {
        const prevQuery = Query.set({
          query,
          key: GetParams.page,
          value: current > 2 ? (current - 1).toString() : null,
        })
        const prevUrl = this.$axios.getUri({ url: path, params: prevQuery })
        links.push({
          rel: 'prev',
          href: prevUrl,
        })
      }
      if (current < total) {
        const nextQuery = Query.set({
          query,
          key: GetParams.page,
          value: (current + 1).toString(),
        })
        const nextUrl = this.$axios.getUri({ url: path, params: nextQuery })
        links.push({
          rel: 'next',
          href: nextUrl,
        })
      }
    }
    return links
  }

  get currentPath() {
    return categoryStore.CurrentRoute
  }

  get currentPage() {
    return this.$route.query.page
  }

  get pageMeta() {
    return categoryStore.PageMeta
  }

  get filters() {
    return categoryStore.Filters
  }

  get sorts() {
    return categoryStore.Sort
  }

  get products() {
    return categoryStore.Products
  }

  get menu() {
    return categoryStore.Menu
  }

  get pagination() {
    return this.pageMeta?.pagination
  }

  @Watch('currentPath')
  pathWatcher(path: string) {
    this.calculateInitialPosition()
  }

  @Watch('$route')
  async routeWatcher(route: Route, old: Route) {
    if (route.path === old.path) {
      await categoryStore.getData({ slug: route.path, params: route.query })
    }
  }

  async asyncData({ route }: { route: Route }) {
    await categoryStore.getData({ slug: route.path, params: route.query })
  }

  paginationLazy() {
    const currentPage = this.pagination?.current_page || 1
    const nextPage = currentPage + 1
    const query = Query.set({
      query: this.$route.query,
      key: GetParams.page,
      value: nextPage.toString(),
    })
    categoryStore.getData({
      slug: this.$route.path,
      params: query,
      lazy: true,
    })
  }

  setSort({
    item,
    index,
    active,
  }: {
    item: ICategorySort
    index: number
    active: number
  }) {
    const currentQuery = this.$route.query
    const keys = Object.keys(item.params)
    const values = Object.values(item.params)
    const isActive = active === index
    let query = {}

    query = Query.set({
      query: currentQuery,
      key: keys,
      value: isActive ? null : values,
    })

    this.$router.replace({ path: this.$route.path, query })
  }

  setPage(page: number) {
    const currentQuery = this.$route.query
    const currentPage = currentQuery.page || 1

    let query = {}

    if (page > 1) {
      query = Query.set({
        query: currentQuery,
        key: GetParams.page,
        value: page.toString(),
      })
    } else if (page === 1) {
      query = Query.set({
        query: currentQuery,
        key: GetParams.page,
        value: null,
      })
    }
    if (currentPage && page && page.toString() !== currentPage.toString()) {
      this.$router.replace({ path: this.$route.path, query })
    }
  }

  setPaginationPosition(position: number) {
    this.position = position
  }

  calculateInitialPosition() {
    if (this.pagination?.total_pages && this.pagination.current_page) {
      const current = this.pagination.current_page - 1
      const last = this.pagination.total_pages - 1
      const margin = Math.ceil(this.maxPaginationElements / 2)
      const maxPosition = last - margin
      if (current > maxPosition) {
        this.position = last - this.maxPaginationElements
        return
      }
      if (current - margin < 0) {
        this.position = 0
        return
      }
      this.position = current - margin
    }
  }

  created() {
    this.calculateInitialPosition()
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
      link: this.metaLinks,
    }
  }
}
</script>

<style lang="scss" scoped>
.category-page {
  background: #fff;
  &__content {
    padding-bottom: 30px;
    font-size: 14px;
    display: grid;
    grid-template-columns: 230px repeat(4, calc((100% - 60px - 230px) / 4));
    grid-gap: 15px;
    .category-controls {
      display: grid;
      grid-auto-rows: min-content;
      grid-gap: 15px;
      grid-column: 1;
      grid-row: 2 / 10;
    }
    .sort-controls {
      grid-column: 1 / 5;
    }
    .category-listing {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 15px;
      grid-column: 2 / 6;
      grid-row: 2 / 10;
    }
  }
}
@media screen and (max-width: $sm) {
  .category-page {
    &__content {
      display: block;
      grid-template-columns: 230px repeat(4, calc((100% - 60px - 230px) / 4));
      grid-gap: 15px;
      .category-controls {
      }
      .sort-controls {
      }
      .category-listing {
        display: block;
      }
      .category-lazy-load {
        margin: 0 20px;
        width: calc(100% - 40px);
        font-size: 18px;
        letter-spacing: 0;
        text-transform: none;
      }
    }
    .v-navigation-drawer {
      z-index: 30;
    }
    .header-icon {
      width: 50px;
    }
  }
}
</style>
