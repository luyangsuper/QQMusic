<template>
    <div>
        <a-table tableLayout="fixed" :dataSource="dataSource" :columns="columns" size="middle" rowKey="docid" :pagination="false"/>
        <a-pagination size="small" :total="pageOption.total" :pageSize="pageOption.pageSize" @change="paginationChange" />
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from 'axios'
import API from './api'
const dataSource = ref([]);
const pageOption = reactive({
    current: 1,
    pageSize: 20,
    total: 0
})
const paginationChange = (value) => {
    pageOption.current = value
    const params = {
        // key: '周杰伦',
        pageSize: 20,
        pageNo: pageOption.current
    }
    API.getSongPage(params)
    .then(res => {
        console.log(res)
    })
    .catch(() => {
        
    })
    // axios.get(`api/search?key=%E5%91%A8%E6%9D%B0%E4%BC%A6&pageSize=20&pageNo=${pageOption.current}`).then((res) => {
    //     dataSource.value = res.data.data.list;
    //     pageOption.total = res.data.data.total
    // });
};
axios.get("api/search?key=%E5%91%A8%E6%9D%B0%E4%BC%A6&pageSize=20").then((res) => {
    dataSource.value = res.data.data.list;
    pageOption.total = res.data.data.total
});
const columns = [
    {
        title: "歌曲",
        dataIndex: "songname",
        ellipsis: true
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
axios.get("api/search?key=%E5%91%A8%E6%9D%B0%E4%BC%A6");
</script>

<style scoped lang="less"></style>
