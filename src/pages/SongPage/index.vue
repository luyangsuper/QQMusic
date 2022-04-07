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
                    <p>{{ "xxx1" }}</p>
                    <p>{{ "xxx2" }}</p>
                    <p>{{ "xxx3" }}</p>
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
.song-page-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // border: 1px solid #000;

    .block-content:nth-child(1) {
        width: 600px;
        height: 500px;
        // border: 1px solid #000;
        .title {
            width: 100%;
            height: 30px;
        }
        .block-pic {
            float: left;
            width: 200px;
            height: 100px;
            // border: 1px solid blue;
            margin-right: 10%;

            .pic {
                float: left;
                width: 100px;
                height: 100px;
                background-size: cover;
                position: relative;
                .text {
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    color: #fff;
                }
            }
            .right-text {
                float: right;
                width: 100px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                border: 1px solid #000;

                p {
                    height: 26px;
                    margin: 0px;
                    text-align: center;
                    // border: 1px solid green;
                }
            }
        }
    }
.block-content:nth-child(2) {
        width: 600px;
        height: 400px;
        // border: 1px solid #000;
        .title {
            width: 100%;
            height: 30px;
        }
        .block-pic {
            float: left;
            width: 200px;
            height: 100px;
            // border: 1px solid blue;
            margin-right: 10%;

            .pic {
                float: left;
                width: 100px;
                height: 100px;
                background-size: cover;
                position: relative;
                .text {
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    color: #fff;
                }
            }
            .right-text {
                float: right;
                width: 100px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                border: 1px solid #000;

                p {
                    height: 26px;
                    margin: 0px;
                    text-align: center;
                    // border: 1px solid green;
                }
            }
        }
    }
    .block-content:nth-child(3) {
        width: 600px;
        height: 800px;
        // border: 1px solid #000;
        .title {
            width: 100%;
            height: 30px;
        }
        .block-pic {
            float: left;
            width: 200px;
            height: 100px;
            // border: 1px solid blue;
            margin-right: 10%;

            .pic {
                float: left;
                width: 100px;
                height: 100px;
                background-size: cover;
                position: relative;
                .text {
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    color: #fff;
                }
            }
            .right-text {
                float: right;
                width: 100px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                border: 1px solid #000;

                p {
                    height: 26px;
                    margin: 0px;
                    text-align: center;
                    // border: 1px solid green;
                }
            }
        }
    }
    .block-content:nth-child(4) {
        width: 600px;
        height: 600px;
        // border: 1px solid #000;
        .title {
            width: 100%;
            height: 30px;
        }
        .block-pic {
            float: left;
            width: 200px;
            height: 100px;
            // border: 1px solid blue;
            margin-right: 10%;

            .pic {
                float: left;
                width: 100px;
                height: 100px;
                background-size: cover;
                position: relative;
                .text {
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    color: #fff;
                }
            }
            .right-text {
                float: right;
                width: 100px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                border: 1px solid #000;

                p {
                    height: 26px;
                    margin: 0px;
                    text-align: center;
                    // border: 1px solid green;
                }
            }
        }
    }
}
</style>
