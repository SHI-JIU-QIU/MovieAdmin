<template>
    <div class="mt-10">
        <OrderCard v-if="orderList" v-for="item in orderList" :order="item"></OrderCard>

    </div>
</template>

<script setup lang='ts'>
import OrderCard from '../OrderCard/index.vue'
import useStore from '@/store';
import { ref } from 'vue';


const { orderStore } = useStore()
let orderList = ref()
orderStore.reqGetAllOrder().then(() => {
    orderList.value = orderStore.orderList
})


</script>

<style scoped>
</style>