import {defineStore} from 'pinia'
export const useMainStore = defineStore('main', {
    state: () => {
        return {
            searchValue: '可以使用'
        }
    }
})