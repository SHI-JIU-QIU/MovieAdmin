<template>
    <div class="grid grid-cols-2 gap-10 mt-10">
        <NewsCard v-if="newsList" v-for="item in newsList" :news="item"></NewsCard>
    </div>
</template>

<script setup lang='ts'>
import NewsCard from '../NewsCard/index.vue'
import useStore from '@/store';
import { ref } from 'vue';
const { newsStore } = useStore()


let newsList = ref()
newsStore.reqGetAllNews().then(() => {
    newsList.value = newsStore.newsList
})

newsStore.$subscribe(()=>{
     newsList.value = newsStore.newsList
})


</script>

<style scoped>
</style>