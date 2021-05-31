<template>
  <div ref="wrapper" class="dropdown-wrapper">
    <drop-down-input
      ref="input"
      v-bind="$props"
      :return-value="inputHandler"
      autocomplete="off"
      @blur="blurHandler"
      @focus="focusHandler"
    >
      <div class="drop-controls">
        <v-btn
          v-show="value"
          icon
          x-small
          title="Очистить"
          @click="clearClickHandler"
        >
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </div>
    </drop-down-input>
    <template v-if="selectMultiple">
      <drop-down-list-selected :items="selected" :return-value="itemRemove" />
    </template>
    <transition name="fade">
      <template v-if="expanded">
        <drop-down-list
          ref="list"
          :items="items"
          :selected="selected"
          :select-multiple="selectMultiple"
          :return-value="itemSelectHandler"
          :on-scroll-end="scrollEndHandler"
          :loading="loading"
          @mouseenter="insideDroplist = true"
          @mouseleave="insideDroplist = false"
        />
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import axios from 'axios'

import DropDownList from './DropDownList.vue'
import DropDownListSelected from './DropDownListSelected.vue'

import DropDownInput from '~/components/inputs/Input.vue'
import { copy, arRemove } from '~/utils'
import { InputValue, IBasicArray, IBasicObject } from '~/types'
import { EventTypes } from '~/types/enums'

interface Item {
  title: string
  id?: number
  selected?: boolean
  relevant?: boolean
}

interface InputPayload {
  name: string
  value: InputValue
  type: EventTypes
}

interface Input extends Element {
  setError: (str: string) => void
  input: HTMLInputElement
  val: InputValue
  unmaskedValue: InputValue
  checkForValid: () => void
  checkForErrors: () => void
  reset: () => void
}

interface List extends Element {
  toTop: () => void
}

/*
  @TODO property icons
 */
@Component({
  components: { DropDownInput, DropDownList, DropDownListSelected },
})
export default class DropDown extends Vue {
  @Prop({ type: String, default: '' })
  readonly name!: string

  @Prop({ type: String, default: 'text' })
  readonly type!: string

  @Prop({ type: String, default: 'Заполните это поле' })
  readonly placeholder!: string

  @Prop({ type: Boolean, default: false })
  readonly required!: boolean

  @Prop({ type: Boolean, default: false })
  readonly disabled!: boolean

  @Prop({ type: String, default: '' })
  readonly errorMessage!: string

  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (
    name: string,
    val: InputValue,
    type: EventTypes
  ) => void

  @Prop({ type: String })
  readonly mode?: string

  @Prop({ type: Array, default: () => [] })
  readonly listSelected!: IBasicArray

  @Prop({ type: Array, default: () => [] })
  readonly listItems!: IBasicArray

  @Prop({ type: String })
  readonly endpoint?: string

  @Prop({ type: Boolean, default: false })
  readonly selectMultiple!: boolean

  @Prop({ type: Boolean, default: false })
  readonly enableAddition!: boolean

  selected: Item[] = []
  items: Item[] = []
  expanded = false
  focus = false
  value: string | number = ''
  pagination = {
    total_pages: 4,
    current_page: 1,
  }

  insideDroplist = false
  loading = false

  mounted() {
    this.setItems()
    if (!this.selectMultiple && this.selected.length) {
      this.value = this.selected[0].id as number
      this.setInputValue(this.selected[0].title)
    }
    this.saveDataHandler(EventTypes.AUTO)
  }

  blurHandler(pl: InputPayload) {
    if (!this.insideDroplist) {
      this.saveDataHandler(EventTypes.AUTO)
    }
  }

  validationHandler() {
    if (this.required && !this.value) {
      this.value = ''
      this.setInputValue('')
      this.setError('Поле обязательно для заполнения')
    }
    this.saveDataHandler(EventTypes.AUTO)
  }

  focusHandler() {
    const input = this.$refs.input as Input
    input.setError('')
    if (this.items.length) this.openDropList()
    this.focus = true
  }

  clearClickHandler() {
    this.inputHandler(this.name, '', EventTypes.MANUAL)
    this.setInputValue('')
    if (!this.selectMultiple) this.selected = []
    this.items = this.markSelected(this.items, this.selected)
    this.saveDataHandler(EventTypes.MANUAL)
    // if (!this.expanded) this.validationHandler();
  }

  expandClickHandler() {
    this.expanded ? this.closeDropList() : this.openDropList()
  }

