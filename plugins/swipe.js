import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css'
// 在6.0以上版本，分页器、前进后退按钮需单独引入才能使用
import swiper, { Navigation, Pagination, EffectCoverflow, EffectFlip, EffectFade, EffectCube } from 'swiper';
swiper.use([Navigation, Pagination, EffectCoverflow, EffectFlip, EffectFade, EffectCube]);

Vue.use(VueAwesomeSwiper);