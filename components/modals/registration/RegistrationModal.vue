<template>
  <div class="registration-modal">
    <div :class="['registration-modal__wrapper']">
      <drawer-heading
        centered
        :title="pageData && pageData.title"
        @close="$emit('close')"
      >
        <template v-slot:icon>
          <div @click="$emit('info')">
            <info-icon class="registration-modal__info-icon" />
          </div>
        </template>
      </drawer-heading>
      <div v-if="pageData" class="registration-modal__content">
        <form-generator
          :form-data="pageData.form"
          :filled-data="values"
          :return-value="formHandler"
        />
        <template v-if="pageData.action">
          <v-btn
            dark
            :disabled="!isValid"
            class="registration-modal__form-submit"
            @click="submit"
          >
            {{ pageData.action.title }}
          </v-btn>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'

import { InfoIcon } from '~/components/icons'
import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import Registration from '~/components/pages/registration/registration'
import { GlobalEvents } from '~/types/enums'

import { IRegistrationPageForm } from '~/types/registration'

@Component({
  name: 'registration-modal',
  components: { DrawerHeading, InfoIcon },
})
export default class RegistrationModal extends Registration {
  events = GlobalEvents

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IRegistrationPageForm
}
</script>

<style lang="scss" scoped>
.registration-modal {
  padding-top: 90px;
  &__content {
    padding: 0 20px 20px;
    &__block {
      &__subtitle {
        font-size: 20px;
        font-weight: 500;
        margin: 10px 0;
      }
    }
  }
  &__info-icon {
    display: block;
    width: 20px !important;
    height: 20px;
    fill: $main-color;
  }
  &__form-submit {
    margin-top: 20px;
    color: #fff;
    font-size: 16px;
    text-transform: none;
    width: 100%;
    background-color: $main-color !important;
    &:disabled {
      color: $hint-color !important;
      background-color: $bg-row-color !important;
    }
  }
}
</style>
