<template>
  <a-layout id="components-layout-demo-custom-trigger" class="layout-demo">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" @click="handleClick">
        <!-- <a-menu-item key="0">
          <a-icon type="picture" />
          <span>素材库</span>
        </a-menu-item> -->
        <a-menu-item key="1">
          <a-icon type="category" />
          <span>分类信息</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="serialNumber" />
          <span>序列号</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="statistics" />
          <span>销售统计</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        v-show="current == 0"
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }"
      >
        <a-upload
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="uploadImg"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传图片
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-layout-content>
      <a-layout-content
        v-show="current == 1"
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }"
      >
        <div class="card">
          <span>添加分类信息：</span>
          <a-button type="primary" @click="addCategory">
            添加
          </a-button>
        </div>
        <a-modal v-model="visible" :title="modalTitle" ok-text="确认" cancel-text="取消" @cancel="initCategory" @ok="uploadCategory">
          <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="名称" >
              <a-input v-model="categoryName" placeholder="分类名称" />
            </a-form-item>
            <a-form-item label="价格">
              <a-input-number v-model="categoryPrice" :min="0.01" :max="999999" :step="0.01" placeholder="分类价格" @change="onChangePrice" style="width: 150px" />
            </a-form-item>
            <a-form-item label="图片fileid" help="* 云开发控制台 --> 云存储 --> fileid">
              <a-input v-model="categoryPic" placeholder="输入分类图的fileid" />
            </a-form-item>
            <a-form-item label="描述">
              <a-textarea
                v-model="categoryDescription"
                placeholder="请输入描述文本"
                :auto-size="{ minRows: 2, maxRows: 6 }"
              />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-list
          class="card list"
          item-layout="horizontal"
          :data-source="category"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a slot="actions" @click="editCategory(item)">编辑</a>
            <a slot="actions" @click="deleteCategory(item)">删除</a>
            <a-list-item-meta
              :description="item.description"
            >
              <a slot="title" href="https://www.antdv.com/">{{ item.name }}</a>
            </a-list-item-meta>
            <div>￥{{ item.price }}</div>
          </a-list-item>
        </a-list>
      </a-layout-content>
      <a-layout-content
        v-show="current == 2"
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }"
      >
        <a-radio-group v-if="category.length" v-model="categoryVal" @change="onChange">
          <a-radio-button v-for="item,index in category" :value="item._id" v-bind:key="index">
            {{ item.name }}
          </a-radio-button>
        </a-radio-group>
        <a-button type="primary" style="margin-left: 24px" @click="uploadAccountPwd">
          上传
        </a-button>
        <div style="margin: 24px 0 5px 0; font-size: 14px; color: red;">
          <p>* 账号和密码用逗号隔开；每组账号密码之间用分号隔开；</p>
          <p>* 分类必选</p>
        </div>
        <a-textarea
          v-model="accountPwd"
          placeholder="示例: account001, password001; account002, password002;"
          :auto-size="{ minRows: 3, maxRows: 20 }"
        />
      </a-layout-content>
      <a-layout-content
        v-show="current == 3"
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }"
      >
        <div style="display: flex; justify-content: center; width: 80%;">
          <a-radio-group default-value="normal" button-style="solid" @change="chooseType">
            <a-radio-button value="normal">
              15天
            </a-radio-button>
            <a-radio-button value="week">
              周
            </a-radio-button>
            <a-radio-button value="month">
              月
            </a-radio-button>
            <a-radio-button value="year">
              年
            </a-radio-button>
            <a-radio-button value="custom">
              自定义
            </a-radio-button>
          </a-radio-group>
          <a-radio-group default-value="volume" button-style="solid" style="margin-left: 20px;" @change="chooseType2">
            <a-radio-button value="volume">
              订单量
            </a-radio-button>
            <a-radio-button value="Amount">
              销售额
            </a-radio-button>
          </a-radio-group>
        </div>
        <div style="display: flex; justify-content: center; width: 100%; margin-top: 30px;">
          <a-range-picker
            v-if="dateType == 'custom'"
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['Start Time', 'End Time']"
            @change="chooseDate"
            @ok="onOk"
          />
        </div>
        <div id="charts" style="padding: 30px; width: 773px; height:600px"></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  data() {
    return {
      current: 1,
      collapsed: false,
      visible: false, // 表单弹框
      modalTitle: '',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      category: [],
      categoryName: '',
      categoryPrice: '',
      categoryPic: '',
      categoryDescription: '',
      categoryVal: '',
      accountPwd: '',
      dateType: 'normal',
      statisticType: 'volume',
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    /**
     * 上传图片
     */
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    uploadImg({ file }) {
      let param = new FormData(); //new一个formData
      param.append('file', file.originFileObj, file.originFileObj.name); //将文件添加到formdata中
      param.append('chunk', '0');

      this.$axios.$post(
        `/express-starter/category/uploadImg?name=${file.name}`,
        param,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
      )
      .then((res) => {
        console.log('res', res)
      })
      .catch((error) => {
        console.log(error)
      });
    },
    /**
     * 初始化表格，统计数据
     */
    handleClick(e) {
      this.current = e.key;
      if (this.current == 3) {
        this.initCharts();
      }
    },
    initCharts() {
      var chartDom = document.getElementById('charts');
      chartDom.style.width = window.innerWidth -250 + 'px';
      chartDom.style.height = window.innerHeight -250 + 'px';
      var myChart = this.$echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: this.statisticType == 'volume' ? '订单量' : '销售额'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['累计', '单日总计']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '累计',
            type: 'line',
            // stack: 'Total',
            data: []
          },
          {
            name: '单日总计',
            type: 'line',
            // stack: 'Total',
            data: []
          },
        ]
      };
      this.category.forEach(item => {
        option.series.push({
          id: item._id,
          name: item.name,
          type: 'line',
          data: []
        });
        option.legend.data.push(item.name);
      });

      this.$axios.$post(
        '/express-starter/order/statistics', 
        {
          dateType: this.dateType != 'custom' ? this.dateType : 'custom',
          dateRange: this.dateRange
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        // console.log(res)
        this.data = res.res.data;
        this.dateArr = res.res.dateArr;
        this.dateArr.forEach(v => {
          option.xAxis.data.push(v.slice(5));
        });
        option.series.forEach((item,index) => {
          if (index > 1) { // 单日分类
            res.res.dateArr.forEach(item2 => {
              let cacheArr = this.data.filter(item3 => {
                return item3.categoryid == item.id && item3.date == item2;
              });
              let sales = cacheArr.reduce((pre, current) => {
                return pre + parseInt(current.total_fee);
              }, 0);
              if (this.statisticType == 'volume') { // 单日订单量
                item.data.push(cacheArr.length);
              } else {
                item.data.push(sales); // 单日销售额
              }
            });
          } else if (index == 0) { // 累计
            res.res.dateArr.forEach((item2, index2) => {
              let cacheArr = this.data.filter(item3 => {
                return item3.date == item2;
              });
              let sales = cacheArr.reduce((pre, current) => {
                return pre + parseInt(current.total_fee);
              }, 0);
              if (this.statisticType == 'volume') { // 累计订单量
                if (index2 > 0) {
                  item.data.push(cacheArr.length + item.data[item.data.length-1]);
                } else if (index2 == 0) {
                  item.data.push(cacheArr.length);
                }
              } else { // 累计销售额
                if (index2 > 0) {
                  item.data.push(sales + item.data[item.data.length-1]);
                } else if (index2 == 0) {
                  item.data.push(sales);
                }
              }
              
            });
          } else if (index == 1) { // 单日总计
            res.res.dateArr.forEach(item2 => {
              let cacheArr = this.data.filter(item3 => {
                return item3.date == item2;
              });
              let sales = cacheArr.reduce((pre, current) => {
                return pre + parseInt(current.total_fee);
              }, 0);
              if (this.statisticType == 'volume') { // 单日总计订单量
                item.data.push(cacheArr.length);
              } else {
                item.data.push(sales); // 单日总计销售额
              }
            });
          }
        });
        // console.log(option);
        option && myChart.setOption(option);
        window.addEventListener('resize', function () {
          myChart.resize();
        });
      })
      .catch((error) => {
        this.$message.error(
          '获取统计数据失败',
          3,
        );
      });
    },
    chooseType(e) {
      this.dateType = e.target.value;
      if (this.dateType != 'custom') {
        this.initCharts();
      }
    },
    chooseType2(e) {
      this.statisticType = e.target.value;
      this.initCharts();
    },
    chooseDate(date, dateString) {},
    onOk(value) {
      this.dateRange = JSON.stringify([Date.parse(value[0]), Date.parse(value[1])]);
      this.initCharts();
    },
    /**
     * 分类管理
     */
    addCategory() {
      this.visible = true;
      this.modalTitle = '添加分类';
    },
    editCategory(item) {
      this.visible = true;
      this.modalTitle = '编辑分类';
      this.categoryName = item.name;
      this.categoryPrice = item.price;
      this.categoryPic = item.fileid;
      this.categoryDescription = item.description;
      this.categoryId = item._id;
    },
    deleteCategory(item) {
      let _this = this;
      _this.$confirm({
        title: '确定删除该分类吗？',
        content: '删除该分类后，该分类id绑定的相关序列号库存将失效！',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          _this.$axios.$post(
            '/express-starter/category/deleteCategory',
            {
              id: item._id
            },
            {
              headers: {
                "Content-Type": "application/json"
              },
            }
          )
          .then((res) => {
            if (res.msg == 'success') {
              _this.getCategory();
              _this.$message.success(
                '分类信息删除成功',
                3,
              );
            } else {
              _this.$message.error(
                '分类信息删除失败',
                3,
              );
            }
          })
          .catch((error) => {
            _this.$message.error(
              '分类信息删除失败',
              3,
            );
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    initCategory() {
      this.visible = false;
      this.categoryName = '';
      this.categoryPrice = '';
      this.categoryPic = '';
      this.categoryDescription = '';
      this.categoryId = '';
    },
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
        this.category = res.res.data;
      })
      .catch((error) => {
        console.log(error)
      });
    },
    uploadCategory(e) {
      if (this.categoryName == '' || this.categoryPrice == '' || this.categoryPic == '' || this.categoryDescription == '') {
        this.$message.error('请填写完整的分类信息！');
        return;
      }
      e.preventDefault();

      let params = {
        name: this.categoryName,
        price: this.categoryPrice,
        fileid: this.categoryPic,
        description: this.categoryDescription
      };
      if (this.modalTitle == '编辑分类') {
        params.id = this.categoryId;
      }
      this.$axios.$post(
        `/express-starter/category/${this.modalTitle == '添加分类' ? 'upload' : 'update'}`, 
        params,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        if (res.msg == 'success') { 
          this.getCategory();
          this.$message.success(
            this.modalTitle == '添加分类' ? '分类信息添加成功' : '分类信息修改成功',
            3,
          );
        } else {
          this.$message.error(
            this.modalTitle == '添加分类' ? '分类信息添加失败' : '分类信息修改失败',
            3,
          );
        }
        this.initCategory();
      })
      .catch((error) => {
        this.$message.error(
          this.modalTitle == '添加分类' ? '分类信息添加失败' : '分类信息修改失败',
          3,
        );
        this.initCategory();
      });
    },
    onChangePrice(value) {
      console.log('changed', value);
    },
    onChange(e) {
      this.categoryVal = e.target.value;
    },
    /**
     * 序列号管理
     */
    uploadAccountPwd() {
      let accountPwdArr = [];
      this.accountPwd.split(/;|；/).forEach(item => {
        let account = item.split(/,|，/)[0];
        let pwd = item.split(/,|，/)[1];
        if (account && pwd) {
          accountPwdArr.push({
            account: account.trim(),
            password: pwd.trim(),
            categoryId: this.categoryVal
          });
        }
      });
      if (accountPwdArr.length == 0) {
        this.$message.error(
          '请填写账号密码',
          3,
        );
        return;
      }
      if (this.categoryVal == '') {
        this.$message.error(
          '请选择分类',
          3,
        );
        return;
      }

      this.$axios.$post(
        '/express-starter/account/upload', 
        {
          data: accountPwdArr
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((res) => {
        if (res.msg == 'success') {
          this.$message.success(
            '序列号上传成功',
            3,
          );
        } else {
          this.$message.error(
            '序列号上传失败',
            3,
          );
        }
      })
      .catch((error) => {
        this.$message.error(
          '序列号上传失败',
          3,
        );
      });
    },
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.layout-demo {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 2px 2px 4px #f1f1f1;
  background-color: #ffffff;
}

.card {
  width: 75%;
  margin: 20px auto;
  padding: 20px 15px !important;
}
.list {
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #cccccc;
}
</style>