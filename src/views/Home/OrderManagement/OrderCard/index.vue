<template>
    <el-card shadow="hover" class="mb-8">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item>
                <template #title class="">
                    订单编号：{{ order.id }}
                    <el-button type="danger" size="small" class="ml-auto" @click="agree"> 退票</el-button>
                </template>
                <span class="mr-10">用户：{{ order.orderUser.username }}</span>
                <span class="mr-10">电影：{{ order.orderSchedule.scheduleMovie.movieCName }}</span>
                <span class="mr-10">电影院：{{ order.orderSchedule.scheduleHall.hallCinema.cinemaName }}</span>
                <span class="mr-10">影厅：{{ order.orderSchedule.scheduleHall.hallName }}</span>
                <span class="mr-10">场次：{{ order.orderSchedule.scheduleStartTime }}</span>
                <span class="mr-10">座位：{{ order.orderPosition }}</span>
                <span class="mr-10">取件码：xxxxxxxxxxx</span>
                <span class="mr-10">价格：{{ order.orderPrice }}</span>
                <span class="mr-10">订单时间：{{ order.orderTime.replace('T', ' ').slice(0, 19) }}</span>
            </el-collapse-item>

        </el-collapse>
    </el-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { apiAgreeForRefund } from '@/api/order'
import { ElMessage } from 'element-plus'
import useStore from '@/store';

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}

interface Order {
    id: string
    userId: number
    scheduleId: number
    orderPosition: string
    orderState: number
    orderPrice: number
    orderTime: string
    orderUser: any
    orderSchedule: any
}
type Props = {
    order: Order
}
const { order } = defineProps<Props>()
console.log(order);

const { orderStore } = useStore()
const agree = () => {
    apiAgreeForRefund({ id: order.id }).then(() => {
        ElMessage({
            showClose: true,
            message: '同意退票',
            type: 'success',
        })
        orderStore.reqGetRefundOrder()

    })
}

</script>

<style scoped>
:deep() .el-collapse-item__content {
    @apply flex flex-wrap
}

:deep() .el-collapse-item__header .el-collapse-item__arrow {
    @apply m-0 ml-8
}
</style>