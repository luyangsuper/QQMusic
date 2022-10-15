<template>
    <div>
        <a-table
            tableLayout="fixed"
            :dataSource="dataSource"
            :columns="columns"
            size="middle"
            rowKey="docid"
            :scroll="{ y: 700 }"
            :loading="tableLoading"
            rowClassName="song-row"
            :pagination="false"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'songname'">
                    <div class="songnanm-col">
                        <div class="songname">{{ record.songname }}</div>
                        <div class="extra-operation">
                            <CaretRightOutlined @click="play(record)" />
                            <PlusSquareOutlined />
                            <VerticalAlignBottomOutlined />
                            <EllipsisOutlined />
                        </div>
                    </div>
                </template>
                <template v-if="column.dataIndex === 'singer'">
                    {{ record.singer.map(singer => singer.name).join(" / ") }}
                </template>
                <template v-if="column.dataIndex === 'duration'">
                    {{ secondConvertMinutes(record.interval) }}
                </template>
            </template>
        </a-table>
        <a-pagination
            size="small"
            :hideOnSinglePage="true"
            :showSizeChanger="false"
            :total="pageOption.total"
            :pageSize="pageOption.pageSize"
            @change="paginationChange"
        />
    </div>
</template>

<script setup>
import {
    CaretRightOutlined,
    PlusSquareOutlined,
    VerticalAlignBottomOutlined,
    EllipsisOutlined,
} from "@ant-design/icons-vue";
import { reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../../store";
import { useRoute } from "vue-router";
import axios from "axios";
import API from "./api";
const mainStore = useMainStore();
const { searchObject, currentSong } = storeToRefs(mainStore);
const route = useRoute();
const dataSource = ref([]);
const pageOption = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
});
const columns = [
    {
        title: "歌曲",
        dataIndex: "songname",
        ellipsis: true,
    },
    {
        title: "歌手",
        dataIndex: "singer",
    },
    {
        title: "专辑",
        dataIndex: "albumname",
    },
    {
        title: "时长",
        dataIndex: "duration",
    },
];
const tableLoading = ref(false);
watch(searchObject, () => {
    paginationChange(1);
});
/**
 * @description: 歌曲分页查询
 * @param {Number} 点击的页数
 */
const paginationChange = currentPage => {
    tableLoading.value = true;
    pageOption.current = currentPage;
    const params = {
        key: searchObject.value.value,
        // pageSize: 20,
        // pageNo: pageOption.current,
    };
    API.getSongPage(params)
        .then(res => {
            console.log(res, 666)
            dataSource.value = res.data.list;
            pageOption.total = res.data.total;
        })
        .catch(() => {})
        .finally(() => {
            tableLoading.value = false;
        });
};
const secondConvertMinutes = interval => {
    const minutes = Number.parseInt(interval / 60) + "";
    const seconds = (interval % 60) + "";
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
};
const play = record => {
    currentSong.value = { songmid: record.songmid, albummid: record.albummid, singer: record.singer, songName: record.songname };
};
</script>

<style scoped lang="less">
:deep(.ant-menu) {
    background: inherit;
}
:deep(.song-row) {
    // background: red;
    &:hover {
        // display: flex;
        .extra-operation {
            display: flex;
        }
    }
}
.songnanm-col {
    display: flex;
    justify-content: space-between;
    .extra-operation {
        display: none;
        justify-content: space-evenly;
        width: 100px;
        cursor: pointer;
    }
    .songname {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
