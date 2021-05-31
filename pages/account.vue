<template>
  <div class="account-page__wrapper">
    <template v-if="pageMeta">
      <page-heading :page-meta="pageMeta" />
    </template>
    <v-container>
      <div :class="['account-page', isRoot && 'account-page--root']">
        <div :class="['account-page__menu']">
          <menu-list :list="menu" highlighted />
        </div>
        <nuxt-child />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

import MenuList from '~/components/modals/user/MenuList.vue'
import PageHeading from '~/components/decorations/Heading.vue'

import { accountStore, authStore } from '~/store'
import { Route } from '~/types'
import { ITokens } from '~/types/auth'
import { Routes } from '~/types/enums'

const defaultMeta = {
  breadcrumbs: [{ name: 'Главная', url: '/' }, { name: 'Профиль' }],
  description: 'Базапродуктов | Страница личного кабинета',
  h1: 'Личный кабинет',
  title: 'Личный кабинет | Базапродуктов',
}

@Component({ components: { MenuList, PageHeading } })
export default class AccountPage extends Vue {
  get tokens() {
    return authStore.authTokens
  }

  get menu() {
    return authStore.accountMenu.filter((el) => !!el.account)
  }

  get pageMeta() {
    const meta = JSON.parse(JSON.stringify(accountStore.MetaData))
    if (this.isRoot) {
      return defaultMeta
    } else if (meta && (this as any).$device.isMobile) {
      meta.h1 = meta.suffix
      meta.suffix = null
    }
    return meta
  }

  get isRoot() {
    return this.$route.path === Routes.account
  }

  @Watch('tokens')
  authGuard(tokens: ITokens | null) {
    if (!tokens) {
      this.$router.push('/')
    }
  }

  @Watch('$route')
  routeGuard() {
    setTimeout(() => {
      if (this.isRoot) {
        if (!(this as any).$device.isMobile) {
          this.$router.replace(Routes.personal)
        }
      }
    }, 0)
  }

  beforeRouteEnter(to: Route, from: Route, next: (route?: Route) => void) {
    if (process.client) {
      if (authStore.authTokens) {
        next()
      } else {
        next(from)
        console.warn('Unauthorized Access Attempt')
      }
    } else {
      next()
    }
  }

  created() {
    this.routeGuard()
  }
}
</script>

<style lang="scss" scoped>
.account-page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: 20px;
}

@media screen and (max-width: $md) {
  .container {
  }
  .account-page {
    max-width: 100%;
    overflow: hidden;
    grid-template-columns: 100%;
    &--root {
      .account-page__menu {
        padding: 20px;
        display: block;
      }
    }
    &__menu {
      display: none;
    }
  }
}
</style>
