<!--  -->
<template>
  <div class>
    <e-table :tableHeadConfig="tableHeadConfig" :tableLoadData="tableLoadData" @selectLine="selectLine">
      <template v-slot:status="slotData">
        <el-tooltip
          :content="slotData.data.row.status | tooltipTitle"
          :popper-class="slotData.data.row.status | tooltipClass"
          placement="right"
        >
          <el-switch
            @change="handleStatusChange(slotData.data.row.status)"
            :active-value="0"
            :inactive-value="1"
            active-color="#67C23A"
            inactive-color="#909399"
            v-model="slotData.data.row.status"
          ></el-switch>
        </el-tooltip>
      </template>
      <template v-slot:operation="slotData">
        <el-button type="success" size="mini">分配角色</el-button>
        <el-button type="primary" size="mini" @click="editRow(slotData.data.row)">编辑{{slotData.data.row.level}}</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </template>
      <template v-slot:sex="slotData">
        <span>{{slotData.data.row.gender | sexFilter}}</span>
      </template>
      <template v-slot:thumbnail="slotData">
        <el-image
          style="width: 60px; height: 30px"
          :src="slotData.data.row.headImg || 'http://www.bocaibao.com.cn/images/1shouye_logo.png'"
          :preview-src-list="[slotData.data.row.headImg]"
        ></el-image>
      </template>
    </e-table>
  </div>
</template>

<script>
import eTable from "./components/Table.vue";
export default {
  name: "Table",
  components: {
    eTable
  },
  props: {},
  data() {
    return {
      // 配置
      tableHeadConfig: [
        {
          label: "ID",
          field: "id"
        },
        {
          label: "账号",
          field: "account"
        },
        {
          label: "姓名",
          field: "name"
        },
        {
          label: "性别",
          columnType: "slot",
          slotName: "sex"
        },
        {
          label: "头像",
          columnType: "slot",
          slotName: "thumbnail"
        },
        {
          label: "昵称",
          field: "nickName"
        },
        {
          label: "手机号码",
          field: "mobilePhone"
        },
        {
          label: "等级",
          field: "level"
        },
        {
          label: "状态",
          columnType: "slot",
          slotName: "status"//一定要对应好上面的状态的slot名字
        },
        {
          label: "操作",
          columnType: "slot",
          slotName: "operation",
          width: 260
        }
      ],
      // 数据
      tableLoadData: [
        {
          id: "1", //用户ID
          account: "naPb1836757263", //用户账号
          gender: 0, //性别（0：未知；1：男；2：女）
          headImg:
            "http://pic1.win4000.com/wallpaper/2019-01-12/5c39921496cea_270_185.jpg", //用户头像（url）
          mobilePhone: "13703957387", //用户手机号码
          name: "刘邦", //用户姓名
          nickName: "laozhang", //用户昵称
          level: 0, //用户等级
          status: 1 //用户状态
        },
        {
          id: "usr460138499442614272",
          account: "123456d",
          gender: 2,
          headImg:
            "http://pic1.win4000.com/wallpaper/1/547d71dae56ee_270_185.jpg",
          mobilePhone: "13708068294",
          name: "刘五",
          nickName: "五公公",
          level: 88,
          status: 0
        },
        {
          id: "usr460138499442614272",
          account: "123456d",
          gender: 2,
          headImg:
            "http://pic1.win4000.com/wallpaper/1/547d71dae56ee_270_185.jpg",
          mobilePhone: "13708068294",
          name: "刘五",
          nickName: "五公公",
          level: 88,
          status: 1
        },
        {
          id: "usr460138499442614272",
          account: "123456d",
          gender: 1,
          headImg:
            "http://pic1.win4000.com/wallpaper/1/547d71dae56ee_270_185.jpg",
          mobilePhone: "13708068294",
          name: "刘五",
          nickName: "五公公",
          level: 88,
          status: 0
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
      //  编辑
      editRow(row) {
        console.log(row)
      },
      //  选中当前行
      selectLine(selection) {
        console.log(selection)
      },
      // switch
      handleStatusChange() {

      }
  },
  computed: {},
  filters: {
    tooltipClass(status) {
      return status == 0 ? 'success-tooltip' : 'failed-tooltip'
    },
    tooltipTitle(status) {
      return status == 0 ? '正常' : status == 1 ? '锁定' : '封停'
    },
    /**
     * @param {
     *      表单性别过滤器
     * }
     */
    sexFilter(sex) {
      return sex == 1 ? '男' : sex == 2 ? '女' : '未知'
    }
  }
};
</script>
<style lang="scss">
.success-tooltip {
  background: #67c23a !important;
  color: #ffffff !important;

  .popper__arrow {
    border-right-color: #67c23a !important;

    &::after {
      border-right-color: #67c23a !important;
    }
  }
}

.failed-tooltip {
  background: #909399 !important;
  color: #ffffff !important;

  .popper__arrow {
    border-right-color: #909399 !important;

    &::after {
      border-right-color: #909399 !important;
    }
  }
}
</style>
