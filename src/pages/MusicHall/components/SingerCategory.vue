<template>
    <div>
        <a-radio-group v-model:value="type.area" button-style="solid">
            <a-radio-button v-for="item in singerCategory.area" :value="item.id" :key="item.id">{{
                item.name
            }}</a-radio-button>
        </a-radio-group>
        <a-radio-group v-model:value="type.sex" button-style="solid">
            <a-radio-button v-for="item in singerCategory.sex" :value="item.id" :key="item.id">{{
                item.name
            }}</a-radio-button>
        </a-radio-group>
        <a-switch
            v-model:checked="showMoreChoice"
            checked-children="显示更多"
            un-checked-children="关"
            style="marginBottom: 12px"
        />
        <Transition name="fade">
            <div v-show="showMoreChoice" class="more-choice">
                <a-radio-group v-model:value="type.genre" button-style="solid" size="small">
                    <a-radio-button v-for="item in singerCategory.genre" :value="item.id" :key="item.id">{{
                        item.name
                    }}</a-radio-button>
                </a-radio-group>
                <a-radio-group v-model:value="type.index" button-style="solid" size="small">
                    <a-radio-button v-for="item in singerCategory.index" :value="item.id" :key="item.id">{{
                        item.name
                    }}</a-radio-button>
                </a-radio-group>
            </div>
        </Transition>
        <div class="singer-list">
            <div v-for="item in singerList" :key="item.singer_id" class="singer-item">
                <img
                    :src="item.singer_pic"
                    alt=""
                    class="singer-cover"
                    @error="errorImage"
                    @click="goToDetailPage(routerInstance, routeInstance, '/singerDetail', item.singer_mid)"
                />
                <div
                    class="singer-name"
                    @click="goToDetailPage(routerInstance, routeInstance, '/singerDetail', item.singer_mid)"
                >
                    {{ item.singer_name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '../api';
import { reactive, ref, computed, watch } from 'vue';
import { goToDetailPage,errorImage } from '@/common/utils';
import { useRouter, useRoute } from 'vue-router';
import InfiniteList from '@/components/InfiniteList.vue';
import { CodepenOutlined } from '@ant-design/icons-vue';
const routerInstance = useRouter();
const routeInstance = useRoute();
const singerCategory = reactive({
    area: [],
    sex: [],
    index: [],
    genre: [],
});
const type = reactive({
    area: -100,
    genre: -100,
    index: -100,
    sex: -100,
    pageNo: 1,
});
api.getSingerCategory().then(res => {
    singerCategory.area = res.area;
    singerCategory.sex = res.sex;
    singerCategory.index = res.index;
    singerCategory.genre = res.genre;
});
const singerList = ref([]);
const params = computed(() => ({
    area: type.area,
    genre: type.genre,
    index: type.index,
    sex: type.sex,
    pageNo: 1,
}));
watch(params, () => {
    api.getSingerList(params.value).then(res => {
        singerList.value = res.list;
    });
});
api.getSingerList(params.value).then(res => {
    singerList.value = res.list;
});

const showMoreChoice = ref(false);
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: height 0.3s ease;
}
.fade-enter-to,
.fade-leave-from {
    height: 72px;
}

.fade-enter-from,
.fade-leave-to {
    height: 0;
}
:deep(.ant-radio-group) {
    display: flex;
    margin-bottom: 12px;
}
.more-choice {
    overflow: hidden;
}
.singer-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.singer-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    .singer-cover {
        width: 100px;
        height: 100px;
        margin-bottom: 8px;
        border-radius: 50%;
    }
    .singer-name {
        width: 100px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        &:hover {
            color: @primary-color;
        }
    }
}
</style>
