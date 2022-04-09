<template>
    <div class="section-container">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup></script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>
<style scoped lang="less">
.section-container {
    overflow: auto;
    height: calc(100% - 152px);
    width: 100%;
    background-color: #f6f6f6;
}
</style>
