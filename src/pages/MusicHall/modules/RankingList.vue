<template>
    <div>
        <div class="peak-list-container">
            <div v-for="item of peakList" :key="item.value" class="peak-card">
                <div :style="{ backgroundImage: `url(${item.picUrl})` }" class="peak-cover"></div>
                <div class="peak-content">
                    <span class="peak-item-title">{{ item.label }}</span>
                    <div v-for="song of item.song" :key="song.songId" class="peak-song">
                        {{ `${song.rank} ${song.title} - ${song.singerName}` }}
                    </div>
                </div>
            </div>
        </div>
        <div v-for="cardItem of otherList" :key="cardItem.title">
            <h3 class="part-title">{{cardItem.title}}</h3>
        <div class="part-list-container">
            <div
                v-for="item of cardItem.list"
                :key="item.topId"
                class="part-card"
                :style="{ backgroundImage: `url(${item.picUrl})` }"
            >
                <div class="part-number-of-statistics">
                    <icon-font type="icon-erji101" class="icon" />
                    <span class="part-statistics-text">{{
                        `${(item.listenNum / 10000).toFixed(1)}万`
                    }}</span>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../api.js";
const peakList = ref([]);
const otherList = ref([]);
API.getRankingList().then((res) => {
    peakList.value = res.data.find(item => item.title === "巅峰榜").list;
    otherList.value = res.data.filter(item => item.title !== "巅峰榜");
});
</script>

<style scoped lang="less">
.peak-list-container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 0 0;
    .peak-card {
        display: flex;
        width: calc(33% - 20px);
        height: 100%;
        margin: 0 0 20px 20px;
        background-color: #efefef;
        border-radius: 8px;
        transition: transform 0.4s ease;
        &:hover {
            transform: translateY(-8px);
        }
        .peak-cover {
            width: 150px;
            height: 150px;
            background-size: 100% 100%;
            border-radius: 8px;
        }
        .peak-content {
            display: flex;
            flex-direction: column;
            width: calc(100% - 150px);
            padding: 10px 10px;
            .peak-item-title {
                margin-top: 10px;
                font-size: 20px;
                font-weight: bold;
            }
            .peak-song {
                margin-top: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}

.part-title {
    margin-left: 20px;
    font-weight: 600;
    font-size: 22px;
}
.part-list-container {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 0 0;
    .part-card {
        position: relative;
        display: flex;
        width: 14.3%;
        margin: 0 0 20px 20px;
        transition: transform 0.4s ease;
        padding-bottom: 14.3%;
        background-size: 100% 100%;
        border-radius: 8px;
        &:hover {
            transform: translateY(-8px);
        }
        .part-number-of-statistics {
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 100px;
            height: 21px;
            line-height: 21px;
            font-weight: 500;
            font-size: 12px;
            text-align: center;
            background-color: black;
            border-radius: 10px;
            color: white;
            .icon {
                font-size: 14px;
            }
            .part-statistics-text {
                margin-left: 2px;
            }
        }
    }
}
</style>
