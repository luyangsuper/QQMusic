<template>
    <div class="container">
        <Menu></Menu>
        <div class="content">
            <Header></Header>
            <Section></Section>
        </div>
    </div>
</template>

<script setup>
import Header from './Header/index.vue';
import Menu from "./Menu/index.vue";
import Section from './Section/index.vue';

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