import { createApp } from "vue";
import antd from "ant-design-vue";
import { createFromIconfontCN } from '@ant-design/icons-vue';
import "./assets/fonts/font.css";
import "ant-design-vue/dist/antd.less";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router.js";

const IconFont = createFromIconfontCN({
    //引入阿里的inco图标
    scriptUrl: "//at.alicdn.com/t/font_3314974_9tsaleu4crb.js",
});

const app = createApp(App);
app.use(antd);
app.use(createPinia());
app.use(router);
app.component('IconFont',IconFont);//使用组件<icon-font  type="icon-jiaoseguanli" />
app.mount("#app");
