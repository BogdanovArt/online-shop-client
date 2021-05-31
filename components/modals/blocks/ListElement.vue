<template>
  <div>
    <template v-if="link">
      <nuxt-link
        :to="query ? { path: link, query } : link"
        :class="['list-element', highlighted && 'list-element--highlighted']"
      >
        <template v-if="$slots.icon">
          <slot name="icon"></slot>
        </template>
        <div class="list-element__title">{{ title }}</div>
        <template v-if="arrowed">
          <chevron-icon class="chevron-icon" />
        </template>
      </nuxt-link>
    </template>
    <template v-else>
      <div
        :class="['list-element', highlighted && 'list-element--highlighted']"
        @click="action"
      >
        <template v-if="$slots.icon">
          <slot name="icon"></slot>
        </template>
        <div class="list-element__title">{{ title }}</div>
        <template v-if="arrowed">
          <chevron-icon class="chevron-icon" />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ChevronIcon } from '~/components/icons'
import { IGenericQuery } from '~/types'

import { GlobalEvents, Routes } from '~/types/enums'

@Component({ components: { ChevronIcon } })
export default class ListElement extends Vue {
  @Prop({ type: String, default: '' })
  readonly icon!: Element

  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ type: String, default: '' })
  readonly link!: Routes

  @Prop({ type: String, default: '' })
  readonly emitter!: string

  @Prop({ type: Boolean, default: false })
  readonly arrowed!: boolean

  @Prop({ type: Boolean, default: false })
  readonly highlighted!: boolean

  @Prop({ type: Object, default: null })
  readonly query?: IGenericQuery

  action() {
    this.$nuxt.$emit(GlobalEvents.close)
    if (this.emitter) this.$nuxt.$emit(this.emitter)
  }
}
</script>

<style lang="scss" scoped>
.list-element {
  display: flex;
  align-items: flex-start;
  width: 100%;
  text-decoration: none;
  color: $text-color;
  line-height: 22px;
  cursor: pointer;
  &:hover {
    color: $main-color;
  }
  &.nuxt-link-exact-active {
    color: $main-color;
  }
  &__title {
    flex-grow: 1;
    font-size: 18px;
    margin-top: -0.25rem;
  }
  &--highlighted {
    color: $main-color !important;
  }
  svg {
    width: 15px;
    height: 15px;
    fill: $main-color;
    &.chevron-icon {
      transform: rotate(-90deg) translateY(5px);
    }
  }
}
</style>
