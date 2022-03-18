<template>
  <div class="pay">
    <div class="pay-card">
      <ul>
        <li>
          <span class="font-600">产品名称</span>
          <span class="font-gray">{{ categoryname }}</span>
        </li>
        <li>
          <span class="font-600">付款金额</span>
          <span class="font-red">{{ categoryprice }} 元</span>
        </li>
      </ul>
    </div>
    <div class="pay-card">
      <div class="pay-card-title">
        <span>在线支付</span>
      </div>
      <ul>
        <li>
          <div class="flex-start">
            <svg t="1646120098058" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2202" width="20" height="20">
              <path d="M0 488.96v-30.72C2.56 430.08 7.68 404.48 15.36 378.88c20.48-66.56 53.76-122.88 99.84-171.52C179.2 138.24 256 94.72 340.48 66.56c48.64-15.36 97.28-23.04 145.92-25.6 40.96-2.56 79.36 0 120.32 7.68 33.28 5.12 64 12.8 97.28 25.6 79.36 28.16 148.48 71.68 207.36 133.12 7.68 7.68 12.8 15.36 20.48 23.04-2.56 0-2.56 2.56-5.12 2.56-20.48 10.24-40.96 20.48-61.44 28.16-143.36 66.56-286.72 133.12-430.08 197.12-28.16 12.8-56.32 10.24-81.92-5.12-20.48-12.8-38.4-25.6-58.88-38.4-12.8-10.24-25.6-17.92-40.96-28.16-12.8-7.68-20.48-2.56-20.48 12.8v2.56c2.56 12.8 5.12 25.6 10.24 38.4 25.6 61.44 51.2 120.32 76.8 181.76 7.68 17.92 20.48 25.6 35.84 23.04 10.24 0 20.48-2.56 28.16-7.68 30.72-15.36 58.88-33.28 87.04-51.2 156.16-92.16 309.76-184.32 465.92-276.48 10.24-7.68 23.04-12.8 33.28-20.48 0 2.56 2.56 2.56 2.56 5.12 5.12 10.24 10.24 17.92 12.8 28.16 28.16 61.44 40.96 125.44 35.84 192-2.56 28.16-7.68 56.32-15.36 84.48-17.92 61.44-48.64 115.2-92.16 163.84-51.2 56.32-115.2 99.84-184.32 128-40.96 15.36-81.92 28.16-122.88 35.84-28.16 5.12-56.32 7.68-81.92 7.68h-46.08c-20.48-2.56-40.96-2.56-58.88-5.12-30.72-5.12-61.44-12.8-89.6-23.04H322.56c-12.8 7.68-23.04 15.36-35.84 23.04-28.16 17.92-53.76 33.28-81.92 48.64-5.12 2.56-12.8 5.12-17.92 5.12s-10.24-2.56-10.24-10.24c0-5.12 0-12.8 2.56-17.92 5.12-38.4 12.8-74.24 20.48-112.64 0-5.12 0-7.68-5.12-10.24-15.36-12.8-30.72-23.04-46.08-38.4-51.2-46.08-92.16-102.4-117.76-166.4C20.48 599.04 12.8 568.32 7.68 537.6c-2.56-12.8-2.56-25.6-2.56-40.96-5.12 0-5.12-2.56-5.12-7.68z" 
                fill="#6BCC03" 
                p-id="2203">
              </path>
            </svg>
            <span class="ml-10 font-600">微信支付</span> 
          </div>
          <div class="flex-start">
            <svg t="1646120491039" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4068" width="22" height="22">
              <path d="M512 65.984C266.08 65.984 65.984 266.08 65.984 512c0 245.952 200.064 446.016 446.016 446.016 245.952 0 446.016-200.064 446.016-446.016C958.016 266.08 757.952 65.984 512 65.984zM727.232 438.432l-256.224 259.008c-0.064 0.064-0.192 0.096-0.256 0.192-0.096 0.064-0.096 0.192-0.192 0.256-2.048 1.984-4.576 3.2-6.944 4.544-1.184 0.672-2.144 1.696-3.392 2.176-3.84 1.536-7.904 2.336-11.968 2.336-4.096 0-8.224-0.8-12.096-2.4-1.28-0.544-2.304-1.632-3.52-2.304-2.368-1.344-4.832-2.528-6.88-4.544-0.064-0.064-0.096-0.192-0.16-0.256-0.064-0.096-0.192-0.096-0.256-0.192l-126.016-129.504c-12.32-12.672-12.032-32.928 0.64-45.248 12.672-12.288 32.896-12.064 45.248 0.64l103.264 106.112 233.28-235.84c12.416-12.576 32.704-12.704 45.248-0.256C739.52 405.6 739.648 425.856 727.232 438.432z" 
                fill="#e63b3b" 
                p-id="4069">
              </path>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <div class="pay-footer">
      <div :class="[isStock ? 'pay-footer-submit' : 'pay-footer-submit-disabled']" @click="order()">
        <span>立即付款</span>
      </div>
    </div>
  </div>
