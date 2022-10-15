import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue';
export default {
    getUserInfo(id) {
        return new Promise((resolve, reject) => {
            axios.get(`api/user/detail?id=${id}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res.data.errMsg)
                        reject(res.data)
                    }
                    resolve(res.data.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    refreshToken() {
        return new Promise((resolve, reject) => {
            axios.get(`api/user/refresh`)
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
    getCookie(id) {
        return new Promise((resolve, reject) => {
            axios.get(`api/user/getCookie?id=${id}`)
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
    getUserSongSheet(id) {
        return new Promise((resolve, reject) => {
            axios.get(`api/user/songlist?id=${id}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res.data.errMsg)
                        reject(res.data)
                    }
                    resolve(res.data.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getSongSheet(id) {
        return new Promise((resolve, reject) => {
            axios.get(`api/songlist?id=${id}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res.data.errMsg)
                        reject(res.data)
                    }
                    resolve(res.data.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getUserCollectSongSheet(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/user/collect/songlist?${params}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        message.error(res.data.errMsg)
                        reject(res.data)
                    }
                    resolve(res.data.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}