<template>
  <div class="empty-search">
    <template v-if="fetching">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else-if="fetched">
      <search-icon />
      По данному запросу ничего не найдено
    </template>
    <template v-else>
      <search-icon />
      Что бы вы хотели найти?
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { SearchIcon } from '~/components/icons'

@Component({ components: { SearchIcon } })
export default class Empty extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly fetched!: boolean

  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean
}
</script>
<style lang="scss" scoped>
.empty-search {
  color: $hint-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 24px;
  font-weight: 500;
  opacity: 0.5;
  height: 400px;
  svg {
    margin-bottom: 20px;
    width: 60px;
    fill: currentColor;
  }
}
</style>
