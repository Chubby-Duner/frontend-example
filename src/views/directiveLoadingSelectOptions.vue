<template>
  <div>
    <!-- <el-select v-model="value" filterable placeholder="请选择" @visible-change="visibleChange">
      <div v-loading="loadingOptions">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </div>
    </el-select> -->

    <el-select v-model="value" popper-class="localSelect" filterable placeholder="请选择" ref="mySelect" @visible-change="visibleChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-select v-model="value" filterable popper-class="localSelect1" placeholder="请选择" ref="mySelect1" v-loading-select-options="fetchOptions">
      <!-- <div v-loading="loadingOptions1"> -->
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      <!-- </div> -->
    </el-select>


    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="shopNumber" label="店铺" width="180" />
      <el-table-column
        v-for="app in allApps"
        :key="app"
        :prop="app"
        :label="app"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row[app]">✅</span>
          <span v-else>❌</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      options: [],
      value: '',
      options1: [],
      loadingOptions: false,
      loadingOptions1: false,
      rawData: [
        {
          id: "1902935785489502208",
          shopNumber: "Temu1-Qertes",
          appNames: ["定制产品ERP同步", "产品核价", "产品活动"]
        },
        {
          id: "1874007388659064832",
          shopNumber: "Temu1-Taoet",
          appNames: ["定制产品ERP同步", "产品核价", "产品活动", "定制模板"]
        }
      ],
      tableData: [],
      allApps: ["定制产品ERP同步", "产品核价", "产品活动", "定制模板"]
    };
  },
  mounted() {
    this.tableData = this.rawData.map(item => {
      const row = {
        shopNumber: item.shopNumber
      };
      this.allApps.forEach(app => {
        row[app] = item.appNames.includes(app);
      });
      return row;
    });
  },
  methods: {
    visibleChange(visible) {
      if (this.options.length !== 0) { return }
      this.loading = this.$loading({
        lock: true,
        target: ".localSelect",
        spinner: 'el-icon-loading',
        background: 'white'
      })
      setTimeout(() => {
        this.options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
        this.loading.close()
      }, 1000);
    },
    async fetchOptions() {
      this.loadingOptions1 = true;
      // 模拟异步请求
      return new Promise((resolve) => {
        setTimeout(() => {
          this.options1 = [
            { label: "选项1", value: 1 },
            { label: "选项2", value: 2 },
            { label: "选项3", value: 3 }
          ];
          this.loadingOptions1 = false;
          resolve();
        }, 1000);
      });
    }
  }
};
</script>

<style>

</style>
