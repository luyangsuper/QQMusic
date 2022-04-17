<template>
    <div class="footer-container">
        <div class="progress" ref="progress" @click="movePoint">
            <div class="passed" ref="passedProgress">
                <span class="point" @mousedown="dragPoint"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted, ref } from "vue";
import { useMainStore } from "../../store";
import { storeToRefs } from "pinia";
import API from "./api";
const mainStore = useMainStore();
const { currentSong } = storeToRefs(mainStore);
onMounted(() => {
    API.setCookie().then(res => {
        console.log(res);
    });
});

const _throttle = (fn, timeout) => {
    let waiting = false
    return function newFn() {
        if(waiting) {
            return
        }
        waiting = true
        setTimeout(() => {
            fn()
            waiting = false
        }, timeout);
    }
}
let percent = 0
let totalTime = 0

const progress = ref(null)
const passedProgress = ref(null)
const movePoint = e => {
    const {width, left} = progress.value.getBoundingClientRect()
    if(e) {
        percent = ((e.clientX - left) / width).toFixed(5)
    }
    const offsetX = Math.floor(progress.value.getBoundingClientRect().width * percent)

    if(offsetX <= 0) {
        passedProgress.value.style.width = "0px"
    } else {
        passedProgress.value.style.width = `${offsetX}px`
    }
}
const dragPoint = () => {
    document.addEventListener('mousemove', movePoint)
    document.addEventListener('mouseup', removeDragEvent)
}
const removeDragEvent = () => {
    document.removeEventListener('mouseup', removeDragEvent)
    document.removeEventListener('mousemove', movePoint)
}


watch(currentSong, songmid => {
    API.getSonUrl(songmid)
        .then(res => {
            let audio = new Audio(res.data);
            const test = () => {
                // console.log(audio.currentTime)
                percent = (audio.currentTime / totalTime).toFixed(5)
                console.log(percent)
                movePoint()
            }
            const newTest = _throttle(test, 200)
            audio.addEventListener("canplaythrough", () => {
                totalTime = Math.floor(audio.duration)
                // audio.play();
                // audio.currentTime = 35
                audio.play();
            });
            audio.addEventListener('timeupdate', newTest)
        })
        .catch(() => {});
});
</script>
<style scoped lang="less">
.footer-container {
    height: 80px;
    .progress {
        width: 100%;
        height: 3px;
        background-color: #f0f0f0;
        .passed {
            position: relative;
            width: 100px;
            height: 100%;
            background: @primary-color;
            transition: width .2s linear;
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
                transition: opacity .3s ease;
            }
        }
        &:hover {
            .point {
                opacity: 1;
            }
        }
    }
}
</style>
