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
                data: { data: "RK=j5yRSOJHbD; ptcz=d0edc99b529f79289e4e8e9e1fd71c78da4377742e41477e737fbe026848a5f4; pgv_pvi=8986835968; pgv_pvid=5884036829; ts_uid=4256297370; iip=0; tvfe_boss_uuid=a86193976b38ea19; o_cookie=1608069807; pac_uid=1_1608069807; fqm_pvqid=5facda29-4e43-4d47-a020-7d4b12261c70; tmeLoginType=2; euin=oKCzNensNKcz7z**; eas_sid=E1O6G4S9k7y6f316R5C1E2s4e3; sd_userid=73521649763657481; sd_cookie_crttime=1649763657481; ts_refer=ADTAGmyqq; fqm_sessionid=4aa211fb-952e-446a-9f03-a98a0802f98f; pgv_info=ssid=s8130280614; ts_last=y.qq.com/; _qpsvr_localtk=0.5471115949471628; login_type=1; psrf_qqaccess_token=0B5D49FA0AD19A41F4D8241889369354; wxrefresh_token=; psrf_qqrefresh_token=1DBD2ABF75E59F1F5E1912041263B8D8; uin=1608069807; psrf_musickey_createtime=1650074226; psrf_access_token_expiresAt=1657850226; psrf_qqunionid=71F0793F1E2DF841D31797FBE6F37DE0; qqmusic_key=Q_H_L_5z1XmhYBw3BS2iyi6ed_1-1KRD6pEn1ZcFAH6VwNM4vzsvRVyofM0TQ; wxunionid=; psrf_qqopenid=BABD4797AFB5328C82EC7D5C0F79AE8B; qm_keyst=Q_H_L_5z1XmhYBw3BS2iyi6ed_1-1KRD6pEn1ZcFAH6VwNM4vzsvRVyofM0TQ; wxopenid=; qm_keyst=Q_H_L_5z1XmhYBw3BS2iyi6ed_1-1KRD6pEn1ZcFAH6VwNM4vzsvRVyofM0TQ" },
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