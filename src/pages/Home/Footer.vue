<template>
    <div class="footer-container">
        <div class="progress-wrap" ref="progressWrap" @click="progressClick">
            <div class="progress-bar" ref="progressBar">
                <div class="dot" ref="dot"></div>
            </div>
        </div>
        <div class="footer-content">
            <div class="cover-container">
                <div class="album-cover-container">
                    <img :src="songState.albumCoverSrc" alt="" class="album-cover" />
                    <div class="cover-hover" @click="toggleDrawerShow">
                        <DoubleRightOutlined />
                    </div>
                </div>
                <div class="option">
                    <span class="song-title">{{ mainStore.currentSong.songName }}</span>
                    -
                    <span>
                        <span
                        v-for="(item, index) in mainStore.currentSong.singer"
                        :key="item.mid"
                        class="singer-text"
                        @click="goToDetailPage(routerInstance, routeInstance, '/singerDetail', item.mid)"
                    >
                        {{ index === 0 ? `${item.name}` : ` / ${item.name}` }}</span
                    >
                        </span>
                </div>
            </div>
            <div class="play-option">
                <a-tooltip title="上一首" color="white" overlayClassName="play-tip">
                    <step-backward-outlined class="icon" @click="preSongClick" />
                </a-tooltip>
                <a-tooltip v-if="audioObj.state === 'playing'" title="暂停" color="white" overlayClassName="play-tip">
                    <pause-circle-filled class="center-icon" @click="pause" />
                </a-tooltip>
                <a-tooltip v-else title="播放" color="white" overlayClassName="play-tip">
                    <play-circle-filled class="center-icon" @click="play" />
                </a-tooltip>
                <a-tooltip title="下一首" color="white" overlayClassName="play-tip">
                    <step-forward-outlined class="icon" @click="nextSongClick" />
                </a-tooltip>
            </div>
            <div class="play-order">
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="playTypeChange">
                            <a-menu-item key="loop">loop</a-menu-item>
                            <a-menu-item key="order">order</a-menu-item>
                            <!-- <a-menu-item key="3">3rd item</a-menu-item> -->
                        </a-menu>
                    </template>
                    <a-button type="text">
                        {{ playType }}
                    </a-button>
                </a-dropdown>
                <BarsOutlined class="play-list-icon" @click="togglePlayListDrawerShow(true)" />
            </div>
        </div>
    </div>
    <PlayDrawer :visible="playDrawerVisible" @close="toggleDrawerShow"></PlayDrawer>
    <PlayListDrawer :visible="playListDrawerVisible" @close="togglePlayListDrawerShow"></PlayListDrawer>
</template>

<script setup>
import { watch, onMounted, ref, reactive } from 'vue';
import { useMainStore } from '../../store';
import { storeToRefs } from 'pinia';
import {
    DoubleRightOutlined,
    DownOutlined,
    BarsOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    PauseCircleFilled,
    PlayCircleFilled,
    ConsoleSqlOutlined,
} from '@ant-design/icons-vue';
import PlayDrawer from './play.vue';
import PlayListDrawer from './PlayListDrawer.vue';
import api from './api';
import { useRouter, useRoute } from 'vue-router';
import { getAlbumImg, goToDetailPage } from '@/common/utils';
const routerInstance = useRouter();
const routeInstance = useRoute();
const mainStore = useMainStore();
const { playList, playIndex, audioObj, playType } = storeToRefs(mainStore);
const progressWrap = ref(null);
const progressBar = ref(null);
const dot = ref(null);
function dotMove(e) {
    e.preventDefault();
    let width = e.pageX - progressWrap.value.offsetLeft;
    let progressX = width > progressWrap.value.offsetWidth ? progressWrap.value.offsetWidth : width;
    progressBar.value.style.width = progressX + 'px';
    audioObj.value.instance.currentTime = Number(
        ((progressX / progressWrap.value.offsetWidth) * mainStore.audioInstance.duration).toFixed(6)
    );
}
function progressClick(e) {
    let width = e.pageX - progressWrap.value.offsetLeft;
    progressBar.value.style.width = width + 'px';
    audioObj.value.instance.currentTime = Number(
        ((width / progressWrap.value.offsetWidth) * mainStore.audioInstance.duration).toFixed(6)
    );
}
onMounted(() => {
    dot.value.addEventListener('mousedown', () => {
        document.body.addEventListener('mousemove', dotMove);
    });
    document.body.addEventListener('mouseup', () => {
        document.body.removeEventListener('mousemove', dotMove);
    });
    api.setCookie().then(res => {
        console.log(res);
    });
});

const playDrawerVisible = ref(false);
function toggleDrawerShow() {
    playDrawerVisible.value = !playDrawerVisible.value;
}

