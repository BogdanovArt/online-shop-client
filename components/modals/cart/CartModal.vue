<template>
  <div class="cart-modal">
    <drawer-heading title="Корзина" @close="$emit('close')">
      <template v-slot:icon>
        <cart-icon />
      </template>
    </drawer-heading>

    <transition name="fade">
      <template v-if="fetching">
        <div class="fetching-overlay">
          <v-progress-circular indeterminate color="blue" />
        </div>
      </template>
    </transition>

    <div class="cart-modal__content">
      <template v-if="products.length">
        <div class="cart-modal__list">
          <template v-for="category in grouped">
            <div :key="category.id" class="cart-modal__list__item">
              <div v-if="category.title" class="cart-modal__list__item__title">
                <span class="item-title">{{ category.title }}</span>
                <span class="item-action" @click="categoryRemove(category)">
                  {{
                    $device.isMobile
                      ? 'Удалить раздел'
                      : 'Удалить товары раздела'
                  }}
                </span>
              </div>
              <div class="cart-modal__list__item__products">
                <template v-for="product in category.items">
                  <card-micro
                    :key="product.id"
                    :ids="ids"
                    :item="product"
                    :price-type="priceType"
                    sum
                    @remove="removeHandler"
                    @change="changeHandler"
                  />
                </template>
              </div>
            </div>
          </template>
        </div>
        <div ref="intersection" class="cart-modal__pseudo"></div>
        <div ref="footer" class="cart-modal__footer">
          <v-btn dark @click="$router.push('/cart')">Перейти в козину</v-btn>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import CartIcon from '~/components/icons/Cart.vue'
import DrawerHeading from '~/components/modals/blocks/DrawerHeading.vue'
import CardMicro from '~/components/listing/card/list/CardMicro.vue'

import { cartStore } from '~/store'

import { ICategoryCart, IProductCart } from '~/types/cart'

import { categoryGrouped } from '~/utils/productGrouping'
import { IProduct } from '~/types/search'

@Component({ components: { DrawerHeading, CartIcon, CardMicro } })
export default class CartModal extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly active!: boolean

  @Watch('active')
  onActive(n: boolean) {
    if (n) this.init()
  }

  get ids() {
    return cartStore.productIds
  }

  get priceType() {
    return cartStore.priceType
  }

  get products() {
    return cartStore.productsData
  }

  get suppliers() {
    return cartStore.suppliersData
  }

  get categories() {
    return cartStore.categoriesData
  }

  get fetching() {
    return cartStore.isFetching
  }

  get grouped() {
    return categoryGrouped(this.categories, this.products)
  }

  async init() {
    await cartStore.getData()
  }

  mounted() {
    const sticky = this.$refs.intersection
    const options = { threshold: [1] }
    if (sticky) {
      const observer = new IntersectionObserver(this.scrollHandler, options)
      observer.observe(sticky as any)
    }
  }

  changeHandler(product: IProduct) {
    cartStore.changeProduct(product)
    cartStore.storeIds()
  }

  removeHandler(item: IProductCart) {
    cartStore.removeProduct(item)
    cartStore.storeIds()
    console.log('prod-remove', item)
  }

  categoryRemove(item: ICategoryCart) {
    console.log('CAT-remove', item)
  }

  scrollHandler(entries: any[]) {
    const scrolledIn = entries.length ? entries[0].intersectionRatio : 0
    if (!scrolledIn) {
      ;(this.$refs.footer as any).classList.add('stuck')
    } else {
      ;(this.$refs.footer as any).classList.remove('stuck')
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-modal {
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  max-height: 100%;
  overflow: hidden;
  &__content {
    flex-grow: 1;
    overflow: auto;
  }
  &__pseudo {
    height: 1px;
  }
  &__list {
    padding: 20px 20px 0;
    &__item {
      &:not(:last-child) {
        border-bottom: 1px solid $border-color;
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
      &__title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-weight: 500;
        .item-title {
          font-size: 20px;
        }
        .item-action {
          cursor: pointer;
          color: red;
        }
      }
    }
  }
  &__footer {
    position: sticky;
    padding: 20px;
    bottom: 0;
    background-color: #fff;
    transition: $trns;
    z-index: 2;
    &.stuck {
      box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
    }
    .v-btn {
      background-color: $main-color;
      text-transform: none;
      width: 100%;
      font-size: 18px;
      padding: 20px;
    }
  }
}
.fetching-overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 4;
}

@media screen and (max-width: $sm) {
  .cart-modal {
    &__content {
    }
    &__pseudo {
    }
    &__list {
      &__item {
        &__title {
          .item-title {
            font-size: 16px;
          }
          .item-action {
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
