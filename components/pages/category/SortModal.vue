<template>
  <div v-if="sort" class="menu-modal">
    <drawer-heading title="Сортировка" centered bold @close="close" />
    <div class="menu-modal__content">
      <v-radio-group v-model="selected" column>
        <template v-for="(item, ind) in sort.items">
          <v-radio :key="ind" color="#3399ff" class="radio-item">
            <template #label>
              <div class="menu-modal__label">По {{ item.title }}</div>
            </template>
          </v-radio>
        </template>
      </v-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import MenuList from '~/components/modals/user/MenuList.vue'
import { ArrowIcon } from '~/components/icons'

import { categoryStore } from '~/store'
import { Query } from '~/utils/query'
import { compare } from '~/utils'

@Component({
  components: {
    DrawerHeading,
    MenuList,
    ArrowIcon,
  },
})
export default class SortModal extends Vue {
  selected = 0

  get sort() {
    return categoryStore.Sort
  }

  get selectedItem() {
    return this.sort?.items[this.selected].params
  }

  close() {
    const currentQuery = this.$route.query
    if (this.selectedItem) {
      const keys = Object.keys(this.selectedItem)
      const values = Object.values(this.selectedItem)

      const query = Query.set({
        query: currentQuery,
        key: keys,
        value: values,
      })

      if (!compare(currentQuery, query)) {
        this.$router.replace({ path: this.$route.path, query })
      }
    }
    this.$emit('close')
  }

  setInitial() {
    const sort = this.$route.query.sort
    const order = this.$route.query.order
    if (sort && order) {
      const params = { sort, order }
      const match = this.sort?.items.findIndex((item) =>
        compare(params, item.params)
      )
      if (match && match > -1) this.selected = match
    }
  }

  created() {
    this.setInitial()
  }
}
</script>

<style lang="scss" scoped>
.menu-modal {
  &__icon {
    width: 22px !important;
    height: 22px !important;
    fill: $main-color;
    transform: rotate(180deg);
  }
  &__content {
    padding: 90px 20px 20px;
  }
  &__label {
    font-size: 18px;
    color: $text-color;
  }
  .radio-item {
    flex-direction: row-reverse;
  }
}
</style>
