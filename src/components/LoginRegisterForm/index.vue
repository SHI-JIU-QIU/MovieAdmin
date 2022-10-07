<template>

    <!-- <video id="videoElement" autoplay muted loop class="w-120% fixed -z-1 -top-34 left-50% transform -translate-x-50%">
        <source src="@/assets/bgv.mp4">
    </video> -->



    <el-card shadow="always"
        class="max-w-screen-md min-h-100 mx-auto flex flex-row border-0 relative top-50% transform -translate-y-50%">
        <div :style="`background-image:url(${bg2}) `" class="h-full bg-cover bg-center w-1/4"></div>

        <el-form ref="ruleFormRef" :model="modelValue" status-icon  label-position="top" hide-required-asterisk="true"
            :class="formStyle">

            <el-form-item v-for="item in config.formItems" :key="item.field" :label="item.label" :rules="item.rules"
                :prop="item.field" :class="itemStyle">
                <el-input v-if="item.type==='input'||'password'" :show-password="item.type === 'password'"
                    :modelValue="modelValue[`${item.field}`]" @update:modelValue=" valueChange($event,item.field)" />
            </el-form-item>

            <el-form-item class="flex mt-6">
                <el-button type="primary" @click="submitForm(ruleFormRef)" class="flex-1">Submit</el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
            <slot name="bottom"></slot>

        </el-form>
    </el-card>


</template>
  
<script setup lang="ts">
import bg2 from "@/assets/bg2.jpg"
import { reactive, ref } from "vue"
import type { FormRules, FormInstance } from 'element-plus'
import { useRouter ,useRoute} from 'vue-router'
import { ElNotification } from 'element-plus'
import useStore from '@/store/index'
import { IForm } from './type'


type Props = {
    config: IForm
    itemStyle?: string
    formStyle?: string
    modelValue: any
}

let props=defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const valueChange = (value: string, key: string) => {
    emit('update:modelValue', value, key)
    console.log(value, key);
}


const ruleFormRef = ref<FormInstance>();


const { userStore } = useStore()

const router = useRouter()
const route = useRoute()



const submitForm = (formEl: FormInstance | undefined) => {
    console.log(formEl);

    if (!formEl) return;

    formEl.validate((valid) => {
        if (valid) {
            console.log("submit!");
           if(route.path.includes('login')){
            userStore.reqLogin(props.modelValue).then(
                (flag: boolean) => {
                    if (flag) {
                        router.push({
                            name: 'Home'
                        })
                        ElNotification({
                            title: 'Success',
                            message: '登录成功',
                            type: 'success',
                            duration: 3000
                        })
                    }
                    else {
                        ElNotification({
                            title: 'Error',
                            message: '登录失败',
                            type: 'error',
                        })
                    }
                }
            )
           }

        } else {
            console.log("error submit!");
            return false;
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};








</script>
  
<style scoped >
.el-card {
    border: 0
}

:deep() .el-card__body {
    padding: 0;
    width: 100%;
    display: flex;
    align-items: center;

}

.el-form-item :deep() label {
    font-size: 18px;
    font-weight: 700;
}

.el-button {
    @apply h-40px
}

.el-input {
    font-size: 18px;
}
</style>
  