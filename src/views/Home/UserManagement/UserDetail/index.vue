<template>
  <div class="w-100% mt-10 flex  justify-center items-center  bg-white">
    
    
    <!-- 上传头像 start-->
    <div class="flex-1 flex justify-center">
      <el-upload class="avatar-uploader w-178px h-178px  border-1 border-gray-200 mr-8" action="/api/updateHeader"
        :show-file-list="false" :data="{id:route.query.id}" :on-success="handleAvatarSuccess" name="file"
        :before-upload="beforeAvatarUpload">
        <div v-if="imageUrl" :style="`background-image: url(${imageUrl})`"
          class="avatar w-178px h-178px bg-cover bg-center bg-no-repeat"></div>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
  <!-- end -->




    <Form :config="userFormConfig.formItems" :model-value="user" @update:model-value="change"
      class="rounded border-l-0.5 flex-1 border-gray-200 items-center p-14" formStyle="flex flex-col" itemStyle="w-40%">
      <template #footer>
        <div class="flex flex-col items-center	w-40%">
          <div>
            <el-button type="primary" class="" @click="updateUser">修改资料</el-button>
           
          </div>
         
        </div>

      </template>
    </Form>
  </div>
</template>

<script setup lang='ts'>
import Form from '@/components/Form/index.vue';
import { userFormConfig } from './UserFormConfig'
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { apiGetUserById, apiUpdateUser } from '@/api/user'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import type { UploadProps } from 'element-plus'


//获取上传成功后的头像
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  ElMessage({
    showClose: true,
    message: '上传头像成功',
    type: 'success',
  })
}

//上传图片前的限制
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}






type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  type: number;
  header: string;
  phone: string;
  avatar: string;
}

let user = ref<User>({} as User)

const route = useRoute()
apiGetUserById({ id: route.query.id }).then((result) => {
  if (result.code == 200) {
    user.value = result.data
    imageUrl.value = `data:image/png;base64,` + user.value?.avatar
    console.log(imageUrl.value);
    console.log(user.value)
  }
})


const change = (field: keyof User, value: string) => {

  (user.value[`${field}`] as string) = value
  

}


const updateUser = () => {
  let data = {
    otherid: route.query.id,
    username: user.value.username,
    email: user.value.email,
    phone: user.value.phone,
    password : user.value.password
  }
  apiUpdateUser(data).then(() => {
    ElMessage({
      showClose: true,
      message: '修改信息成功',
      type: 'success',
    })
  })
}





const visible = ref(false)

</script>

<style scoped>
:deep() .el-overlay-dialog {
  @apply bg-gray-200 m-0 bg-opacity-50
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>