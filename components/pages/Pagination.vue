<template>
  <div class="pagination-block">
    <transition name="slide-in">
      <div
        v-if="position"
        class="pagination-block__controls pagination-block__arrow pagination-block__arrow--left"
        @click="$emit('position', position - 1)"
      >
        <ChevronIcon />
      </div>
    </transition>
    <div class="pagination-block__pages">
      <template v-for="page in pages">
        <a
          v-show="page >= position && page <= last"
          :key="page"
          :href="`${path}${page > 0 ? '?page=' + (page + 1) : ''}`"
          :class="[
            'pagination-block__page',
            'pagination-block__controls',
            page + 1 === pagination.current_page &&
              'pagination-block__page--active',
          ]"
          @click.stop.prevent="$emit('change', page + 1)"
        >
          {{ page + 1 }}
        </a>
      </template>
    </div>

    <transition name="slide-in">
      <div
        v-if="last + 1 < pagination.total_pages"
        class="pagination-block__controls pagination-block__arrow pagination-block__arrow--right"
        @click="$emit('position', position + 1)"
      >
        <ChevronIcon />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ChevronIcon } from '~/components/icons'
import { IPaginationData } from '~/types'

@Component({
  components: {
    ChevronIcon,
  },
})
export default class ViewTypeSelect extends Vue {
  @Prop({ type: Number, default: 0 })
  readonly position!: number

  @Prop({ type: Object, default: () => {} })
  readonly pagination!: IPaginationData

  @Prop({ type: Number, default: 11 })
  readonly max!: number

  get path() {
    return this.$route.path
  }

  get pages() {
    const pages = Array.from(Array(this.pagination.total_pages).keys())
    return pages
  }

  get last() {
    return this.position + this.max
  }
}
</script>

<style lang="scss" scoped>
.slide-in-enter,
.slide-in-leave-to {
  opacity: 0 !important;
  &.pagination-block__arrow--right {
    transform: translateX(40px);
  }
  &.pagination-block__arrow--left {
    margin-left: -40px;
    margin-right: 0;
    transform: translateX(-20px);
  }
}
.pagination-block {
  display: flex;
  max-width: 100%;
  overflow: hidden;
  &__page {
    text-decoration: none;
    color: $text-color;
    &:hover {
      color: $main-color;
    }
    &--active {
      color: #fff !important;
      background: $main-color;
    }
  }
  &__pages {
    display: flex;
    height: 40px;
    align-items: center;
    background: $bg-row-color;
    border-radius: 5px;
    overflow: hidden;
  }
  &__controls {
    display: flex;
    height: 100%;
    width: 40px;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }
  &__arrow {
    width: 40px;
    background: $bg-row-color;
    transition: all $trns;
    svg {
      width: 30px;
      height: 30px;
      fill: $main-color;
    }
    &--left {
      margin-right: 15px;
      transform: translateX(0);
      svg {
        transform: rotate(90deg);
      }
    }
    &--right {
      margin-left: 15px;
      svg {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
