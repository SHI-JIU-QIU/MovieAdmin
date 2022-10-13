<template>
    <router-view></router-view>
</template>

<script setup lang='ts'>
import useStore from '@/store'



const { userStore } = useStore()
let beginTime = 0; //开始时间
let differTime = 0; //时间差
const interval = 5; //时间间隔 - 5ms
window.onunload = function () {
    differTime = new Date().getTime() - beginTime;
    if (differTime <= interval) {
        userStore.$reset()
        localStorage.removeItem('piniaAdmin-userStore')
    } else {
        console.log("这是刷新");
    }
};
window.onbeforeunload = function () {
    beginTime = new Date().getTime();
};


</script>

<style>
html,
body,
#app {
    height: 100%;
    width: 100%;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
    display: none;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

/* ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
} */

.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
    min-width: 120px !important;
}
</style>