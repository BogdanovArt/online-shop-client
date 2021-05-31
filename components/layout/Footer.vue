<template>
  <footer class="footer">
    <div v-if="!$device.isMobile" class="footer__nav-wrap">
      <v-container>
        <ul class="footer__nav">
          <li
            v-for="(column, ind) in footer.links"
            :key="ind"
            class="footer__nav-item"
          >
            <FooterNavColumn :column="column" />
          </li>
        </ul>
      </v-container>
    </div>
    <div class="footer__contacts-wrap">
      <v-container>
        <div class="footer-contacts">
          <div class="footer-contacts__phones">
            <template v-for="phone in footer.phones">
              <a
                :key="phone"
                rel="nofollow"
                href="tel:78005553535"
                class="footer-contacts__phone link-hover"
              >
                {{ phone }}
              </a>
            </template>
          </div>
          <div class="social-links">
            <template v-for="(el, i) in footer.social">
              <a :key="i" :href="el.link" class="social-links__item">
                <img :src="el.image.src" :alt="el.image.name" />
              </a>
            </template>
          </div>
        </div>
      </v-container>
    </div>
    <div class="footer__copyright-wrap">
      <v-container>
        <div class="copyright">
          <template v-for="(el, i) in footer.copyrights">
            <div :key="i" class="copyright-block" v-html="el" />
          </template>
        </div>
      </v-container>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

import FooterNavColumn from './FooterNavColumn.vue'

import { IFooter, IHeader } from '~/types/core'

@Component({ components: { FooterNavColumn } })
export default class Footer extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly header?: IHeader

  @Prop({ type: Object, default: () => ({}) })
  readonly footer?: IFooter
}
</script>

<style lang="scss" scoped>
.footer {
  .wrap {
    @media (max-width: 758px) {
      padding: 0 8px;
    }
  }
  &__nav-wrap {
    background-color: #f8f9fa;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);
  }
  &__nav {
    display: flex;
    list-style: none;
    padding: 0;
    padding-top: 15px;
    @media (max-width: 991px) {
      display: none;
    }
  }
  &__nav-item {
    flex-basis: 20%;
    padding-right: 10px;
  }
  &__contacts-wrap {
    background-color: #39f;
    padding: 13px 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);
  }
  &__copyright-wrap {
    padding: 20px 0;
    background-color: #2879c9;
  }
}

.footer-contacts {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__phones {
    font-size: 18px;
    line-height: 14px;
    @media (max-width: 359px) {
      font-size: 17px;
    }
  }
  &__phone {
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
  }
}

.social-links {
  display: flex;
  width: 115px;
  &__item {
    flex-basis: (1/3) * 100%;
    margin-right: 20px;
  }
  img {
    display: block;
  }
  :last-child {
    margin-right: 0;
  }
}

.copyright {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  line-height: 14px;
  color: #fff;
  @media (max-width: 359px) {
    font-size: 17px;
  }
  span {
    margin-right: 5px;
  }
  &__link {
    color: inherit;
  }
  a {
    color: #fff;
  }
}

@media screen and (max-width: $sm) {
  .footer-contacts {
    padding: 0 20px;
    &__phones {
      > *:not(:first-child) {
        display: none;
      }
    }
  }
  .copyright {
    padding: 0 20px;
    flex-direction: column;
    text-align: center;
    > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
