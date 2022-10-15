import { message } from 'ant-design-vue';
import axios from 'axios'
export default {
    associationSearch(key) {
        return new Promise((resolve, reject) => {
            axios.get(`api/search/quick?key=${key}`)
                .then(res => {
                    if (res.data.result !== 100) {
                        reject(res?.data)
                    }
                    resolve(res?.data?.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    getHotSeach() {
        return new Promise((resolve, reject) => {
            axios.get('api/search/hot')
                .then(res => {
                    if (res.data.result !== 100) {
                        reject(res?.data)
                    }
                    resolve(res?.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    getSonUrl(songmid) {
        return new Promise((resolve, reject) => {
            axios.get(`api/song/url?id=${songmid}`)
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
    getSongDetail(songmid) {
        return new Promise((resolve, reject) => {
            axios.get(`api/song?songmid=${songmid}`)
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
    setCookie() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: 'api/user/setCookie',
                data: {
                    data: "RK=j5yRSOJHbD; ptcz=d0edc99b529f79289e4e8e9e1fd71c78da4377742e41477e737fbe026848a5f4; pgv_pvi=8986835968; pgv_pvid=5884036829; ts_uid=4256297370; iip=0; tvfe_boss_uuid=a86193976b38ea19; o_cookie=1608069807; fqm_pvqid=5facda29-4e43-4d47-a020-7d4b12261c70; eas_sid=E1O6G4S9k7y6f316R5C1E2s4e3; sd_userid=73521649763657481; sd_cookie_crttime=1649763657481; pac_uid=1_608069807; tmeLoginType=2; euin=oKCzNensNKcz7z**; ts_refer=ADTAGmyqq; fqm_sessionid=f1668773-c8ec-4954-8e87-52f3fa73ede6; pgv_info=ssid=s1225943618; ts_last=y.qq.com/; _qpsvr_localtk=0.2051145407215229; login_type=1; psrf_qqunionid=71F0793F1E2DF841D31797FBE6F37DE0; psrf_qqopenid=BABD4797AFB5328C82EC7D5C0F79AE8B; psrf_qqaccess_token=CFAC4C5CE30D3F4F947B01335AEC8634; qqmusic_key=Q_H_L_5AeMAOGa_vPL59eT8vvULdWLZASD9fRHUdYhKRkwqePinsKfFyTui_w; psrf_qqrefresh_token=9F4F771D81F6A1E541F732196EFE89FB; wxunionid=; psrf_access_token_expiresAt=1673521775; psrf_musickey_createtime=1665745775; qm_keyst=Q_H_L_5AeMAOGa_vPL59eT8vvULdWLZASD9fRHUdYhKRkwqePinsKfFyTui_w; qm_keyst=Q_H_L_5AeMAOGa_vPL59eT8vvULdWLZASD9fRHUdYhKRkwqePinsKfFyTui_w; wxopenid=; wxrefresh_token=; uin=1608069807"
                },
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
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
    getLyric(songmid) {
        return new Promise((resolve, reject) => {
            axios.get(`api/lyric?songmid=${songmid}`)
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
}