  inputHandler(name: string, value: string, type: EventTypes) {
    if (value !== this.value) {
      this.value = value
      this.searchRequest(this.value)
    }
  }

  scrollEndHandler() {
    const current = this.pagination.current_page
    const total = this.pagination.total_pages
    if (current < total) {
      this.pageRequest(current + 1)
    }
  }

  openDropList() {
    this.expanded = true
    document.addEventListener('click', this.outsideClickTracker)
  }

  closeDropList() {
    this.expanded = false
    this.insideDroplist = false
    this.validationHandler()
    // this.blurHandler();
    document.removeEventListener('click', this.outsideClickTracker)
  }

  setItems() {
    this.selected = copy(this.listSelected)
    this.items = this.markSelected(copy(this.listItems), this.selected)
  }

  setInputValue(value: InputValue) {
    const input = this.$refs.input as Input
    input.val = value
    input.unmaskedValue = value
    input.input.value = value as string
    input.setError('')
    input.checkForValid()
    input.checkForErrors()
    input.input.scrollLeft = 0
  }

  setError(str: string) {
    const input = this.$refs.input as Input
    input.setError(str)
  }

  markSelected(array: Item[], selected: Item[]) {
    return array.map((item) => {
      const match = selected.findIndex((sel) => sel.id === item.id)
      item.selected = match > -1
      return item
    })
  }

  itemSelectHandler(item: Item, remove: boolean) {
    this.insideDroplist = false
    this.selectMultiple
      ? this.itemSelectMultiple(item)
      : this.itemSelectSingle(item)
  }

  itemSelectSingle(item: Item) {
    this.items.forEach((el) => {
      el.selected = false
    })
    item.selected = true
    this.selected = [item]
    this.setInputValue(item.title)
    this.value = item.title
    this.returnValue(this.name, item.id, EventTypes.MANUAL)
    this.closeDropList()
  }

  itemRemove(item: Item) {
    arRemove(this.selected, item, 'id')
    const itemIndex = this.items.findIndex((el) => el.id === item.id)
    if (itemIndex > -1) this.items[itemIndex].selected = false
    this.validationHandler()
    this.saveDataHandler(EventTypes.MANUAL)
  }

  itemSelectMultiple(item: Item) {
    if (item.selected) {
      arRemove(this.selected, item, 'id')
    } else {
      this.selected.push(item)
    }
    item.selected = !item.selected
  }

  resetHandler() {
    const input = this.$refs.input as Input
    input.reset()
  }

  saveDataHandler(type: EventTypes) {
    if (this.selectMultiple) {
      this.saveMultiple(type)
    } else {
      this.saveSingle(type)
    }
  }

  saveMultiple(type: EventTypes) {
    const value = this.selected.map((item: Item) => item.id)
    if (value.length && value[0]) {
      this.returnValue(this.name, value.length ? value : null, type)
    } else {
      this.returnValue(this.name, this.value, type)
    }
  }

  saveSingle(type: EventTypes) {
    this.returnValue(this.name, this.value, type)
  }

  outsideClickTracker(e: MouseEvent) {
    const wrapper = this.$refs.wrapper as HTMLDivElement
    const isOutside = wrapper && !wrapper.contains(e.target as Node)
    if (isOutside) {
      this.closeDropList()
    }
  }

  async searchRequest(search: string) {
    const res = await this.requestWrapper({
      method: 'GET',
      url: this.endpoint,
      params: {
        search,
      },
    })
    if (res.data) {
      const { items } = res.data.data
      const { meta } = res.data
      if (meta) this.pagination = meta.pagination
      if (items) {
        this.items = this.markSelected(items, this.selected)
        if (items.length) {
          this.openDropList()
        } else {
          this.closeDropList()
        }
      }
      const list = this.$refs.list as List
      if (list) list.toTop()
    }
  }

  async pageRequest(page: number) {
    const res = await this.requestWrapper({
      method: 'GET',
      url: this.endpoint,
      params: {
        search: this.value,
        page,
      },
    })
    if (res.data) {
      const { items } = res.data.data
      const { meta } = res.data
      if (meta) this.pagination = meta.pagination
      if (items && items.lenth) {
        this.items.push(...this.markSelected(items, this.selected))
      }
    }
  }

  async requestWrapper(request: IBasicObject) {
    try {
      this.loading = true
      const res = await axios(request)
      this.loading = false
      return res
    } catch (err) {
      this.loading = false
      console.warn(err)
      return err
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  width: 100%;
  position: relative;
  /*padding: 40px;*/
}

.drop-controls {
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 4px;
}
</style>
