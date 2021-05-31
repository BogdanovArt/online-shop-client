<template>
  <div id="slider-wrapper">
    <v-container>
      <client-only>
        <carousel
          v-bind="options"
          :navigate-to="current"
          @page-change="(n) => (current = n)"
        >
          <template v-for="(item, i) in content">
            <slide :key="i" class="slider-item">
              <n-link :to="item.link || ''">
                <img :src="item.image.src" :alt="item.image.name" />
              </n-link>
            </slide>
          </template>
        </carousel>
      </client-only>
    </v-container>
    <transition name="fade">
      <button
        v-show="current > 0"
        class="slider-control-prev"
        @click="current--"
      >
        <svg viewBox="0 0 129 129" style="filter: drop-shadow(0 0 4px gray)">
          <path
            d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
          />
        </svg>
      </button>
    </transition>
    <transition name="fade">
      <button
        v-show="content.length - 1 > current"
        class="slider-control-next"
        @click="current++"
      >
        <svg viewBox="0 0 129 129" style="filter: drop-shadow(0 0 4px gray)">
          <path
            d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
          />
        </svg>
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { ISlide } from '~/types/main'

@Component
export default class Slider extends Vue {
  current = 0
  options = {
    perPage: 1,
  }

  @Prop({ type: Array, default: () => [] })
  readonly content!: ISlide[]
}
</script>

<style lang="scss" scoped>
#slider-wrapper {
  position: relative;
  margin-top: 20px;
  // height: 450px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slider-control-prev,
  .slider-control-next {
    color: #fff;
    position: absolute;
    display: flex;
    align-items: center;
    padding: 15px;
    z-index: 99;
    outline: none !important;
    top: 0;
    bottom: 0;
    svg {
      width: 60px;
      height: 60px;
      fill: #fff;
      transform: scaleX(0.75);
    }
    &:hover {
      svg {
        fill: #3399ff;
      }
    }
  }
  .slider-control-next {
    right: 0;
  }
  .slider-control-prev {
    left: 0;
    svg {
      transform: rotate(180deg) scaleX(0.75);
    }
  }
  .slider-item {
    max-height: 450px;
  }
  @media (max-width: 767px) {
    margin-top: 0;
  }
}

@media screen and (max-width: $sm) {
  #slider-wrapper {
    // height: 300px;
    .slider-item {
      max-height: 300px;
    }
    .slider-control-prev,
    .slider-control-next {
      display: none;
    }
  }
}
</style>
