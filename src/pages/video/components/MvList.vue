<template>
    <a-radio-group v-model:value="params.area" button-style="solid" class="button-radio">
        <a-radio-button v-for="item in category.area" :value="item.id" :key="item.id">{{ item.name }}</a-radio-button>
    </a-radio-group>
    <a-radio-group v-model:value="params.version" button-style="solid" class="button-radio">
        <a-radio-button v-for="item in category.version" :value="item.id" :key="item.id">{{
            item.name
        }}</a-radio-button>
    </a-radio-group>
    <div class="mv-list-container">
        <div v-for="item in mvList" :key="item.id" class="mv-item">
            <img
                :src="item.picurl"
                alt=""
                class="mv-cover"
                @click="goToDetailPage(routerInstance, routeInstance, '/mvPlay', item.vid)"
            />
            <div class="mv-title">{{ item.title }}</div>
        </div>
    </div>
</template>

<script setup>
import api from '../api';
import { goToDetailPage } from '@/common/utils';
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, watch } from 'vue';
const routerInstance = useRouter();
const routeInstance = useRoute();
const params = reactive({
    area: 15,
    version: 7,
    pageNo: 1,
    pageSize: 20,
});
const category = reactive({
    area: [],
    version: [],
});
api.getMvCategory().then(res => {
    category.area = res.area;
    category.version = res.version;
});
const mvList = ref([]);
api.getMvList(params).then(res => {
    mvList.value = res.list;
    console.log(res);
});
watch(params, () => {
    api.getMvList(params).then(res => {
        mvList.value = res.list;
    });
});
</script>

<style lang="less" scoped>
.button-radio {
    display: block;
    margin-bottom: 12px;
}
.mv-list-container {
    display: flex;
    flex-wrap: wrap;
}
.mv-item {
    width: 250px;
    margin: 0 24px 24px 0;
    .mv-cover {
        height: 150px;
        width: 250px;
        object-fit: contain;
    }
    .mv-title {
        font-size: 16px;
        // font-weight: bold;
    }
}
</style>
