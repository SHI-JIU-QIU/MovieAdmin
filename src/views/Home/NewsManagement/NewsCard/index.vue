<template>
    <el-card shadow="hover" @click="toNewsDetail">
        <span
            class="text-xl block pb-3 font-semibold text-gray-600 mb-4 border-b-0.5 border-gray-200">{{ news.consultTitle }}</span>
        <p class="text-sm text-gray-500 ">
            {{ news.consultContent }}
        </p>
    </el-card>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter()
interface News {
    consultAnnouncer: string
    consultContent: string
    consultPicture?: string
    consultScore: number
    consultState?: any
    consultTitle: string
    id: number
    img: string
}
type Props = {
    news: News
}

const props =  defineProps<Props>()

const toNewsDetail = () => {
    router.push({
        name: 'NewsDetail',
        query:{
            id: props.news.id
        }
    })
}

</script>

<style scoped>
p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp:5;
    -webkit-box-orient: vertical;
}
</style>