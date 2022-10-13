<template>
    <div class="w-100% mt-10  bg-white flex items-center">

        <div>
            <el-upload class="avatar-uploader w-160px h-220px border-1 border-gray-200 mx-8" action="#"
                :show-file-list="false" :auto-upload="false" :on-change="changeUpload">

                <template #trigger>
                    <div v-if="imageUrl" :style="`background-image:url(${imageUrl})`"
                        class="avatar w-160px h-220px bg-cover bg-center bg-no-repeat" />
                    <el-icon v-else class="avatar-uploader-icon ">
                        <Plus />
                    </el-icon>
                </template>


            </el-upload>
        </div>
        <Form ref="formRef" :config="movieFormConfig.formItems" :model-value="movie" @update:model-value="change"
            class="rounded border-l-0.5 border-gray-200 flex-1  p-14 bg-white flex-col" itemStyle=""
            formStyle="grid grid-cols-3 gap-8 ">

            <template #footer>
                <el-button v-if="formRef" type="primary" size="large"
                    class="relative left-50% transform mt-8 -translate-x-50% w-30" @click="addMovie(formEl)">添加电影
                </el-button>
            </template>
        </Form>
    </div>

</template>

<script setup lang='ts'>
import Form from '@/components/Form/index.vue';
import { movieFormConfig } from '../MovieFormConfig'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { apiGetMovieById, apiAddMovie } from '@/api/movie'
import { useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'


import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
let movie = ref<MovieDetail>({} as MovieDetail)
movie.value.movieScore = 0
movie.value.movieDuration = 0
type MovieDetail = {
    id: number;
    movieCName: string;
    movieFName: string;
    movieActor: string;
    movieDirector: string;
    movieDetail: string;
    movieDuration: string | number;
    movieType: string;
    movieScore: number;
    movieBoxOffice: number;
    movieCommentCount: number;
    movieReleaseDate: string;
    movieCountry: string;
    moviePicture: string;
    movieState: number;
    commentList?: any;
    movieImg: string;
}

const route = useRoute()

const formRef = ref<any>(null)
let formEl = ref<any>()
onMounted(() => {
    formEl.value = formRef.value.ruleFormRef;
    console.log(formEl);
})


const change = (field: keyof MovieDetail, value: any) => {

    (movie.value[`${field}`] as string) = value

}

let file = ref<File>()

const addMovie = async (formEl: FormInstance | undefined) => {
    console.log(formEl);

    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (!file.value) {
                const photoName = `${new Date().getTime()}`
                file.value = dataURLtoFile(
                    `data:image/png;base64,` + movie.value.movieImg,
                    `${photoName}.jpg`
                )
                console.log(file);

            }

            let formData = new FormData()
            formData.append("file", file.value as File)

            formData.append("movieCName", movie.value.movieCName)
            formData.append("movieFName", movie.value.movieFName)
            formData.append("movieActor", movie.value.movieActor)
            formData.append("movieDirector", movie.value.movieDirector)
            formData.append("movieDetail", movie.value.movieDetail)
            formData.append("movieDuration", movie.value.movieDuration + `分钟`)
            formData.append("movieType", movie.value.movieType)
            formData.append("movieScore", movie.value.movieScore.toString())
            formData.append("movieBoxOffice", '0')
            formData.append("movieCommentCount", '0')
            formData.append("movieReleaseDate", movie.value.movieReleaseDate.replaceAll('-', '/'))
            formData.append("movieCountry", movie.value.movieCountry)
            formData.append("movieState", movie.value.movieState.toString())

            console.log(formData);


            apiAddMovie(formData).then((result) => {
                if (result.code == 200) {
                    ElMessage({
                        showClose: true,
                        message: '添加成功',
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


const changeUpload: UploadProps['onChange'] = (uploadFile: any) => {
    console.log(uploadFile);
    file.value = uploadFile.raw
    imageUrl.value = URL.createObjectURL(uploadFile.raw)

}
</script>

<style scoped>
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
    width: 160px;
    height: 220px;
    text-align: center;
}
</style>