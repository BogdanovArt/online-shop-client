<template>
  <div class="user-profile">
    <template v-for="(el, ind) in list">
      <template v-if="el.type === 'menu'">
        <list-element
          :key="ind"
          v-bind="el"
          :query="query"
          :arrowed="arrowed"
          :highlighted="highlighted"
        >
          <template v-if="el.icon" v-slot:icon>
            <component :is="el.icon" />
          </template>
        </list-element>
      </template>
      <template v-else>
        <v-divider :key="ind" class="user-profile__divider" />
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import ListElement from '~/components/modals/blocks/ListElement.vue'

import {
  CartIcon,
  DeliveryIcon,
  GroupIcon,
  StarIcon,
  UserIcon,
  ExitIcon,
  SupportIcon,
  CatalogIcon,
  ShopIcon,
} from '~/components/icons'

import { IAccountMenuItem } from '~/types/auth'
import { IGenericQuery } from '~/types'

@Component({
  components: {
    ListElement,
    CartIcon,
    DeliveryIcon,
    GroupIcon,
    StarIcon,
    UserIcon,
    ExitIcon,
    SupportIcon,
    CatalogIcon,
    ShopIcon,
  },
})
export default class MenuList extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly list!: IAccountMenuItem[]

  @Prop({ type: Boolean, default: false })
  readonly arrowed!: boolean

  @Prop({ type: Boolean, default: false })
  readonly highlighted!: boolean

  @Prop({ type: Object, default: null })
  readonly query?: IGenericQuery
}
</script>

<style lang="scss" scoped>
.user-profile {
  width: 100%;
  > *:not(:last-child) {
    margin: 0 0 20px;
  }
  &__divider {
    margin: 20px 0 !important;
  }
  svg {
    width: 18px;
    height: 18px;
    fill: $main-color;
    margin-top: -1px;
    margin-right: 10px;
  }
}
</style>
