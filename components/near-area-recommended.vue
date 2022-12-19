<template>
    <div>
      <div class="lg:mx-0 sm:mx-5 mx-0 flex justify-between items-end">
        <h3 class="font-bold text-lg mt-7 sm:mt-8">
          Dự án gần khu vực
        </h3>
        <div class="hidden md:block">
          <button
            class="text-grat-400 px-3 py-2 border rounded-md"
            @click="scrollLeft"
          >
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3692 14.8582L0.726562 7.80924L10.3692 0.760254"
                stroke="#C4C4C4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="text-grat-400 px-3 py-2 border rounded-md"
            @click="scrollRight"
          >
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.44968 14.8582L11.0923 7.80924L1.44968 0.760254"
                stroke="#C4C4C4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
  
      <div
        ref="recommendedPostsContainer"
        class="
          mx-0
          sm:mx-5
          lg:mx-0
          mt-2
          sm:mt-3
          no-scrollbar
          p-2.5
          md:px-4 md:py-6
          border
          flex
          space-x-3
          md:space-x-6
          overflow-auto
        "
      >
        <nuxt-link
          v-for="project in formatedProjects"
          :key="project.id"
          :to="`/du-an/${project.slug}`"
        >
          <div
            class="
              post
              border border-stone-200
              rounded-md
              overflow-hidden
            "
          >
            <nuxt-img
              :src="project.srcimage"
              :alt="`Dự án ${project.projectName}`"
              class="post-img object-cover aspect-[4/3]"
              width="210"
              height="160"
              :modifiers="{ func: 'boundmin' }"
              loading="lazy"
              format="webp"
            />
            <div class="mx-2 my-2">
              <h3 class="font-bold truncate ...">
                {{ project.projectName }}
              </h3>
              <div
                class="
                  mt-1
                  flex
                  items-center
                  justify-start
                  text-neutral-400 text-xs
                "
              >
                <p>{{ project.price }} triệu/m²</p>
                <p>· {{ project.acreage }} ha</p>
              </div>
              <div
                class="
                  mt-1
                  flex
                  items-center
                  justify-between
                  color-A3A3A3
                  text-xs
                "
              >
                <h4>
                  {{ project.address }}
                </h4>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </template>
  
<script setup>
    const props = defineProps({
        projects: {
            type: Array,
            required: true,
        },
    });
    const formatedProjects = computed(() => {
        return props.projects.map((project) => {
            return {
                srcimage: project.images[0] ?? "",
                projectName: project.projectName,
                address: project.address.district + ", " + project.address.city,
                slug: project.pageInfors.filter(e => {
                    return (
                    !e?.slug.includes("ban") &&
                    !e?.slug.includes("cho-thue")
                    );
                })[0]?.slug,
                id: project.id,
            };
        });
    });
    function scrollLeft() {
      const container = this.$refs.recommendedPostsContainer;
      container.scroll({
        left: container.scrollLeft - 400,
        behavior: "smooth",
      });
    };
    function scrollRight() {
      const container = this.$refs.recommendedPostsContainer;
      container.scroll({
        left: container.scrollLeft + 400,
        behavior: "smooth",
      });
    };
</script>
  
<style scoped>
    .post-img {
    width: 100%;
    }
    .post {
    width: 205px;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
    display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    }
    .color-A3A3A3 {
    color: #a3a3a3;
    }
</style>
  