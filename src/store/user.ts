import { defineStore } from 'pinia'
import { apiGetAllUser, apiLogin } from '@/api/user'


interface User {
    avatar: string
    email: string
    header?: string
    id: number
    password: string
    phone: string
    type: number
    username: string
}

const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            userList: [],
            user: {} as User
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
            this.user = {} as User
        }


    }
})

export default useUserStore