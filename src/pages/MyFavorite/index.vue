<template>
    <div class="my-favorite-container">
        <h1 class="title">我喜欢</h1>
        <a-tabs v-model:activeKey="activeKey" class="all-tabs">
            <a-tab-pane key="1" :tab="`歌曲${userInfo.songNum}`">
                <SongList />
            </a-tab-pane>
            <a-tab-pane key="2" :tab="`歌单${userInfo.songSheetNum}`">
                <SongSheet />
            </a-tab-pane>
            <a-tab-pane key="3" :tab="`专辑${userInfo.albumNum}`">

            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import SongList from './components/SongList.vue';
import SongSheet from './components/SongSheet.vue'
import api from './api';
import { onMounted, reactive, ref } from 'vue';
const activeKey = ref('1');
const userInfo = reactive({
    songNum: 0,
    songSheetNum: 0,
    albumNum: 0,
});
onMounted(async () => {
    // api.refreshToken();
    // api.getCookie(1608069807).then(res => {
    //     // console.log(res, 777);
    //     // setTimeout(() => api.refreshToken(), 3000);
    // });
    try {
        await api.getCookie(1608069807);
        let res = await api.getUserInfo(1608069807);
        userInfo.songNum = res.mymusic[0].num0;
        userInfo.songSheetNum = res.mymusic[0].num2;
        userInfo.albumNum = res.mymusic[0].num1;
        console.log(res, 555);
    } catch (e) {
        console.log(e);
    }
    // api.getSongSheet(2709787012).then(res => {
    //     console.log(res, 666);
    // });
});
</script>

<style lang="less" scoped>
.my-favorite-container {
    padding: 24px;
    .title {
        font-weight: bold;
    }
    .all-tabs {
        position: sticky;
    }
}
</style>