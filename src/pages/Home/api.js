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
                    data: "RK=j5yRSOJHbD; ptcz=d0edc99b529f79289e4e8e9e1fd71c78da4377742e41477e737fbe026848a5f4; pgv_pvi=8986835968; pgv_pvid=5884036829; ts_uid=4256297370; iip=0; tvfe_boss_uuid=a86193976b38ea19; o_cookie=1608069807; fqm_pvqid=5facda29-4e43-4d47-a020-7d4b12261c70; eas_sid=E1O6G4S9k7y6f316R5C1E2s4e3; sd_userid=73521649763657481; sd_cookie_crttime=1649763657481; pac_uid=1_608069807; fqm_sessionid=27c9b982-7378-4278-9d70-ec2f9218d8a4; pgv_info=ssid=s2828433990; ts_last=y.qq.com/; ts_refer=www.baidu.com/link; _qpsvr_localtk=0.3504826301930648; login_type=1; uin=1608069807; wxrefresh_token=; psrf_qqopenid=BABD4797AFB5328C82EC7D5C0F79AE8B; qm_keyst=Q_H_L_5Ob42SbSmtY_4X1aub7GN7j33S7BlCmmULvzoXq0aHLDPB1cjaz-_tA; psrf_qqrefresh_token=38821464D77EA833193406070C9738F5; euin=oKCzNensNKcz7z**; psrf_musickey_createtime=1662467269; qqmusic_key=Q_H_L_5Ob42SbSmtY_4X1aub7GN7j33S7BlCmmULvzoXq0aHLDPB1cjaz-_tA; psrf_access_token_expiresAt=1670243269; wxopenid=; wxunionid=; tmeLoginType=2; psrf_qqunionid=71F0793F1E2DF841D31797FBE6F37DE0; psrf_qqaccess_token=48F8D0B780936DC1FBA30FAAF26F7F05; qm_keyst=Q_H_L_5Ob42SbSmtY_4X1aub7GN7j33S7BlCmmULvzoXq0aHLDPB1cjaz-_tA" },
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