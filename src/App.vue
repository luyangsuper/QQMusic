<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import Home from './pages/Home/index.vue';
</script>

<template>
    <Home />
</template>

<style lang="less">
::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

::-webkit-scrollbar-thumb {
    background-color: #cfd8dc;
}

::-webkit-scrollbar-track {
    background-color: white;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    overflow: hidden;
}
</style>