<template>
  <div v-if="menu" class="menu-modal">
    <drawer-heading
      :title="menu.heading.title"
      centered
      bold
      @close="$emit('close')"
    >
      <template #icon>
        <nuxt-link :to="menu && menu.heading && menu.heading.link">
          <ArrowIcon class="menu-modal__icon" />
        </nuxt-link>
      </template>
    </drawer-heading>
    <menu-list
      :list="menu.items"
      :query="query"
      arrowed
      class="menu-modal__content"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import MenuList from '~/components/modals/user/MenuList.vue'
import { ArrowIcon } from '~/components/icons'

import { categoryStore } from '~/store'
import { Query } from '~/utils/query'
import { GetParams } from '~/types/enums'

@Component({
  components: {
    DrawerHeading,
    MenuList,
    ArrowIcon,
  },
})
export default class MenuModal extends Vue {
  get menu() {
    return categoryStore.Menu
  }

  get query() {
    return Query.set({
      query: this.$route.query,
      key: GetParams.page,
      value: null,
    })
  }
}
</script>

<style lang="scss" scoped>
.menu-modal {
  &__icon {
    width: 22px !important;
    height: 22px !important;
    fill: $main-color;
    transform: rotate(180deg);
  }
  &__content {
    padding: 90px 20px 20px;
  }
  a {
    display: flex;
  }
}
</style>
