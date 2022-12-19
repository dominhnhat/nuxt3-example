<template>
    <div>
      <div id="light-gallery" class="relative">
        <div :class="`dynamic-${galleryIndex} relative`">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides" style="background-color: aliceblue;">
              <li
                v-for="(item, index) in items"
                :key="index"
                class="glide__slide media_container"
              >
                <!-- <div
                  :style="`background-image: url(${
                    item.includes('.mp4') ? imgUrl : item
                  }); filter: blur(100px); -webkit-filter: blur(100px);height: 400px;`"
                ></div> -->
                <video v-if="item.includes('mp4')" controls :src="item" preload="none" loading="lazy" />
                <nuxt-img v-else format="webp" :src="item" :alt="`${alt} hình ${index}}`" height="400" loading="lazy" />
              </li>
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls" v-show="!!navigation" @click="handleMove">
            <button class="glide__arrow glide__arrow--left" style="font-size: 69px" data-glide-dir="<">&lsaquo;</button>
            <button class="glide__arrow glide__arrow--right" style="font-size: 69px" data-glide-dir=">">&rsaquo;</button>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]" v-show="!!bullets">
            <button
              v-for="(item, index) in items"
              :key="index"
              class="glide__bullet"
              :data-glide-dir="`=${index}`"
            ></button>
          </div>
        </div>
      </div>  
    </div>
  </template>
  
  <script setup>
  import Glide from "@glidejs/glide"
  // import 'lightgallery.js'
  
    const props = defineProps({
      items: {
        default: [],
      },
      alt: {
        default: "",
      },
      itemsWithContentType: {},
      itemsWithCaption: {},
      withCaptionOutside: {
        default: false,
      },
      bullets: {},
      galleryIndex: {
        default: "gallery",
      },
      thumb: {},
      navigation: {
        default: true,
      },
      rewind: {
        default: true,
      },
    }) 
    const imgUrl = ref("https://weblisting.ss-hn-1.bizflycloud.vn/apartment-resource/00800a5f-eb0c-4c6f-93ad-1c28e03b70dc/17-01-2022_0953/image/z3116547105303_32a851d4f5d44bca12e64ac1a09e6a6d.jpg")
    const index = ref(null)
    const el = ref("")
    const gallery = ref([])
    const activeSlideIndex = ref(0)
  
    onMounted(() => {
      initGlide();
    })
    
    function handleMove() {
        activeSlideIndex.value = window.glide.index;
      }
    
    function initGlide() {
        let options = {
          perView: 1,
          gap: 0,
        };
        if (!props.rewind) {
          options.type = "slider";
          options.rewind = false;
        }
        window.glide = new Glide(".dynamic-" + props.galleryIndex, options).mount();
        Array.from(document.querySelectorAll(".glide__arrow .glide__arrow--left")).forEach(el => {
          el.addEventListener("click", e => {
            window.glide.go("=" + e.target.dataset.index);
          });
        });
        Array.from(document.querySelectorAll(".glide__arrow .glide__arrow--right")).forEach(el => {
          el.addEventListener("click", e => {
            window.glide.go("=" + e.target.dataset.index);
          });
        });
    }
  </script>
  <style scoped lang="scss">
  .media_container {
    height: 400px !important;
    position: relative;
  }
  .media_container > video,
  .media_container > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    object-fit: contain;
    @media (max-width: 768px) {
      max-height: 100%;
      max-width: 100%;
      width: auto;
      height: auto;
    }
  }
  .group-thumb {
    position: relative;
    width: 90%;
    overflow: hidden;
    padding-top: 1rem;
    margin: auto;
  }
  
  #thumb-gallery {
    .glide__track {
      overflow: visible;
    }
    .glide__slide {
      width: 100px !important;
      height: 100px;
      position: relative;
      & > img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      &--active {
        border: 1px solid #22c55e;
      }
    }
  }
  </style>
  <style lang="scss" scoped>
  @import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
  @import "node_modules/@glidejs/glide/src/assets/sass/variables";
  .#{$glide-class} {
    $this: &;
    $se: $glide-element-separator;
    $sm: $glide-modifier-separator;
    &#{$se}arrow {
      position: absolute;
      display: block;
      top: 50%;
      z-index: 2;
      color: white;
      text-transform: uppercase;
      padding: 9px 12px;
      // background-color: transparent;
      // border: 2px solid rgba(255, 255, 255, 0.5);
      // border-radius: 4px;
      // box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);
      text-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);
      opacity: 1;
      cursor: pointer;
      transition: opacity 150ms ease, border 300ms ease-in-out;
      transform: translateY(-50%);
      line-height: 1;
      height: 100%;
      width: 100px;
      &:focus {
        outline: none;
      }
      &:hover {
        border-color: white;
        box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);
      }
      &#{$sm}left {
        left: 0;
      }
      &#{$sm}right {
        right: 0;
      }
      &#{$sm}disabled {
        opacity: 0.33;
      }
    }
    &#{$se}bullets {
      position: absolute;
      z-index: 2;
      bottom: 2em;
      left: 50%;
      display: inline-flex;
      list-style: none;
      transform: translateX(-50%);
    }
    &#{$se}bullet {
      background-color: rgba(255, 255, 255, 0.5);
      width: 9px;
      height: 9px;
      padding: 0;
      border-radius: 50%;
      border: 2px solid transparent;
      transition: all 300ms ease-in-out;
      cursor: pointer;
      line-height: 0;
      box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);
      margin: 0 0.25em;
      &:focus {
        outline: none;
      }
      &:hover,
      &:focus {
        border: 2px solid white;
        background-color: rgba(255, 255, 255, 0.5);
      }
      &#{$sm}active {
        background-color: white;
      }
    }
    &#{$sm}swipeable {
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
    }
    &#{$sm}dragging {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }
  </style>
  