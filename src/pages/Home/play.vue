<template>
    <a-drawer
        :visible="visible"
        height="100%"
        placement="bottom"
        :closable="false"
        class="play-drawer"
        :forceRender="true"
        @after-visible-change="afterVisibleChange"
        @close="close"
    >
        <div class="drawer-container" :style="containerStyle">
            <div class="drawer-header">
                <span class="dropdown-icon" @click="close"></span>
            </div>
            <div class="drawer-content">
                <div class="album-cover-container">
                    <img :src="songInfo.albumCover" alt="" :class="{'album-cover': true, 'animation-rotate': audioObj.state === 'playing'}" @error="errorImage" />
                </div>
                <div class="song-lyric-container">
                    <div class="song-base-info">
                        <div class="song-name">{{ mainStore.currentSong?.songName }}</div>
                        <div class="song-text">歌手：{{ singerListToString(songInfo.singer) }}</div>
                        <div class="song-text">专辑：{{ songInfo.albumName }}</div>
                    </div>
                    <div class="song-lyric" ref="lyricDiv">
                        <!-- :style="currentIndex === index ? playLyricStyle : {}" -->
                        <div
                            v-for="(item, index) of songInfo.lyric"
                            :key="index"
                            :class="{ 'play-lyric-text': currentIndex === index }"
                        >
                            {{ item.word }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-drawer>
</template>

<script setup>
import { onMounted, reactive, watch, ref } from 'vue';
import api from './api';
import { getAlbumImg, errorImage } from '@/common/utils.js';
import { useMainStore } from '../../store';
import { storeToRefs } from 'pinia';
const mainStore = useMainStore();
const { playIndex, audioObj } = storeToRefs(mainStore);
const emit = defineEmits(['close']);
const props = defineProps(['visible']);
const lyricDiv = ref(null);
const songInfo = reactive({
    albumCover: '',
    albumName: '',
    singer: [],
    lyric: [],
});
const containerStyle = reactive({
    background: '',
    backgroundSize: '100% 100%',
    objectFit: 'contain',
});

watch(playIndex, () => {
    if (playIndex !== null) {
        api.getSongDetail(mainStore.currentSong.songmid).then(res => {
            songInfo.albumCover = getAlbumImg(res.track_info?.album?.mid);
            songInfo.albumName = res.track_info?.album?.name;
            songInfo.singer = res.track_info?.singer;
            containerStyle.background = `url(${songInfo.albumCover}) no-repeat`;
        });
        api.getLyric(mainStore.currentSong.songmid).then(res => {
            const lyricList = res.lyric
                .split('\n')
                .slice(5)
                .filter(item => item.slice(10));
            songInfo.lyric = lyricList.map(item => {
                let [minutes, seconds] = item.slice(1, 9).split(':');
                return {
                    time: item.slice(1, 6),
                    seconds: Number(minutes) * 60 + Math.round(Number(seconds)),
                    word: item.slice(10),
                };
            });
        });
    }
});

const currentIndex = ref(0);
// const playLyricStyle = reactive({
//     backgroundSize: '0% 100%',
// });
watch(
    () => audioObj.value.instance,
    (newAudio, oldAudio) => {
        oldAudio && oldAudio.addEventListener('timeupdate', scrollLyric);
        newAudio.addEventListener('timeupdate', scrollLyric);
    }
);
function autoScroll(scrollDistance) {
    !isScroll.value && (lyricDiv.value.scrollTop = scrollDistance);
}
function scrollLyric() {
    if (songInfo.lyric.length) {
        let currentSecond = audioObj.value.instance.currentTime;
        const lastIndex = songInfo.lyric.length - 1;
        for (let i = 0; i < lastIndex; i++) {
            // const allSeconds = songInfo.lyric[i + 1].seconds - songInfo.lyric[i].seconds;
            // const passedSeconds = currentSecond - songInfo.lyric[i].seconds;
            // playLyricStyle.backgroundSize = `${Math.round(
            //     (passedSeconds / allSeconds) * 100
            // )}% 100%`;
            if (songInfo.lyric[i].seconds <= currentSecond && songInfo.lyric[i + 1].seconds > currentSecond) {
                currentIndex.value = i;
                autoScroll(38 * i);
            }
        }
        if (currentSecond > songInfo.lyric[lastIndex].seconds) {
            currentIndex.value = lastIndex;
            autoScroll(38 * lastIndex);
        }
    }
}

const isScroll = ref(false);
const timer = ref(null);
onMounted(() => {
    lyricDiv.value.addEventListener('mousewheel', () => {
        isScroll.value = true;
        clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            isScroll.value = false;
        }, 1000);
    });
});
function close() {
    emit('close');
}
function afterVisibleChange() {}
function singerListToString(list) {
    return list.map(item => item.name).join('/');
}
</script>

<style lang="less" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.drawer-container {
    overflow: hidden;
    position: relative;
    height: 100%;
    &:after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        height: 100%;
        width: 100%;
        background: inherit;
        filter: blur(40px) brightness(50%);
        transform: scale(1.5);
        z-index: 2;
    }
}
.drawer-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    padding: 24px;
    .dropdown-icon {
        display: block;
        position: relative;
        width: 17px;
        height: 10px;
        cursor: pointer;
        &:hover {
            &::before {
                background-color: @primary-color;
            }
            &::after {
                background-color: @primary-color;
            }
        }
        &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            width: 12px;
            height: 2px;
            transform: rotate(40deg);
            transform-origin: left center;
            background: white;
        }
        &::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            width: 12px;
            height: 2px;
            transform: rotate(-40deg);
            transform-origin: right center;
            background: white;
        }
    }
}
@keyframes rotateCircle {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
.drawer-content {
    position: absolute;
    top: 58px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: calc(100% - 58px);
    width: 100%;
    .album-cover-container {
        width: 30vh;
        height: 30vh;
        background: url(../../assets/img/albumBg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        .album-cover {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -9.5vh;
            margin-top: -9.5vh;
            // transform: translate(-50%, -50%);
            width: 19vh;
            height: 19vh;
            border-radius: 50%;
            object-fit: contain;
        }
        .animation-rotate {
            animation: rotateCircle 28s linear infinite;
        }
    }
    .song-lyric-container {
        position: relative;
        width: 450px;
        text-align: center;
    }
    .song-lyric {
        overflow: auto;
        scroll-behavior: smooth;
        height: 40vh;
        padding: 20vh 0;
        margin: 8px;
        color: white;
        font-size: 16px;
        &::-webkit-scrollbar {
            width: 0;
        }
        div {
            height: 38px;
            line-height: 38px;
            .text-ellipsis();
        }
        .play-lyric-text {
            color: @primary-color;
            // background: white -webkit-linear-gradient(left, red, red) no-repeat 0 0;
            // -webkit-text-fill-color: transparent;
            // -webkit-background-clip: text;
            // transition: background-size 0.2s linear;
        }
    }
    .song-base-info {
        // height: 80px;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -100%);
        .song-name {
            .text-ellipsis();
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            font-weight: bold;
            color: white;
        }
        .song-text {
            .text-ellipsis();
            font-size: 12px;
            color: #b3b6b7;
        }
    }
}
</style>

<style lang="less">
.play-drawer {
    .ant-drawer-body {
        padding: 0;
    }
}
</style>
