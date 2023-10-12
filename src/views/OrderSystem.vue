<template>
  <div id="app">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        column-key="filterTag"
        :filters="getfilterNameItem()"
        :filter-method="filterHandler"
      ></el-table-column>
      <!-- column-key="filterTag" 这个要配一下，相当于起了个别名，通过这个别名可以访问到变化的对象 -->
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="gender" label="性别" width="180">
      </el-table-column>
      <el-table-column prop="xueli" label="学历" width="180"> </el-table-column>
      <el-table-column prop="like" label="爱好" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // 发请求获取表格的数据
    this.getTableData();
  },
  methods: {
    // 获取表格的数据
    getTableData() {
      let apiTableData = [
        {
          name: "王小虎",
          age: 18,
          gender: "男",
          xueli: "本科",
          like: "打篮球",
          address: "上海闵行",
        },
        {
          name: "张小花",
          age: 28,
          gender: "女",
          xueli: "本科",
          like: "画画",
          address: "上海松江",
        },
        {
          name: "赵小二",
          age: 28,
          gender: "男",
          xueli: "研究生",
          like: "航空航天",
          address: "上海普陀",
        },
        {
          name: "钱大牛",
          age: 28,
          gender: "男",
          xueli: "研究生",
          like: "航空航天",
          address: "上海奉贤",
        },
      ];
      this.tableData = apiTableData;
    },
    // 获取筛选的字段
    getfilterNameItem() {
      let apiArr = [
        // 发请求获取筛选项的数据
        { text: "王小虎", value: "王小虎" },
        { text: "张小花", value: "张小花" },
        { text: "赵小二", value: "赵小二" },
        { text: "钱大牛", value: "钱大牛" },
      ];
      return apiArr;
    },
    // 监听筛选项的变化
    filterChange(filterObj) {
      console.log(filterObj.filterTag);
      if (filterObj.filterTag.length > 0) {
        console.log("点击筛选");
        this.tableData = filterObj.filterTag;
      } else {
        console.log(filterObj);
        console.log("点击重置");
      }
    },
    filterHandler(value, row, column) {
      console.log('value ==>', value,);
      console.log('row ==>', row);
      console.log('columu ==>', column);
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>

<style  scoped>
</style>