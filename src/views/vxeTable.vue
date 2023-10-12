<template>
  <div>
    <!-- <template v-for="(column,index) in columns2">
        <vxe-checkbox v-model="column.visible" :key="index" @change="$refs.xTable.refreshColumn()">{{ column.title }}</vxe-checkbox>
    </template> -->

    <!-- 切换平台刷新列，然后自定义配置也会自动更新 -->
    <vxe-toolbar ref="xToolbar" :custom="{ immediate: true, isFooter: false }">
        <template #tools>
            自定义列    
        </template>
        <template #buttons>
            <vxe-button @click="insertEvent()">在第1行插入</vxe-button>
            <vxe-button @click="removeEvent(tableData[1])">删除第2行</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
            <vxe-button icon="vxe-icon-save" @click="saveEvent">保存</vxe-button>
        </template>
    </vxe-toolbar>
    <vxe-table
        border
        resizable
        show-overflow
        ref="xTable"
        height="500"
        :scroll-x="{enabled: false}"
        :loading="loading"
        :cell-style="cellStyle"
        :checkbox-config="{ highlight: true }"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        align="center"
        size="small"
    >
          <vxe-column type="checkbox" min-width="50" fixed="left"></vxe-column>
          <vxe-colgroup title="基本信息" fixed="left" >
            <vxe-column field="name" title="Name" min-width="80"></vxe-column>
            <vxe-column field="age" title="Age" min-width="80" :visible="showAge">
                <!-- <template #default="{ row }">
                    <span :style="{ color: row.age < 0 ? 'red' : '' }">{{ row.age }}</span>
                </template> -->
            </vxe-column>
          </vxe-colgroup> 
          <vxe-colgroup title="性别" fixed="left">
            <vxe-column field="sex" title="Sex" min-width="80" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ formatSex(row.sex) }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.sex" transfer>
                        <vxe-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="详细信息">
            <vxe-colgroup title="分组">
              <vxe-column field="rate" title="Rate" min-width="80" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.rate" type="text" placeholder="Rate"></vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="region" title="Region" min-width="80" :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.region" type="text" placeholder="Region"></vxe-input>
                </template>
              </vxe-column>
            </vxe-colgroup>
            <vxe-colgroup title="其他">
              <vxe-column field="time" title="Time" min-width="80" sortable :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.time" type="date" placeholder="请选择日期" transfer></vxe-input>
                </template>
              </vxe-column>
              <vxe-column field="address" title="Address" min-width="300" show-overflow :edit-render="{}">
                <template #edit="{ row }">
                    <vxe-input v-model="row.address" type="text" placeholder="Rate"></vxe-input>
                </template>
              </vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-column field="updateTime" title="UpdateTime" min-width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="200"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="80"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="80"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="80"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="80"></vxe-column>
          <vxe-column field="createTime" title="CreateTime" min-width="80"></vxe-column>
    </vxe-table>
    <hr>
    <el-button @click="isShowAge">是否显示Age</el-button>
    <!--  -->
    <!-- flex一行4列 -->
    <div class="flex-wrapper">
        <div style="width: 120px;background: #e4393c;">
            <ul>
                <li>分类1</li>
                <li>分类2</li>
                <li>分类3</li> 
            </ul>
        </div>
        <div class="right-box">
            <div class="item" style="background-color: aliceblue;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
                <div class="opration-wrapper">
                    <!-- <div style="float: left;"></div> -->
                    <div class="del-btn">删除</div>
                </div>
            </div>
            <div class="item" style="background-color: antiquewhite;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
            </div>
            <div class="item" style="background-color: aqua;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
            </div>
            <div class="item" style="background-color: black;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
            </div>
            <div class="item" style="background-color: blueviolet;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
            </div>
            <div class="item" style="background-color: chartreuse;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
            </div>
            <div class="item" style="background-color: crimson;">
                <img class="image-single" src="https://img1.baidu.com/it/u=1698727096,1506733987&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=220" alt="">
            </div> 
        </div>
    </div>
    <!-- 旋转菜单 -->
    <div class="demo">
      <div class="container">
      <div class="row">
          <div class="col-md-12">
            <div class="navbar">主菜单
                <ul class="menu">
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-facebook"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-google-plus"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-twitter"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-linkedin"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-pinterest"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-rss"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-instagram"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-skype"></a></li>
                  <li><a href="https://www.17sucai.com/preview/1424582/2019-10-15/cy/index.html#" class="fa fa-github"></a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            showAge: true,
            columns2: [],
            sexList: [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
            ]
        }
    },
    mounted () {
        this.loading = true
        this.$nextTick(() => {
            const $table = this.$refs.xTable
            this.mockList(1000).then(data => {
              this.loading = false
              if ($table) {
                  $table.loadData(data)
              }
            })
            /* 
                如果牵涉到切换平台的时候，先需要进行重置
                this.$refs.xTable.resetColumn()
            */

            this.columns2 = this.$refs.xTable.getColumns()
            this.columns2.forEach(column => {
                if (['Age', 'Name'].includes(column.title)) {
                  column.visible = false
                }
              })
            // setTimeout(() => {
            //     this.showAge = !this.showAge
            // }, 3000);
            // // this.$refs.xTable.getColumns()
            // // this.$refs.xTable.hideColumn(this.$refs.xTable.getColumnByField('age'))
            if (this.$refs.xTable) {
                this.$refs.xTable.refreshColumn()
            }
        })
    },
    methods: {
        logLoading() {
          console.log('sss');
        },
        mockList (size) {
            return new Promise(resolve => {
              const list = []
              for (let index = 0; index < size; index++) {
                  list.push({
                      name: `名称${index}`,
                      sex: '0',
                      num: 123,
                      age: -9,
                      region: -123.03,
                      rate: -0.36,
                      address: 'shenzhen',
                      time: '2022-06-11'
                  })
              }
              resolve(list)
            })
        },
        isShowAge() {
            this.showAge = !this.showAge
            this.columns2.forEach(column => {
                if (['Age'].includes(column.title)) {
                  column.visible = this.showAge
                }
              })
            if (this.$refs.xTable) {
                this.$refs.xTable.refreshColumn()
            }
        },
        // 设置单元格样式
        cellStyle({ row, column, rowIndex, columnIndex }) {
            let rowStyle = {
                padding: '3px',
                // width: '80px'
            }
            // console.log(column, 'column');
            // console.log(row[column.property], 'property');
            if (row[column.property] < 0) {
              rowStyle.color = 'red'
            }
            return rowStyle
            
        },
        formatSex (value) {
            if (value === '1') {
            return '男'
            }
            if (value === '0') {
            return '女'
            }
            return ''
        }
    }
}
</script>

