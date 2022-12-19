import lightgallery from "lightgallery.js";
import "lightgallery.js/dist/css/lightgallery.min.css";
import "lg-thumbnail.js";
import "lg-video.js";
import "lg-hash.js";

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    nuxtApp.vueApp.use(lightgallery);
})