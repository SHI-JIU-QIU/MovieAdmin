<template>

    <ManagementHeader></ManagementHeader>

    <router-view></router-view>






</template>

<script setup lang='ts'>
import { ref } from 'vue'

import ManagementHeader from '@/components/ManagementHeader/index.vue';

const input1 = ref('')
</script>

<style scoped >
.el-input {
    @apply w-40%
}
</style>