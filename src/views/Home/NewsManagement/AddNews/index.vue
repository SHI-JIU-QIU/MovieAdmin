<template>
    <div class="mt-10 bg-white">
        <div class=" p-10 border-b-0.5 border-gray-200">
            <div class="flex mt-10 items-center">
                <div>
                    <el-upload class="avatar-uploader w-500px h-300px border-1 border-gray-200 mx-8" action="#"
                        :show-file-list="false" :auto-upload="false" :on-change="changeUpload">

                        <template #trigger>
                            <div v-if="imageUrl" :style="`background-image:url(${imageUrl})`"
                                class="avatar w-500px h-300px bg-cover bg-center bg-no-repeat" />
                            <el-icon v-else class="avatar-uploader-icon ">
                                <Plus />
                            </el-icon>
                        </template>


                    </el-upload>
                </div>
                <Form :config="newsFormConfig.formItems" :modelValue="news" @update:model-value="change"
                    class="rounded border-l-0.5 border-gray-200 flex-1  p-14 bg-white flex-col"
                    formStyle="grid grid-cols-2 gap-8 ">
                    <template #footer>
                        <div class="w-100% flex justify-center">
                            <el-button type="primary" size="large" @click="addNews">添加
                            </el-button>

                        </div>
                    </template>


                </Form>

            </div>
        </div>


    </div>
</template>

<script setup lang='ts'>
import { newsFormConfig } from '../newsConfig'
import useStore from '@/store/index'
import Form from '@/components/Form/index.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { UploadProps } from 'element-plus'
import { apiAddNews } from '@/api/news'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

interface Cinema {
    id: number
    cinemaPicture: string
    cinemaName: string
    cinemaAddress: string
    cinemaScore: number
    cinemaImg: string
}



const imageUrl = ref()

let file = ref<File>()
const changeUpload: UploadProps['onChange'] = (uploadFile: any) => {
    console.log(uploadFile);
    file.value = uploadFile.raw
    imageUrl.value = URL.createObjectURL(uploadFile.raw)

}

const change = (field: keyof News, value: any) => {

    (news.value[`${field}`] as string) = value

}


const addNews = () => {
    if (!file.value) {
        const photoName = `${new Date().getTime()}`
        file.value = dataURLtoFile(
            `data:image/png;base64,` + news.value.img,
            `${photoName}.jpg`
        )
        console.log(file);

    }

    let formData = new FormData()
    formData.append("file", file.value as File)
    formData.append("consultTitle", news.value.consultTitle)
    formData.append("consultContent", news.value.consultContent)
    formData.append("consultAnnouncer", news.value.consultAnnouncer)
    formData.append("consultScore", news.value.consultScore.toString())
    console.log(formData);

    apiAddNews(formData).then((result) => {
        if (result.code == 200) {
            ElMessage({
                showClose: true,
                message: '添加成功',
                type: 'success',
            })
        }

    })

}

interface News {
    consultAnnouncer: string
    consultContent: string
    consultPicture?: string
    consultScore: number
    consultState?: any
    consultTitle: string
    id: number
    img: string
}
const route = useRoute()
const { newsStore } = useStore()
let news = ref<News>({} as News)




function dataURLtoFile(dataurl: string, filename: string) {
    // 获取到base64编码
    const arr = dataurl.split(',')
    // 将base64编码转为字符串
    const bstr = window.atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr.buffer], filename, {
        type: 'image/jpeg',
    })
}


</script>

<style scoped>
:deep() .el-card__body {
    @apply flex items-center justify-between
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 500px;
    height: 300px;
    text-align: center;
}

</style>