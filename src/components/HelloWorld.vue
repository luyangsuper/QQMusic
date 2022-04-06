<template>
<div>
  <a-button type="primary">1234</a-button>
  <div class="test">
    <div>123</div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  msg: String,
});

const count = ref(0);
</script>

<style scoped lang="less">
.test{
    div{
        width: 100px;
        height: 100px;
        background: red;
    }
}
a {
  color: #42b983;
}
</style>
