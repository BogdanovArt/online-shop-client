<template>
  <div class="view-type-select">
    <template v-for="icon in viewTypes">
      <div
        :key="icon"
        :title="titles[icon]"
        :class="[
          'view-type-select__button',
          icon === viewType && 'view-type-select__button--active',
        ]"
        @click="$emit('change', icon)"
      >
        <component :is="icon" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import {
  ItemsCompactIcon,
  ItemsDetailedIcon,
  ItemsGridIcon,
} from '~/components/icons'

import { ListingViewTypes } from '~/types/enums'

@Component({
  components: {
    [ListingViewTypes.COMPACT]: ItemsCompactIcon,
    [ListingViewTypes.GRID]: ItemsGridIcon,
    [ListingViewTypes.LIST]: ItemsDetailedIcon,
  },
})
export default class ViewTypeSelect extends Vue {
  @Prop({ type: String, default: ListingViewTypes.GRID })
  readonly viewType!: ListingViewTypes

  titles = {
    [ListingViewTypes.COMPACT]: 'Компактный',
    [ListingViewTypes.GRID]: 'Плитка',
    [ListingViewTypes.LIST]: 'Подробный',
  }

  viewTypes = [
    ListingViewTypes.COMPACT,
    ListingViewTypes.LIST,
    ListingViewTypes.GRID,
  ]
}
</script>
<style lang="scss" scoped>
.view-type-select {
  display: grid;
  grid-template-columns: repeat(3, 32px);
  justify-content: flex-end;
  grid-gap: 20px;
  &__button {
    width: 32px;
    cursor: pointer;
    svg {
      fill: $main-color;
    }
    &--active {
      svg {
        fill: $warning-color;
      }
    }
  }
}
</style>
