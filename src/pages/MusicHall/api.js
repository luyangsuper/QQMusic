import axios from 'axios'
import { message } from 'ant-design-vue';
export default {
    getRankingList(params) {
        return new Promise((resolve, reject) => {
            axios.get(`api/top/category?showDetail=1`)
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