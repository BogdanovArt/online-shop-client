<template>
  <div class="catalog-page__wrapper">
    <transition name="fade">
      <div v-if="showPreloader" class="catalog-page__preloader">
        <div class="catalog-page__preloader__progress">
          <v-progress-circular color="#3399ff" indeterminate />
        </div>
      </div>
    </transition>
    <nuxt-child :view-type="viewType" @view="setViewType" />

    <template v-if="$device.isMobile">
      <div v-if="showMobileControls" class="category-menu">
        <button class="category-menu__button" @click="menuModal = true">
          <CatalogIcon class="category-menu__icon" />
          Каталог
        </button>
        <v-divider vertical></v-divider>

        <button class="category-menu__button" @click="filterModal = true">
          <FilterIcon class="category-menu__icon" />
        </button>

        <button class="category-menu__button" @click="sortModal = true">
          <SortIcon class="category-menu__icon" />
        </button>
      </div>

      <portal to="modal">
        <v-navigation-drawer v-model="menuModal" :width="500" fixed temporary>
          <MenuModal @close="menuModal = false" />
        </v-navigation-drawer>
        <v-navigation-drawer v-model="sortModal" :width="500" fixed temporary>
          <SortModal @close="sortModal = false" />
        </v-navigation-drawer>
        <v-navigation-drawer
          v-model="filterModal"
          :width="500"
          fixed
          temporary
          stateless
        >
          <FilterModal @close="filterModal = false" />
        </v-navigation-drawer>
      </portal>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'

import MenuModal from '~/components/pages/category/MenuModal.vue'
import SortModal from '~/components/pages/category/SortModal.vue'
import FilterModal from '~/components/pages/category/FilterModal.vue'

import { CatalogIcon, FilterIcon, SortIcon } from '~/components/icons'

import { categoryStore } from '~/store'
import { ListingViewTypes } from '~/types/enums'

@Component({
  components: {
    MenuModal,
    CatalogIcon,
    SortModal,
    FilterIcon,
    SortIcon,
    FilterModal,
  },
})
export default class CatalogPageWrapper extends Vue {
  menuModal = false
  filterModal = false
  sortModal = false
  showPreloader = false
  timeOut: NodeJS.Timer | null = null
  viewType = ListingViewTypes.GRID

  get showMobileControls() {
    return this.$route.name !== 'catalog'
  }

  get menu() {
    return categoryStore.Menu
  }

  get fetching() {
    return categoryStore.Fetching
  }

  @Watch('fetching')
  preloader(state: boolean) {
    if (this.timeOut) global.clearTimeout(this.timeOut)
    if (state) {
      this.timeOut = global.setTimeout(() => {
        if (this.fetching) {
          this.showPreloader = true
        }
      }, 200)
    } else {
      this.showPreloader = false
    }
  }

  setViewType(type: ListingViewTypes) {
    this.viewType = type
  }
}
</script>

<style lang="scss" scoped>
.catalog-page {
  &__preloader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff59;
    transition: 0.5s;
    opacity: 1;
    z-index: 15;
    &__progress {
      padding: 100px;
      position: sticky;
      top: calc(50% - 120px);
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
.category-menu {
  position: sticky;
  display: flex;
  grid-gap: 15px;
  bottom: 0;
  padding: 20px;
  background: #fff;
  z-index: 6;
  box-shadow: 0 -1px 8px 3px rgba(0, 0, 0, 0.05);
  &__button {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: $main-color;
    font-weight: 500;
    &:focus {
      outline: none;
    }
    svg {
      width: 30px;
      fill: $main-color;
      margin-right: 10px;
    }
  }
}
</style>
