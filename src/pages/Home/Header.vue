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
import { message } from 'ant-design-vue';
const value = ref("");
const onSearch = () => {
    value.value.trim() === "" && message.warning('请输入要搜索的内容');
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
