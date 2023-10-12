<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>

    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期">
        <!-- 多级表头, el-table-column 嵌套 el-table-column 即可 -->
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes,prev,pager,next,jumper,->,total"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          label: "用户管理",
          name: "first",
        },
        {
          label: "配置管理",
          name: "second",
        },
        {
          label: "角色管理",
          name: "third",
        },
        {
          label: "定时任务补偿",
          name: "fourth",
        },
      ],
      activeName: "first",
      tableData: [],
      currentPage: 1,
      radio: "1",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClick(tab) {
      //   console.log(tab, event);
      for (let i = 0; i < this.tabs.length; i++) {
        if (tab.index === i) {
          this.activeName = tab.name;
        }
      }
      this.init();
    },
    init() {
      if (this.activeName === "first") {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ];
      }
      if (this.activeName === "second") {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
        ];
      }
      if (this.activeName === "third") {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ];
      }
      if (this.activeName === "fourth") {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ];
      }
    },
    initTable() {},
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style scoped>
</style>
