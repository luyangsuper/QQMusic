<template>
    <div class="menu-container" :style="collapsed ? { width: '130px' } : { width: '200px' }">
        <div class="logo">
            <img src="../../../assets/img/logo.svg" class="logo-img" />
            QQ音乐
        </div>
        <a-button type="primary" @click="collapsed = !collapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
        <a-menu mode="inline" theme="light" :inline-collapsed="collapsed" class="menu" v-model:selectedKeys="selectedKeys" @select="handleSelect">
            <a-menu-item key="/test1">
                <template #icon>
                    <PieChartOutlined />
                </template>
                <span>推荐</span>
            </a-menu-item>
            <a-menu-item key="/test2">
                <template #icon>
                    <PieChartOutlined />
                </template>
                <span>视频</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import { PieChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
const router = useRouter()
const collapsed = ref(false);
// const state = reactive({
//       collapsed: false,
//       selectedKeys: ['1'],
//       openKeys: ['sub1'],
//       preOpenKeys: ['sub1'],
//     });
let selectedKeys = ref(["2"]);
const handleSelect = (selectedItem) => {
    const {key} = selectedItem
    selectedKeys = [key]
    router.replace({ path: key })
}
</script>

<style scoped lang="less">
:deep(.ant-menu.ant-menu-inline-collapsed) {
    width: initial;
}
:deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
    background-color: @primary-color;
}
:deep(.ant-menu-item-selected) {
    color: white !important;
}
:deep(.ant-menu-item) {
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    &:hover {
        background-color: #e3e3e3;
        color: black;
    }
    &::after {
        border: none;
    }
}
.menu-container {
    height: 100%;
    padding: 10px;
    background-color: #f0f0f0;
    transition: width 0.3s ease;
    .menu {
        background-color: inherit;
    }
    .logo {
        margin: 10px 0;
        text-align: center;
        font-size: 17px;
        font-family: "FiraCode";
        .logo-img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>
