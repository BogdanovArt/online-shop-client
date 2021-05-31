<template>
  <block-wrapper :title="item.title">
    <component :is="type" :item="item" @toggle="setView" />
  </block-wrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import BlockWrapper from '~/components/pages/account/personal/BlockWrapper.vue'
import InfoBlockView from './InfoBlockView.vue'
import InfoBlockEdit from './InfoBlockEdit.vue'

import { IPersonalBlock } from '~/types/account/personal'
import { PersonalBlockViewType } from '~/types/account/personal/enums'

@Component({
  components: {
    BlockWrapper,
    [PersonalBlockViewType.view]: InfoBlockView,
    [PersonalBlockViewType.edit]: InfoBlockEdit,
  },
})
export default class InfoBlock extends Vue {
  types = PersonalBlockViewType
  type = PersonalBlockViewType.view

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IPersonalBlock

  get BlockComponent() {
    return this.type === PersonalBlockViewType.view
      ? InfoBlockView
      : InfoBlockEdit
  }

  setView(type: PersonalBlockViewType) {
    this.type = type
  }
}
</script>

<style lang="scss" scoped></style>
