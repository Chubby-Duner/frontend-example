<template>
  <div>
    <el-table
      ref="tableRef"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelectAll"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <template v-for="item in Allegro">
        <el-table-column
          :label="item.title"
          min-width="120"
          :key="item.key"
          :align="item.algin"
          :fixed="item.fixed"
          v-if="item.isTrue"
          :formatter="item.formatter"
          :class-name="item.colorStyle"
        >
          <template slot="header">
            <el-tooltip :content="item.title" placement="top" effect="light">
              <span>{{ item.title }}</span>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span
              :class="item.color ? 'font-class-red' : ''"
              :style="{ color: scope.row[item.field] < 0 ? 'red' : '' }"
              v-html="formatter(scope.row[item.field], item.field)"
              >{{ scope.row[item.field] }}</span
            >
          </template>
        </el-table-column>
      </template>
      <!-- <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip>
    </el-table-column> -->
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

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="30%"
    >
      <span>我来啦!</span>
    </el-drawer>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
      点我打开
    </el-button>
  </div>
</template>

<script>
import { Allegro } from "../common/js/utils";

export default {
  // 功能：点击行改变当前行的背景色，行点击，勾选框，全选勾选框均可实现
  data() {
    return {
      tableData: [
        {
          date: "2021-04-01 00:00:00",
          name: -9,
          address: "上海市普陀区金沙江路 1518 弄",
          className: "normal",
          sumMonth: "000",
          refundRatio: "ooo",
        },
        {
          date: "2021-05-01 00:00:00",
          name: "2",
          address: "上海市普陀区金沙江路 1518 弄",
          className: "normal",
          sumMonth: "111",
        },
        {
          date: "2021-06-01 00:00:00",
          name: "3",
          address: "上海市普陀区金沙江路 1518 弄",
          className: "normal",
          sumMonth: 111,
        },
        {
          date: "2021-08-01 00:00:00",
          name: "4",
          address: "上海市普陀区金沙江路 1518 弄",
          className: "normal",
          sumMonth: -0.3,
        },
      ],
      Allegro,
      colOptions: [], // 多选框默认全选
      colSelect: [], // 也是所有表头标题, 用于跟多选框组绑定
      drawer: false,
    };
  },
  created() {
    // console.log(Allegro);
    this.colSelect = [];
    this.colOptions = [];
    // console.log(this.colData[plat]);
    if (!Allegro) {
      return;
    }
    for (let i = 0; i < Allegro.length; i++) {
      this.colSelect.push(Allegro[i].title);
      // if(this.colData[this.currentPlatForm][i].title == '名称') {  // 初始化不想展示的列可以放在这个条件里
      //     continue;
      // }
      this.colOptions.push(Allegro[i].title);
    }
  },
  watch: {
    colOptions(valArr) {
      let arr = this.colSelect.filter((i) => valArr.indexOf(i) < 0); // 未选中
      Allegro.filter((i) => {
        if (arr.indexOf(i.title) != -1) {
          i.isTrue = false;
        } else {
          i.isTrue = true;
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
    // 手动点击勾选框触发的事件
    handleSelect(selection, row) {
      // selection,row  传递两个参数，row直接是对象
      // 只传一个参数得到的是数组
      if (row.className === "normal") {
        row.className = "tableSelectedRowBgColor";
      } else {
        row.className = "normal";
      }
    },

    // select-all 手动点击全选触发的事件
    handleSelectAll(selection) {
      if (selection.length > 0) {
        selection.forEach((item) => {
          if (item.className === "normal") {
            item.className = "tableSelectedRowBgColor";
          }
        });
      } else {
        // 空数组初始化className
        this.tableData.forEach((item) => {
          if (item.className === "tableSelectedRowBgColor") {
            item.className = "normal";
          }
        });
      }
    },

    // 选中背景色
    tableRowClassName({ row }) {
      return row.className;
    },

    //点击行触发，切换复选框状态
    handleRowClick(row) {
      this.$refs.tableRef.toggleRowSelection(row);
      if (row.className === "normal") {
        row.className = "tableSelectedRowBgColor";
      } else {
        row.className = "normal";
      }
    },

    // ------------------------
    //转换日期格式
    dateFormat(longTypeDate) {
      var dateType = "";
      var date = new Date(Date.parse(longTypeDate.replace(/-/g, "/")));
      dateType = date.getFullYear() + "-" + this.getMonth(date); //yyyy-MM-dd格式日期
      return dateType;
    },

    //返回 01-12 的月份值
    getMonth(date) {
      var month = "";
      month = date.getMonth() + 1; //getMonth()得到的月份是0-11
      if (month < 10) {
        month = "0" + month;
      }
      return month;
    },

    formatter(row, field) {
      // 自定义formatter
      switch (field) {
        case "date":
          return this.dateFormat(row);
        case "name":
          return row + "%";
        case "refundRatio":
          return row + "%";
        default:
          return row;
      }
    },

    formatterColumn(row, field) {
      // 自定义formatter
      if (field == "date") {
        // 统计年月
        return this.dateFormat(row);
      } else if (
        [
          "refundRatio",
          "profitRatio",
          "shopProfitRatio",
          "lastShopProfitRatio",
        ].includes(field)
      ) {
        // 退款率 店铺利润率 对比上月增长
        return row + "%";
      } else if (field == "commissionFee") {
        // 佣金
        return (row.commissionFee =
          row.commissionFee < -1 ? row.commissionFee * -1 : row.commissionFee);
      } else if (field == "actualProfitRatio") {
        // 实际利润率
        return (row.actualProfitRatio * 100).toFixed(2) + "%";
      } else if (field == "adCost") {
        // 广告花费$
        return (row.adCost = row.adCost < -1 ? row.adCost * -1 : row.adCost);
      } else if (field == "adCostRatio") {
        // 广告花费投资比$
        return (row.adCostRatio * 100).toFixed(2) + "%";
      }
    },
  },
};
</script>

<style>
.tableSelectedRowBgColor td {
  background-color: #fedcbd !important;
}
.font-class-red {
  color: red !important;
}

.font-class-green {
  color: green;
}
</style>