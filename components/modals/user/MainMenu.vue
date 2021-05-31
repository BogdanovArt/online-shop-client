<template>
  <div class="main-menu">
    <div action="about:blank" target="order-form" class="main-menu__wrapper">
      <drawer-heading
        :title="shortName"
        :bold="!account"
        @close="$emit('close')"
      />
      <div class="main-menu__blocks">
        <nuxt-link :to="routes.catalog" class="main-menu__block">
          <catalog-icon />
          Каталог товаров
        </nuxt-link>
        <nuxt-link :to="routes.catalog" class="main-menu__block">
          <delivery-icon />
          Каталог поставщиков
        </nuxt-link>
      </div>
      <menu-list :list="menuList" arrowed />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { UserIcon, DeliveryIcon, CatalogIcon } from '~/components/icons'
import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import MenuList from '~/components/modals/user/MenuList.vue'

import { Routes } from '~/types/enums'
import { authStore } from '~/store'
import { authorizedMenu, defaultMenu } from '~/utils/consts'

@Component({
  components: { DrawerHeading, UserIcon, MenuList, DeliveryIcon, CatalogIcon },
})
export default class MainMenu extends Vue {
  routes = {
    catalog: Routes.catalog,
    suppliers: Routes.suppliers,
  }

  get account() {
    return authStore.accountData
  }

  get shortName() {
    return authStore.shortName || 'Главное меню'
  }

  get menuList() {
    return this.account ? authorizedMenu : defaultMenu
  }

  logout() {
    authStore.deauthorize()
  }
}
</script>

<style lang="scss" scoped>
.main-menu {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 90px 20px 0;
    max-height: 100%;
    overflow: hidden;
    > * {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
  &__blocks {
    display: flex;
  }
  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: $main-color;
    color: #fff;
    text-decoration: none;
    padding: 20px;
    border-radius: 5px;
    flex-basis: 50%;
    min-width: calc(50% - 10px);
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    box-shadow: $shadow-main;
    &:not(:last-child) {
      margin-right: 20px;
    }
    svg {
      width: 15px;
      fill: #fff;
      margin-bottom: 10px;
    }
  }
}
</style>