<style>
.vxe-table--render-default {
  font-size: 12px !important;
}

.flex-wrapper,
.right-box {
  display: flex; 
  /* 均匀排列每个元素, 首个元素放置于起点，末尾元素放置于终点 */
  justify-content: space-between; 
  /* 指定 flex 元素单行显示还是多行显示 */
  flex-wrap: wrap; 
}

.right-box {
    width: calc(100% - 120px);
}

.item{
  position: relative;
  color: black;
  flex: 0 0 24%; 
  height: 120px;
  width: calc((100% - 60px) / 4);
  min-width: calc((100% - 60px) / 4);
  max-width: calc((100% - 60px) / 4); 
  text-align:center;
  line-height:30px;
  background-color: white;
  /* 边距懒得算，css函数代替 */ 
  /* margin-right: calc(4% / 3); 
  margin-bottom: calc(4% / 3);  */
  margin: 0 20px 20px 0;
} 
/* 去除每行尾的多余边距 */
.item:nth-child(4n){ 
  margin-right: 0; 
} 
/* 使最后一个元素的边距填满剩余空间 */
.item:last-child{ 
  margin-right: auto; 
} 
.item:hover .opration-wrapper{
    /* display: block; */
    transition: bottom 0.4s 0.08s, z-index 0s 0.5s;
    bottom: 0;
    opacity: 0.6;
}

.image-single {
    width: 100%;
    height: 100%;
}

