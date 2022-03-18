<template>
  <div style="width: 100%; height: 100%;">
    <ul class="product-list">
      <li class="card grid" v-for="item in data" v-bind:key="item.id">
        <!-- <div>
          <img
            class="card-img"
            alt="category-img"
            :src="item.picUrl"
          />
        </div> -->
        <div class="grid-content">
          <div class="grid-body">
            <span class="grid-title">{{ item.name }}</span>
            <span class="grid-description">{{ item.description }}</span>
          </div>
          <div class="grid-footer">
            <div>
              <span :style="{ marginRight: '5px', color: '#f0ba55' }">￥</span>
              <span :style="{ fontSize: '20px', color: '#f0ba55' }">{{ item.price }}</span>
            </div>
            <span class="icon-btn" @click="goPay(item)">详 情</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: '序列号'
    }
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    let openid = localStorage.getItem('openid');
    if (!openid) {
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
        let openid = res.openid;
        if (openid) {
          localStorage.setItem('openid', openid);
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
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.$axios.$post(
        '/express-starter/category/getCategory',
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        this.data = res.res.data;
      })
      .catch((error) => {
        console.log(error)
      });
    },
    goPay(item) {
      let openid = localStorage.getItem('openid');
      if (!openid || openid == 'undefined') {
        this.$error({
          title: '授权openid失败',
          content: '请先退出页面，再重新进入'
        });
        return;
      }
      window.location.href = `${window.location.origin}/nuxt-ssr/pay/${openid}?categoryid=${item._id}&name=${item.name}&price=${item.price}`;
    },
  }
}
</script>

<style scoped>
.product-list {
  width: 95%;
  margin: 20px auto 50px;
  padding: 0;
  list-style: none;
}
.product-list li.card {
  display: flex;
  margin: 15px auto;
  width: 100%;
  border-radius: 10px;
  box-shadow: 2px 2px 4px #e5e5e5, -2px -2px 4px #e5e5e5;
  background-color: #fcfcfc;
}
.product-list li .card-img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
}
.icon-btn {
  padding: 5px 15px;
  background-image: linear-gradient(to bottom right, rgb(240, 186, 85) , rgba(255, 213, 24, 0.849));
  border-radius: 0 10px 10px 10px;
  color: #ffffff;
}

.grid {
  margin-bottom: 16px;
  flex-wrap: nowrap;
}
.grid-content {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  width: 100%;
  height: 120px;
  padding: 0 15px;
  overflow: hidden;
}
.grid-body {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  color: #1D2129;
  width: 100%;
}
.grid-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1D2129;
}
.grid-title {
  font-size: 18px;
  font-weight: 500;
}
.grid-description {
  width: 100%;
  font-size: 14px;
  font-weight: 300;
  color: #a2a2a2;
  text-align: left;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>