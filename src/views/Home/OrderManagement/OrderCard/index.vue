<template>
    <el-card shadow="hover" class="mb-8">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item >
                <template #title class="">
                    订单编号：
                    <el-button type="danger" size="small" class="ml-auto"> 退票</el-button>
                </template>
                <span class="mr-4">用户：xxxxxxxxxxx</span>
                <span class="mr-4">电影：xxxxxxxxxxxx</span>
                <span class="mr-4">电影院：xxxxxxxxxxxxxxxxxxxxxx</span>
                <span class="mr-4">影厅：xxxxxxxxxxx</span>
                <span class="mr-4">场次：xxxxxxxxxxxxx</span>
                <span class="mr-4">取件码：xxxxxxxxxxx</span>
                <span class="mr-4">订单时间：xxxxxxxxxxxxxxxxxxxxxx</span>
            </el-collapse-item>

        </el-collapse>
    </el-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}



</script>

<style scoped>
:deep() .el-collapse-item__content {
    @apply flex flex-wrap
}
:deep() .el-collapse-item__header .el-collapse-item__arrow{
    @apply m-0 ml-8
}
</style>