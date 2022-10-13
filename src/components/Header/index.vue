<template>
    <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-menu-item index="0">LOGO</el-menu-item>
            <div class="flex-grow" />

            <el-sub-menu index="1">
                <template #title>
                    <el-avatar :src="avatar" />
                </template>
                <el-menu-item index="1-1" class="flex justify-center" v-if="Object.keys(user).length != 0"
                    @click="exit"> 退出登录</el-menu-item>

            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import useStore from '@/store';
import router from '@/router';

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const { userStore } = useStore()
const exit = () => {
    userStore.$reset()
    if (localStorage.getItem(`piniaAdmin-userStore`)) {
        localStorage.removeItem("piniaAdmin-userStore")
    }
    router.push({
        name: 'Login'
    })

}

const user = userStore.user
let avatar = computed(() => {
    if (user.avatar) {
        return `data:image/jpg;base64,` + user.avatar
    }
    else {
        return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
})



</script>

<style scoped>
</style>