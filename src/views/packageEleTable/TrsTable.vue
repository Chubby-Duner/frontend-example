<template>
  <trs-table
            :table="myTable"
            :table-label="myTableLabel"
            :table-data="items"
            :pagination="myPagination"
            @sort="sortByScore"
            @lableChange="lableChanged"
            @lableOrder="lableOrdered"
            @handleSelectionChange="handleSelectionChange"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
            <template #trueName="{ scope }">
                <!-- <a
                    class="userName"
                    href="javascript:void(0)"
                    @click.stop="openDrawer(scope)"
                >{{ scope.row.trueName || '--' }}</a> -->
                {{ scope.row.trueName || '--' }}
            </template>
            <template #status="{ scope }">
                <el-tooltip
                :content="scope.row.status | tooltipTitle"
                :popper-class="scope.row.status | tooltipClass"
                placement="right"
                >
                <el-switch
                    @change="handleStatusChange(scope.row.status)"
                    :active-value="0"
                    :inactive-value="1"
                    active-color="#67C23A"
                    inactive-color="#909399"
                    v-model="scope.row.status"
                ></el-switch>
                </el-tooltip>
            </template>
            <template #position="{ scope }">
                {{ scope.row.position&&isJSON(scope.row.position)?JSON.parse(scope.row.position).name:scope.row.position||'--' }}
            </template>
            <template #percentage="{ scope }">
                <el-progress
                    v-if="scope.row.percentage&&(scope.row.percentage===0 || scope.row.percentage>0)"
                    :class="{'yydh-large':scope.row.monthlyTaskVolume>0&&scope.row.monthlyKPI > scope.row.monthlyTaskVolume}"
                    :color="(scope.row.monthlyTaskVolume>0&&scope.row.monthlyKPI>scope.row.monthlyTaskVolume)?colors2:colors"
                    :percentage="(scope.row.monthlyTaskVolume>0&&scope.row.monthlyKPI>scope.row.monthlyTaskVolume)?Math.ceil(scope.row.monthlyTaskVolume/scope.row.monthlyKPI):Math.ceil(scope.row.percentage*100)||0"
                    :format="formatlarge(scope.row)"
                >
                </el-progress>
                <div class="contrast rt">{{ scope.row.monthlyKPI || '0' }}/{{ scope.row.monthlyTaskVolume || '0' }}</div>
            </template>
            <template #operation="{ scope }">
                <el-button type="success" size="mini">分配角色</el-button>
                <el-button type="primary" size="mini" @click="editRow(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
            </template>
        </trs-table>
</template>

<script>
import TrsTable from './components/TrsTable.vue';

