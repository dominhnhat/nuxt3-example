import type ImageOptions from '@nuxt/image-edge'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        compressPublicAssets: true,
        preset: 'vercel-edge'
    },
    css: ['~/assets/css/tailwind.css'],
    modules: [
        '@nuxt/image-edge',
        'nuxt-graphql-client'
    ],

    runtimeConfig: {
        public: {
            GQL_HOST: 'https://api-listing-staging.maico.vn/graphql/',
        },
    },
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    image: {
        provider: "cloudimage",
        cloudimage: {
            token: "arwotbilpr",
            cdnURL: "https://arwotbilpr.cloudimg.io/",
        },
    },
})
