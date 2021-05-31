<template>
  <div class="info-modal">
    <div :class="['info-modal__wrapper']">
      <drawer-heading :title="item.title" @close="$emit('close')" />
      <div class="info-modal__content">
        <template v-for="el in item.content">
          <div :key="el.title" class="info-modal__content__block">
            <div v-show="el.title" class="info-modal__content__block__subtitle">
              {{ el.title }}
            </div>
            <div v-html="el.content"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'

import { InfoModal } from '~/types/core'

@Component({
  components: { DrawerHeading },
})
export default class InfoDynamicModal extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: InfoModal
}
</script>

<style lang="scss" scoped>
.info-modal {
  padding-top: 80px;
  &__content {
    padding: 0 20px;
    &__block {
      &__subtitle {
        font-size: 20px;
        font-weight: 500;
        margin: 10px 0;
      }
    }
  }
}
</style>
