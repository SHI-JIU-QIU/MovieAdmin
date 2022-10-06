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
                            <el-button type="primary" size="large" >修改
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
import { apiUpdateCinema, apiGetHallList } from '@/api/cinema'
import { ElMessage } from 'element-plus'

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


// const updateNews = () => {
//     if (!file.value) {
//         const photoName = `${new Date().getTime()}`
//         file.value = dataURLtoFile(
//             `data:image/png;base64,` + cinema.value.cinemaImg,
//             `${photoName}.jpg`
//         )
//         console.log(file);

//     }

//     let formData = new FormData()
//     formData.append("file", file.value as File)
//     formData.append("id", cinema.value.id.toString())
//     formData.append("cinemaName", cinema.value.cinemaName)
//     formData.append("cinemaAddress", cinema.value.cinemaAddress)
//     formData.append("cinemaScore", cinema.value.cinemaScore.toString())
//     console.log(formData);

//     apiUpdateCinema(formData).then((result) => {
//         if (result.code == 200) {
//             ElMessage({
//                 showClose: true,
//                 message: '修改成功',
//                 type: 'success',
//             })
//         }

//     })

// }

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
let news: Ref<News> = ref<News>({} as News)
newsStore.reqGetNewsById({ id: route.query.id }).then(() => {
    news.value = newsStore.currentNews
    imageUrl.value = `data:image/png;base64,` + news.value.img
})





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
</style>