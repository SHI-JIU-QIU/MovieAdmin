<template>
    <LoginRegisterForm :config="config" formStyle="flex-1 p-10" itemStyle="text-xl" :modelValue="user"
        @update:modelValue="setValue" ref="R">
        <template #bottom>

           

        </template>

    </LoginRegisterForm>
</template>
  
<script setup lang="ts">
import LoginRegisterForm from '@/components/LoginRegisterForm/index.vue'
import config from './loginConfig'
import { reactive, ref, onMounted, toRaw, toRef, computed } from 'vue'
import { useRouter } from 'vue-router'


type User = {
    username: string
    password: string
}

let user = reactive<User>({
    username: '',
    password: ''
})

let R = ref(null)
const setValue = (value: string, key: keyof User) => {
    console.log(value, key);
    user[`${key}`] = value
}

const router = useRouter()
const toRegister = () => {
    router.push({
        name: 'Register'
    })
}

onMounted(() => {

})




</script>
  
<style>

</style>
  