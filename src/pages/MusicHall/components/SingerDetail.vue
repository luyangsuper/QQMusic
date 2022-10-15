<template>
    <div>
        <a-table
            class="singer-song-table"
            tableLayout="fixed"
            :dataSource="dataSource"
            :columns="columns"
            size="middle"
            rowKey="id"
            :scroll="{ y: 'calc(100vh - 217px)' }"
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
                <template v-if="column.dataIndex === 'albumname'">
                    <span :class="playingClass(record)" class="album-text" @click="goToAlbumDetail(record.album.mid)">{{
                        record.album.name
                    }}</span>
                </template>
                <template v-if="column.dataIndex === 'interval'">
                    <span :class="playingClass(record)">{{ secondConvertMinutes(record.interval) }}</span>
                </template>
                <template v-if="column.dataIndex === 'hotGegree'">
                    <span>{{ transformNum(record.listen_count) }}</span>
                </template>
            </template>
        </a-table>
        <a-pagination
            size="small"
            :current="pageOption.current"
            :hideOnSinglePage="true"
            :showSizeChanger="false"
            :showTotal="total => `总共${total}条`"
            :total="pageOption.total"
            :pageSize="100"
            @change="paginationChange"
        />
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
const props = defineProps(['singermid']);
const singerImgSrc = ref('');
const router = useRouter();
watch(
    () => props.singermid,
    () => {
        // api.getSingerDetail(props.singermid).then(res => {
        //     console.log(res);
        // });
        pageOption.current = 1;
        getSongList();
    }
);
onMounted(() => {
    api.getSingerDetail(props.singermid).then(res => {
        console.log(res);
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
        title: '专辑',
        dataIndex: 'albumname',
    },
    {
        title: '时长',
        dataIndex: 'interval',
    },
    {
        title: '播放量',
        dataIndex: 'hotGegree',
    },
];
const pageOption = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
});
const dataSource = ref([]);
const tableLoading = ref(false);
function getSongList() {
    tableLoading.value = true;
    const params = {
        singermid: props.singermid,
        num: pageOption.pageSize,
        page: pageOption.current,
    };
    api.getSingerSong(params)
        .then(res => {
            dataSource.value = res.list;
            pageOption.total = res.total;
            console.log(res);
        })
        .finally(() => {
            tableLoading.value = false;
        });
}
function paginationChange(currentPage, pageSize) {
    pageOption.pageSize = pageSize;
    pageOption.current = currentPage;
    getSongList();
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
function goToAlbumDetail(albummid) {
    router.push({ path: '/albumDetail', query: { albummid } });
}
</script>

<style lang="less" scoped>
.singer-song-table {
    :deep(.ant-table-body) {
        height: calc(100vh - 217px);
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
:deep(.ant-pagination) {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    .ant-pagination-total-text {
        flex: 1;
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
