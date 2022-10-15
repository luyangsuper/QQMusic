<template>
    <div>
        <div class="album-info">
            <img :src="ablumInfo.coverImg" alt="" width="150" height="150" class="album-img" />
            <div class="info-text">
                <span class="title">{{ ablumInfo.title }}</span>
                <span>发行时间：{{ ablumInfo.publishTime }}</span>
            </div>
        </div>
        <a-table
            tableLayout="fixed"
            :dataSource="dataSource"
            :columns="columns"
            size="middle"
            rowKey="id"
            :scroll="{ y: 'calc(100vh - 366px)' }"
            :loading="tableLoading"
            rowClassName="song-row"
            :pagination="false"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'songname'">
                    <div class="song-name-col">
                        <span :class="playingClass(record, 'song-name')">
                            {{ record.title }}
                        </span>
                        <div class="extra-operation">
                            <PauseOutlined
                                v-if="mainStore.currentSong.songmid === record.mid && audioObj.state === 'playing'"
                                @click="audioObj.instance.pause()"
                            />
                            <CaretRightOutlined v-else @click="play(record)" />
                            <PlusSquareOutlined />
                            <VerticalAlignBottomOutlined />
                            <EllipsisOutlined />
                        </div>
                    </div>
                </template>
                <template v-if="column.dataIndex === 'singer'">
                    <span
                        v-for="(item, index) in record.singer"
                        :key="item.mid"
                        :class="playingClass(record, 'singer-name')"
                        @click="goToSingerDetail(item.mid)"
                    >
                        {{ index === 0 ? `${item.name}` : ` / ${item.name}` }}</span
                    >
                </template>
                <template v-if="column.dataIndex === 'interval'">
                    <span :class="playingClass(record)">{{ secondConvertMinutes(record.interval) }}</span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import api from '../api';
import { secondConvertMinutes, transformNum } from '@/common/utils';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {
    PauseOutlined,
    CaretRightOutlined,
    PlusSquareOutlined,
    VerticalAlignBottomOutlined,
    EllipsisOutlined,
} from '@ant-design/icons-vue';
const mainStore = useMainStore();
const { audioObj } = storeToRefs(mainStore);
const props = defineProps(['albummid']);
const router = useRouter();
const ablumInfo = reactive({
    coverImg: '',
    publishTime: '',
    title: '',
});
watch(
    () => props.albummid,
    () => {
        api.getAlbumInfo(props.albummid).then(res => {
            ablumInfo.coverImg = res.picurl;
            ablumInfo.title = res.albumName;
            ablumInfo.publishTime = res.publishTime;
        });
        getSongList();
    }
);
onMounted(() => {
    api.getAlbumInfo(props.albummid).then(res => {
        ablumInfo.coverImg = res.picurl;
        ablumInfo.title = res.albumName;
        ablumInfo.publishTime = res.publishTime;
    });
    getSongList();
});
function play(record) {
    if (mainStore.currentSong.songmid === record.mid) {
        audioObj.value.instance.play();
    } else {
        const song = {
            songmid: record.mid,
            songName: record.title,
            singer: record.singer.map(item => ({
                mid: item.mid,
                name: item.name,
            })),
        };
        mainStore.addSongAndPlay(song);
    }
}
const columns = [
    {
        title: '歌曲',
        dataIndex: 'songname',
        ellipsis: true,
    },
    {
        title: '歌手',
        dataIndex: 'singer',
    },
    {
        title: '时长',
        dataIndex: 'interval',
    },
];
const dataSource = ref([]);
const tableLoading = ref(false);
function getSongList() {
    tableLoading.value = true;
    api.getAlbumSong(props.albummid)
        .then(res => {
            dataSource.value = res.list;
        })
        .finally(() => {
            tableLoading.value = false;
        });
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
function goToSingerDetail(singermid) {
    router.push({ path: '/singerDetail', query: { singermid } });
}
</script>

<style lang="less" scoped>
.album-info {
    display: flex;
    padding: 12px;
    .album-img {
        position: relative;
        border-radius: 8px;
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
    .title {
        font-weight: bold;
        font-size: 24px;
    }
    .info-text {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 24px;
    }
}
.singer-name {
    cursor: pointer;
    &:hover {
        color: @primary-color;
    }
}
.song-name-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .song-name {
        width: calc(100% - 80px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .extra-operation {
        width: 80px;
        display: none;
        justify-content: space-between;
        align-items: center;
    }
}
:deep(.song-row) {
    .playing-style {
        color: @primary-color;
    }
    &:hover {
        .extra-operation {
            display: flex;
        }
    }
}
.album-text {
    cursor: pointer;
    &:hover {
        color: @primary-color;
    }
}
</style>
