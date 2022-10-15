<template>
    <div class="list-wrapper" ref="listWrap" :style="{ height }">
        <div class="list-container" ref="listRef">
            <div v-for="item in showList" :key="item.id">
                <slot :data="item" :id="item.id"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, computed, reactive, nextTick, onBeforeUnmount } from 'vue';
const props = defineProps(['listData', 'height']);
const emit = defineEmits(['scrollBottom']);
const listRef = ref(null);
const listWrap = ref(null);
const data = reactive({
    initHeight: 0,
    showCount: 1,
    startIndex: 0,
    itemHeight: 0,
});
const showList = computed(() => {
    let endIndex = data.startIndex + data.showCount;
    endIndex >= props.listData.length && (endIndex = props.listData.length);
    return props.listData.slice(data.startIndex, endIndex).map((item, index) => {
        item.id = data.startIndex + index + 1;
        return item;
    });
});
function scrollItem() {
    let scrollTop = listWrap.value.scrollTop;
    data.startIndex = Math.floor(scrollTop / data.itemHeight);
    // 滚动到底部了
    if (listWrap.value.scrollHeight - scrollTop === listWrap.value.clientHeight) {
        scrollTop = listWrap.value.scrollHeight - data.itemHeight * data.showCount;
        emit('scrollBottom')
    }
    listRef.value.style.paddingTop = scrollTop + 'px';
}
watchEffect(() => {
    if (props.listData.length > 0) {
        nextTick(() => {
            data.itemHeight = listRef.value.children[0].offsetHeight;
            data.showCount = Math.ceil(listWrap.value.offsetHeight / data.itemHeight);
            listRef.value.style.height = data.itemHeight * props.listData.length + 'px';
            listWrap.value.removeEventListener('scroll', scrollItem);
            listWrap.value.addEventListener('scroll', scrollItem);
        });
    }
});
onBeforeUnmount(() => {
    listWrap.value.removeEventListener('scroll', scrollItem);
});
</script>

<style lang="less" scoped>
.list-wrapper {
    height: 100%;
    overflow: auto;
}
</style>