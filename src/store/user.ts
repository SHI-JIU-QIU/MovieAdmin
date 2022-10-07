import { defineStore } from 'pinia'
import { apiGetAllUser, apiLogin } from '@/api/user'

const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            userList: [],
            user: {}
        }
    },
    getters: {

    },
    actions: {
        async reqGetAllUser() {
            let result = await apiGetAllUser()
            console.log(result);
            if (result.code == 200) {
                this.userList = result.data


            }
        },
        async reqLogin(data: any) {
            let result = await apiLogin(data)
            if (result.code == 200) {
                this.user = result.data
                return true
            }
            else {
                return false
            }
        },
        exit() {
            this.user = {}
        }


    }
})

export default useUserStore