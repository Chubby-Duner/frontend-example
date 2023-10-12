<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :row-style="tableRowStyle"
      ref="tableRef"
    >
     <template v-for="item in Data">
        <el-table-column
          :label="item.title"
          min-width="120"
          :key="item.key" 
          :align="item.algin"
          :fixed="item.fixed"
          v-if="item.isTrue"  
        >
          <template slot="header">
            <!-- 悬浮表头提示 -->
            <el-tooltip :content="item.title" placement="top" effect="light">
              <span>{{ item.title }}</span>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <!-- style也可以根据数据里的某个字段进行设置哦 -->
            <span
              :class="item.color ? 'font-class-red' : ''"
              :style="{ color: scope.row[item.field] < 0 ? 'red' : '' }"
              >{{ scope.row[item.field] }}</span
            >
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-popover placement="right" width="400" trigger="click">
      <el-checkbox-group v-model="colOptions">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in colSelect" :key="index"
            ><el-checkbox :label="item" :key="item"></el-checkbox
          ></el-col>
        </el-row>
      </el-checkbox-group>
      <el-button slot="reference" size="medium" type="success"
        >自定义选择列</el-button
      >
    </el-popover>
  </div>
</template>

<script>
//  引入table的封装数据
import { Data } from "../common/js/data";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2011-05-02",
          name: "张三",
          address: "上海",
          location: "sh",
          pinkHandle: 0,
        },
        {
          date: "2012-05-04",
          name: "李四",
          address: "北京",
          location: "bj",
          colorHandle: 1,
        },
        {
          date: "2013-05-01",
          name: "王五",
          address: "广州",
          location: "gz",
          changeTime: 1,
        },
        {
          date: "2014-05-03",
          name: "孙七",
          address: "厦门",
          location: "xm",
          hasCol: 1,
        },
        {
          date: "2013-05-01",
          name: "老王",
          address: "广州",
          location: "gz",
          changeTime: 1,
        },
        {
          date: "2015-05-03",
          name: "钱八",
          address: "西安",
          location: "xa",
          hasCol: 0,
        },
      ],
      Data,
      colOptions: [], // 多选框默认全选，为啥是数组呢，因为我们用的是el-checkbox-group,v-model绑定就为一个数组
      colSelect: [], // 也是所有表头标题, 用于跟多选框组绑定
    };
  },
  created() {
      // console.log(Data);
    //  )
    this.colSelect = [];
    this.colOptions = [];
    if (!Data) {
      return;
    }
    // 给控制列的勾选框赋值数据，因为这个的数据跟表头是一致的，控制这里就等于控制了表格列
    for (let i = 0; i < Data.length; i++) {
      this.colSelect.push(Data[i].title);
      // if(this.colData[i].title == '名称') {  // 初始化不想展示的列可以放在这个条件里
      //     continue;
      // }
      /* 
          多平台
          if(this.colDatap[plat][i].title == '名称') {  // 初始化不想展示的列可以放在这个条件里
               continue;
          }
      */
      this.colOptions.push(Data[i].title);
    }
  },
  watch: {
    colOptions(valArr) {
      // 未选中，默认勾选框是全选也就是默认全展示，即默认arr就是一个空数组 []
      let arr = this.colSelect.filter((i) => valArr.indexOf(i) < 0);  
      Data.filter((i) => {
        if (arr.indexOf(i.title) != -1) {
          i.isTrue = false;  // 隐藏  
        } else {
          i.isTrue = true;  // 显示
        }
      });
      this.$nextTick(() => {
        this.$refs.tableRef.doLayout();
      });
    },
  },
  beforeUpdate() {
    // 重新布局表格
    this.$nextTick(() => {
      this.$refs.tableRef.doLayout();  
    });
  },
  methods: {
    tableRowStyle({ row }) {
      //
      console.log(row);
      let style = {};
      switch (row.location) {
        case "sh":
          if (row.pinkHandle === 0) {
            style = {
              "background-color": "pink",
              color: "blue",
              "font-weight": "bold",
            };
          }
          return style;
        case "bj":
          if (row.colorHandle === 1) {
            style = {
              "background-color": "#FFFFCC",
              color: "blue",
            };
          }
          return style;
        case "gz":
          if (row.changeTime === 1) {
            style = {
              "background-color": "blue",
              color: "yellow",
              "font-weight": "bold",
            };
          }
          return style;
        case "xm":
          if (row.hasCol === 1) {
            style = {
              "background-color": "red",
              color: "yellow",
              "font-weight": "bold",
            };
          }
          return style;
        case "xa":
          if (row.hasCol === 0) {
            style = {
              "background-color": "skyblue",
              color: "#FFFFFF",
              "font-weight": "bold",
            };
          }
          return style;
      }
    },
  },
};
</script>

<style scoped>
/* 取消悬浮当前行显示高亮 */
.el-table tbody tr.el-table__row.hover-row {
  background-color: transparent !important;
}
</style>