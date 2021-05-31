<template>
  <div :class="['search-form', active && 'search-form--active']">
    <input
      ref="input"
      :value="query"
      class="search-form__input"
      type="search"
      placeholder="Я ищу..."
      @input="(e) => $emit('input', e.target.value)"
      @focus="$emit('open')"
    />
    <button
      :disabled="$device.isMobile ? false : !active"
      class="search-form__submit"
      @click="searchRoute"
    >
      <search-icon />
    </button>
    <transition name="side-slide">
      <template v-if="active">
        <button
          type="button"
          class="search-form__cancel"
          @click="$emit('close')"
        >
          Отмена
        </button>
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import { SearchIcon, CloseIcon } from '~/components/icons'
import { Routes } from '~/types/enums'

@Component({ components: { SearchIcon, CloseIcon } })
export default class Search extends Vue {
  @Prop({ type: String, default: '' })
  readonly query!: string

  @Prop({ type: Boolean, default: false })
  readonly active!: boolean

  @Watch('active')
  stateWatcher(state: boolean) {
    if (!state) (this.$refs.input as HTMLInputElement).blur()
  }

  searchRoute() {
    if (this.query) {
      this.$router.push({
        path: Routes.search,
        query: {
          search: this.query,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  &__input {
    width: 100%;
    height: 100%;
    padding: 8px 35px 9px 8px;
    border: 1px solid #3399ff;
    border-radius: 4px;
    font-size: 18px;
    color: #1e354c;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: $hint-color;
    }
  }
  &__submit {
    margin-left: -45px;
    padding: 0 13px;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #3399ff;
  }
  &__cancel {
    position: absolute;
    top: 0;
    right: -100px;
    width: 80px;
    height: 40px;
    background: #fa0000;
    color: #fff;
    margin-left: 10px;
    border-radius: 4px;
    font-size: 14px;
    transition: $trns;
    &:focus {
      outline: none;
    }
  }
}
@media screen and (max-width: $md) {
  .search-form {
    display: flex;
    align-items: center;
  }
}
</style>
