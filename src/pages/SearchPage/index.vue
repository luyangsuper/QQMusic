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
            :pagination="false"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'singer'">
                    {{ record.singer.map(singer => singer.name).join(" / ") }}
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
import { reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../../store";
import { useRoute } from "vue-router";
import axios from "axios";
import API from "./api";
const mainStore = useMainStore();
const { searchObject } = storeToRefs(mainStore);
const route = useRoute();
const dataSource = ref([]);
const pageOption = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
});


// countdownMinutes = countdownMinutes * 60;
// const countdownString = ref("");
// let spendTime = 0;
// const myVal = setInterval(() => {
//   countdownMinutes--;
//   spendTime++;

//   // studentAnswerPaper.spendTime++;
//   if (countdownMinutes * 1000 <= 0) {
//     clearInterval(myVal);
//     onClose();
//   }
//   let minutes = Number.parseInt(countdownMinutes / 60);
//   let seconds = countdownMinutes % 60;
//   if (countdownMinutes) {
//     countdownString.value = minutes
//       ? `倒计时：${minutes}分${seconds}秒`
//       : `倒计时：${seconds}秒`;
//   } else {
//     countdownString.value = "时间到";
//   }
// }, 1000);


const tableLoading = ref(false);
watch(searchObject, () => {
    paginationChange(1);
});
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
            console.log(res.data.list);
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
        dataIndex: "singer",
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
