<template>
    <div class="menu-container" :style="collapsed ? { width: '130px' } : { width: '200px' }">
        <div class="logo">
            <img src="../../assets/img/logo.svg" class="logo-img" />
            QQ音乐
        </div>
        <a-button type="primary" @click="collapsed = !collapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
        <a-menu
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
            class="menu"
            v-model:selectedKeys="selectedKeys"
            @select="handleSelect"
        >
            <a-menu-item v-for="item of menuItems" :key="item.key">
                <template #icon>
                    <PieChartOutlined />
                </template>
                <span>{{ item.name }}</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { PieChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
const router = useRouter();
const collapsed = ref(false);
// const state = reactive({
//       collapsed: false,
//       selectedKeys: ['1'],
//       openKeys: ['sub1'],
//       preOpenKeys: ['sub1'],
//     });
const menuItems = [
    {
        name: "推荐",
        icon: () => PieChartOutlined,
        key: "/test1",
    },
    {
        name: "视频",
        icon: () => PieChartOutlined,
        key: "/test2",
    },
    {
        name: "音乐列表",
        icon: () => PieChartOutlined,
        key: "/songList",
    },
];
let selectedKeys = ref([]);
const handleSelect = (selectedItem) => {
    const { key } = selectedItem;
    router.replace({ path: key });
};

router.beforeEach(({ path }) => {
    menuItems.find((item) => item.key === path) ? selectedKeys.value = [path] : selectedKeys.value = [];
});
</script>

<style scoped lang="less">
:deep(.ant-menu) {
    background: inherit;
}
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
