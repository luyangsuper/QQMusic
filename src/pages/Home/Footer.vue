<template>
    <div class="footer-container">
        <div class="progress" ref="progress" @click="movePoint">
            <div class="passed" ref="passedProgress">
                <span class="point" @mousedown="dragPoint"></span>
            </div>
        </div>
        <div class="footer-content">
            <div class="cover-container">
                <img :src="songState.albumCoverSrc" alt="专辑" class="album-cover" />
                <div class="option">
                    <p class="song-title">{{ songState.songName }}</p>
                    <span></span>
                </div>
            </div>
            <div class="play-option">
                <a-tooltip title="上一首" color="white" overlayClassName="play-tip">
                    <step-backward-outlined class="icon" />
                </a-tooltip>
                <a-tooltip title="播发" color="white" overlayClassName="play-tip">
                    <pause-circle-filled class="play-icon" />
                </a-tooltip>
                <a-tooltip title="上一首" color="white" overlayClassName="play-tip">
                    <step-forward-outlined class="icon" />
                </a-tooltip>
            </div>
            <div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted, ref, reactive } from "vue";
import { useMainStore } from "../../store";
import { storeToRefs } from "pinia";
import {
    StepBackwardOutlined,
    StepForwardOutlined,
    PauseCircleFilled,
} from "@ant-design/icons-vue";
import API from "./api";
const mainStore = useMainStore();
const { currentSong } = storeToRefs(mainStore);
onMounted(() => {
    API.setCookie().then(res => {
        console.log(res);
    });
});

const _throttle = (fn, timeout) => {
    let waiting = false;
    return function newFn() {
        if (waiting) {
            return;
        }
        waiting = true;
        setTimeout(() => {
            fn();
            waiting = false;
        }, timeout);
    };
};
let percent = 0;
let totalTime = 0;

const progress = ref(null);
const passedProgress = ref(null);
const movePoint = e => {
    const { width, left } = progress.value.getBoundingClientRect();
    if (e) {
        percent = ((e.clientX - left) / width).toFixed(5);
    }
    const offsetX = Math.floor(progress.value.getBoundingClientRect().width * percent);

    if (offsetX <= 0) {
        passedProgress.value.style.width = "0px";
    } else {
        passedProgress.value.style.width = `${offsetX}px`;
    }
};
const dragPoint = () => {
    document.addEventListener("mousemove", movePoint);
    document.addEventListener("mouseup", removeDragEvent);
};
const removeDragEvent = () => {
    document.removeEventListener("mouseup", removeDragEvent);
    document.removeEventListener("mousemove", movePoint);
};

const songState = reactive({
    albumCoverSrc: "",
    songName: "",
    singer: "",
});
watch(currentSong, ({ songmid, albummid, songName }) => {
    songState.albumCoverSrc = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`;
    songState.songName = songName;
    API.getSonUrl(songmid)
        .then(res => {
            let audio = new Audio(res.data);
            const test = () => {
                // console.log(audio.currentTime)
                percent = (audio.currentTime / totalTime).toFixed(5);
                movePoint();
            };
            const newTest = _throttle(test, 200);
            audio.addEventListener("canplaythrough", () => {
                totalTime = Math.floor(audio.duration);
                // audio.play();
                // audio.currentTime = 35
                audio.play();
            });
            audio.addEventListener("timeupdate", newTest);
        })
        .catch(() => {});
});
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
    .progress {
        width: 100%;
        height: 3px;
        background-color: #f0f0f0;
        .passed {
            position: relative;
            width: 0;
            height: 100%;
            background: @primary-color;
            transition: width 0.2s linear;
            .point {
                opacity: 0;
                display: inline-block;
                position: absolute;
                right: -6px;
                top: 50%;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: inherit;
                transform: translateY(-50%);
                transition: opacity 0.3s ease;
            }
        }
        &:hover {
            .point {
                opacity: 1;
            }
        }
    }
    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        .cover-container {
            .option {
                display: inline-block;
                padding-left: 10px;
            }
            .song-title {
                display: inline-block;
            }
            .album-cover {
                width: 50px;
                height: 50px;
                border-radius: 4px;
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
            .play-icon {
                color: @primary-color;
                font-size: 36px;
                cursor: pointer;
            }
        }
    }
}
</style>
