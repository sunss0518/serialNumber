<template>
  <div style="width: 100%; height: 100%;">
    <ul class="product-list">
      <li v-for="item,index in data" v-bind:key="index">
        <div>
          <span class="label">序列号：</span>
          <span>{{ item.account }}</span>
        </div>
        <div>
          <span class="label">密 码：</span>
          <span>{{ item.password }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: '已购序列号'
    }
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
  },
  created() {
    this.getAccount();
  },
  methods: {
    getAccount() {
      var query = this.$route.query;
      this.$axios.$post(
        '/express-starter/account/getAccount', 
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
  padding: 0 10px;
  list-style: none;
}
.product-list li {
  display: flex;
  flex-flow: column;
  margin: 10px auto;
  padding: 10px;
  line-height: 40px;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  box-shadow: 2px 2px 4px #f5f5f5;
}
.product-list li .label {
  display: inline-block;
  width: 60px;
  text-align: right;
}
.icon-btn {
  padding: 5px 15px;
  background-image: linear-gradient(to bottom right, rgb(240, 186, 85) , rgba(255, 213, 24, 0.849));
  border-radius: 0 10px 10px 10px;
  color: #ffffff;
}
</style>