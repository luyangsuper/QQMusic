<template>
    <a-drawer
        :visible="visible"
        placement="right"
        :closable="false"
        :forceRender="true"
        :bodyStyle="{padding: 0}"
        width="280"
        @close="emit('close', false)"
    >
        <div class="play-list-drawer">
            <template v-if="playList.length">
                <div class="title">播放队列</div>
                <div class="song-num-text">
                    <span class="song-num">{{ playList.length }}</span>
                    首歌曲
                </div>
                <div
                    v-for="item of playList"
                    :key="item.songmid"
                    :class="{
                        'song-item': true,
                        'active-item': mainStore.currentSong.songmid === item.songmid,
                    }"
                    @dblclick="playSong(item.songmid)"
                >
                    <div class="song-info">
                        <span class="song-name">{{ item.songName }}</span>
                        <span class="singer-text">
                            {{ item.singer.map(singer => singer.name).join(' / ') }}
                        </span>
                    </div>
                    <div class="play-action">
                        <PauseOutlined
                            v-if="
                                mainStore.currentSong.songmid === item.songmid &&
                                audioObj.state === 'playing'
                            "
                            @click="audioObj.instance.pause()"
                        />
                        <CaretRightOutlined v-else @click="playSong(item.songmid)" />
                        <HeartOutlined />
                    </div>
                </div>
            </template>
            <div v-else class="no-data-container">
                <a-empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                />
            </div>
        </div>
        <template #footer>
            <div class="play-list-drawer-footer">
                <a-button @click="emit('close', false)">收起</a-button>
            </div>
        </template>
    </a-drawer>
</template>

<script setup>
import { PauseOutlined, CaretRightOutlined, HeartOutlined } from '@ant-design/icons-vue';
import { Empty } from 'ant-design-vue';
import { onMounted, reactive, watch, ref } from 'vue';
import { useMainStore } from '../../store';
import { storeToRefs } from 'pinia';
const mainStore = useMainStore();
const { playList, audioObj } = storeToRefs(mainStore);
const emit = defineEmits(['close']);
const props = defineProps(['visible']);
function playSong(songmid) {
    if (mainStore.currentSong.songmid === songmid) {
        audioObj.value.instance.play();
    } else {
        mainStore.addSongAndPlay({ songmid });
    }
}
</script>

<style lang="less" scoped>
.play-list-drawer {
    height: calc(100% - 71px);
    .text-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .title {
        padding: 12px 16px 0 16px;
        font-size: 20px;
        font-weight: bold;
    }
    .song-num-text {
        padding: 2px 16px 12px;
        color: gray;
        .song-num {
            color: #03a9f4;
            font-weight: bold;
        }
    }
    .active-item {
        color: @primary-color;
        background-color: #efefef;
        .singer-text {
            color: @primary-color !important;
        }
        .play-action {
            display: flex !important;
            color: @primary-color !important;
        }
    }
    .song-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 8px 16px;
        &:hover {
            background-color: #efefef;
            .play-action {
                display: flex !important;
            }
        }
        .song-info {
            display: flex;
            flex-direction: column;
            width: calc(100% - 52px);
            .song-name {
                .text-ellipsis();
            }
            .singer-text {
                .text-ellipsis();
                font-size: 12px;
                color: gray;
            }
        }
        .play-action {
            align-items: center;
            display: none;
            color: gray;
            span {
                padding: 0 4px;
                font-size: 18px;
            }
        }
    }
    .no-data-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
}
.play-list-drawer-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
}
</style>