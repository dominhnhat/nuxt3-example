<template>
    <div class="blog-content">
      <div v-if="numberOfH2.length && showHeading" class="table-of-content border mx-auto rounded-md">
        <div class="content-table-item flex justify-center items-center h-[40px] border-b border-gray-200 mb-2">
          <div class="content-table-item font-bold font-roboto">Nội dung bài viết</div>
        </div>
        <div v-for="(block, index) in numberOfH2" :key="block.id" class="content-table-item ml-3 cursor-pointer">
          <div
            class="content-table-item cursor-pointer p-1 text-sky-600"
            v-if="block.data.level === 2"
            @click="scrollToView(block.id)"
            v-html="index + 1 + '. ' + block.data.text"
          ></div>
        </div>
      </div>
      <template v-for="(block, index) in editorContent.blocks">
        <div :key="block.id" v-if="block.type === 'image'">
          <nuxt-img :src="block.data.file.url" :alt="block.data.caption" format="webp" />
        </div>
        <h2 v-else-if="block.type === 'header' && block.data.level === 1" :key="block.id" v-html="block.data.text"></h2>
  
        <h2
          v-else-if="block.type === 'header' && block.data.level === 2"
          :key="block.id"
          :id="block.id"
          :ref="block.id"
          v-html="block.data.text"
        ></h2>
  
        <h3 v-else-if="block.type === 'header' && block.data.level === 3" :key="block.id" v-html="block.data.text"></h3>
  
        <h4 v-else-if="block.type === 'header' && block.data.level === 4" :key="block.id" v-html="block.data.text"></h4>
  
        <h5 v-else-if="block.type === 'header' && block.data.level === 5" :key="block.id" v-html="block.data.text"></h5>
  
        <h6 v-else-if="block.type === 'header' && block.data.level === 6" :key="block.id" v-html="block.data.text"></h6>
  
        <p
          v-else-if="block.type === 'paragraph'"
          class="my-5 text-gray-900 text-lg"
          :style="{
            textAlign: block.data.alignment ? block.data.alignment : 'left',
          }"
          :key="block.id"
          v-html="block.data.text"
        ></p>
  
        <div v-else-if="block.type === 'list' && block.data.style === 'unordered'" :key="index">
          <ul class="my-3">
            <li v-for="item in block.data.items" :key="item.content">
              <span v-html="item.content"></span>
            </li>
          </ul>
        </div>
  
        <div v-else-if="block.type === 'list' && block.data.style === 'ordered'" :key="block.id">
          <ol class="my-3">
            <li v-for="item in block.data.items" :key="item.content">
              <span v-html="item.content"></span>
              <div v-if="item.items.length > 0">
                <ol class="my-3 ml-4">
                  <li v-for="childItem in item.items" :key="childItem.content">
                    <span v-html="childItem.content"></span>
                  </li>
                </ol>
              </div>
            </li>
          </ol>
        </div>
      </template>
    </div>
  </template>
  
<script setup>
    const props = defineProps({
        editorContent: {
            type: Object,
            required: true,
        },
        showHeading: {
            type: Boolean,
            default: true,
        },
    })
    const numberOfH2 = computed(() => {
        return props.editorContent.blocks.filter((block) => block.type === 'header' && block.data.level === 2)
    })
    function noFollowExternalInBlogContentLink() {
      let blogContent = document.querySelector(".blog-content");
      let listOfLink = blogContent.querySelectorAll("a");
      for (let value of Object.values(listOfLink)) {
        if (!value.href.includes("maico.vn")) {
          value.rel = "nofollow";
        }
      }
    };
    function scrollToView(link) {
      const el = this.$refs[link][0];
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    onMounted(() => {
      noFollowExternalInBlogContentLink();
    });
</script>

<style scoped>
    h1 {
    font-family: "Source Serif Pro";
    font-weight: 600;
    }
    a {
    color: green !important;
    text-decoration: underline;
    }
    h2 {
    display: block;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    scroll-margin-top: 90px;
    font-family: "Source Serif Pro";
    font-weight: 600;
    }

    h3 {
    display: block;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-family: "Source Serif Pro";
    font-weight: 600;
    }

    h4 {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    font-family: "Source Serif Pro";
    font-weight: 600;
    }

    h5 {
    display: block;
    margin-top: 1.33em;
    margin-bottom: 1.33em;
    margin-left: 0;
    margin-right: 0;
    font-family: "Source Serif Pro";
    font-weight: 600;
    }

    h6 {
    display: block;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
    margin-left: 0;
    margin-right: 0;
    font-family: "Source Serif Pro";
    font-weight: 600;
    }


    img {
    margin: auto;
    }

    ul {
    list-style-type: disc;
    list-style-position: inside;
    }

    ol {
    list-style-type: decimal;
    list-style-position: inside;
    }

    ::v-deep a {
    text-decoration: underline;
    }
    h1 {
    font-weight: 700;
    font-size: 41px;
    line-height: 51px;
    font-family: "Source Serif Pro";
    }
</style>
  