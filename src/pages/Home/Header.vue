<template>
    <div class="header-container">
        <div>
            <a-input-search
                v-model:value="value"
                placeholder="input search text"
                class="input-search"
                @search="onSearch"
                @keyup.enter="onSearch"
            />
        </div>
        <div class="bear" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../../store";
const router = useRouter();
const mainStore = useMainStore();
const { searchObject } = storeToRefs(mainStore);
const value = ref("");
const onSearch = () => {
    let tirmValue = value.value.trim();
    if (!tirmValue) {
        message.warning("请输入要搜索的内容");
    } else {
        searchObject.value = { value: tirmValue };
        router.replace({ name: "searchPage" });
    }
};
</script>

<style scoped lang="less">
.header-container {
    width: 100%;
    padding: 20px;
    // background-color: #f6f6f6;
    background: url("@/assets/img/bear-background.png") repeat;
    background-size: 10% 100%;
    animation: bearBgMove 100s linear infinite forwards;
    display: flex;

    .input-search {
        width: 200px;
    }
    .bear {
        position: relative;
        margin-top: 5px;
        width: 50px;
        height: 25px;
        background: url("@/assets/img/brear.png");
        background-size: 400px 25px;
        background-repeat: no-repeat;
        animation: bear 0.8s steps(8) infinite, move 100s linear forwards;
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
        background-position: -400px 0; //图片往左移动
    }

    99% {
        background-position: 0 0;
    }
    100% {
        background-position: -400px 0; //图片往左移动
    }
}
</style>
