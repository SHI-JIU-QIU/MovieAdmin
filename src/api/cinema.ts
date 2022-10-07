import { DataAnalysis } from '@element-plus/icons-vue'
import serve from './index'


export const apiGetAllCinema = () => {
    return serve({
        url: '/selectAllCinemas',
        method: 'GET',
    })
}

export const apiGetCinemaByName = (data: any) => {
    return serve({
        url: '/selectCinemasLikeName',
        method: 'GET',
        params: {
            cinemaName: data.name
        }
    })
}

export const apiGetCinemaById = (data: any) => {
    return serve({
        url: '/seleceCinemaById',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}

export const apiUpdateCinema = (formData: FormData) => {
    return serve({
        url: '/updateCinema',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const apiinsertCinema = (formData: FormData) => {
    return serve({
        url: '/insertCinema',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}




export const apiGetHallList = (data: any) => {
    return serve({
        url: '/selectfromCinema',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}

export const apiAddHall = (data: any) => {
    return serve({
        url: '/addHall',
        method: 'POST',
        params: {
            hallName: data.hallName,
            cinemaId: data.cinemaId
        }
    })
}

export const apideleteHall = (data: any) => {
    return serve({
        url: '/deleteHall',
        method: 'POST',
        params: {
            id: data.id
        }
    })
}

export const apiselectfromHall = (data: any) => {
    return serve({
        url: '/selectfromHall',
        method: 'GET',
        params: {
            id: data.id
        }
    })
}



export const apiupdateSchedulePrice = (data: any) => {
    return serve({
        url: '/updateSchedulePrice',
        method: 'POST',
        params: {
            scheduleId: data.scheduleId,
            schedulePrice: data.schedulePrice
        }
    })
}


export const apiupdateScheduleMovie = (data: any) => {
    return serve({
        url: '/updateScheduleMovie',
        method: 'POST',
        params: {
            scheduleId: data.scheduleId,
            movieName: data.movieName
        }
    })
}



export const apiofflineSchedule = (data: any) => {
    return serve({
        url: '/offlineSchedule',
        method: 'POST',
        params: {
            scheduleId: data.scheduleId
        }
    })
}