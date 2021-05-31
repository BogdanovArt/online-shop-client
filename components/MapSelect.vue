<template>
  <section id="map-select-block" :class="[readonly && 'readonly']">
    <transition name="fade-standard">
      <div v-if="fetching" class="preloader">
        <v-progress-circular indeterminate color="green" />
      </div>
      <div v-else-if="!items.length" class="preloader no-data">
        Геоданные отсутствуют
      </div>
    </transition>
    <div ref="map" :class="mapClass"></div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import { ymapLoader } from '~/utils/mapLoader'
import { IPlacemark } from '~/types'

interface IMapEntity {
  add: any
  removeAll: any
  events: any
  balloon: any
  getBounds: any
  setBounds: any
  setCenter: any
  getById: any
  destroy: () => void
  geoObjects: IMapEntity
  objects: IMapEntity
}

@Component
export default class MapSelect extends Vue {
  fetching = false
  mapInstance: IMapEntity | null = null
  objManager: IMapEntity | null = null

  @Prop({ type: Array, default: () => [] })
  readonly items!: IPlacemark[]

  @Prop({ type: String, default: 'yandex-map' })
  readonly mapClass!: string

  @Prop({ type: Array, default: () => [] })
  readonly coords!: number[]

  @Prop({ type: Boolean, default: false })
  readonly readonly!: boolean

  get markers() {
    return {
      type: 'FeatureCollection',
      features: this.items.map((item, index) => {
        return {
          type: 'Feature',
          id: item.id,
          geometry: { type: 'Point', coordinates: item.coordinates },
        }
      }),
    }
  }

  get controls() {
    return this.readonly ? [] : ['zoomControl']
  }

  @Watch('markers')
  async markersWatcher() {
    this.setMarkers()
    await this.centerMap()
  }

  mounted() {
    this.mapLoaded()
  }

  beforeDestroy() {
    if (this.mapInstance) this.mapInstance.destroy()
  }

  async mapLoaded() {
    await ymapLoader()
    this.mapInstance = this.createMap()
    this.mapInstance?.events.add('balloonclose', this.onBalloonClose)
    this.mapInstance?.events.add('balloonopen', this.onBalloonOpen)
    this.setMarkers()
    await this.centerMap()
    this.fetching = false
    this.$emit('init')
  }

  createMap() {
    return new (window as any).ymaps.Map(
      this.$refs.map,
      {
        center: this.coords,
        zoom: 10,
        controls: this.controls,
      },
      {
        balloonPanelMaxMapArea: 0,
        maxZoom: 17,
        maxAnimationZoomDifference: 17,
        avoidFractionalZoom: false,
      }
    )
  }

  setMarkers() {
    if (this.mapInstance) {
      this.mapInstance.geoObjects.removeAll()
      this.objManager = new (window as any).ymaps.ObjectManager({
        clusterize: false,
      })
      if (this.objManager) {
        this.mapInstance.geoObjects.add(this.objManager)
        this.objManager.objects.events.add('click', this.objectEventHandler)
        this.objManager.add(this.markers)
      }
    }
  }

  async objectEventHandler(e: any) {
    const id = e.get('objectId')
    const mark = this.markers.features.find((mark) => mark.id === id)
    await this.centerMarker(mark)
  }

  async centerMap(map = this.mapInstance) {
    if (this.objManager && map) {
      const BOUND = this.objManager.getBounds()
      if (BOUND) await map.setBounds(BOUND, { duration: 200 })
    }
  }

  async centerMarker(marker: any) {
    await this.mapInstance?.setCenter(marker.geometry.coordinates, 17)
  }

  onBalloonClose() {
    this.centerMap()
  }

  onBalloonOpen() {
    const button = document.getElementById('balloon-button')
    if (button) button.addEventListener('click', this.balloonAction)
  }

  balloonClose() {
    if (this.objManager && this.mapInstance) {
      this.objManager.objects.balloon.close()
    }
  }

  balloonAction({ target }: any) {
    const item = JSON.parse(target.dataset.item)
    const action = target.dataset.action
    this.$emit('action', action, item)
  }

  async openBalloon(item: IPlacemark) {
    const marker = this.objManager?.objects.getById(item.id)
    if (marker) {
      await this.centerMarker(marker)
      this.objManager?.objects.balloon.open(item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
#map-select-block {
  position: relative;
  z-index: 10;
  min-height: 400px;
  .yandex-map {
    height: 400px;
  }
  &.readonly {
    pointer-events: none;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .preloader {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 20px;
    color: #27a676;
    z-index: 2;
    &.no-data {
      background-color: rgba(255, 255, 255, 0.678);
    }
  }
  &.contained {
    margin: 0 auto;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
  }
}
@media screen and (max-width: $md) {
  #map-select-block {
    &.contained {
      border-radius: 0;
    }
    &.card-mode {
      &:after {
        box-shadow: none;
      }
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
