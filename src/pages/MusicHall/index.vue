<template>
    <div>
        <h1>音乐馆</h1>
        <a-tabs v-model:activeKey="activeKey" @change="changeTab">
            <a-tab-pane v-for="(item, index) of tabList" :key="index" :tab="item.title"></a-tab-pane>
        </a-tabs>
        <component :is="currentComponent"></component>
    </div>
</template>

<script setup>
import { shallowRef, ref, defineAsyncComponent, onMounted } from "vue";
// import RankingList from "./modules/RankingList.vue";
const activeKey = ref(0);
const currentComponent = shallowRef();
const tabList = [
    {
        title: '排行榜',
        component: defineAsyncComponent(() => import('./components/RankingList.vue'))
    }
]
onMounted(() => {
    currentComponent.value = tabList[activeKey.value].component
})
const changeTab = (key) => {
    currentComponent.value = tabList[key].component
}
</script>

<style lang="less" scoped></style>
