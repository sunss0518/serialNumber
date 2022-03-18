<template>
  <div class="detail">
    <div class="detail-header">
      <img class="detail-header-img" :src="detailData.picUrl" alt="category-img">
      <div class="detail-header-content">
        <div>
          <span :style="{ marginRight: '5px', color: 'red' }">￥</span>
          <span :style="{ fontSize: '22px', color: 'red' }">{{ detailData.price }}</span>
        </div>
        <div>
          <span class="detail-header-title">{{ detailData.title }}</span>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <div class="detail-content-title">
        <span>详情</span>
      </div>
      <div class="detail-content-text">
        <p>{{ detailData.description }}</p>
      </div>
    </div>
    <div class="detail-footer">
      <div class="detail-footer-submit" @click="goPay">
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Detail',
  data () {
    return {
      detailData: {},
      fileList: [],
      openid: '',
      aa: '',
    }
  },
  mounted () {
    this.openid = localStorage.getItem('openid');
    this.detailData = TestData[this.$route.params.id];
  },
  created() {
  },
  methods: {
    goPay() {
      if (!this.openid || this.openid == 'undefined') {
        this.$error({
          title: '授权openid失败',
          content: '请先退出页面，再重新进入'
        });
        return;
      }
      window.location.href = `${window.location.origin}/nuxt-ssr/pay/${this.openid}`;
      // this.$router.push({ name: 'pay-openid', params: { openid: this.openid }})
    },
  }
}
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
.detail-header {
  background-color: #fff;
}
.detail-header-img {
  width: 100%;
  height: auto;
  /* height: 280px; */
  /* margin: 10px; */
  /* border-radius: 5px; */
  box-sizing: border-box;
}
.detail-header-content {
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 0 20px 10px 20px;
}
.detail-header-title {
  font-size: 18px;
  font-weight: 600;
}
.detail-content {
  margin-top: 20px;
  padding: 20px 20px 80px 20px;
  background-color: #fff;
}
.detail-content-title {
  padding-left: 8px;
  border-left: 3px solid red;
  text-align: left;
}
.detail-content-text {
  margin-top: 20px;
  font-size: 16px;
  text-align: left;
  text-indent: 32px;
}
.detail-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  /* margin-top: 20px;
  padding: 20px; */
  background-color: #fff;
}
.detail-footer-submit {
  /* background-color: red; */
  background-image: linear-gradient(to bottom right, rgb(247, 26, 26) , red);
  color: white;
  text-align: center;
}
</style>