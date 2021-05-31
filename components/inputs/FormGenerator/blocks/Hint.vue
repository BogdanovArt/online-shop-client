<template>
  <div class="hint-wrapper">
    <transition name="slide-down">
      <div v-if="showHint" class="input-hint">
        <div>{{ title }}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { FormValues } from '~/types/registration'

@Component
export default class Hint extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ type: Object, default: () => ({}) })
  readonly filledData!: FormValues

  @Prop({ type: Array, default: () => [] })
  readonly showConditions!: FormValues[]

  get showHint() {
    let show
    this.showConditions.forEach((element) => {
      const key = Object.keys(element)[0]
      if (this.filledData[key] === element[key]) show = true
    })
    return show
  }
}
</script>

<style lang="scss" scoped>
.hint-wrapper {
  min-height: 1px;
}
.input-hint {
  font-size: 14px;
  color: $hint-color;
  height: 20px;
  opacity: 1;
  transition: 0.25s !important;
}

.slide-down-enter {
  opacity: 0;
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.slide-down-leave-to {
  opacity: 0;
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
