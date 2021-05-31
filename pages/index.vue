<template>
  <v-container>
    <template v-if="pageData && pageData.blocks">
      <block-dispatcher :items="pageData.blocks" />
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import BlockDispatcher from '~/components/pages/index/BlockDispatcher.vue'

import { indexStore } from '~/store'

@Component({
  components: { BlockDispatcher },
})
export default class IndexPage extends Vue {
  get pageData() {
    return indexStore.pageData
  }

  get pageMeta() {
    return indexStore.pageMeta
  }

  async asyncData() {
    await indexStore.getData()
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
.yandex-map {
  position: relative;
  margin: 40px 0;
  &__buttons {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    z-index: 1;
    text-align: center;
  }
  &__button {
    margin: 0 10px;
    padding: 13px 20px;
    background: transparent;
    border: 1px solid #3399ff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    color: #1e354c;
    &:focus {
      outline: none;
    }
  }
}

.big-title-map {
  margin: 30px 0;
  font-size: 45px;
  line-height: 45px;
  font-weight: 500;
  color: #3a3f45;
  text-align: center;
  @media (max-width: 767px) {
    margin: 20px 0;
    font-size: 24px;
    line-height: 24px;
  }
}
</style>
