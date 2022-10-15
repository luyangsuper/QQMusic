<template>
    <div>
        <video :src="mv.srcList[3]" autoplay controls class="video"></video>
    </div>
</template>

<script setup>
import api from '../api';
import { reactive, ref } from 'vue';
const mv = reactive({
    srcList: [],
});
const props = defineProps(['vid']);

api.getMvUrl(props.vid).then(res => {
    mv.srcList = res[props.vid];
    console.log(mv.srcList)
});
</script>
<style lang="less" scoped>
    .video {
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
</style>