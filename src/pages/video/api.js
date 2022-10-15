import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue';
export default {
    getNewMvList(type) {
        return new Promise((resolve, reject) => {
            axios.get(`api/new/mv?type=${type}`)
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
    getMvCategory() {
        return new Promise((resolve, reject) => {
            axios.get(`api/mv/category`)
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
    getMvList(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/mv/list?${qs.stringify(params)}`)
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
    getMvUrl(id) {
        return new Promise((resolve, reject) => {
            axios.get(`api/mv/url?id=${id}`)
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