const playListDrawerVisible = ref(false);
function togglePlayListDrawerShow(show) {
    playListDrawerVisible.value = show;
}
const songState = reactive({
    albumCoverSrc: ''
});
watch(playIndex, () => {
    if (playIndex !== null) {
        api.getSongDetail(mainStore.currentSong.songmid).then(res => {
            songState.albumCoverSrc = getAlbumImg(res.track_info?.album?.mid);
        });
        if (mainStore.audioInstance) {
            pause();
            removeListener();
            audioObj.value.instance = null;
        }
        audioObj.value.instance = new Audio(mainStore.currentSong.url);
        addEventListener();
    }
});
function addEventListener() {
    mainStore.audioInstance.addEventListener('canplaythrough', play);
    mainStore.audioInstance.addEventListener('pause', audioPaused);
    mainStore.audioInstance.addEventListener('playing', audioPlaying);
    mainStore.audioInstance.addEventListener('ended', audioEnded);
    mainStore.audioInstance.addEventListener('timeupdate', timeUpdate);
}
function removeListener() {
    mainStore.audioInstance.removeEventListener('canplaythrough', play);
    mainStore.audioInstance.removeEventListener('pause', audioPaused);
    mainStore.audioInstance.removeEventListener('playing', audioPlaying);
    mainStore.audioInstance.removeEventListener('ended', audioEnded);
    mainStore.audioInstance.removeEventListener('timeupdate', timeUpdate);
}
function audioPaused() {
    audioObj.value.state = 'paused';
}
function pause() {
    mainStore.audioInstance.pause();
}
function audioPlaying() {
    audioObj.value.state = 'playing';
}
function play() {
    mainStore.audioInstance.play();
}
function timeUpdate() {
    const duration = mainStore.audioInstance.duration;
    const width = Math.floor((mainStore.audioInstance.currentTime / duration) * progressWrap.value.offsetWidth);
    progressBar.value.style.width = width + 'px';
}
function preSongClick() {
    const length = playList.value.length;
    if (length) {
        if (length > 1) {
            if (playIndex.value === 0) {
                playIndex.value = length - 1;
            } else {
                playIndex.value--;
            }
        }
    }
}
function nextSongClick() {
    const length = playList.value.length;
    if (length) {
        if (length > 1) {
            if (playIndex.value === length - 1) {
                playIndex.value = 0;
            } else {
                playIndex.value++;
            }
        }
    }
}
function audioEnded() {
    const mapping = {
        loop() {
            play();
        },
        order() {
            nextSongClick();
        },
    };
    mapping[playType.value]?.();
}
function playTypeChange(item) {
    playType.value = item.key;
}
function seek() {
    audio.value.currentTime = 20;
}
</script>
<style lang="less">
.play-tip {
    .ant-tooltip-inner {
        color: black;
    }
}
</style>
<style scoped lang="less">
.footer-container {
    // height: 80px;
    background-color: #f6f6f6;
    .progress-wrap {
        width: 100%;
        height: 3px;
        background-color: #eaeded;
        &:hover {
            .dot {
                opacity: 1;
            }
        }
    }
    .progress-bar {
        position: relative;
        width: 0;
        height: 100%;
        background-color: @primary-color;
    }
    .dot {
        opacity: 0;
        position: absolute;
        right: -5px;
        bottom: -4px;
        width: 10px;
        height: 10px;
        cursor: pointer;
        border-radius: 50%;
        background-color: @primary-color;
        transition: opacity 0.2s;
    }
    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        > div {
            width: 33%;
        }
        .cover-container {
            display: flex;
            .option {
                padding-left: 10px;
                .singer-text {
                    color: gray;
                    cursor: pointer;
                    &:hover {
                        color: @primary-color;
                    }
                }
            }
            .song-title {
                display: inline-block;
            }
            .album-cover-container {
                overflow: hidden;
                position: relative;
                width: 50px;
                height: 50px;
                border-radius: 4px;
                &:hover {
                    .cover-hover {
                        transform: rotate(-90deg) translateX(0);
                    }
                    .album-cover {
                        filter: brightness(65%);
                    }
                }
            }
            .album-cover {
                position: relative;
                width: 100%;
                height: 100%;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: red;
                }
            }
            .cover-hover {
                position: absolute;
                z-index: 3;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: rotate(-90deg) translateX(-100%);
                width: 100%;
                height: 100%;
                transition: transform 0.2s;
                // background: blue;
                span {
                    color: white;
                    font-size: 20px;
                }
            }
        }
        .play-option {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 120px;
            .icon {
                font-size: 28px;
                cursor: pointer;
                :hover {
                    color: @primary-color;
                }
            }
            .center-icon {
                color: @primary-color;
                font-size: 36px;
                cursor: pointer;
            }
        }
        .play-order {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .play-list-icon {
            cursor: pointer;
            color: @primary-color;
            font-size: 20px;
        }
    }
}
</style>