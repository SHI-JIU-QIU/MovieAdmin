import { defineStore } from 'pinia'
import { apiGetAllOrder, apiGetAllRefundOrder } from '@/api/order' //api里接口



const useOrderStore = defineStore('OrderStore', {
    state: () => {
        return {
            //请求后存的数据
            orderList: []
        }
    },
    getters: {

    },
    actions: {
        async reqGetAllOrder() {
            let result = await apiGetAllOrder()
            console.log(result);
            if (result.code == 200) {
                this.orderList = result.data
            }
        },
        async reqGetRefundOrder() {
            let result = await apiGetAllRefundOrder()
            console.log(result);
            if (result.code == 200) {
                this.orderList = result.data
            }
        }
    }
})

export default useOrderStore