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

export const apiDeleteNews = (data: any) => {
    return serve({
        url: '/deleteConsult',
        method: 'POST',
        params: {
            id: data.id
        }
    })
}


//添加资讯（参考movie里的添加电影）

export const apiAddNews = (formData: FormData) => {
    return serve({
        url: '/deleteConsult',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}


//根据关键词查找资讯