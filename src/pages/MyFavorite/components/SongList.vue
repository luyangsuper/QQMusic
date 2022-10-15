<template>
    <div>
        <div class="list-title">
            <span>歌曲</span>
            <span>专辑</span>
            <span>时长</span>
        </div>
        <InfiniteList :listData="dataSource" height="calc(100vh - 360px)" class="infinite-wrap">
            <template #default="{ data, id }">
                <div :class="{ 'song-item': true, 'is-playing': isCurrentSong(data) }" @dblclick="play(data)">
                    <div class="song-head">
                        <div class="song-album">
                            <img :src="getAlbumImg(data.albummid)" alt="" :id="`img-${id}`" class="album-cover" @error="errorImage" />
                            <div class="song-name-container">
                                <div :class="playingClass(data, 'song-name')">
                                    {{ data.songname }}
                                </div>
                                <div class="text-ellipsis">
                                    <span
                                        v-for="(item, index) in data.singer"
                                        :key="item.mid"
                                        :class="playingClass(data, 'hover-text')"
                                        @click="
                                            goToDetailPage(routerInstance, routeInstance, '/singerDetail', item.mid)
                                        "
                                    >
                                        {{ index === 0 ? `${item.name}` : ` / ${item.name}` }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="extra-operation">
                            <PauseOutlined v-if="isPlaying(data)" @click="audioObj.instance.pause()" />
                            <CaretRightOutlined v-else @click="play(data, id)" />
                            <PlusSquareOutlined />
                            <VerticalAlignBottomOutlined />
                            <EllipsisOutlined />
                        </div>
                    </div>
                    <div
                        :class="playingClass(data, 'hover-text')"
                        @click="goToDetailPage(routerInstance, routeInstance, '/albumDetail', data.albummid)"
                    >
                        {{ data.albumname }}
                    </div>
                    <div :class="playingClass(data, 'interval')">{{ secondConvertMinutes(data.interval) }}</div>
                </div>
            </template>
        </InfiniteList>
    </div>
</template>

<script setup>
import api from '../api';
import InfiniteList from '@/components/InfiniteList.vue';
import { onMounted, ref } from 'vue';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import {
    PauseOutlined,
    CaretRightOutlined,
    PlusSquareOutlined,
    VerticalAlignBottomOutlined,
    EllipsisOutlined,
ConsoleSqlOutlined,
} from '@ant-design/icons-vue';
import { secondConvertMinutes, goToDetailPage, getAlbumImg, errorImage } from '@/common/utils';
const mainStore = useMainStore();
const { audioObj } = storeToRefs(mainStore);
// const props = defineProps(['albummid']);
const routerInstance = useRouter();
const routeInstance = useRoute();
const dataSource = ref([]);
const sheetId = ref(null);
const tableLoading = ref(false);
onMounted(async () => {
    try {
        tableLoading.value = true;
        let res = await api.getUserInfo(1608069807);
        sheetId.value = res.mymusic[0].id;
        res = await api.getSongSheet(sheetId.value);
        dataSource.value = res.songlist;
    } catch (e) {
        console.log(e);
    } finally {
        tableLoading.value = false;
    }
});
// const imgRefList = ref([])
// function setImgRef(el) {
//     el && imgRefList.value.push(el)
// } 
function play(record, id) {
    if (mainStore.currentSong.songmid === record.songmid) {
        audioObj.value.state === 'paused' && audioObj.value.instance.play();
    } else {
        const song = {
            songmid: record.songmid,
            songName: record.songname,
            singer: record.singer.map(item => ({
                mid: item.mid,
                name: item.name,
            })),
        };
        mainStore.addSongAndPlay(song);
    }
    // let img = document.getElementById(`img-${id}`)
    // const colorThief = new ColorThief();
    // console.log(colorThief.getColor(img), img)
}
function playingClass(record, ...otherClass) {
    const classObj = {
        'playing-style': mainStore.currentSong.songmid === record.mid,
    };
    otherClass.forEach(className => {
        classObj[className] = true;
    });
    return classObj;
}
function isCurrentSong(data) {
    return mainStore.currentSong.songmid === data.songmid;
}
function isPlaying(data) {
    return mainStore.currentSong.songmid === data.songmid && audioObj.value.state === 'playing'
}
</script>

<style lang="less" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-title {
    display: flex;
    background-color: white;
    > span:nth-child(1) {
        width: 40%;
    }
    > span:nth-child(2) {
        width: 40%;
    }
    > span:nth-child(3) {
        flex: 1;
        padding-left: 0;
    }
    > span {
        padding: 12px;
        &:hover {
            background-color: #ebedef;
            color: @primary-color;
        }
    }
}
.infinite-wrap {
    background-color: white;
}
.song-item {
    display: flex;
    align-items: center;
    > div {
        width: 40%;
        padding: 12px;
    }
    .interval {
        flex: 1;
    }
    .playing-style {
        color: @primary-color;
    }
    &:hover {
        .extra-operation {
            display: flex;
        }
    }
}
.is-playing {
    color: white;
    background-image: linear-gradient(108deg, rgb(0, 166, 81) 9.3%, rgb(0, 209, 174) 118.3%);
    .extra-operation {
        display: flex !important;
    }
}
.hover-text {
    cursor: pointer;
    &:hover {
        color: @primary-color;
    }
}
.song-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .album-cover {
        width: 50px;
        height: 50px;
    }
    .song-album {
        flex: 1;
        display: flex;
        align-items: center;
        width: calc(100% - 120px);
        .song-name-container {
            width: calc(100% - 62px);
            margin-left: 12px;
        }
        .song-name {
            .text-ellipsis();
            font-size: 17px;
            font-weight: bold;
        }
    }
    .extra-operation {
        width: 120px;
        display: none;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
    }
}
</style>
