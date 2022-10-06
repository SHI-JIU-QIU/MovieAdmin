import serve from './index'

//查找所有资讯
export const apiGetAllNews = () => {
    return serve({
        url: '/selectAllConsult',
        method: 'GET',
    })
}





//根据资讯id查找资讯

export const apiGetNewsById = (data: any) => {
    return serve({
        url: '/selectConsultById',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}







//下架资讯







//添加资讯（参考movie里的添加电影）







//根据关键词查找资讯