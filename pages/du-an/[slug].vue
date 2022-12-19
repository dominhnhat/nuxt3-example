<template>
    <div v-if="project" class="mt-5 w-full sm:px-36 px-5 color-stone-900">
      <div class="flex flex-col-reverse md:flex-col">
        <div>
          <div class="text-sm font-medium sm:font-normal color-999999 mt-2.5 sm:mt-0 mb-1.5 sm:mb-2.5">
            <a href="#">Dự án</a>
            /
            <a href="">TP HCM</a>
            /
            <a class="font-bold color-stone-900" href="#">{{ project.projectName }}</a>
          </div>
          <h1 class="font-bold font-size-project-name mb-1 mt-2 color-stone-900" @click="HandleScroll()">
            {{ project.projectName }}
          </h1>
          <p class="mb-4 text-sm font-normal mt-1 color-stone-900">
            Đường {{ project.address.street }}, Quận {{ project.address.district }}, TP
            {{ project.address.city }}
          </p>
        </div>
        <div>
          <NewGallery
            class="inline h-72 w-full"
            :items="gallery"
            :navigation="true"
            :galleryIndex="2"
            :alt="`Dự án ${project.projectName}`"
          />
        </div>
      </div>
      <div class="md:flex mt-1 sm:mt-5">
        <div class="">
          <div class="flex justify-between sm:justify-start sticky-table-of-content z-10 sm:pt-0 pt-3 color-stone-900">
            <button
              :class="isTargetingTableOfContents.isTargetingOverview ? activeTableContent : tableContentStyles"
              @click="ScrollToOverview()"
            >
              <p class="font-size-table-of-contents font-bold">Tổng quan</p>
              <p class="text-sm font-medium sm:block hidden">Tổng quan dự án</p>
            </button>
            <button
              :class="isTargetingTableOfContents.isTargetingGround ? activeTableContent : tableContentStyles"
              @click="ScrollToGround()"
            >
              <p class="font-size-table-of-contents font-bold">Mặt bằng</p>
              <p class="text-sm font-medium sm:block hidden">Tổng thể về dự án</p>
            </button>
            <button
              :class="isTargetingTableOfContents.isTargetingLocation ? activeTableContent : tableContentStyles"
              @click="ScrollToLocation()"
            >
              <p class="font-size-table-of-contents font-bold">Vị trí</p>
              <p class="text-sm font-medium sm:block hidden">Bản đồ dự án</p>
            </button>
            <button
              :class="isTargetingTableOfContents.isTargetingRentAndSell ? activeTableContent : tableContentStyles"
              @click="ScrollToSellAndRent()"
            >
              <p class="font-size-table-of-contents font-bold">Bán và cho thuê</p>
              <p class="text-sm font-medium sm:block hidden">Giá bán và cho thuê</p>
            </button>
          </div>
          <div ref="Overview" class="color-stone-900" style="scroll-margin-top: 135px">
            <h2 class="font-medium font-size-overview sm:my-6 my-2.5">Tổng quan</h2>
            <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 h-auto">
              <div class="block">
                <p class="re-properties-frame">
                  <span class="re-properties flex w-7/12">Giá</span>
                  <span class="re-properties-content max-w-40"> {{ project.price }} triệu/m2 </span>
                </p>
                <p class="re-properties-frame">
                  <span class="re-properties flex w-7/12">Diện tích</span>
                  <span class="re-properties-content max-w-40"> {{ project.acreage }} ha </span>
                </p>
                <p class="re-properties-frame">
                  <span class="re-properties flex w-7/12">Chủ đầu tư</span>
                  <span class="re-properties-content max-w-40">
                    {{ project.investor.investorName }}
                  </span>
                </p>
              </div>
              <div class="block">
                <p class="re-properties-frame">
                  <span class="re-properties flex w-7/12">Số căn hộ</span>
                  <span class="re-properties-content max-w-40"> {{ project.numberOfApartments }} căn </span>
                </p>
                <p class="re-properties-frame">
                  <span class="re-properties flex w-7/12">Số tòa</span>
                  <span class="re-properties-content max-w-40"> {{ project.numberOfBuildings }}</span>
                </p>
                <p class="re-properties-frame">
                  <span class="re-properties flex w-7/12">Pháp lý</span>
                  <span class="re-properties-content max-w-40"> {{ project.juridical }}</span>
                </p>
              </div>
            </div>
            <!-- <div :class="`${showReadMoreStyles} ql-editor`" style="overflow: hidden" v-html="project.projectPost" /> -->
            <show
              v-if="typeof projectPost != 'string'"
              :class="`${showReadMoreStyles}`"
              style="overflow: hidden"
              :editorContent="projectPost"
            />
            <div v-else :class="`${showReadMoreStyles}`" style="overflow: hidden" v-html="project.projectPost" />
          </div>
          <button class="flex items-center ml-auto mr-auto mt-6 mb-8" @click="setReadMoreActiveState()">
            <p class="text-center text-lg read-more mr-2">
              {{ readMoreContent }}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="readMoreArrowStyle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <!-- <expand-panel title="Thông tin chi tiết" class="mt-2.5 sm:mt-9">
            <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6 h-auto" style="column-gap: 20px">
              <p v-for="(item, index) in detailInfors" :key="index" class="re-properties-frame-panel">
                <span class="re-properties-panel flex w-1/2">{{ item.name }}</span>
                <span class="re-properties-content max-w-50">{{ item.content }}</span>
              </p>
            </div>
          </expand-panel>
          <expand-panel title="Tiện ích nội khu" class="sm:mt-9 mt-3.5">
            <div>
              <ul class="list-none grid grid-cols-2 gap-2 text-sm font-medium color-stone-900">
                <li v-for="utility in project.utilities.listOfUtilities" :key="utility" class="mb-2.5">
                  <p>{{ utility }}</p>
                </li>
              </ul>
            </div>
          </expand-panel>
          <expand-panel title="Chủ đầu tư" class="mt-3.5 sm:mt-9">
            <div class="flex sm:flex-row flex-col">
              <div class="flex justify-start">
                <div class="sm:w-full w-2/5">
                  <nuxt-img
                    v-if="project.investor.image"
                    class="sm:w-40 sm:h-40 w-24 h-24"
                    :src="project.investor.image"
                    :alt="`Chủ đầu tư ${project.investor.investorName}`"
                  />
                </div>
                <h3 class="text-lg font-bold sm:hidden block max-w-60">
                  {{ project.investor.investorName }}
                </h3>
              </div>
              <div class="sm:ml-12 grow">
                <h3 class="text-lg font-bold sm:block hidden">
                  {{ project.investor.investorName }}
                </h3>
                <div class="">
                  <div class="text-lg flex justify-start mt-3">
                    <p class="font-medium w-2/5">Số dự án</p>
                    <P class="max-w-60">
                      {{ project.investor.numberOfProjects }} sắp mở - {{ project.investor.numberOfProjects }} đang mở bán
                      - {{ project.investor.numberOfProjects }} đã bàn giao
                    </P>
                  </div>
                  <div class="text-lg flex justify-start mt-1.5">
                    <p class="font-medium w-2/5">Thành lập</p>
                    <P class="max-w-60">
                      {{ formatDate(new Date(project.investor.foundedTime)) }}
                    </P>
                  </div>
                  <div class="text-lg flex justify-start mt-3">
                    <p class="font-medium w-2/5">Số điện thoại</p>
                    <P class="max-w-60">
                      {{ project.investor.phoneNumber }}
                    </P>
                  </div>
                </div>
              </div>
            </div>
          </expand-panel> -->
          <h2 ref="Ground" class="font-size-project-ground mt-12 sm:mt-6 mb-1.5 sm:mb-4" style="scroll-margin-top: 135px">
            Mặt bằng dự án
          </h2>
          <div class="max-w-[900px]" v-if="project.designDrawings != null && project.designDrawings.length > 0">
            <Gallery
              class="w-full"
              :items="project.designDrawings.map(c => c.drawingPath)"
              :itemsWithCaption="
                project.designDrawings.map(x => {
                  return { src: x.drawingPath, caption: x.drawingTitle };
                })
              "
              :galleryIndex="1"
              :alt="`Mặt bằng dự án ${project.projectName}`"
              :withCaptionOutside="true"
              :navigation="true"
              :rewind="false"
            />
          </div>
          <div v-else-if="project.masterPlan">
            <nuxt-img
              class="h-48 sm:h-96 w-full"
              :src="project.masterPlan"
              :alt="`Mặt bằng dự án ${project.projectName}`"
            />
          </div>
          <h2
            ref="Location"
            style="scroll-margin-top: 135px"
            class="font-medium text-2xl sm:text-3xl mt-6 mb-1.5 sm:mb-4"
          >
            Vị trí dự án {{ project.projectName }}
          </h2>
          <iframe
            :src="project.address.googleMapLocation"
            style="border: 0"
            class="h-52 sm:h-64 w-full"
            allowfullscreen=""
            loading="lazy"
          />
          <div class="text-[#374151]">
            <h3 class="mt-[30px] mb-[10px] text-2xl font-bold md:hidden font-source-serif-pro">Đánh giá và nhận xét</h3>
            <h3 class="mt-[30px] mb-[10px] text-2xl font-bold hidden md:block font-source-serif-pro">
              Cư dân review về dự án
            </h3>
            <nuxt-link
              :to="`/review-du-an/${route.params.slug}`"
              class="flex md:p-0 p-[20px] md:border-0 border rounded border-[#D4D4D4]"
            >
              <nuxt-img
                v-if="project.images.length > 0"
                class="
                  md:w-[127px] md:min-w-[127px]
                  min-w-[102px]
                  w-[102px]
                  md:h-[124px]
                  h-[100px]
                  md:rounded-l-md
                  object-cover
                "
                :src="project.images[0]"
                alt="hình ảnh review"
                width="200"
                height="200"
                :modifiers="{ func: 'boundmin' }"
                format="webp"
              />
              <div
                class="
                  md:border-y md:border-r md:rounded-r-md md:border-[#D4D4D4]
                  w-full
                  md:pl-[20px]
                  pl-[10px]
                  md:pt-[10px]
                  pt-0
                "
              >
                <h3
                  class="
                    md:text-base
                    font-bold font-source-serif-pro
                    leading-[20px]
                    md:leading-6
                    max-h-[40px]
                    md:max-h-[20px] md:mb-[6px]
                    mb-[13px]
                    overflow-hidden
                  "
                >
                  Nghe cư dân đánh giá và nhận xét về chung cư
                  {{ project.projectName }}
                </h3>
                <p class="ml-auto text-base text-orange-700 flex items-center text-sm">
                  Xem review
                  <svg
                    class="ml-[5px]"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.599609 8.75916L4.59961 5.00018L0.599609 1.24121"
                      stroke="#C2410C"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.599609 8.75916L4.59961 5.00018L0.599609 1.24121"
                      stroke="#C2410C"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
        <featured-blogs
          :blogs="featuredBlogs"
          class="flex-shrink-[99] text-[#374151] h-fit md:mt-[91px] mt-[30px] top-[91px] sticky lg:block"
        />
      </div>
      <div class="divide-y w-full border-b-2 mt-8 mb-12 hidden sm:block" />
      <!-- <div ref="SellAndRent" style="scroll-margin-top: 54px">
        <recommended-posts
          v-if="recommendedPosts !== undefined && recommendedPosts.length > 0"
          title="Bán và Thuê"
          class="mb-4 recommend-posts"
          :posts="recommendedPosts"
        />
      </div> -->
      <!-- <near-area-recommended
        v-if="areaProjects !== undefined && areaProjects.length > 0 && !$apollo.loading"
        class="mb-4"
        :projects="areaProjects"
      /> -->
    </div>
  </template>
<script setup>
    import { Gallery } from '#components';
    import { NewGallery } from '#components';

    const route = useRoute()
    const { data: projectsData } = await useAsyncGql({
        operation: 'GetProjectOverview',
        variables: {
          slug: route.params.slug,
        },
    })
    if(projectsData.value.projects.length == 0){
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }

    const project = computed(() =>{
      return projectsData.value.projects[0] ?? undefined
    })

    const {data: featuredBlogsData} = await useAsyncGql({
      operation: 'GetBlogs',
      variables:{
        projectId: project?.value.id,
      }
    })
    const featuredBlogs = computed(() =>{
      return featuredBlogsData.value.blogsWithPagination.items.map(b => ({
          id: b.id,
          thumbnail: b.thumbnail,
          authorName: b.author.name,
          title: b.pageInfor.title,
          createdAt: this.formatDate(new Date(b.createdAt)),
          slug: b.pageInfor.slug,
        }));
    })
    const readMoreContent = ref('Xem thêm');
    const showReadMoreStyles = ref('mt-1.5 text-lg overflow-hidden max-h-80')
    const tableContentStyles = ref('text-center sm:mr-6 table-of-content color-A3A3A3 transition-02s-all')
    const activeTableContent = ref('active-table-contents text-center sm:mr-6 transition-02s-all')
    const readMoreArrowStyle = ref('rotate-arrow-down h-6 w-6')
    const isTargetingTableOfContents = reactive({
        isTargetingOverview: true,
        isTargetingGround: false,
        isTargetingLocation: false,
        isTargetingRentAndSell: false,
      })
    const projectPost = computed(() => {
      const project = projectsData.value.projects[0];

      try {
          if (project.projectPost == null) {
              project.projectPost = "";
          } else project.projectPost = JSON.parse(project.projectPost);
      } catch {
          project.projectPost = project.projectPost;
      }
      return project.projectPost;
        
    })
    const gallery = computed(() => {
        const items = project.value.images;
        return items?.sort(function (x, y) {
            return x.includes("mp4") ? 1 : y.includes("mp4") ? -1 : 0;
        });
    })
    const detailInfors = computed(() => {
        const items = [
            { name: "Giá", content: this.project.price + " triệu/m²" },
            { name: "Diện tích", content: this.project.acreage + " m²" },
            {
            name: "Chủ đầu tư",
            content: this.project.investor.investorName,
            },
            {
            name: "Số căn hộ",
            content: this.project.numberOfApartments,
            },
            { name: "Số tòa", content: this.project.numberOfBuildings },
            { name: "Pháp lý", content: this.project.juridical },
        ];
        this.project.tempProjectInfors.forEach(element => {
            const tempInfor = {
            name: element.inforName,
            content: element.inforContent,
            };
            items.push(tempInfor);
        });
        return items;
    })
    onMounted(() => {
        window.addEventListener("scroll", HandleScroll);
    })
    function formatDate(time) {
        const day = time.getDate();
        // getMonth trả về tháng bắt đầu từ 0 đến 11
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        return `${padZero(day)}/${padZero(month)}/${year}`;

        function padZero(num) {
        return num.toString().padStart(2, "0");
    }
    };
    function HandleScroll() {
      if (
        this.$refs.Overview.getBoundingClientRect().y >= 120 &&
        this.$refs.Overview.getBoundingClientRect().y <= 500
      ) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingOverview = true;
      } else if (
        this.$refs.Ground.getBoundingClientRect().y >= 120 &&
        this.$refs.Ground.getBoundingClientRect().y <= 500
      ) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingGround = true;
      } else if (
        this.$refs.Location.getBoundingClientRect().y >= 120 &&
        this.$refs.Location.getBoundingClientRect().y <= 500
      ) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingLocation = true;
      } else if (
        this.$refs.SellAndRent.getBoundingClientRect().y >= 120 &&
        this.$refs.SellAndRent.getBoundingClientRect().y <= 500
      ) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingRentAndSell = true;
      }
    };
    function setFalseTableOfContents() {
      this.isTargetingTableOfContents.isTargetingOverview = false;
      this.isTargetingTableOfContents.isTargetingGround = false;
      this.isTargetingTableOfContents.isTargetingLocation = false;
      this.isTargetingTableOfContents.isTargetingRentAndSell = false;
    };
    function HandleShowDropDownContent() {
      this.isDroppingContent = !this.isDroppingContent;
    };
    function ScrollToOverview() {
      const el = this.$refs.Overview;

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    function ScrollToGround() {
      const el = this.$refs.Ground;

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    function ScrollToLocation() {
      const el = this.$refs.Location;

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    function ScrollToSellAndRent() {
      const el = this.$refs.SellAndRent;

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    function setReadMoreActiveState() {
      this.readMoreButtonIsActive = !this.readMoreButtonIsActive;
      if (this.readMoreButtonIsActive === true) {
        this.readMoreContent = "Thu gọn";
        this.readMoreArrowStyle = "rotate-arrow-up h-6 w-6";
        this.showReadMoreStyles = "mt-1.5 text-lg";
        this.hideReadMoreStyles = "delay-1000";
      } else {
        this.readMoreContent = "Xem thêm";
        this.readMoreArrowStyle = "rotate-arrow-down h-6 w-6";
        this.showReadMoreStyles = "max-h-80 overflow-hidden mt-1.5 text-lg";
        this.hideReadMoreStyles = "hidden delay-1000";
      }
    };
</script>