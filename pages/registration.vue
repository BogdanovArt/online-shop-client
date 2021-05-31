<template>
  <div class="registration-page__wrapper">
    <nuxt-child />

    <template v-if="$device.isMobile">
      <portal to="modal">
        <v-navigation-drawer
          :value="!!registrationForm && $device.isMobile"
          :width="500"
          fixed
          temporary
          stateless
        >
          <registration-modal
            v-if="registrationForm"
            :item="registrationForm"
            @close="$router.go(-1)"
            @info="regInfoModal = true"
          />
        </v-navigation-drawer>

        <v-navigation-drawer
          v-model="regInfoModal"
          :width="500"
          fixed
          temporary
        >
          <registration-info-modal
            v-if="registrationForm"
            :content="registrationForm.info"
            @close="regInfoModal = false"
          />
        </v-navigation-drawer>
      </portal>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import RegistrationModal from '~/components/modals/registration/RegistrationModal.vue'
import RegistrationInfoModal from '~/components/modals/registration/RegistrationInfoModal.vue'

import { registrationStore } from '~/store'

@Component({ components: { RegistrationModal, RegistrationInfoModal } })
export default class RegistrationWrapper extends Vue {
  regInfoModal = false

  get registrationForm() {
    return registrationStore.FormData
  }
}
</script>

<style lang="scss" scoped></style>
