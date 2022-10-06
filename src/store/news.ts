import { defineStore } from 'pinia'
import {apiGetAllNews} from '@/api/news'

const useNewsStore = defineStore('newsStore', {
    state: () => {
        return {
            newsList:[]
        }
    },
    getters: {

    },
    actions: {
        async reqGetAllNews(){
            let result = await apiGetAllNews()
            console.log(result);
            if(result.code==200){
                this.newsList =result.data
            }
        },
       

    }
})

export default useNewsStore