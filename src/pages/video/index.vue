<template>
    <div class="mv-list-container">
        <h1 class="title">MV</h1>
        <a-tabs v-model:activeKey="activeKey" @change="changeTab">
            <a-tab-pane v-for="(item, index) of tabList" :key="index" :tab="item.title"></a-tab-pane>
        </a-tabs>
        <component :is="currentComponent"></component>
    </div>
</template>

<script setup>
import api from './api';
import { shallowRef, ref, defineAsyncComponent, onMounted } from 'vue';
// import RankingList from "./modules/RankingList.vue";
const activeKey = ref(0);
const currentComponent = shallowRef();
const tabList = [
    {
        title: '精选',
        component: defineAsyncComponent(() => import('./components/MvList.vue')),
    },
];
onMounted(() => {
    currentComponent.value = tabList[activeKey.value].component;
});
const changeTab = key => {
    currentComponent.value = tabList[key].component;
};
</script>

<style lang="less" scoped>
    .mv-list-container {
        padding: 24px 0 24px 24px;
        .title{
            font-weight: bold;
        }
    }
</style>