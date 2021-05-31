<template>
  <div class="page-heading">
    <v-container v-if="pageMeta">
      <bread-crumbs :list="pageMeta.breadcrumbs" />
      <h1>
        <template v-if="pageMeta.prefix">
          <span class="page-heading__prefix">{{ pageMeta.prefix }}</span>
        </template>
        {{ pageMeta.h1 }}
        <template v-if="pageMeta.suffix">
          <span class="page-heading__suffix">— {{ pageMeta.suffix }}</span>
        </template>
      </h1>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import BreadCrumbs from '~/components/pages/BreadCrumbs.vue'

import { IPageMeta } from '~/types'

@Component({ components: { BreadCrumbs } })
export default class PageHeading extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly pageMeta!: IPageMeta
}
</script>

<style lang="scss" scoped>
.page-heading {
  margin: 15px 0;
  h1 {
    margin: 20px 0 0;
    font-family: $main-font;
    font-weight: 600;
    font-size: 22px;
    span {
      color: $hint-color;
      font-weight: 400;
    }
  }
  &__prefix {
    color: $text-color !important;
  }
}

@media screen and (max-width: $md) {
  .page-heading {
    margin: 0;
    h1 {
      margin-top: 10px;
      font-size: 20px;
    }
  }

  .container {
    padding: 0 20px;
  }
}
</style>
