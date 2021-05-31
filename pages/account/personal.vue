<template>
  <v-container>
    <div class="personal-page">
      <v-expansion-panels
        :value="opened"
        :readonly="false"
        flat
        multiple
        class="personal-page__blocks"
      >
        <template v-for="block in items">
          <component :is="block.type" :key="block.title" :item="block">
            {{ block }}
          </component>
        </template>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

import InfoBlock from '~/components/pages/account/personal/InfoBlock.vue'

import { personalStore } from '~/store'

import { PersonalBlockType } from '~/types/account/personal/enums'

@Component({
  components: {
    [PersonalBlockType.about]: InfoBlock,
    [PersonalBlockType.info]: InfoBlock,
  },
})
export default class ProfilePage extends Vue {
  opened = [0, 1, 2]

  get pageData() {
    return personalStore.PageData
  }

  get items() {
    return this.pageData?.items || []
  }

  async asyncData({ route }: Context) {
    console.warn('huh &', route.path)
    await personalStore.getData()
  }
}
</script>

<style lang="scss" scoped>
.personal-page {
  &__blocks {
    flex-direction: column;
  }
}
</style>
