<template>
  <li ref="wrapper" class="header-menu__item">
    <nuxt-link :to="item.link" @click="toggle">
      <span class="header-menu__toggler">
        {{ item.title }}
      </span>
    </nuxt-link>
    <!-- <transition name="fade">
      <ul v-if="opened" ref="drop" class="header-menu__dropdown">
        <li
          v-for="(el, index) in list"
          :key="index"
          class="header-menu__dropdown-item"
        >
          <router-link :to="el.link" class="header-menu__dropdown-link">
            {{ el.title }}
          </router-link>
        </li>
      </ul>
    </transition> -->
  </li>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import Chevron from '~/components/icons/Chevron.vue'

import { IDropItem } from '~/types/core'

@Component({
  components: { Chevron },
})
export default class DropDownList extends Vue {
  opened = false

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IDropItem

  open() {
    this.opened = true
    document.addEventListener('click', this.outsideClickTracker)
  }

  @Watch('$route')
  close() {
    this.opened = false
    document.removeEventListener('click', this.outsideClickTracker)
  }

  outsideClickTracker(e: MouseEvent) {
    const wrapper = this.$refs.wrapper as HTMLDivElement
    const isOutside = wrapper && !wrapper.contains(e.target as Node)
    if (isOutside) {
      this.close()
    }
  }

  toggle() {
    // return this.opened ? this.close() : this.open()
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.header-menu {
  &__toggler {
    cursor: pointer;
    user-select: none;
  }
  &__icon {
    width: 8px;
    height: 8px;
    fill: #fff;
    margin-left: 5px;
  }
  &__text {
    cursor: pointer;
  }
  &__dropdown {
    /*display:none;*/
    position: absolute;
    top: 35px;
    z-index: 1;
    margin: 0;
    padding: 20px;
    background: #fff;
    color: #000;
    border: 1px solid $main-color;
    border-radius: 4px;
    box-shadow: $shadow-main;
    &::after {
      content: '';
      position: absolute;
      top: -8px;
      left: calc(50% - 10px);
      width: 15px;
      height: 15px;
      border-top: 1px solid $main-color;
      border-left: 1px solid $main-color;
      border-radius: 1px;
      background: #fff;
      transform: rotate(45deg);
    }
  }
  &__item {
    position: relative;
    list-style: none;
    margin-right: 20px;
    a {
      color: #fff;
      text-decoration: none;
    }
    &:focus {
      outline: none;
      .header-menu__dropdown {
        /*display: block;*/
      }
    }
  }
  &__dropdown-item {
    list-style: none;
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
  &__dropdown-link {
    display: block;
    line-height: 18px;
    color: $text-color;
    text-decoration: none;
    &:hover,
    &:focus {
      color: $text-color;
      text-decoration: underline;
    }
  }
}
</style>
