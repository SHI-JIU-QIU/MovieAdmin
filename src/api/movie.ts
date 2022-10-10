import serve from './index'


export const apiGetAllMovie = () => {
    return serve({
        url: '/selectAllMovies',
        method: 'GET',
    })
}

export const apiGetMovieByName = (data: any) => {
    return serve({
        url: '/selectMovieByName',
        method: 'GET',
        params: {
            name: data.name
        }
    })
}

export const apiGetMovieById = (data: any) => {
    return serve({
        url: '/selectMovieById',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}

export const apiUpdateMovie = (formData: FormData) => {
    return serve({
        url: '/updateMovie',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const apiAddMovie = (formData: FormData) => {
    return serve({
        url: '/insertMovie',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const apiDeleteComment = (data: any) => {
    return serve({
        url: '/deleteComment',
        method: 'POST',
        params: {
            commentId: data.id
        }
    })
}


export const apisortAllMovie = (data: any) => {
    return serve({
        url: '/sortAllMovie',
        method: 'GET',
        params: {
            name: data.name
        }
    })
}