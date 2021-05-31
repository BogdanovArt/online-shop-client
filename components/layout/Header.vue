<template>
  <header class="header">
    <div class="header__body">
      <div
        v-if="!isMobile && footer.links && footer.links.length"
        class="header__small"
      >
        <v-container>
          <header-menu :items="footer.links" />
        </v-container>
      </div>

      <div class="header__info">
        <v-container>
          <div class="header-middle">
            <div class="header-middle__logo-wrap">
              <button
                v-if="isMobile"
                class="mobile-button"
                @click="$nuxt.$emit(events.menuMobile)"
              >
                <menu-icon />
              </button>

              <logo link="/" :image="header.logo" />

              <icon-button
                v-if="isMobile"
                class="header-middle__icon-margin"
                :quantity="cartTotal"
                @click="$nuxt.$emit(events.cart)"
              >
                <cart-icon />
              </icon-button>
            </div>
            <div
              class="header-middle__search-wrap"
              :class="{ active: searchActive }"
            >
              <search
                ref="search"
                :active="searchModal"
                :query="query"
                @input="inputHandler"
                @open="openSearch"
                @close="closeSearch"
                @search="search"
              />
            </div>

            <transition
              name="slide-fade"
              @before-enter="searchActive = true"
              @after-leave="searchActive = false"
            >
              <search-modal
                v-if="searchModal"
                :results="searchResults"
                :fetched="searched"
                :fetching="searching"
                :query="query"
                class="header__search"
              />
            </transition>

            <transition name="fade">
              <div
                v-if="searchModal"
                class="header__search__overlay"
                @click="closeSearch"
              />
            </transition>

            <div class="header-middle__buttons">
              <div class="header-middle__elements">
                <icon-button
                  class="header-middle__icon-margin"
                  :quantity="cartTotal"
                  title="Корзина"
                  @click="$nuxt.$emit(events.cart)"
                >
                  <cart-icon />
                </icon-button>

                <icon-button
                  v-if="!isMobile"
                  title="Личный кабинет"
                  class="header-middle__icon-margin"
                  @click="$nuxt.$emit(events.login)"
                >
                  <user-icon />
                </icon-button>
              </div>
            </div>
          </div>
        </v-container>
      </div>

      <div v-if="!isMobile" class="header__menu-wrap">
        <v-container>
          <catalog-menu
            :items="header.menu_main"
            :active="active"
            @select="setActive"
            @reset="resetCatalog"
          />
        </v-container>
      </div>
    </div>

    <transition name="slide-fade">
      <template v-if="list.length">
        <div class="header__dropdown">
          <v-container>
            <menu-list
              :items="list"
              :active="active"
              @reset="resetCatalog"
              @select="setActive"
            />
          </v-container>
          <nuxt-link :to="active && active.link ? active.link : '/catalog'">
            Смотреть весь каталог {{ active && active.id ? active.title : '' }}
          </nuxt-link>
        </div>
      </template>
    </transition>
    <transition name="fade">
      <template v-if="list.length">
        <div class="header__overlay" @click="resetCatalog"></div>
      </template>
    </transition>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import HeaderMenu from '~/components/menu/HeaderMenu.vue'
import CatalogMenu from '~/components/menu/CatalogMenu.vue'
import Search from '~/components/inputs/Search.vue'
import MenuList from '~/components/menu/CatalogMenuList.vue'
import Logo from '~/components/Logo.vue'
import IconButton from '~/components/buttons/IconButton.vue'
import SearchModal from '~/components/modals/SearchModal.vue'

import {
  Location,
  MenuIcon,
  SearchIcon,
  HeartIcon,
  CartIcon,
  UserIcon,
  CompareIcon,
} from '~/components/icons'

import { GlobalEvents, RouteNames, Routes } from '~/types/enums'
import { IFooter, IHeader, IMenuItem } from '~/types/core'

import { cartStore, searchStore } from '~/store'
import { debounce } from '~/utils'

@Component({
  components: {
    Logo,
    HeaderMenu,
    Search,
    MenuList,
    IconButton,
    CatalogMenu,
    SearchModal,
    Location,
    MenuIcon,
    SearchIcon,
    HeartIcon,
    CompareIcon,
    CartIcon,
    UserIcon,
  },
})
export default class Header extends Vue {
  searchModal = false
  searchActive = false
  list: IMenuItem[] = []
  active: IMenuItem | null = null
  debouncedSearch = debounce(this.searchDynamic, 500)

