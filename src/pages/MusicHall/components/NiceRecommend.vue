<template>
    <div>
        <swiper
            :effect="'coverflow'"
            :grabCursor="true"
            :centeredSlides="true"
            :slidesPerView="2"
            :loop="true"
            :spaceBetween="100"
            :coverflowEffect="{
                rotate: 0,
                stretch: '50%',
                depth: 200,
                modifier: 1,
                slideShadows: false,
            }"
            :pagination="true"
            :modules="modules"
        >
            <swiper-slide v-for="item in recommendAlbumList" :key="item.id" class="recommend-album-container">
                <img :src="item.picUrl" alt="" class="recommend-album-img" />
            </swiper-slide>
        </swiper>

        <!-- <a-carousel>
            <div v-for="item in recommendAlbumList" :key="item.id" class="recommend-album-container">
                <img :src="item.picUrl" alt="" class="recommend-album-img" />
            </div>
        </a-carousel> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper';
const modules = [EffectCoverflow, Pagination];
const recommendAlbumList = ref([]);
const onSwiper = swiper => {
    console.log(swiper);
};
const onSlideChange = () => {
    console.log('slide change');
};
api.getRecommendCarouselPic().then(res => {
    recommendAlbumList.value = res;
    console.log(res, 555);
});
</script>

<style lang="less" scoped>
.recommend-album-container {
    display: flex !important;
    justify-content: center;
    align-items: center;
}
.recommend-album-img {
    // width: 100%;
    height: 300px;
    width: 700px;
    object-fit: contain;
}
</style>