export default {
    components: {
        TrsTable
    },
    filters: {
        tooltipClass(status) {
            return status == 0 ? 'success-tooltip' : 'failed-tooltip'
        },
        tooltipTitle(status) {
            return status == 0 ? '正常' : status == 1 ? '锁定' : '封停'
        }
    },
    data() {
        return {
            myTable: {
                select: true, // 是否显示复选框  default：false
                type: true, // 是否显示序号     default：false
                strip: false, // 是否显示斑马纹  default：false
                height: '272px', // 表格高度     default：40px
                labelToggle: true, // 能否配置表头各列的显隐  default：false
                rowKey: '1', // 数据对象主键   default：''
                colDragble: true, // 列是否能拖拽改变顺序   default：false
                rowDragble: true, // 列是否能拖拽改变顺序   default：false
                ref: 'myTable', // 表格的全局引用名称    default：undefined
                loading: false, // 表格是否处于loading状态  default: false
                loadingText: '加载中', // loading的提示文字  default: '加载中'
                typeText: '序号', // 序号列表头文字    default:  '序号'
                align: 'center', // 表格对齐方式  default:  'left'
                border: true, // 是否带边框,
                pagination: true // 分页
            }, // 表格配置对象，非必传
            myTableLabel: [
                {
                    title: '姓名',// 列名
                    prop: 'trueName', // 字段名
                    // width: '180', // 规定列宽
                    // ellipsis: true, // 内容超出列宽是否显示省略符号并进行tooltip提示
                    slot: 'trueName', // 具名插槽名称
                    align: 'center', // 内容对齐方式
                    // sort: 'custom', // 字段排序设置
                    // formatter: (row, column) => {
                    //     return row.monthlySpreadPoint ?? '--';
                    // }, // 内容格式化方法，如果该函数和插槽同时存在，则优先使用该格式化方法
                    visible: true, // 是否显示该列
                    // order: 1, // 排序序号，按照列从左至右，数字从小到大
                    // headerAlign: 'center', // 该列表头对齐方式，如果不传，与align一致，如未传align,则与表格的对齐一致，如果表格对齐未传，则默认居左
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    // fixed: 'left', // 将该列固定在左侧（left）或右侧(right),默认不传则不固定。 
                },
                {
                    title: '地址',
                    prop: 'address',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '电话',
                    prop: 'phone',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '性别',
                    prop: 'sex',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '爱好',
                    prop: 'hobby',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '民族',
                    prop: 'nationality',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '政治面貌',
                    prop: 'political',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '恋爱状态',
                    prop: 'loveStatus',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                    formatter: (row, column) => {
                        return row.loveStatus  == -1 ? '失恋' : row.loveStatus  == 1 ? '热恋' : '单身'
                    } // 内容格式化方法，如果该函数和插槽同时存在，则优先使用该格式化方法
                },
                {
                    title: '分数',
                    prop: 'score',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                    sort: 'custom' 
                },
                {
                    title: '状态',
                    prop: 'status',
                    slot: 'status',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                },
                {
                    title: '操作',
                    width: '300',
                    prop: 'operation',
                    slot: 'operation',
                    canHide: true, // 是否可以隐藏该列，默认不传则为不可隐藏
                    align: 'center',
                    visible: true,
                }
            ], // 表头字段配置-数组对象（必传，不可为空）
            items: [
                {
                   trueName: '张三',
                   address: '广州',
                   phone: '111',
                   sex: '男',
                   hobby: 'coding',
                   score: 100,
                   nationality: '汉',
                   status: 1,
                   loveStatus: -1 //用户状态
                },
                {
                   trueName: '李四',
                   address: '广州',
                   phone: '111',
                   sex: '男',
                   hobby: 'coding',
                   score: 50,
                   nationality: '汉',
                   political: '团员',
                   status: 0,
                   loveStatus: 0
                },
                {
                   trueName: '王五',
                   address: '广州',
                   phone: '111',
                   sex: '男',
                   hobby: 'coding',
                   score: 86,
                   nationality: '汉',
                   status: 1,
                   loveStatus: 1
                },
                {
                   trueName: '赵六',
                   address: '广州',
                   phone: '111',
                   sex: '男',
                   hobby: 'coding',
                   score: 60,
                   nationality: '汉',
                   political: '党员',
                   status: 0,
                   loveStatus: -1
                }
            ],  // 表格数据 
            myPagination: {
                currentPage: 1, // 当前页码
                pageList: [2, 4, 6],  // 每页显示个数选择器的选项设置
                background: true,  // 是否为分页按钮添加背景色
                layout: 'total,sizes,prev,pager,next,jumper', // 组件布局，子组件名用逗号分隔
                total: 0, // 总条目数
                algin: 'center', // 位置  left center right / default: left 
                // 

            },
            page: 1,
            rows: 20
        }
    },
    mounted() {
        this.myPagination.total = this.items.length
    },
    methods: {
        // 模拟请求数据
        initTable() {
            // something code
            const obj = this.getParams()
            console.log(obj, 'obj');
        },
        getParams() {
            const obj = {
                page: this.page,
                rows: this.rows
            }

            return obj
            
        },
        sortByScore() {},
        // 控制显隐
        lableChanged(tableLableToggle) {
            console.log('tableLableToggle ==>', tableLableToggle);
        },
        lableOrdered() {},
        // 勾选框事件
        handleSelectionChange(val) {
            console.log('勾选框 ==> ', val);
        },
        // 状态切换
        handleStatusChange(status) {},
        // 编辑行
        editRow() {},
        handleSizeChange(rows) {
            this.myPagination.currentPage = 1
            this.page = 1,
            this.rows = rows
            console.log(rows, this.rows, 'ssss');
            this.initTable()
        },
        handleCurrentChange(page) {
            this.page = page
            this.initTable()
        }
    }
}
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