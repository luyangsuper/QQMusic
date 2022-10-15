<template>
    <div>
        <div class="rank-info">
            <img :src="rankingInfo.coverImg" alt="" width="150" height="150" class="cover-img" />
            <div class="info-text">
                <span class="title">{{ rankingInfo.title }}</span>
                <span>{{ rankingInfo.detail }}</span>
                <span>更新时间：{{ rankingInfo.update }}</span>
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
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'songname'">
                    <div class="song-name-col">
                        <div class="song-name-container">
                            <div class="song-rank">
                                <span :class="playingClass(record)">{{ record.rank }}</span>
                                <span :class="rankStyle(record)[0]">{{ rankStyle(record)[1] }}</span>
                            </div>
                            <img v-show="index <= 2" :src="record.cover" alt="" class="album-cover"/>
                            <div :class="playingClass(record, 'song-name')">
                                {{ record.title }}
                            </div>
                        </div>
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
                <template v-if="column.dataIndex === 'singerName'">
                    <span
                        v-for="(item, index) in record.singer"
                        :key="item.mid"
                        :class="playingClass(record, 'singer-name')"
                        @click="goToDetailPage(routerInstance, routeInstance, '/singerDetail', item.mid)"
                    >
                        {{ index === 0 ? `${item.name}` : ` / ${item.name}` }}</span
                    >
                </template>
                <template v-if="column.dataIndex === 'albumname'">
                    <span
                        :class="playingClass(record, 'album-name')"
                        @click="goToDetailPage(routerInstance, routeInstance, '/albumDetail', record.album.mid)"
                        >{{ record.album.name }}</span
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
import {
    PauseOutlined,
    CaretRightOutlined,
    PlusSquareOutlined,
    VerticalAlignBottomOutlined,
    EllipsisOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import api from '../api';
import { secondConvertMinutes, goToDetailPage } from '@/common/utils';
const props = defineProps(['id', 'period']);
const mainStore = useMainStore();
const { audioObj } = storeToRefs(mainStore);
const routerInstance = useRouter();
const routeInstance = useRoute();
const dataSource = ref([]);
const columns = [
    {
        title: '歌曲',
        dataIndex: 'songname',
        ellipsis: true,
    },
    {
        title: '歌手',
        dataIndex: 'singerName',
    },
    {
        title: '专辑',
        dataIndex: 'albumname',
    },
    {
        title: '时长',
        dataIndex: 'interval',
    },
];
const tableLoading = ref(false);
const rankingInfo = reactive({
    coverImg: '',
    update: '',
    title: '',
    detail: '',
});
function getRankingPage() {
    tableLoading.value = true;
    const params = {
        id: props.id,
        period: props.period,
    };
    api.getRankListDetail(params)
        .then(res => {
            dataSource.value = res.list;
            rankingInfo.coverImg = res.info.picUrl;
            rankingInfo.title = res.info.title;
            rankingInfo.update = res.update;
            rankingInfo.detail = res.info.desc;
            console.log(res, 555);
        })
        .finally(() => {
            tableLoading.value = false;
        });
}

onMounted(() => {
    getRankingPage();
});

function rankStyle(record) {
    const mapping = {
        1: 'rise',
        2: 'decline',
        3: 'even',
        4: 'new',
        6: 'rise',
    };
    const value = [1, 2, 6].includes(record.rankType) ? record.rankValue : record.rankType === 4 ? 'new' : '-';
    return [`song-rank-${mapping[record.rankType]}` || '', value];
}

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

function playingClass(record, ...otherClass) {
    const classObj = {
        'playing-style': mainStore.currentSong.songmid === record.mid,
    };
    otherClass.forEach(className => {
        classObj[className] = true;
    });
    return classObj;
}
</script>

<style scoped lang="less">
.rank-info {
    display: flex;
    padding: 12px;
    .cover-img {
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
:deep(.ant-menu) {
    background: inherit;
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
.singer-name {
    cursor: pointer;
    &:hover {
        color: @primary-color;
    }
}
.album-name {
    cursor: pointer;
    &:hover {
        color: @primary-color;
    }
}
.song-name-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .extra-operation {
        display: none;
        justify-content: space-evenly;
        width: 100px;
        span {
            cursor: pointer;
            &:hover {
                color: @primary-color;
            }
        }
    }
    .song-rank {
        flex-shrink: 0;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        width: 50px;
        &-rise {
            position: relative;
            padding-left: 12px;
            font-size: 12px;
            color: #f44336;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 22%;
                border-width: 4px;
                border-style: solid;
                border-color: transparent transparent red transparent;
            }
        }
        &-decline {
            position: relative;
            padding-left: 12px;
            font-size: 12px;
            color: #2196f3;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                bottom: 22%;
                border-width: 4px;
                border-style: solid;
                border-color: #0288d1 transparent transparent transparent;
            }
        }
        &-even {
            color: gray;
        }
        &-new {
            font-size: 12px;
            color: #2ecc71;
        }
    }
    .album-cover {
        width: 35px;
        height: 35px;
        border-radius: 4px;
    }
    .song-name-container {
        overflow: hidden;
        display: flex;
        align-items: center;
        .song-name {
            // flex-shrink: 0;
            margin-left: 12px;
        }
    }
}
</style>
