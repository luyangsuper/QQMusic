<template>
    <div :class="{ 'menu-container': true, 'hidden-menu': collapsed }">
        <div class="logo">
            <img src="../../assets/img/logo.png" class="logo-img" />
        </div>

        <a-menu
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
            class="menu"
            v-model:selectedKeys="selectedKeys"
            @select="handleSelect"
        >
            <a-menu-item v-for="item of menus.fixed" :key="item.key">
                <span>{{ item.name }}</span>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from './api';
import { PieChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useMainStore } from '../../store';
import { storeToRefs } from 'pinia';
const mainStore = useMainStore();
const router = useRouter();
// const collapsed = ref(false);
const { collapsed } = storeToRefs(mainStore);
// const state = reactive({
//       collapsed: false,
//       selectedKeys: ['1'],
//       openKeys: ['sub1'],
//       preOpenKeys: ['sub1'],
//     });
const menus = reactive({
    fixed: [
        {
            name: '推荐',
            icon: () => PieChartOutlined,
            key: '/test1',
        },
        {
            name: '视频',
            icon: () => PieChartOutlined,
            key: '/mv',
        },
        {
            name: '音乐馆',
            icon: () => PieChartOutlined,
            key: '/musicHall',
        },
        {
            name: '我喜欢',
            icon: () => PieChartOutlined,
            key: '/myFavorite',
        },
    ],
    userDiss: [],
});
const menuItems = computed(() => [...menus.fixed, ...menus.userDiss]);
let selectedKeys = ref([]);
const handleSelect = selectedItem => {
    const { key } = selectedItem;
    router.replace({ path: key });
};
api.getUserInfo(1608069807).then(res => {
    menus.userDiss.push(
        ...res.mydiss.list.map(item => {
            return {
                name: item.title,
                key: `/myDiss/${item.dissid}`,
            };
        })
    );
});

router.beforeEach(({ path }) => {
    menuItems.value.find(item => item.key === path) ? (selectedKeys.value = [path]) : (selectedKeys.value = []);
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
    text-align: left;
    padding: 0 16px !important;
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
    overflow: hidden;
    width: 0;
    height: 100%;
    background-color: #f0f0f0;
    transition: all 0.3s ease;
    .menu {
        background-color: inherit;
    }
    .logo {
        display: flex;
        justify-content: center;
        margin: 10px 0;
        font-size: 17px;
        font-family: 'FiraCode';
        .logo-img {
            height: 28px;
            object-fit: contain;
        }
    }
}
.hidden-menu {
    width: 200px;
    padding: 20px;
}
</style>