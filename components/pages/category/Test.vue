<template>
  <div class="test-block">
    ima test
    <pre>
      {{ min }}
      {{ max }}
    </pre>

    <v-btn @click="MAX += 1000">MORE</v-btn>
    <v-btn @click="MAX -= 1000">LESS</v-btn>

    <input
      key="MINMARTY"
      v-model="min"
      type="text"
      :style="{ width: 80 + 'px', border: '1px solid blue;' }"
    />
    <input
      key="MAXMARTY"
      v-model="max"
      type="text"
      :style="{ width: 80 + 'px', border: '1px solid blue;' }"
    />

    <RangeTrack
      :min-value="parseInt(MIN, 10)"
      :max-value="parseInt(MAX, 10)"
      :range="range"
      @input="dragHandler"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import RangeTrack from '~/components/inputs/Range/blocks/RangeTrack.vue'

@Component({ components: { RangeTrack } })
export default class Test extends Vue {
  MIN = 2950
  MAX = 2999

  min = 5000
  max = 12000

  get range() {
    return [this.min, this.max]
  }

  dragHandler(value: any) {
    const [min, max] = value
    this.min = min
    this.max = max
  }
}
</script>

<style lang="scss" scoped>
.test-block {
  width: 300px;
}
input {
  display: inline-block;
  border: 1px solid $main-color;
  padding: 10px;
}
.drag-zone {
  margin-top: 20px;
  border: 1px solid blue;
  user-select: none;
}
</style>
