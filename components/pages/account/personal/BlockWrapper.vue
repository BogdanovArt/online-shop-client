<template>
  <div
    :class="[
      'block-wrapper',
      $device.isMobile ? 'block-wrapper--expandable' : 'block-wrapper--static',
    ]"
  >
    <template v-if="$device.isMobile">
      <v-expansion-panel>
        <v-expansion-panel-header class="block-wrapper--expandable__header">
          {{ title }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="block-wrapper--expandable__content">
          <slot></slot>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>
    <template v-else>
      <div>
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BlockWrapper extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: boolean
}
</script>

<style lang="scss" scoped>
//  @TODO mobile styles
.block-wrapper {
  &--expandable {
    &__content {
      > * {
        padding: 0;
      }
    }
    &__header {
      background-color: #f8f8f8;
      box-shadow: $shadow-main;
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
      padding: 30px 20px;
      border-bottom: 1px solid $bg-row-color;
    }
  }
  &--static {
    margin-bottom: 20px;
    // &:not(:last-child) {
    //   margin-bottom: 20px;
    // }
  }
}
</style>
