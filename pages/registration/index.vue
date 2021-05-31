<template>
  <v-container class="registration-page">
    <bread-crumbs
      :list="pageMeta.breadcrumbs"
      class="registration-page__breadcrumbs"
    />
    <h1 class="registration-page__title">{{ pageMeta ? pageMeta.h1 : '' }}</h1>

    <div class="registration-page__content__wrapper">
      <div class="registration-page__content">
        <template v-for="item in pageDataBlocks">
          <registration-block :key="item.type" :item="item" />
        </template>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import RegistrationBlock from '~/components/pages/registration/RegistrationBlock.vue'
import BreadCrumbs from '~/components/pages/BreadCrumbs.vue'

import { registrationStore } from '~/store'

@Component({
  components: { RegistrationBlock, BreadCrumbs },
})
export default class RegistrationPage extends Vue {
  get pageDataBlocks() {
    return registrationStore.PageData?.blocks
  }

  get pageMeta() {
    return registrationStore.PageMeta
  }

  async asyncData() {
    await registrationStore.getData()
  }

  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.registration-page {
  &__breadcrumbs {
    margin: 20px 0;
  }
  &__title {
    margin: 20px 0;
  }
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-gap: 20px;
  }
  @media screen and (max-width: $lg) {
    &__content {
      grid-template-columns: 100%;
    }
  }

  @media screen and (max-width: $md) {
    display: flex;
    flex-direction: column;
    padding: 0 20px 40px;
    height: 100%;
    &__content {
      &__wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    &__breadcrumbs {
      margin-top: 0;
    }
  }
}
</style>
