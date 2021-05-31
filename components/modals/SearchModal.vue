<template>
  <div class="search-modal">
    <div class="search-modal__content">
      <div class="result-block container-baza">
        <template v-if="showResults">
          <transition name="fade">
            <template v-if="fetching">
              <section class="result-block__loader">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </section>
            </template>
          </transition>
          <template v-if="results.products.length">
            <div class="result-block__items">
              <h2 class="result-block__title">Товары</h2>
              <products-list :items="results.products" :query="query" />
            </div>
          </template>
          <template v-if="results.categories.length">
            <div class="result-block__items">
              <h2 class="result-block__title">Разделы</h2>
              <category-list :items="results.categories" :query="query" />
            </div>
          </template>
        </template>
        <template v-else>
          <empty-search :fetched="fetched" :fetching="fetching" />
        </template>
      </div>
      <button-fluid
        v-if="showResults"
        class="result-block__button-all"
        :href="`/search${query ? '?search=' + query : ''}`"
      >
        Смотреть все результаты
      </button-fluid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import EmptySearch from './blocks/EmptySearch.vue'
import ProductsList from './blocks/ProductsList.vue'
import CategoryList from './blocks/CategoryList.vue'

import ButtonFluid from '~/components/buttons/ButtonFluid.vue'

import { ISearchResults } from '~/types/search'

@Component({
  components: { ButtonFluid, EmptySearch, ProductsList, CategoryList },
})
export default class Search extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly results!: ISearchResults

  @Prop({ type: String, default: '' })
  readonly query!: string

  @Prop({ type: Boolean, default: false })
  readonly fetched!: boolean

  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean

  get showResults() {
    return this.results.products.length || this.results.categories.length
  }
}
</script>

<style lang="scss" scoped>
.search-modal {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  &__content {
    display: flex;
    flex-direction: column;
    padding-top: 95px;
    background: #fff;
    overflow-y: hidden;
  }
}

.search-block {
  display: flex;
  max-width: 750px;
  margin: 0 auto;
  &__cancel {
    width: 80px;
    background: #fa0000;
    color: #fff;
    margin-left: 10px;
    border-radius: 4px;
    &:focus {
      outline: none;
    }
  }
}

.result-block {
  display: flex;
  flex-direction: row-reverse;
  padding: 40px 0;
  width: 100%;
  &__loader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    z-index: 10;
  }
  &__items {
    flex-basis: 50%;
    max-width: 50%;
    &:not(:last-of-type) {
      border-right: 1px solid #dde1e4;
      padding-right: 20px;
    }
    &:not(:first-of-type) {
      padding-left: 20px;
    }
  }
  &__title {
    text-align: center;
    margin-bottom: 35px;
  }
  &__button-all {
    color: #fff !important;
    margin-top: auto;
  }
}

.search-stub {
  &__icon {
    width: 64px;
    height: 64px;
    fill: #c7ccd2;
  }
}

.search-stub {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  &__icon {
    width: 65px;
    height: 65px;
    fill: #c7ccd2;
  }
  &__text {
    margin: 15px 0 0;
    font-size: 24px;
    font-weight: 500;
    color: #c7ccd2;
  }
}
@media screen and (max-width: $md) {
  .search-modal {
    display: none;
  }
}
</style>
