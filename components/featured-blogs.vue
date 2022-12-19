<template>
    <div
      class="
        max-w-full
        md:ml-[13px]
        ml-0
        md:max-w-[400px]
        xl:min-w-[400px]
        min-w-[300px]
        overflow-hidden
        top-0
      "
    >
      <div
        class="
          title
          font-bold
          text-xl
          md:text-lg md:mb-0
          mb-[10px]
          font-source-serif-pro
        "
      >
        Bài viết nổi bật
      </div>
      <div
        v-for="blog in blogs"
        :key="blog.id"
        class="
          mt-1
          md:mt-0
          flex
          rounded-md
          overflow-hidden
          mb-[10px]
          border-[1px]
          pr-2
        "
      >
        <NuxtLink
          class="
            shrink-0
            bg-black
            flex flex-row
            items-center
            justify-center
          "
          :to="`/blog/${blog.slug}`"
        >
          <nuxt-img
            :src="blog.thumbnail"
            class="
              h-[100px]
              md:h-[80px] md:pt-0 md:pl-0
              aspect-[4/3]
              object-contain
            "
            format="webp"
            height="200"
            :alt="blog.title"
          />
        </NuxtLink>
        <div
          class="
            flex flex-col
            justify-evenly
            md:ml-[11px]
            ml-[15px]
            md:mr-[14px]
            py-[10px]
            md:py-1.5
          "
        >
          <NuxtLink
            :to="`/blog/${blog.slug}`"
            class="
              line-clamp-2
              md:h-[40px]
              h-[56px]
              md:mb-[9px]
              mb-[2px]
              md:leading-5
              font-bold
              md:font-source-serif-pro
              leading-7
            "
          >
            {{ blog.title }}
          </NuxtLink>
          <div class="text-sm text-neutral-400">
            <span class="md:contents hidden">
              {{ blog.authorName }}
            </span>
            <span class="md:contents hidden"> · </span>
            <span class="text-xs md:text-sm">
              {{ blog.createdAt }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    const props = defineProps({
      blogs: { type: Array, required: true, default: null },
    })
  
  </script>
  