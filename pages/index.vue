<template>
  <div style="width: 100%; height: 100%;">
    <swiper class="product-list" ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in data" v-bind:key="item.id">
        <div class="card">
          <div class="flex-col content">
            <div>
              <img
                class="card-img"
                alt="category-img"
                :src="item.picUrl"
              />
            </div>
            <div class="lh50 mt-10">
              <span class="card-title">{{ item.name }}</span>
            </div>
            <div class="lh50 mt-10">
              <span class="icon-btn" @click="goPay(item)">立即购买</span>
            </div>
            <div class="card-footer">
              <div>
                <span :style="{ marginRight: '5px', fontSize: '18px', color: '#666666' }">价格：</span>
                <span :style="{ fontSize: '20px', color: '#f0ba55' }">{{ '￥' + item.price }}</span>
              </div>
              <div>
                <span :style="{ marginRight: '5px', fontSize: '18px', color: '#666666' }">详情：</span>
                <span :style="{ fontSize: '20px', color: '#333333' }">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
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
      data: [],
      swiperOptions: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        paginationClickable: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        effect : 'fade',
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.swiper.slideTo(0, 1000, false);
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
        this.getPicUrl(res.res.data);
      })
      .catch((error) => {
        console.log(error)
      });
    },
    async getPicUrl(data) {
      let fileids = [];
      for (let x = 0; x < data.length; x++) {
        let item = data[x];
        if (item.fileid) {
          fileids.push(item.fileid);
        } else {
          fileids.push('');
        }
      }
      await this.$axios.$post(
        '/express-starter/category/getPicUrl',
        {
          fileList: fileids
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        let pics = res.res;
        data.map((item, index) => {
          item.picUrl = pics[index].tempFileURL;
        });
        this.data = data;
      })
      .catch((error) => {
        data.map((item, index) => {
          item.picUrl = '';
        });
        this.data = data;
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
* {
  margin: 0;
  box-sizing: border-box;
}
.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.z1 {
  z-index: 1;
}
.z9 {
  z-index: 9;
}
.flex-col {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
}
.lh50 {
  line-height: 50px;
}
.mt-10 {
  margin-top: 10px;
}

.slide {
  height: 500px;
  background-color: red;
}

.product-list {
  width: 100%;
  padding: 0;
  list-style: none;
}
.product-list .card {
  width: 100%;
  background-color: #fcfcfc;
  border-radius: 10px;
}
.product-list .card-img {
  width: 250px;
  height: 350px;
  margin-top: 50px;
  border-radius: 5px;
}
.icon-btn {
  display: inline-block;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  background-image: linear-gradient(to bottom right, rgb(240, 186, 85) , rgba(255, 213, 24, 0.849));
  border-radius: 20px;
  font-size: 18px;
  color: #ffffff;
}

.card-footer {
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #fcfcfc;
  box-shadow: 0 0 20px #ffffff;
}
.card-footer div {
  width: 100%;
  line-height: 40px;
  color: #1D2129;
}
.card-title {
  font-size: 24px;
  font-weight: 600;
}
.card-description {
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