</template>
<script>
import MD5 from "crypto-js/md5";

export default {
  head(){
    return {
      title: '订单'
    }
  },
  data() {
    return {
      categoryid: '',
      categoryname: '',
      categoryprice: '',
      isStock: true
    };
  },
  mounted() {
    this.openid = localStorage.getItem('openid');
  },
  created() {
    this.categoryid = this.$route.query.categoryid;
    this.categoryname = this.$route.query.name;
    this.categoryprice = this.$route.query.price;
    this.getStock();
  },
  methods: {
    test() {
      let params = {
        "categoryid": this.categoryid, // 分类id
        "description": this.categoryname, // 商品描述
        "openid": this.openid, // 用户id
        "out_trade_no": "001502", // 订单号   
        "prepay_id": "4054", // 预付订单id
        "timestamp": parseInt(new Date().getTime() / 1000), // 时间戳，自1970年以来的秒数
        "total_fee": this.categoryprice, // 支付金额
      };
      this.insertAccount(params);
    },
    getStock() {
      this.$axios.$post(
        '/express-starter/account/getStock', 
        {
          categoryid: this.categoryid
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        if (res.msg == 'success' && res.data.length == 0) {
          this.$message.error(
            '库存不足！',
            3
          );
          this.isStock = false;
        }
      })
      .catch((error) => {
        console.log(error)
      });
    },
    parseXml(xml) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xml, "text/xml");
      //提取数据
      let return_code = xmlDoc.getElementsByTagName('return_code')[0].textContent;
      let result_code = xmlDoc.getElementsByTagName('result_code')[0].textContent;
      let prepay_id = xmlDoc.getElementsByTagName('prepay_id')[0].textContent;
      let cb_json = {
        'return_code': return_code,
        'result_code': result_code,
        'prepay_id': prepay_id
      };
      return cb_json;
    },
    order() {
      if (!this.openid) {
        this.$error({
          title: '授权openid失败',
          content: '请先退出页面，再从菜单重新进入'
        });
        return;
      }
      if (!this.isStock) {
        this.$error({
          title: '库存不足',
          content: '序列号库存不足，请联系客服处理'
        });
        return;
      }

      let nonce_str = this.randomString();
      this.out_trade_no = this.orderCode();

      this.$axios.$post(
        '/express-starter/pay', 
        {           
          attach: this.categoryname,
          nonce_str: nonce_str,
          openid: this.openid,
          out_trade_no: this.out_trade_no,
          total_fee: this.categoryprice * 100
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        let cb_json = this.parseXml(res);
        if (cb_json.return_code == "SUCCESS" && cb_json.result_code == "SUCCESS") {
          this.pay(cb_json.prepay_id);
        }
      })
      .catch((error) => {
        console.log(error)
      });
    },
    pay(prepay_id) {
      if (typeof(WeixinJSBridge) == "undefined"){
        alert('WeixinJSBridge:undefined');
        if ( document.addEventListener ) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(prepay_id), false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(prepay_id)); 
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(prepay_id));
        }
      } else{
        this.onBridgeReady(prepay_id);
      }
    },
    onBridgeReady(prepay_id) {
      let timestamp = parseInt(new Date().getTime() / 1000).toString();
      let nonceStr = this.randomString();
      let stringA = `appId=wxe9f5f5a292bbf0f5` +
        `&nonceStr=${nonceStr}` +
        `&package=prepay_id=${prepay_id}` +
        `&signType=MD5` +
        `&timeStamp=${timestamp}`;
      let stringSignTemp = stringA + "&key=rndmNrrttMNy23NcB7eYP5Yk2ctXAGF2" //注：key为商户平台设置的密钥key
      let paySign = MD5(stringSignTemp).toString().toUpperCase(); //注：MD5签名方式

      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": "wxe9f5f5a292bbf0f5", // 公众号ID，由商户传入     
          "timeStamp": timestamp, // 时间戳，自1970年以来的秒数     
          "nonceStr": nonceStr, // 随机串     
          "package": `prepay_id=${prepay_id}`,
          "signType": "MD5", // 微信签名方式    
          "paySign": paySign // 微信签名 
        },
        (res) => {
          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
            let params = {
              "categoryid": this.categoryid, // 分类id
              "description": this.categoryname, // 商品描述
              "openid": this.openid, // 用户openid
              "out_trade_no": this.out_trade_no, // 订单号   
              "prepay_id": prepay_id, // 预付订单id
              "timestamp": parseInt(new Date().getTime() / 1000), // 时间戳，自1970年以来的秒数
              "total_fee": this.categoryprice, // 支付金额
            };
            this.insertAccount(params);
            // alert('支付成功！');
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            alert('你已经取消支付了！');
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            alert('支付失败了！');
          }
        }
      ); 
    },
    insertOrder(params) {
      this.$axios.$post(
        '/express-starter/order/insertOrder', 
        params,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        window.location.href = `${window.location.origin}/nuxt-ssr/center?openid=${this.openid}`;
      })
      .catch((error) => {
        console.log(error)
      });
    },
    insertAccount(params) {
      this.$axios.$post(
        '/express-starter/account/insertAccount', 
        {
          openid: this.openid
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        if (res.msg == 'success') {
          this.insertOrder(params);
        } else {
          this.$message.error(
            res.res,
            5
          )
        }
      })
      .catch((error) => {
        console.log(error)
      });
    },
    // 生成随机字符串，e表示长度，默认32位
    randomString(e) {
      e = e || 32;
      let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
      a = t.length,
      n = "";
      for (let i = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
      }
      return n
    },
    // 时间戳+6位随机数的订单号
    orderCode() {   
      var orderCode='';   
      for (var i = 0; i < 6; i++) { //6位随机数，用以加在时间戳后面。   
        orderCode += Math.floor(Math.random() * 10);   
      }   
      orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。   
      console.log(orderCode)   
      return orderCode; 
    }
  }
};
</script>
<style>
.font-600 {
  font-weight: 600;
}
.font-red {
  color: red;
}
.font-gray {
  color: gray;
}
.ml-10 {
  margin-left: 10px;
}
.flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f1f1;
}
.pay-card {
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
}
.pay-card-title {
  padding-left: 15px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f1f1f1;
}
.pay-card ul {
  padding: 0 15px;
}
.pay-card ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  list-style: none;
}
.pay-content {
  margin-top: 20px;
  padding: 20px 20px 80px 20px;
  background-color: #fff;
}
.pay-content-title {
  padding-left: 8px;
  border-left: 3px solid red;
  text-align: left;
}
.pay-content-text {
  margin-top: 20px;
  font-size: 16px;
  text-align: left;
  text-indent: 32px;
}
.pay-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.pay-footer-submit {
  background-image: linear-gradient(to bottom right, rgb(247, 26, 26) , red);
  color: white;
  text-align: center;
}
.pay-footer-submit-disabled {
  background-image: #c5c5c5;
  color: #b5b5b5;
  text-align: center;
}
</style>