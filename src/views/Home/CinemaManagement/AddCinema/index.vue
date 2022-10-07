<template>
    <div class="mt-10 bg-white">
        <div class=" p-10 border-b-0.5 border-gray-200">
            <span class="text-2xl text-gray-600">影院信息</span>
            <div class="flex mt-10 items-center">
                <div>
                    <el-upload class="avatar-uploader w-292px h-292px border-1 border-gray-200 mx-8" action="#"
                        :show-file-list="false" :auto-upload="false" :on-change="changeUpload">

                        <template #trigger>
                            <div v-if="imageUrl" :style="`background-image:url(${imageUrl})`"
                                class="avatar w-292px h-292px bg-cover bg-center bg-no-repeat" />
                            <el-icon v-else class="avatar-uploader-icon ">
                                <Plus />
                            </el-icon>
                        </template>


                    </el-upload>
                </div>
                <Form :config="cinemaFormConfig.formItems" :modelValue="cinema" @update:model-value="change"
                    class="rounded border-l-0.5 border-gray-200 flex-1  p-14 bg-white flex-col"
                    formStyle="grid grid-cols-2 gap-8 ">
                    <template #footer>
                        <div class="w-100% flex justify-center">
                            <el-button type="primary" size="large" @click="updateCinema">修改
                            </el-button>

                        </div>
                    </template>


                </Form>

            </div>
        </div>

        <div class="p-10">
            <div class="flex justify-between mb-10">
                <span class="text-2xl text-gray-600">放映厅</span>
                <el-button type="primary">添加</el-button>
            </div>
            <div class="grid grid-cols-3">
                <el-card shadow="always" class="m-4 " v-for="item in hallList">
                    <span class="font-semibold">{{ item.hallName }}</span>
                    <div>
                        <el-button type="primary" @click="editHall">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </div>
                </el-card>

            </div>
        </div>

        <el-dialog v-model="dialogTableVisible">
            <template #header="{ close, titleId, titleClass }">
                <div class="flex justify-between">
                    <h4 class="text-2xl text-gray-600 ">场次</h4>
                    <el-button type="primary" class="mr-10">添加</el-button>
                </div>
            </template>

            <el-table :data="gridData" :default-sort="{ prop: 'date', order: 'descending' }">
                <el-table-column prop="date" sortable  label="时间">
                </el-table-column>
                <el-table-column prop="name" label="电影">
                     
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button size="small" type="primary">修改</el-button>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>





    </div>
</template>

<script setup lang='ts'>
import { cinemaFormConfig } from '../cinemaConfig'
import useStore from '@/store/index'
import Form from '@/components/Form/index.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { UploadProps } from 'element-plus'
import { apiUpdateCinema, apiGetHallList } from '@/api/cinema'
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

const change = (field: keyof Cinema, value: any) => {

    (cinema.value[`${field}`] as string) = value

}


const updateCinema = () => {
    if (!file.value) {
        const photoName = `${new Date().getTime()}`
        file.value = dataURLtoFile(
            `data:image/png;base64,` + cinema.value.cinemaImg,
            `${photoName}.jpg`
        )
        console.log(file);

    }

    let formData = new FormData()
    formData.append("file", file.value as File)
    formData.append("id", cinema.value.id.toString())
    formData.append("cinemaName", cinema.value.cinemaName)
    formData.append("cinemaAddress", cinema.value.cinemaAddress)
    formData.append("cinemaScore", cinema.value.cinemaScore.toString())
    console.log(formData);

    apiUpdateCinema(formData).then((result) => {
        if (result.code == 200) {
            ElMessage({
                showClose: true,
                message: '修改成功',
                type: 'success',
            })
        }

    })

}

interface Cinema {
    id: number
    cinemaPicture: string
    cinemaName: string
    cinemaAddress: string
    cinemaScore: number
    cinemaImg: string
}
const route = useRoute()
const { cinemaStore } = useStore()
let cinema: Ref<Cinema> = ref<Cinema>({} as Cinema)
cinemaStore.reqGetCinemaById({ id: route.query.id }).then(() => {
    cinema.value = cinemaStore.currentCinema
    imageUrl.value = `data:image/png;base64,` + cinema.value.cinemaImg
})


let hallList = ref()
apiGetHallList({ id: route.query.id }).then((result) => {
    if (result.code == 200) {
        hallList.value = result.data
    }
})



const dialogTableVisible = ref(false)
const editHall = () => {
    dialogTableVisible.value = true
}





const gridData = [
    {
        date: '2016-05-02',
        name: 'John Smith',

    },
    {
        date: '2016-05-04',
        name: 'John Smith',

    },
    {
        date: '2016-05-01',
        name: 'John Smith',

    },
    {
        date: '2016-05-03',
        name: 'John Smith',

    },
]





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
    width: 292px;
    height: 292px;
    text-align: center;
}


</style>