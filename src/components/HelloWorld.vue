<template>
    <div class="test-container">
        <InfiniteList :listData="listData" height="400px">
            <template #default="{item}">
                <div class="test-item">
                    <span>{{item.key}}</span>
                </div>
            </template>
        </InfiniteList>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import InfiniteList from './InfiniteList.vue';
const listData = Array.from({ length: 100 }).map((item, index) => ({key: index}));
</script>

<style scoped lang="less">
    .test-container {
        height: 400px;
    }
    .test-item {
        background-color: red;
        padding: 10px;
    }
</style>