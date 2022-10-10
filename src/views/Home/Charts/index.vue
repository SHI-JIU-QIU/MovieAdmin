<template>
    <div class="h-full flex">
        <div class="left w-70%" flex flex-wrap justify-between>
            <UserChart></UserChart>
            <HotPlayChart></HotPlayChart>
            <OrderChart></OrderChart>
        </div>

        <div class="right flex flex-col flex-1 ml-4">
            <el-card shadow="hover" class="w-100% mb-4 text-3xl text-center"> {{ time }}</el-card>
            <RankChart></RankChart>
        </div>
    </div>
</template>

<script setup lang='ts'>

import UserChart from './UserChart/index.vue';
import HotPlayChart from './HotPlayChart/index.vue';
import OrderChart from './OrderChart/index.vue';
import RankChart from './RankChart/index.vue';
import { ref } from 'vue';

let time = ref()

const showTime = () => {
    var date = new Date();

    // 年月日
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // 时分秒
    var hour: any = date.getHours();
    if (hour < 10) {
        hour = String('0' + hour)
    }
    var minute: any = date.getMinutes();
    if (minute < 10) {
        minute = String('0' + minute)
    }
    var second: any = date.getSeconds();
    if (second < 10) {
        second = String('0' + second)
    }
    // 实时显示
    time.value = year + '/' + month + '/' + day + " " + hour + ':' + minute + ':' + second

}
setInterval(showTime, 1000);


</script>

<style scoped>
</style>