.opration-wrapper {
    width: 100%;
    display: none;
    position: absolute;
    left: 0;
    bottom: -30px;
    opacity: 0;
    height: 30px;
    line-height: 30px;
    transition: bottom 1.4s 0.07s;
}

.del-btn {
    text-align: center;
    font-size: 12px;
    background: #ddd;
}

/* 旋转菜单 */
.demo {
    padding: 2em 0;
    transform: translate3d(0, 0, 0);
}
.navbar {
    width: 150px;
    height: 150px;
    line-height: 150px;
    border-radius: 50%;
    background: #ddd;
    margin: 70px auto;
    position: relative;
    cursor: pointer;
    text-align: center;
    font-size: 1.75em;
    font-weight: bold;
    color: #383838;
    transition: 0.24s 0.2s;
}
.navbar:hover {
    background: rgba(255, 255, 255, 0.75);
}
.navbar .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: -75px;
    left: -75px;
    border: 150px solid transparent;
    cursor: default;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 1.4s 0.07s;
    z-index: -1;
}
.navbar:hover .menu {
    transition: transform 0.4s 0.08s, z-index 0s 0.5s;
    transform: scale(1);
    z-index: 1;
}
.navbar .menu li {
    position: absolute;
    top: -100px;
    left: -100px;
    transform-origin: 100px 100px;
    transition: all 0.5s 0.1s;
}
.navbar:hover .menu li {
    transition: all 0.6s;
}
.navbar .menu li a {
	transition:all .4s ease 0s;
    width: 45px;
    height: 45px;
    line-height: 45px;
    border-radius: 50%;
    background: #ddd;
    position: absolute;
    font-size: 60%;
    color: #99b977;
    transition: 0.6s;
    text-decoration: none;
}
.navbar .menu li a:hover {
    background-color: #2860F8;
    color: #fff;
}
.navbar:hover .menu li:nth-child(1) {
    transition-delay: 0.02s;
    transform: rotate(85deg);
}
.navbar:hover .menu li:nth-child(1) a {
    transition-delay: 0.04s;
    transform: rotate(635deg);
}
.navbar:hover .menu li:nth-child(2) {
    transition-delay: 0.04s;
    transform: rotate(125deg);
}
.navbar:hover .menu li:nth-child(2) a {
    transition-delay: 0.08s;
    transform: rotate(595deg);
}
.navbar:hover .menu li:nth-child(3) {
    transition-delay: 0.06s;
    transform: rotate(165deg);
}
.navbar:hover .menu li:nth-child(3) a {
    transition-delay: 0.12s;
    transform: rotate(555deg);
}
.navbar:hover .menu li:nth-child(4) {
    transition-delay: 0.08s;
    transform: rotate(205deg);
}
.navbar:hover .menu li:nth-child(4) a {
    transition-delay: 0.16s;
    transform: rotate(515deg);
}
.navbar:hover .menu li:nth-child(5) {
    transition-delay: 0.1s;
    transform: rotate(245deg);
}
.navbar:hover .menu li:nth-child(5) a {
    transition-delay: 0.2s;
    transform: rotate(475deg);
}
.navbar:hover .menu li:nth-child(6) {
    transition-delay: 0.12s;
    transform: rotate(285deg);
}
.navbar:hover .menu li:nth-child(6) a {
    transition-delay: 0.24s;
    transform: rotate(435deg);
}
.navbar:hover .menu li:nth-child(7) {
    transition-delay: 0.14s;
    transform: rotate(325deg);
}
.navbar:hover .menu li:nth-child(7) a {
    transition-delay: 0.28s;
    transform: rotate(395deg);
}
.navbar:hover .menu li:nth-child(8) {
    transition-delay: 0.16s;
    transform: rotate(365deg);
}
.navbar:hover .menu li:nth-child(8) a {
    transition-delay: 0.32s;
    transform: rotate(355deg);
}
.navbar:hover .menu li:nth-child(9) {
    transition-delay: 0.18s;
    transform: rotate(405deg);
}
.navbar:hover .menu li:nth-child(9) a {
    transition-delay: 0.36s;
    transform: rotate(315deg);
}
</style>