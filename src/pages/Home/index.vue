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
import Header from './Header.vue';
import Menu from "./Menu.vue";
import Section from './Section.vue';

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