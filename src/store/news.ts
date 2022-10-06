import { defineStore } from 'pinia'
import {apiGetAllNews,apiGetNewsById} from '@/api/news'


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
const useNewsStore = defineStore('newsStore', {
    state: () => {
        return {
            newsList:[],
            currentNews:{} as News
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
        async reqGetNewsById(data:any){
            let result = await apiGetNewsById(data)
            console.log(result);
            if(result.code==200){
                this.currentNews = result.data
            }
        }

    }
})

export default useNewsStore