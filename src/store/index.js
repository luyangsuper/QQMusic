import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            searchObject: {
                value: ''
            },
            currentSong: {
                songmid: '',
                albummid: ''
            }
        }
    }
})