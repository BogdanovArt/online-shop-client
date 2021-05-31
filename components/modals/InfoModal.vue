<template>
  <transition name="slide-fade">
    <div class="registration-info">
      <div class="registration-info__head">
        <button class="registration-info__back" @click="close">
          <svg class="registration-info__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408 408">
            <path d="M408 178.5H96.9L239.7 35.7 204 0 0 204l204 204 35.7-35.7L96.9 229.5H408V178.5z" />
          </svg>
        </button>

        <h2 class="registration-info__title">
          Информация
        </h2>
      </div>
      <div class="registration-info__content">
        <div class="registration-info__icon-wrap">
          <svg class="registration-info__big-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <path d="M54,4a6,6,0,0,1,6,6V54a6,6,0,0,1-6,6H10a6,6,0,0,1-6-6V10a6,6,0,0,1,6-6H54m0-4H10A10,10,0,0,0,0,10V54A10,10,0,0,0,10,64H54A10,10,0,0,0,64,54V10A10,10,0,0,0,54,0Z" />
            <path d="M24.75,45.16h4v-17h-4V24h10.5V45h4v4l-14.5.12ZM35.25,18H28.41V12.84h6.84Z" />
          </svg>
        </div>

        <div class="registration-info__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid iure officia placeat,
          reprehenderit sit unde veritatis! Atque debitis deserunt eligendi fugit inventore non,
          tenetur ut veniam veritatis! Alias architecto asperiores dolorum eaque optio porro, quis quo.
          Adipisci aperiam atque aut autem beatae corporis cupiditate debitis distinctio ducimus explicabo
          fugiat hic id inventore laudantium, libero magni minima molestiae mollitia nam, natus nisi non
          officia officiis perferendis possimus praesentium quas qui ratione recusandae rem repellat
          repellendus sed similique temporibus unde ut, vel? Aperiam culpa doloribus ducimus, error esse
          id ipsam laudantium nostrum quam quas sint sit temporibus tenetur veritatis voluptatem.
          Dolorum, tenetur.
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    }
  }

}
</script>

<style lang="scss" scoped>

  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateX(-1000px);
    opacity: 0;
  }

  .registration-info {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    &__head {
      position: relative;
      padding: 15px 20px;
      box-shadow: 0px 3px 5px 0px rgba(30, 53, 76, 0.1);
    }
    &__title {
      font-size: 18px;
      line-height: 18px;
      font-weight: 500;
      text-align: center;
    }
    &__back {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 0 20px;
      &:focus {
        outline: none;
      }
    }

    &__icon {
      width: 15px;
      height: 15px;
      fill: #3399ff;
    }
    &__content {
      padding: 20px;
    }
    &__icon-wrap {
      text-align: center;
      margin-bottom: 10px;
    }
    &__big-icon {
      width: 30px;
      height: 30px;
      fill: #3399ff;
    }
  }
</style>
