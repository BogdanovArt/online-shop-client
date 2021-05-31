<template>
  <section class="map-block">
    <div class="map-block__title block-title">{{ title }}</div>
    <div class="map-block__content">
      <div v-if="false" class="map-block__filters">
        <template v-for="el in content.filters">
          <button
            :key="el.key"
            :class="[
              'map-block__filter',
              active(el) && 'map-block__filter--active',
            ]"
            @click="setFilter(el)"
          >
            {{ el.title }}
          </button>
        </template>
        <button
          :class="[
            'map-block__filter',
            filters.length === content.filters.length &&
              'map-block__filter--active',
          ]"
          @click="setAll"
        >
          Все
        </button>
      </div>
      <map-select
        :coords="content.center"
        :items="filtered"
        class="map-wrapper"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import MapSelect from '~/components/MapSelect.vue'

import { IMap, IMapFilter, IPlacemark, MapFilters } from '~/types'

@Component({ components: { MapSelect } })
export default class MapBlock extends Vue {
  filters: IMapFilter[] = []

  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ type: Object, default: () => ({}) })
  readonly content!: IMap

  get filtered() {
    let placemarks: IPlacemark[] = []
    this.filters.forEach((filter) => {
      const markers = this.content.items.filter((el) => el.type === filter.key)
      placemarks = [...placemarks, ...markers]
    })
    return placemarks.length ? placemarks : this.content.items
  }

  setFilter(filter: IMapFilter) {
    this.filters = [filter]
  }

  setAll() {
    if (this.filters.length === this.content.filters.length) {
      this.filters = []
    } else {
      this.filters = this.content.filters
    }
  }

  removeFilter(index: number) {
    const changed = [...this.filters]
    changed.splice(index, 1)
    this.filters = changed
  }

  active(filter: IMapFilter) {
    return this.filters.find((el) => el.key === filter.key)
  }
}
</script>

<style lang="scss" scoped>
.map-block {
  position: relative;
  margin-bottom: 40px;
  &__title {
    margin: 5px 0 15px;
  }
  &__filters {
    position: absolute;
    top: 115px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 12;
  }
  &__filter {
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 4px;
    border: 2px solid $main-color;
    &:not(:last-child) {
      margin-right: 20px;
    }
    &:focus {
      outline: none;
    }
    &--active {
      color: #fff;
      border-color: $active-color;
      background-color: $active-color;
    }
  }
}

@media screen and (max-width: $sm) {
  .map-block {
    padding: 0 20px;
    &__title {
      margin: 20px 0;
      font-size: 26px;
    }
    &__filters {
      display: none;
      top: 125px;
      right: 10px;
    }
    &__filter {
      padding: 5px 10px;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    .map-wrapper {
      margin: 0 -20px;
    }
  }
}
</style>
