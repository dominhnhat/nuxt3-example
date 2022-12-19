<template>
    <div>
        <ssr-carousel>
            <div v-for="item in items" class="slide" :key="item">
                <img src="item" alt="">
            </div>
        </ssr-carousel>
    </div>
</template>
<script setup>
const props = defineProps({
    items: {
        default: []
    }
})
</script>