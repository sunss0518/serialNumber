import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import * as echarts from 'echarts';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

Vue.use(Antd);