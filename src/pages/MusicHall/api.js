import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue';
export default {
    getRankingList(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/top/category?showDetail=1`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res.data.errMsg)
                        reject(res.data)
                    }
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getRankListDetail(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/top?${qs.stringify(params)}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getSingerDetail(mid) {
        return new Promise((resolve, reject) => {
            axios.get(`api/singer/desc?singermid=${mid}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getSingerSong(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/singer/songs?${qs.stringify(params)}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getAlbumInfo(albummid) {
        return new Promise((resolve, reject) => {
            axios.get(`api/album?albummid=${albummid}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getAlbumSong(albummid) {
        return new Promise((resolve, reject) => {
            axios.get(`api/album/songs?albummid=${albummid}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getRecommendCarouselPic() {
        return new Promise((resolve, reject) => {
            axios.get(`api/recommend/banner`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getSingerCategory() {
        return new Promise((resolve, reject) => {
            axios.get(`api/singer/category`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getSingerList(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/singer/list?${qs.stringify(params)}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res?.data?.errMsg)
                        reject(res.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}