import { defineStore } from 'pinia'
import {  } from '@/api/order' //api里接口



const useOrderStore = defineStore('OrderStore', {
    state: () => {
        return {
           //请求后存的数据
           newsList:[]
        }
    },
    getters: {

    },
    actions: {
        // async reqGetAllMovie(){
        //     let result = await apiGetAllMovie()
        //     console.log(result);
        //     if(result.code==200){
        //         this.movieList = [...result.commit,...result.uncommit,...result.outcommit]
        //     }
        // }
      
    }
})

export default useOrderStore