import { defineStore } from 'pinia'
import api from '../pages/Home/api'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            searchObject: {
                value: ''
            },
            playList: [],
            playIndex: null,
            playType: 'order',
            collapsed: true,
            audioObj: {
                instance: null,
                state: 'paused'
            }
        }
    },
    getters: {
        currentSong(state) {
            return state.playList[state.playIndex] || { songmid: '', songName: '' }
        },
        audioInstance(state) {
            return state.audioObj.instance;
        }
    },
    actions: {
        // 清空播放列表
        clearPlayList() {
            this.playList = []
            this.playIndex = null
        },
        // 添加添加歌曲列表到播放列表
        addSongList(songList) {
            this.playList = [this.playList, ...songList]
        },
        // 添加单首歌曲并播放
        async addSongAndPlay(song) {
            try {
                let index = this.playList.findIndex(item => item.songmid === song.songmid)
                if (index !== -1) {
                    this.playIndex = index
                } else {
                    let res = await api.getSonUrl(song.songmid)
                    song.url = res.data
                    this.playList.push(song)
                    this.playIndex = this.playList.length - 1
                }
            } catch(e) {
                console.log(e)
            }
            
        },
        // 添加歌曲到播放列表
        addSong(song) {
            this.playList.push(song)
        }
    }
})