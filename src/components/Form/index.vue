<template>
    <div>
        <div class="header">
            <slot name="header"> </slot>
        </div>
        <el-form :label-width="labelWidth" label-position="top" ref="ruleFormRef" status-icon :model="modelValue"
            :class="formStyle">
            <template v-for="item in config" :key="item.label ">

                <el-form-item v-if="!item.isHidden" :label="item.label" :rules="item.rules" :prop="item.field"
                    :class="itemStyle">
                    <template v-if="item.type === 'input' || item.type === 'password'">
                        <el-input class="h-40px" :placeholder="item.placeholder"
                            :show-password="item.type === 'password'" :modelValue="modelValue[`${item.field}`]"
                            @update:modelValue="valueChange($event, item.field)" />
                    </template>

                    <template v-if="item.type === 'textarea'">
                        
                            <el-input class="" :placeholder="item.placeholder" :modelValue="modelValue[`${item.field}`]"
                                @update:modelValue="valueChange($event, item.field)" type="textarea"
                                :autosize="{ minRows: 5 ,maxRows:10}" />
                    
                    </template>


                    <template v-if="item.type === 'select'">
                        <el-select class="" :placeholder="item.placeholder" multiple v-model="value1" type="textarea">
                            <el-option v-for="option in item.options" :label="option.label" :value="option.value" />
                        </el-select>
                    </template>

                    <template v-if="(item.type === 'input-number' && (item.field === 'movieScore'||'cinemaScore'))">
                        <el-input-number :modelValue="modelValue[`${item.field}`]" @update:modelValue="valueChange($event, item.field)" :precision="1" :step="0.1" :max="10">
                        </el-input-number>
                    </template>
                    <template v-else-if="(item.type === 'input-number' && item.field === 'movieDuration')">
                        <el-input-number :modelValue="modelValue[`${item.field}`]" @update:modelValue="valueChange($event, item.field)" :step="1" :max="500">
                        </el-input-number>
                    </template>
                    <!-- <template v-else-if="(item.type === 'input-number' && item.field === 'cinemaScore')">
                        <el-input-number :modelValue="modelValue[`${item.field}`]" @update:modelValue="valueChange($event, item.field)" :precision="3" :step="0.001"
                            :max="500"></el-input-number>
                    </template> -->



                    <template v-if="item.type === 'datePicker'">
                        <el-date-picker :modelValue="modelValue[`${item.field}`]" @update:modelValue="valueChange($event, item.field)" type="date"
                            placeholder="Pick a day"  value-format="YYYY-MM-DD"/>
                    </template>

                    <template v-if="item.type === 'radio'">
                        <el-radio-group :modelValue="modelValue[`${item.field}`]" @update:modelValue="valueChange($event, item.field)"  class="">
                            <el-radio :label="option.value" v-for="option in item.options">{{ option.label }}</el-radio>

                        </el-radio-group>
                    </template>

                </el-form-item>
            </template>
        </el-form>
        <div class="footer w-100%">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IFormItem } from './type'
import { defineProps, withDefaults, ref, defineEmits } from 'vue'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
interface Props {
    config: IFormItem[] // 表单配置项
    labelWidth?: string // 每个表单标题宽度
    itemStyle?: string // 每个表单样式
    formStyle?: string
    itemColLayout?: object // 表单布局
    modelValue: any //绑定表单的每个数据
    isHidden?: boolean
}

const props = withDefaults(defineProps<Props>(), {

    labelWidth: '80px',

})

const emit = defineEmits<{
    (e: 'update:modelValue', field: any, value: any): void
}>()




console.log(props.modelValue)

const valueChange = (value: any, field: string) => {
    emit('update:modelValue', field, value)
    console.log(value, field)
}

const value1 = ref([])




const radio2 = ref('1')
</script>


<style scoped>
.el-form-item :deep() label {
    font-size: 18px;
    font-weight: 700;
}
.el-form-item:last-of-type{
    @apply col-span-2
}
</style>

