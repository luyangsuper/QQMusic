<template>
    <div>
        <a-table
            tableLayout="fixed"
            :dataSource="dataSource"
            :columns="columns"
            size="middle"
            rowKey="docid"
            :scroll="{y: 700}"
            :loading="tableLoading"
            :pagination="false"
        />
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
import { reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../../store";
import {useRoute} from 'vue-router'
import axios from "axios";
import API from "./api";
const mainStore = useMainStore();
const { searchObject } = storeToRefs(mainStore);
const route = useRoute()
const dataSource = ref([]);
const pageOption = reactive({
    current: 1,
    pageSize: 20,
    total: 0
});
const tableLoading = ref(false);
watch(searchObject, () =>{
    paginationChange(1)
})
/**
 * @description: 歌曲分页查询
 * @param {Number} 点击的页数
 */
const paginationChange = (currentPage) => {
    tableLoading.value = true;
    pageOption.current = currentPage;
    const params = {
        key: searchObject.value.value,
        pageSize: 20,
        pageNo: pageOption.current,
    };
    API.getSongPage(params)
        .then((res) => {
            dataSource.value = res.data.list;
            pageOption.total = res.data.total;
        })
        .catch(() => {})
        .finally(() => {
            tableLoading.value = false;
        });
};
const columns = [
    {
        title: "歌曲",
        dataIndex: "songname",
        ellipsis: true,
    },
    {
        title: "歌手",
        dataIndex: "age",
    },
    {
        title: "专辑",
        dataIndex: "albumname",
    },
    {
        title: "时长",
        dataIndex: "",
    },
];
</script>

<style scoped lang="less">
:deep(.ant-menu) {
    background: inherit;
}
</style>
