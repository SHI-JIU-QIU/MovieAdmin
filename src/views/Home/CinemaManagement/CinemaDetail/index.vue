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
                <Form ref="formRef" :config="cinemaFormConfig.formItems" :modelValue="cinema"
                    @update:model-value="change"
                    class="rounded border-l-0.5 border-gray-200 flex-1  p-14 bg-white flex-col"
                    formStyle="grid grid-cols-2 gap-8 ">
                    <template #footer>
                        <div class="w-100% flex justify-center">
                            <el-button v-if="formEl" type="primary" size="large" @click="updateCinema(formEl)">修改
                            </el-button>

                        </div>
                    </template>


                </Form>

            </div>
        </div>

        <div class="p-10">
            <div class="flex justify-between mb-10">
                <span class="text-2xl text-gray-600">放映厅</span>
                <el-button type="primary" @click="addHall">添加</el-button>
            </div>
            <div class="grid grid-cols-3">
                <el-card shadow="always" class="m-4 " v-for="item in hallList">
                    <span class="font-semibold">{{ item.hallName }}</span>
                    <div>
                        <el-button type="primary" @click="editHall(item.id, item.hallName)">编辑</el-button>
                        <el-button type="danger" @click="deleteHall(item.id)">删除</el-button>
                    </div>
                </el-card>

            </div>
        </div>

        <el-dialog v-model="dialogTableVisible">
            <template #header="{ close, titleId, titleClass }">
                <div class="flex justify-between">
                    <h4 class="text-2xl text-gray-600 ">场次</h4>
                    <el-button type="primary" class="mr-10" @click="add">+</el-button>
                </div>
            </template>

            <el-table :data="gridData" :default-sort="{ prop: 'date', order: 'descending' }">

                <el-table-column label="时间" sortable width="246">
                    <template #default="scope">
                        <el-date-picker v-model="scope.row.date" type="datetime" fomat="YYYY-MM-DD HH:mm"
                            value-format='YYYY-MM-DD HH:mm' placeholder="Select date and time" />
                    </template>


                </el-table-column>

                <el-table-column label="电影">
                    <template #default="scope">
                        <el-input v-model="scope.row.movie"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="价格">
                    <template #default="scope">
                        <el-input v-model="scope.row.price"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button size="small" type="primary" v-if='scope.row.id != -1'
                            @click="editScreen(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button size="small" type="primary" v-if='scope.row.id == -1'
                            @click="addScreen(scope.$index, scope.row)">添加
                        </el-button>
                        <el-button size="small" type="danger" v-if='scope.row.id != -1'
                            @click="deleteScreen(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog v-model="addHallVisible">
            <template #header="{ close, titleId, titleClass }">
                <div class="flex justify-between">
                    <h4 class="text-2xl text-gray-600 ">放映厅</h4>
                </div>
            </template>
            <div class="w-100% flex justify-center">
                <el-form :model="addHallForm">
                    <el-form-item label="放映厅名字">
                        <el-input v-model="addHallForm.name" autocomplete="off" />
                    </el-form-item>
                </el-form>
                <el-button class="ml-8" type="primary" @click="sumbitHall">提交</el-button>
            </div>
        </el-dialog>





    </div>
</template>

<script setup lang='ts'>
import { cinemaFormConfig } from '../cinemaConfig'
import useStore from '@/store/index'
import Form from '@/components/Form/index.vue'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { UploadProps } from 'element-plus'
import { apiUpdateCinema, apiGetHallList, apiselectfromHall, apiAddHall, apideleteHall, apiupdateSchedulePrice, apiupdateScheduleMovie, apiofflineSchedule, apiupdateScheduleTime, apiinsertSchedule } from '@/api/cinema'
import { ElMessage } from 'element-plus'
import { apiGetMovieById } from '@/api/movie'
import type { FormInstance, FormRules } from 'element-plus'

interface Cinema {
    id: number
    cinemaPicture: string
    cinemaName: string
    cinemaAddress: string
    cinemaScore: number
    cinemaImg: string
}

let currenthallName = ref()
let currentcinemaName = ref()



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

const editScreen = (index: number, row: any) => {
    apiupdateSchedulePrice({
        scheduleId: row.id,
        schedulePrice: row.price
    }).then(() => {
        apiupdateScheduleMovie({
            scheduleId: row.id,
            movieName: row.movie
        }).then(() => {
            apiupdateScheduleTime({
                scheduleID: row.id,
                time: row.date
            }).then(() => {
                ElMessage({
                    showClose: true,
                    message: '修改成功',
                    type: 'success',
                })
            })



        })
    })
}

const deleteScreen = (index: number, row: any) => {
    apiofflineSchedule({ scheduleId: row.id }).then(() => {
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        })
        apiselectfromHall({ id: currentHallId.value }).then((result) => {
            if (result.code == 200) {
                gridData.value = []
                result.data.forEach((item: any) => {
                    gridData.value.push({ id: item.id, date: item.scheduleStartTime, price: item.schedulePrice, movie: item.scheduleMovie.movieCName })

                })
            }
        })


    })


}

const formRef = ref<any>(null)
let formEl = ref<any>()
onMounted(() => {
    formEl.value = formRef.value.ruleFormRef;
    console.log(formEl);
})

const updateCinema = async (formEl: FormInstance | undefined) => {
    console.log(formEl);

    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
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
        } else {
            ElMessage({
                message: '请输入完整',
                type: 'error',
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
    currentcinemaName.value = cinema.value.cinemaName
    imageUrl.value = `data:image/png;base64,` + cinema.value.cinemaImg
})


let hallList = ref()
apiGetHallList({ id: route.query.id }).then((result) => {
    if (result.code == 200) {
        hallList.value = result.data
    }
})


let gridData = ref<any[]>([])
let currentHallId = ref<number>()
const dialogTableVisible = ref(false)
const editHall = (id: number, hallName: any) => {
    gridData.value = []
    dialogTableVisible.value = true
    currentHallId.value = id
    currenthallName.value = hallName
    apiselectfromHall({ id: id }).then((result) => {
        if (result.code == 200) {
            result.data.forEach((item: any) => {
                gridData.value.push({ id: item.id, date: item.scheduleStartTime, price: item.schedulePrice, movie: item.scheduleMovie.movieCName })

            })
        }
    })
    console.log(gridData.value);


}


const addHallVisible = ref(false)
const addHall = () => {
    addHallVisible.value = true
}
let addHallForm = ref({
    name: ''
})
const sumbitHall = () => {
    apiAddHall({ cinemaId: route.query.id, hallName: addHallForm.value.name }).then(() => {
        ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
        })
        addHallVisible.value = false
        apiGetHallList({ id: route.query.id }).then((result) => {
            if (result.code == 200) {
                hallList.value = result.data
            }
        })
    })
}



const deleteHall = (id: number) => {
    apideleteHall({ id: id }).then(() => {
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        })
        apiGetHallList({ id: route.query.id }).then((result) => {
            if (result.code == 200) {
                hallList.value = result.data
            }
        })

    })
}



const add = () => {
    gridData.value.push({ id: -1, date: '', price: 0, movie: '' })
}

const addScreen = (index: any, row: any) => {
    apiinsertSchedule({
        movieName: row.movie,
        hallName: currenthallName.value,
        cinemaName: currentcinemaName.value,
        schedulePrice: row.price,
        scheduleStartTime: row.date
    }).then((result) => {
        if (result.code == 200) {
            ElMessage({
                showClose: true,
                message: '添加成功',
                type: 'success',
            })
        }
    })

}









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

.demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-datetime-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-datetime-picker .block:last-child {
    border-right: none;
}

.demo-datetime-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>