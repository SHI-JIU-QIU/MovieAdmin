import serve from './index'

//查找所有订单

export const apiGetAllOrder = () => {
    return serve({
        url: '/selectAllOrders',
        method: 'GET',
    })
}






//根据订单id查找订单

export const apiGetOrderById = (data: any) => {
    return serve({
        url: '/selectOrderById',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}





//管理员同意订单退票