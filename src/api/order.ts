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


export const apiAgreeForRefund = (data: any) => {
    return serve({
        url: '/agreeForRefund',
        method: 'POST',
        params: {
            id: data.id
        }
    })
}

//根据用户名查询订单

export const apiGetOrderByName = (data: any) => {
    return serve({
        url: '/selectOrderByUserName',
        method: 'GET',
        params: {
            username: data.name
        }
    })
}

//查询所有退票订单信息

export const apiGetAllRefundOrder = (data: any) => {
    return serve({
        url: '/selectAllRefundOrder',
        method: 'GET',
    })
}