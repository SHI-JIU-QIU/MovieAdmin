<template>
    <div class="menu flex flex-col items-center pt-8">
        <el-radio-group v-model="isCollapse" class="mb-20px mx-4">
            <el-radio-button :label="true">
                <el-icon>
                    <ArrowLeft />
                </el-icon>
            </el-radio-button>
            <el-radio-button :label="false">
                <el-icon>
                    <ArrowRight />
                </el-icon>
            </el-radio-button>
        </el-radio-group>
        <el-menu :default-active="route.name" class="el-menu-vertical-demo overflow-auto" :collapse="isCollapse"
            @open="handleOpen" @close="handleClose">
            <el-menu-item index="1" @click="toCharts">
                <el-icon>
                    <icon-menu />
                </el-icon>
                <template #title>主页</template>
            </el-menu-item>
            <el-sub-menu index="UserList">
                <template #title>
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>用户
                    </span>
                </template>
                <el-menu-item index="UserList" class="" @click="toUserManagement">用户管理</el-menu-item>


            </el-sub-menu>
            <el-sub-menu index="3">

                <template #title>
                    <el-icon>
                        <VideoCamera />
                    </el-icon><span>电影</span>
                </template>

                <el-menu-item index="MovieList" class="" @click="toMovieManagement">电影管理</el-menu-item>
                <el-menu-item index="AddMovie" class="" @click="toAddMovie">添加电影</el-menu-item>



            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <el-icon>
                        <School />
                    </el-icon><span>影院</span>
                </template>

                <el-menu-item index="CinemaList" class="" @click="toCinemaManagement">影院管理</el-menu-item>
                <el-menu-item index="AddCinema" class="" @click="toAddCinema">添加影院</el-menu-item>


            </el-sub-menu>
            <el-sub-menu index="5">

                <template #title>
                    <el-icon>
                        <Tickets />
                    </el-icon><span>资讯</span>
                </template>

                <el-menu-item index="NewsList" class="" @click="toNewsManagement">资讯管理</el-menu-item>
                <el-menu-item index="AddNews" class="" @click="toAddNews">添加资讯</el-menu-item>

            </el-sub-menu>
            <el-menu-item index="OrderList" @click="toOrderManagement">
                <el-icon>
                    <Ticket />
                </el-icon>
                <template #title>订单</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import {
    Tickets,
    Menu as IconMenu,
    User,
    VideoCamera,
    School,
    Ticket,
    ArrowLeft,
    ArrowRight
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const router = useRouter()
const toUserManagement = () => {
    router.push({
        name: 'UserManagement'
    })
}
const toMovieManagement = () => {
    router.push({
        name: 'MovieManagement'
    })
}

const toCinemaManagement = () => {
    router.push({
        name: 'CinemaManagement'
    })
}

const toOrderManagement = () => {
    router.push({
        name: 'OrderManagement'
    })
}

const toCharts = () => {
    router.push({
        name: 'Charts'
    })
}
const toAddMovie = () => {
    router.push({
        name: 'AddMovie'
    })
}
const toAddCinema = () => {
    router.push({
        name: 'AddCinema'
    })
}

const toNewsManagement = () => {
    router.push({
        name: 'NewsManagement'
    })
}

const toAddNews = () => {
    router.push({
        name: 'AddNews'
    })
}


</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>