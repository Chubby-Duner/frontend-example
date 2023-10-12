<template>
  <div>
    <!-- elementUI表格动态添加删除，行列的添加删除 -->
    <div id="app">
      <el-form>
        <div v-for="(item, index) in tab" :key="index">
          <!-- 自定义表格的标题 -->
          <el-input v-model="item.title"></el-input>
          <el-table
            :data="item.data"
            size="small"
            empty-text="暂无数据"
            border
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column
              v-for="(col, i) in cols[index]"
              align="center"
              :key="i"
            >
              <!-- 表头 -->
              <template slot="header">
                <el-tooltip :content="col.prop" placement="top" effect="light">
                  <span>{{ col.prop }}</span>
                </el-tooltip>
              </template>
              <!-- 数据 -->
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row[col.prop]"
                  value-key="index"
                  size="small"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="addLine(index, scope.$index)"
                  >添加行</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click="delLine(index, scope.$index)"
                  >删除行</el-button
                >
                <el-button type="text" size="mini" @click="addCol(index)"
                  >添加列</el-button
                >
                <el-button type="text" size="mini" @click="delCol(index)"
                  >删除列</el-button
                >
                <el-button type="text" size="mini" @click="getRow(scope.row)"
                  >获取行数据</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="addTab">添加表格</el-button>
          <el-button @click="delTab">删除表格</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //默认表格为4*4的格式
      tab: [
        {
          title: "",
          data: [
            {
              column1: "",
              column2: "",
              column3: "",
              column4: "",
            },
            {
              column1: "",
              column2: "",
              column3: "",
              column4: "",
            },
            {
              column1: "",
              column2: "",
              column3: "",
              column4: "",
            },
            {
              column1: "",
              column2: "",
              column3: "",
              column4: "",
            },
          ],
        },
      ],
      cols: [
        [
          { prop: "column1" },
          { prop: "column2" },
          { prop: "column3" },
          { prop: "column4" },
        ],
      ],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    // 添加行
    addLine(tabIdx, lineIdx) {
      // 当前数据格式：{column1: "1", column2: "2", column3: "3", column4: "4",}
      // 目标数据格式：{column1: "", column2: "", column3: "", column4: "",}
      // 处理完之后push到data数据列表
      let line = {};
      let tabKeys = Object.keys(this.tab[tabIdx].data[lineIdx]);
      tabKeys.forEach((item) => {
        line[item] = "";
      });
      this.tab[tabIdx].data.push(line);
    },

    // 删除行
    delLine(tabIdx, lineIdx) {
      // 截取当前行的数据，剩下的数据就是删除后的数据
      this.tab[tabIdx].data.splice(lineIdx, 1);
    },

    // 添加列
    addCol(tabIdx) {
      console.log("tabIdx ==> ", tabIdx);
      let col = this.cols[tabIdx].length + 1;
      let prop = "column" + col;
      let title = {
        prop,
      };
      // 在data每一个对象中插入一个新增列
      let data = this.tab[tabIdx].data;
      console.log("data ==> ", data);
      data.forEach((item) => {
        // item[prop] = '';  // 这个写法vue检测不到，必须使用vue.set方法
        this.$set(item, prop, "");
      });
      // 数据添加后，必须添加表头的数据，否则就算数据变更了也渲染不出来
      this.cols[tabIdx].push(title);
    },

    // 删除列
    delCol(tabIdx) {
      let len = this.cols[tabIdx].length;
      let data = this.tab[tabIdx].data;
      let prop = "column" + len;
      data.forEach((item) => {
        // 删除数组对象每一行中的该元素，就是删除整列
        this.$delete(item, prop);
      });
      this.cols[tabIdx].splice(len - 1, 1);
    },

    //增加表格
    addTab() {
      //该处不能写成let newTab = this.tab;  this.tab是一个变量，而需要push进去的却是一个常量
      const newTab = {
        title: "",
        data: [
          {
            column1: "",
            column2: "",
            column3: "",
            column4: "",
          },
          {
            column1: "",
            column2: "",
            column3: "",
            column4: "",
          },
          {
            column1: "",
            column2: "",
            column3: "",
            column4: "",
          },
          {
            column1: "",
            column2: "",
            column3: "",
            column4: "",
          },
        ],
      };

      this.tab.push(newTab);
      const prop = [
        { prop: "column1" },
        { prop: "column2" },
        { prop: "column3" },
        { prop: "column4" },
      ];
      this.cols.push(prop);
    },

    //删除表格
    delTab() {
      let len = this.tab.length - 1;
      this.tab.splice(len, 1);
    },

    subForm() {
      //后端存储是以多维数组的格式进行存储的表单数据的，而前端是以数组对象的格式进行数据绑定的，提交表单时就需要做数据的格式转化
      let tab = this.tab.map((item) => {
        // 能对每一个表格的数据同时进行处理
        let arrs = [];
        item.data.forEach((item) => {
          // 获取表格中每一行的数据,并将其转化为数组
          let arr = Object.values(item);
          // 将每一行的数据push到整个表格的数组中
          arrs.push(arr);
        });
        return arrs;
      });

      let data = this.tab.map((item, index) => {
        // 将标题处理到每一个表格的数组中
        return {
          title: item.title,
          table: tab[index],
        };
      });

      console.log(data);
    },

    // 数据回显
    getData() {
      //本来在工作中是请求的数据接口，既然没有，那我自己写一个后端的默认数据，进行转化后回显数据
      const data = [
        {
          //实际上这就是我传入时转换出来的数据格式
          title: "这是第一个表格",
          table: [
            ["1", "2", "3", "4"],
            ["1", "2", "3", "4"],
            ["1", "2", "3", "4"],
            ["1", "2", "3", "4"],
          ],
        },
      ];

      this.tab = data.map((item) => {
        let data = item.table.map((item) => {
          let obj = {};
          item.forEach((item, index) => {
            obj[`column${index + 1}`] = item;
          });
          return obj;
        });
        return {
          title: item.title,
          data: data,
        };
      });

      this.cols = this.tab.map((item) => {
        // 必须还原表头，不然会出现bug
        let prop = Object.keys(item.data[0]);
        let arr = [];
        prop.forEach((item) => {
          let obj = {};
          obj["prop"] = item;
          arr.push(obj);
        });
        return arr;
      });
    },

    // 获取行数据
    getRow(row) {
      console.log(row);
    },
  },
};
</script>

<style>
</style>