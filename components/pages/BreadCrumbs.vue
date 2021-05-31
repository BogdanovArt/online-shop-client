<template>
  <div class="breadcrumbs">
    <ul v-if="list">
      <template v-for="(el, ind) in list">
        <li
          :key="ind"
          style="flex: 0 1 auto"
          itemscope
          itemprop="itemListElement"
          itemtype="http://schema.org/ListItem"
        >
          <meta itemprop="position" :content="ind + 1" />
          <template v-if="el.url">
            <nuxt-link
              :to="el.url"
              itemscope
              itemtype="http://schema.org/Thing"
              itemprop="item"
            >
              <div class="crumb-item">
                <span
                  itemprop="name"
                  v-html="query ? highLighter(el.name, query) : el.name"
                ></span>
              </div>
            </nuxt-link>
          </template>
          <div v-else class="crumb-item">
            <v-icon v-if="el.icon">
              {{ el.icon }}
            </v-icon>
            <span>{{ el.name }}</span>
          </div>
        </li>
        <li v-if="ind + 1 < list.length" :key="el.name" class="crumb-divider">
          &#8226;
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { highLighter } from '~/utils'

export default {
  name: 'BreadCrumbs',
  props: {
    list: { type: Array, default: () => [] },
    query: { type: String, default: '' },
  },
  data() {
    return {
      highLighter,
    }
  },
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  ul {
    list-style: none;
    padding: 0;
    margin-top: 0;
    display: inline-flex;
    justify-content: flex-start;
    min-width: 100%;
    max-width: 100%;
    li {
      min-width: 17px;
      max-width: 100%;
      overflow: hidden;
    }
    a {
      text-decoration: none;
    }
    a .crumb-item {
      color: $hint-color;
      i {
        color: $hint-color;
      }
      &:hover {
        color: $hover-color;
        i {
          color: $hover-color;
        }
      }
    }
    .crumb-item {
      display: flex;
      align-items: baseline;
      height: 100%;
      font-size: 14px;
      color: $hint-color;
    }
    .crumb-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $hint-color;
      line-height: 14px;
    }
  }
  span {
    display: block;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @media only screen and (max-width: 768px) {
    overflow-x: auto;
    ul {
      max-width: none;
      min-width: auto;
      li {
        overflow: visible;
      }
    }
  }
}
</style>
