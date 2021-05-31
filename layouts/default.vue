<template>
  <v-app light>
    <Header
      :is-mobile="$device.isMobile"
      v-bind="layoutData"
      :class="[showHeader && 'header--active', headerFixed && 'header--fixed']"
      :hide="!showHeader"
    />

    <v-main>
      <nuxt />
    </v-main>

    <v-navigation-drawer
      v-model="cartModal"
      :width="600"
      fixed
      temporary
      right
      :stateless="infoModal"
    >
      <cart-modal :active="cartModal" @close="cartModal = false" />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="authModal"
      :width="500"
      fixed
      temporary
      :stateless="passwordRestoreModal"
      right
    >
      <login-modal :active="authModal" @close="authModal = false" />
    </v-navigation-drawer>

    <v-navigation-drawer v-model="menuModal" :width="500" fixed temporary>
      <main-menu :active="menuModal" @close="menuModal = false" />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="infoModal"
      :width="cartModal ? 600 : 500"
      fixed
      temporary
      right
      @input="onInfoModal"
    >
      <info-dyn-modal :item="infoData" @close="closeInfoModal" />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="passwordRestoreModal"
      :width="500"
      fixed
      temporary
      right
    >
      <restore-password
        :active="passwordRestoreModal"
        @close="passwordRestoreModal = false"
      />
    </v-navigation-drawer>

    <portal-target name="modal" multiple />

    <Footer v-bind="layoutData" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Cookies from 'js-cookie'

import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import ErrorMessage from '~/components/pages/Error.vue'

import LoginModal from '~/components/modals/user/LoginModal.vue'
import CartModal from '~/components/modals/cart/CartModal.vue'
import MainMenu from '~/components/modals/user/MainMenu.vue'
import InfoDynModal from '~/components/modals/InfoDynModal.vue'
import RestorePassword from '~/components/modals/user/RestorePassword.vue'

import { authStore, coreStore } from '~/store'

import { GlobalEvents, Modals } from '~/types/enums'
import { InfoModal } from '~/types/core'
import { ITokens } from '~/types/auth'
import { Route } from '~/types'

@Component({
  components: {
    Header,
    Footer,
    CartModal,
    LoginModal,
    MainMenu,
    InfoDynModal,
    RestorePassword,
    ErrorMessage,
  },
})
export default class Layout extends Vue {
  modals = Modals
  showHeader = true
  headerFixed = false
  offset = 0;

  [Modals.cart] = false;
  [Modals.auth] = false;
  [Modals.info] = false;
  [Modals.pass] = false;
  [Modals.menu] = false

  get layoutData() {
    return coreStore.layoutData
  }

  get infoData() {
    return coreStore.infoData
  }

  get tokens() {
    return authStore.authTokens
  }

  @Watch('tokens')
  tokenResolve(tokens: ITokens | null) {
    if (tokens) {
      Cookies.set('token', tokens.token)
      Cookies.set('refresh', tokens.refresh)
    } else {
      Cookies.remove('token')
      Cookies.remove('refresh')
    }
  }

  @Watch('$route')
  routeWatcher(route: Route, oldRoute?: Route) {
    if (route.hash) this.$nuxt.$emit(route.hash.replace('#', ''))
  }

  onInfoModal(state: boolean) {
    this.closeInfoModal(state)
  }

  openModal(name?: Modals) {
    this[Modals.cart] = false
    this[Modals.auth] = false
    this[Modals.menu] = false
    this[Modals.info] = false
    this[Modals.pass] = false
    if (name) this[name] = true
  }

  @Watch('infoData')
  infoWatcher(data?: InfoModal) {
    this[Modals.info] = !!data
  }

  closeInfoModal(state?: boolean) {
    if (!state && this.infoData) coreStore.setInfoData()
  }

  scrollControl() {
    const offset = window.pageYOffset
    if (offset) {
      if (!this.headerFixed) this.headerFixed = true
    } else {
      this.headerFixed = false
    }
    if (offset > this.offset) {
      if (this.showHeader) {
        this.showHeader = false
      }
    } else if (offset < this.offset) {
      if (!this.showHeader) this.showHeader = true
    }
    this.offset = offset
  }

  created() {
    this.$nuxt.$on(GlobalEvents.logout, authStore.deauthorize)
    this.$nuxt.$on(GlobalEvents.login, () => this.openModal(Modals.auth))
    this.$nuxt.$on(GlobalEvents.cart, () => this.openModal(Modals.cart))
    this.$nuxt.$on(GlobalEvents.menuMobile, () => this.openModal(Modals.menu))
    this.$nuxt.$on(GlobalEvents.restore, () => (this[Modals.pass] = true))
    this.$nuxt.$on(GlobalEvents.close, () => this.openModal())

    if (process.client) {
      this.tokenResolve(authStore.authTokens)
    }
  }

  mounted() {
    this.offset = window.pageYOffset
    this.routeWatcher(this.$route as Route)
    window.addEventListener('scroll', this.scrollControl)
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/_fonts.scss';
.container {
  padding: 0;
}

.container-baza {
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
}
.v-application {
  font-family: $main-font;
  &--wrap {
    padding-top: 150px;
  }
}
@media only screen and (min-width: 1904px) {
  .container {
    max-width: 1240px;
  }
}
</style>
