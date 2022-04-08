<template>
    <div class="song-page-body">
        <div class="block-content" v-for="item of blockData" :key="item.title">
            <!-- <div class="pic" v-for="(item,index) of blockData" :key="index">
                <img :src="item.list[0].picUrl" alt="">
            </div> -->
            <h2 class="title">{{ item.title }}</h2>
            <div class="block-pic" v-for="pic of item.list" :key="pic.topID">
                <div class="pic" :style="{ backgroundImage: 'url(' + pic.picUrl + ')' }">
                    <div class="text">快来写代码</div>
                </div>
                <div class="right-text">
                    <div class="p-title">
                        <span>{{ pic.label }}</span>
                    </div>
                    <div class="p-list">
                        <p>{{ "xxx1" }}</p>
                        <p>{{ "xxx2" }}</p>
                        <p>{{ "xxx3" }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import API from "./api";

const blockData = ref([]);

API.getSongPage().then((res) => {
    blockData.value = res.data;

    console.log("xxx", blockData.value[0].list[0].picUrl);
});
</script>

<style lang="less" scoped>
.cssOfTitle {
    width: 100%;
    height: 30px;
    padding-top: 16px;
}
.cssOfBlockPic {
    float: left;
    width: 378px;
    height: 163px;
    margin-right: 10%;
    margin-top: 16px;
    background-color: gainsboro;
    border-radius: 8px;
}
.cssOfPic {
    float: left;
    width: 161px;
    height: 163px;
    background-size: cover;
    position: relative;
    border-radius: 8px;
}
.cssOfText {
    position: absolute;
    right: 0px;
    bottom: 0px;
    color: #fff;
}
.cssOfRightText {
    float: right;
    width: 378-161px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 16px;
}

.song-page-body {
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .block-content:nth-child(1),
    .block-content:nth-child(2),
    .block-content:nth-child(3),
    .block-content:nth-child(4) {
        .title {
            .cssOfTitle;
        }
        .block-pic {
            .cssOfBlockPic;

            .pic {
                .cssOfPic;
                .text {
                    .cssOfText;
                }
            }
            .right-text {
                .cssOfRightText;
                .p-title{
                    margin-bottom: 5px;
                }
                .p-list {
                    height: 60%;
                    border: 1px solid #000;
                }
            }
        }
    }
}

.block-content:nth-child(1) {
    width: 1000px;
    height: 900px;
}
.block-content:nth-child(2) {
    width: 1000px;
    height: 700px;
}
.block-content:nth-child(3) {
    width: 1000px;
    height: 1300px;
}
.block-content:nth-child(4) {
    width: 1000px;
    height: 1200px;
}
</style>
