<template>
    <div class="header-container">
        <a-button type="primary" @click="collapsed = !collapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
        <a-popover
            v-model:visible="visible"
            title="在线音乐"
            trigger="click"
            :getPopupContainer="trigger => trigger.parentNode"
            @visibleChange="visibleChange"
        >
            <template #content>
                <div v-show="searchContent.song.length" class="content">
                    <span class="type">单曲</span>
                    <ul>
                        <li v-for="item of searchContent.song" :key="item.id" @click="playSong(item)">
                            {{ item.name }}
                            -
                            {{ item.singer }}
                        </li>
                    </ul>
                </div>
                <div v-show="searchContent.singer.length" class="content">
                    <span class="type">歌手</span>
                    <ul>
                        <li
                            v-for="item of searchContent.singer"
                            :key="item.id"
                            @click="clickItem('/singerDetail', item.mid)"
                        >
                            <img :src="item.pic" width="30" height="30" class="singer-img" />
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
                <div v-show="searchContent.album.length" class="content">
                    <span class="type">专辑</span>
                    <ul>
                        <li
                            v-for="item of searchContent.album"
                            :key="item.id"
                            @click="clickItem('/albumDetail', item.mid)"
                        >
                            <img :src="item.pic" width="30" height="30" />
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </template>
            <a-input-search
                v-model:value="value"
                placeholder="搜索音乐"
                class="input-search"
                @search="onSearch"
                @keyup.enter="onSearch"
            />
        </a-popover>
        <div class="bear" />
    </div>
</template>

<script setup>
import api from './api';
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '../../store';
import utils from '@/common/utils';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
const routerInstance = useRouter();
const routeInstance = useRoute();
const mainStore = useMainStore();
const { searchObject, collapsed } = storeToRefs(mainStore);
const value = ref('');
const onSearch = () => {
    let tirmValue = value.value.trim();
    if (!tirmValue) {
        message.warning('请输入要搜索的内容');
    } else {
        searchObject.value = { value: tirmValue };
        routerInstance.replace({ name: 'searchPage' });
    }
};

const visible = ref(false);
const searchContent = reactive({
    song: [],
    mv: [],
    singer: [],
    album: [],
});
watch(value, () => {
    if (value.value.trim()) {
        api.associationSearch(value.value).then(res => {
            searchContent.song = res.song.itemlist;
            searchContent.singer = res.singer.itemlist;
            searchContent.album = res.album.itemlist;
            visible.value = !!Object.values(res).filter(item => item.count).length;
        });
    } else {
        visible.value = false;
    }
});

function playSong(item) {
    const song = {
        songmid: item.mid,
        songName: item.name,
        singer: item.singer,
    };
    mainStore.addSongAndPlay(song);
}

function clickItem(route, id) {
    visible.value = false;
    utils.goToDetailPage(routerInstance, routeInstance, route, id);
}

function visibleChange(show) {
    if (show) {
        // api.getHotSeach().then(res => {
        //     console.log(res, 666);
        // });
    }
}
</script>

<style scoped lang="less">
.header-container {
    width: 100%;
    padding: 20px;
    // background-color: #f6f6f6;
    background: url('@/assets/img/bear-background.png') repeat;
    background-size: 10% 100%;
    animation: bearBgMove 80s linear 1, bearBgMove2 80s linear 80s infinite;
    display: flex;
    .content {
        display: flex;
        .type {
            padding: 4px;
        }
        ul {
            width: calc(100% - 36px);
            margin: 0;
            list-style: none;
            li {
                padding: 4px;
                cursor: default;
                &:hover {
                    background-color: #f3f3f3;
                }
            }
            .singer-img {
                border-radius: 50%;
            }
        }
    }

    .input-search {
        width: 200px;
        margin-left: 20px;
    }
    .bear {
        position: relative;
        margin-top: 5px;
        width: 50px;
        height: 25px;
        background: url('@/assets/img/brear.png');
        background-size: 400px 25px;
        background-repeat: no-repeat;
        animation: bear 0.8s steps(8) infinite, move 80s linear forwards;
    }
}

@keyframes bear {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -400px 0; //图片往左移动
    }
}
@keyframes move {
    0% {
        left: 0;
    }
    49% {
        left: calc(100% - 240px);
        transform: rotateY(0);
    }
    50% {
        left: calc(100% - 240px);
        transform: rotateY(180deg);
    }
    99% {
        left: 0;
        transform: rotateY(180deg);
    }
    100% {
        left: 0;
        transform: rotateY(0);
    }
}
@keyframes bearBgMove {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: -100% 0; //图片往左移动
    }
    100% {
        background-position: 0 0;
    }
}

@keyframes bearBgMove2 {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0; //图片往左移动
    }
}
</style>