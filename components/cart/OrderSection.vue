<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="order-section"
    >
      <div class="order-section__header">
        <span class="order-section__name">
          {{ item.title }}
        </span>

        <button class="order-section__delete" @click="deleteEvent(index)">
          <span v-if="!isMobile">
            Удалить товары раздела
          </span>

          <span v-else>
            Удалить все
          </span>
        </button>
      </div>

      <order-item
        :list="item.list"
      />
    </div>
  </div>
</template>

<script>
import OrderItem from '~/components/cart/OrderItem.vue'

export default {
  components: {
    OrderItem
  },
  props: {
    sections: { type: Array, default: () => [] }
  },
  computed: {
    isMobile() {
      return this.$store.state.core.isMobile
    },
    items() {
      return this.sections.filter(el => el.list.length > 0)
    }
  },
  methods: {
    deleteEvent: function (event) {
      this.sections.splice(event, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-section {
    margin: 0 10px;
    padding: 10px 0;
    @media (max-width: 767px) {
      border-bottom: 1px solid #dde1e4;
      &:last-of-type {
        border-bottom: none;
      }
    }
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-weight: 500;
    }
    &__name {
      color: #3a3f45;
      font-size: 18px;
      line-height: 18px;
    }
    &__delete {
      font-size: 14px;
      line-height: 14px;
      color: #fa0000;
      outline: none;
    }
  }
</style>
