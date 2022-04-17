import { message } from 'ant-design-vue';
import axios from 'axios'
export default {
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
    setCookie() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: 'api/user/setCookie',
                data: {
                    data: "RRK=j5yRSOJHbD; ptcz=d0edc99b529f79289e4e8e9e1fd71c78da4377742e41477e737fbe026848a5f4; pgv_pvi=8986835968; pgv_pvid=5884036829; ts_uid=4256297370; iip=0; tvfe_boss_uuid=a86193976b38ea19; o_cookie=1608069807; pac_uid=1_1608069807; fqm_pvqid=5facda29-4e43-4d47-a020-7d4b12261c70; tmeLoginType=2; euin=oKCzNensNKcz7z**; eas_sid=E1O6G4S9k7y6f316R5C1E2s4e3; sd_userid=73521649763657481; sd_cookie_crttime=1649763657481; ts_refer=ADTAGmyqq; fqm_sessionid=c2a73f16-f9c8-4ff3-9c11-60b1039457eb; pgv_info=ssid=s7645768272; ts_last=y.qq.com/; _qpsvr_localtk=0.5228937660892943; login_type=1; psrf_musickey_createtime=1650194777; uin=1608069807; psrf_qqopenid=BABD4797AFB5328C82EC7D5C0F79AE8B; wxrefresh_token=; psrf_qqaccess_token=0B5D49FA0AD19A41F4D8241889369354; wxunionid=; wxopenid=; qm_keyst=Q_H_L_5rOEJ-BSZnO0m2QjgOE5Uf9niWVm1-E9ecOJE0KnBgKiW980xRuMx3w; psrf_qqunionid=71F0793F1E2DF841D31797FBE6F37DE0; qm_keyst=Q_H_L_5rOEJ-BSZnO0m2QjgOE5Uf9niWVm1-E9ecOJE0KnBgKiW980xRuMx3w; psrf_qqrefresh_token=1DBD2ABF75E59F1F5E1912041263B8D8; qqmusic_key=Q_H_L_5rOEJ-BSZnO0m2QjgOE5Uf9niWVm1-E9ecOJE0KnBgKiW980xRuMx3w; psrf_access_token_expiresAt=1657970777" },
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
    }
}