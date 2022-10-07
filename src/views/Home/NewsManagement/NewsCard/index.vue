<template>
    <el-card shadow="hover" @click="toNewsDetail">
        <span class="text-xl block pb-3 font-semibold text-gray-600 mb-4 border-b-0.5 border-gray-200">{{
                news.consultTitle
        }}</span>
        <p class="text-sm text-gray-500 ">
            {{ news.consultContent }}
        </p>
        <div class="mt-5">
            <el-button type="danger" class="" @click.stop="removeNews">下架资讯</el-button>
        </div>
    </el-card>
</template>

<script setup lang='ts'>
import { apiDeleteNews } from '@/api/news';
import { useRouter } from 'vue-router';

import { ElMessage } from 'element-plus'
import useStore from '@/store';
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

const props = defineProps<Props>()

const toNewsDetail = () => {
    router.push({
        name: 'NewsDetail',
        query: {
            id: props.news.id
        }
    })
}

const { newsStore } = useStore()
const removeNews = () => {
    apiDeleteNews({ id: props.news.id }).then(() => {
        ElMessage({
            showClose: true,
            message: '下架成功',
            type: 'success',
        })
        newsStore.reqGetAllNews()
    })
}

</script>

<style scoped>
p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

:deep() .el-card__body {
    @apply box-border h-100% flex flex-col justify-between
}
</style>