  events = GlobalEvents

  @Prop({ type: Object, default: () => ({}) })
  readonly header?: IHeader

  @Prop({ type: Object, default: () => ({}) })
  readonly footer?: IFooter

  @Prop({ type: Boolean, default: false })
  readonly isMobile?: boolean

  @Prop({ type: Boolean, default: false })
  readonly hide?: boolean

  get query() {
    return searchStore.getQuery
  }

  get searchResults() {
    return searchStore.getResults
  }

  get searching() {
    return searchStore.fetching
  }

  get searched() {
    return searchStore.fetched
  }

  get cartTotal() {
    return Object.keys(cartStore.productIds).length
  }

  @Watch('$route')
  resetCatalog() {
    this.active = null
    this.list = []
  }

  @Watch('$route')
  closeSearch() {
    this.searchModal = false
    if (this.$route.name !== RouteNames.search) searchStore.reset()
  }

  @Watch('hide')
  hideWatcher(state: boolean) {
    if (state) {
      this.resetCatalog()
      this.closeSearch()
    }
  }

  mounted() {
    cartStore.restoreIds()
  }

  inputHandler(query: string) {
    searchStore.setQuery(query)
    if (!(this as any).$device.isMobile) {
      this.debouncedSearch()
    }
  }

  openSearch() {
    if (!(this as any).$device.isMobile) {
      this.searchModal = true
      this.resetCatalog()
    }
  }

  searchDynamic() {
    searchStore.fetchData()
  }

  searchRoute() {
    this.$router.push({
      path: Routes.search,
      query: {
        search: this.query,
      },
    })
  }

  search() {
    if (!(this as any).$device.isMobile) {
      this.searchDynamic()
    } else {
      this.searchRoute()
    }
  }

  searchReset() {
    searchStore.reset()
  }

  setActive(item: IMenuItem) {
    if (item.items) {
      this.active = item
      this.list = item.items
    } else {
      this.active = null
      this.list = []
      this.$router.push(item.link)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: -161px;
  right: 0;
  left: 0;
  transition: $trns;
  &--active {
    top: 0;
  }
  &--fixed {
    box-shadow: $shadow-main;
  }
  &__body {
    position: relative;
    z-index: 4;
  }
  &__small {
    background-image: linear-gradient(
      to top,
      $main-color 0%,
      $hover-color 100%
    );
  }
  &__info {
    padding: 20px 0;
    background: #fff;
  }
  &__menu-wrap {
    background: $main-color;
  }
  &__search {
    transition: $trns;
    &__overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 1;
      transition: $trns;
      background: $overlay;
    }
  }
  &__dropdown,
  &__overlay {
    position: fixed;
    left: 0;
    right: 0;
    opacity: 1;
    transition: 0.2s;
  }
  &__dropdown {
    background: #fff;
    z-index: 2;
    a {
      color: #fff;
      background: $main-color;
      display: block;
      text-align: center;
      text-decoration: none;
      padding: 8px 0;
      transition: 0.2s;
      &:hover {
        background: $hover-color;
      }
    }
  }
  &__overlay {
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
}

.header-middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__logo-wrap {
    margin-right: 35px;
  }
  &__search-wrap {
    width: 100%;
    transition: $trns;
    &.active {
      position: relative;
      z-index: 2;
    }
  }
  &__buttons {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
  &__location {
    display: flex;
    align-items: center;
  }
  &__elements {
    display: flex;
  }
  &__location-icon {
    width: 30px;
    height: 30px;
    fill: $main-color;
  }
  &__location-city {
    font-size: 18px;
    color: $text-color;
  }
  &__icon-margin {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}

.mobile-button {
  &:focus {
    outline: none;
  }
  &__icon {
    width: 30px;
    height: 30px;
    fill: $main-color;
  }
}

@media screen and (max-width: $md) {
  .header {
    &__small {
      display: none;
    }
    &__info {
      padding: 20px 0 0;
    }
    &__menu-wrap {
      display: none;
    }
    &__search {
      &__overlay {
        display: none;
      }
    }
  }

  .header-middle {
    flex-wrap: wrap;
    justify-content: center;
    &__logo-wrap {
      flex-basis: 100%;
      margin: 0;
      padding: 0 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__search-wrap {
      padding: 20px;
      background-color: #fff;
      &.active {
        z-index: 0;
      }
    }
    &__buttons {
      display: none;
    }
  }
}
</style>
