<template>
  <div style="width: 100%; height: 100%;">
    <ul class="product-list">
      <li v-for="item,index in data" v-bind:key="index">
        <span>订单号：{{ item.out_trade_no }}</span>
        <span>品 类：{{ item.description }}</span>
        <span>时 间：{{ item.timestamp | formatDate }}</span>
        <span>价 格：{{ item.total_fee }} 元</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: '购买记录'
    }
  },
  data () {
    return {
      data: []
    }
  },
  filters: {
    formatDate(value) {
      if (!value) return;
      var date = new Date(value*1000);
      var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
      if (m < 10) { m = '0' + m; }
      if (d < 10) { d = '0' + d; }
      if (h < 10) { h = '0' + h; }
      if (i < 10) { i = '0' + i; }
      if (s < 10) { s = '0' + s; }
      var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
      return t;
    }
  },
  mounted () {
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      var query = this.$route.query;
      this.$axios.$post(
        '/express-starter/order/getOrder', 
        {
          openid: query.openid
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        this.data = res.data;
        res.data.map()
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>
.product-list {
  width: 95%;
  margin: 20px auto;
  padding: 0 10px 20px;
  list-style: none;
}
.product-list li {
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  padding: 10px;
  line-height: 50px;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  box-shadow: 2px 2px 4px #f5f5f5;
}
.product-list li:not(.product-list li:first-child) {
  border-top: 1px solid #e5e5e5;
}
.icon-btn {
  padding: 5px 15px;
  background-image: linear-gradient(to bottom right, rgb(240, 186, 85) , rgba(255, 213, 24, 0.849));
  border-radius: 0 10px 10px 10px;
  color: #ffffff;
}
</style>