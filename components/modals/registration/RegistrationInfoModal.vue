<template>
  <div class="registration-info-modal">
    <div :class="['registration-info-modal__wrapper']">
      <drawer-heading centered title="Информация">
        <template v-slot:icon>
          <div @click="$emit('close')">
            <arrow-icon class="registration-info-modal__info-icon" />
          </div>
        </template>
      </drawer-heading>
      <div class="registration-info-modal__content__icon">
        <info-icon />
      </div>
      <div class="registration-info-modal__content" v-html="content"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ArrowIcon, InfoIcon } from '~/components/icons'
import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'

@Component({
  components: { DrawerHeading, ArrowIcon, InfoIcon },
})
export default class RegistrationInfoModal extends Vue {
  @Prop({ type: String, default: '' })
  readonly content!: string
}
</script>

<style lang="scss" scoped>
.registration-info-modal {
  padding-top: 90px;
  &__content {
    padding: 0 20px;
    &__icon {
      text-align: center;
      padding: 5px;
      svg {
        fill: $main-color;
        width: 30px;
      }
    }
  }
  &__info-icon {
    display: block;
    fill: $main-color;
    width: 20px !important;
    transform: rotate(180deg);
  }
}
</style>
