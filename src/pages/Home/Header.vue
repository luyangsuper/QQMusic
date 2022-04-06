<template>
    <div class="header-container">
        <a-input-search
            v-model:value="value"
            placeholder="input search text"
            class="input-search"
            @search="onSearch"
            @keyup.enter="onSearch"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../../store";
const mainStore = useMainStore();
const { searchValue } = storeToRefs(mainStore);
const value = ref("");
const onSearch = () => {
    let tirmValue = value.value.trim()
    tirmValue === "" ? message.warning("请输入要搜索的内容") : searchValue.value = tirmValue
};
</script>

<style scoped lang="less">
.header-container {
    width: 100%;
    padding: 20px;
    background-color: #f6f6f6;
    .input-search {
        width: 200px;
    }
}
</style>
