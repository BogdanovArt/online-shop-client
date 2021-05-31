import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import ButtonWithIcon from '~/components/buttons/ButtonWithIcon.vue'
import Quantity from '~/components/inputs/QuantityInput.vue'
import CartAdd from '~/components/icons/CartAdd.vue'
import { RemoveIcon, CloseIcon } from '~/components/icons'

import { IProduct } from '~/types/search'
import { ICartIDs } from '~/types/cart'
import { PriceTypes } from '~/types/cart/enums'

import Resizer from '~/utils/resizer'
import { pricify } from '~/utils'
import { ICardTag, IGenericImage } from '~/types'
import { coreStore } from '~/store'

@Component({
  components: {
    iBtn: ButtonWithIcon,
    Quantity,
    CartAdd,
    RemoveIcon,
    CloseIcon,
  },
})
export default class ProductCard extends Vue {
  quantity = 1
  focusedImage = ''
  showPopUp = false

  @Prop({ type: String, default: PriceTypes.main })
  readonly priceType!: PriceTypes

  @Prop({ type: Boolean, default: false })
  readonly sum!: boolean

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IProduct

  @Prop({ type: Object, default: () => ({}) })
  readonly ids!: ICartIDs

  get isInCart() {
    return !!this.ids[this.item.id]
  }

  get price() {
    switch (this.priceType) {
      case PriceTypes.secondary:
        return this.item.price?.secondary
      default:
        return this.item.price?.main
    }
  }

  get givenQuantity() {
    return this.ids[this.item.id] || this.quantity
  }

  get total() {
    return this.price ? this.price.value * this.givenQuantity : 0
  }

  get priceValue() {
    return this.sum ? this.total : this.price.value
  }

  getResizedLink(image?: IGenericImage, size: number | number[] = 200) {
    return image && image.src
      ? Resizer({ link: image.src, size })
      : '/img/placeholder.png'
  }

  setFocusedImage(image?: IGenericImage) {
    if (image && image.src) {
      this.focusedImage = image.src
      this.showPopUp = true
      return
    }
    this.showPopUp = false
    this.focusedImage = ''
  }

  tagAction(tag: ICardTag) {
    if (tag.action) coreStore.getInfoData(tag.action)
  }

  getPriceString(value?: number) {
    return value ? pricify(value) : ''
  }

  addAction() {
    this.isInCart
      ? this.$nuxt.$emit('cart')
      : this.$emit('add', { ...this.item, quantity: this.quantity })
  }

  quantityChange(n: number) {
    this.quantity = n
    if (this.isInCart) {
      this.$emit('change', { ...this.item, quantity: this.quantity })
    }
  }
}
