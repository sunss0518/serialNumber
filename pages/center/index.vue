<template>
  <div style="width: 100%; height: 100%;">
    <ul class="product-list">
      <li @click="goSerial">
        <span>序列号</span>
        <svg t="1646876730410" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2323" width="20" height="20">
          <path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z" 
            p-id="2324"
            fill="#666"
          >
          </path>
        </svg>
      </li>
      <li class="borderTop" @click="goRecord">
        <span>购买记录</span>
        <svg t="1646876730410" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2323" width="20" height="20">
          <path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z" 
            p-id="2324"
            fill="#666"
          >
          </path>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: '个人中心'
    }
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.openid = localStorage.getItem('openid');
    if (!this.openid) {
      var query=this.$route.query;
      this.$axios.$post(
        '/express-starter/openid', 
        {           
          code: query.code
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      ).then((res) => {
        this.openid = res.openid;
        if (this.openid) {
          localStorage.setItem('openid', this.openid);
        } else {
          this.$error({
            title: '授权openid失败',
            content: '请先退出页面，再重新进入'
          });
        }
      }).catch((error) => {
        this.$error({
          title: '授权openid失败',
          content: '请重新进入页面'
        });
      });
    }
  },
  created() {
    // this.getAccount();
  },
  methods: {
    goSerial() {
      window.location.href = `${window.location.origin}/nuxt-ssr/center/serial?openid=${this.openid}`;
    },
    goRecord() {
      window.location.href = `${window.location.origin}/nuxt-ssr/center/record?openid=${this.openid}`;
    }
  }
}
</script>

<style scoped>
.product-list {
  width: 95%;
  margin: 20px auto;
  padding: 0 10px;
  list-style: none;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  box-shadow: 2px 2px 4px #f5f5f5;
}
.product-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}
.borderTop {
  border-top: 1px solid #e5e5e5;
}
.icon-btn {
  padding: 5px 15px;
  background-image: linear-gradient(to bottom right, rgb(240, 186, 85) , rgba(255, 213, 24, 0.849));
  border-radius: 0 10px 10px 10px;
  color: #ffffff;
}
</style>