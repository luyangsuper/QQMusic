<template>
    <div class="song-sheet-container">
        <div v-for="item in songSheetList" :key="item.uin" class="song-sheet-item">
            <img :src="item.logo" alt="" class="song-sheet-cover" @error="errorImage" />
            <div class="sheet-name">{{ item.dissname }}</div>
            <div class="author-name">{{ item.nickname }}</div>
        </div>
    </div>
</template>

<script setup>
import api from '../api';
import { onMounted, ref } from 'vue';
import { errorImage } from '@/common/utils.js';
const songSheetList = ref([]);
onMounted(() => {
    const params = {
        id: '1608060807',
    };
    api.getUserCollectSongSheet(params).then(res => {
        songSheetList.value = res.list;
    });
});
</script>

<style lang="less" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.song-sheet-container {
    display: flex;
    flex-wrap: wrap;
    .song-sheet-item {
        width: calc(16.6% - 20px);
        margin-right: 20px;
        margin-bottom: 20px;
        .sheet-name {
            .text-ellipsis();
            height: 28px;
            line-height: 28px;
        }
        .author-name {
            .text-ellipsis();
            font-size: 12px;
            color: #7b7d7d;
        }
    }
}
.song-sheet-cover {
    position: relative;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
}
</style>
