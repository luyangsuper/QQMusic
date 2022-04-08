import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
export default {
    getSongPage(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/search?${qs.stringify(params)}`)
                .then(res => {
                    if(res.data.result !== 100) {
                        message.error(res.data.errMsg)
                        reject(res.data)
                    }
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}