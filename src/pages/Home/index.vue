<template>
    <div class="container">
        <Menu></Menu>
        <div class="content">
            <Header></Header>
            <Section></Section>
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup>
import Header from './Header.vue';
import Menu from "./Menu.vue";
import Section from './Section.vue';
import Footer from './Footer.vue'
</script>

<style lang="less" scoped>

.container {
    display: flex;
    height: 100%;
    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
}
</style>