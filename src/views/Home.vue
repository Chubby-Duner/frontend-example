<template>
   <vxe-table
          border
          show-overflow
          ref="xTable"
          height="500"
          :span-method="rowspanMethod"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="role" title="Role" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-input v-model="row.role" type="text" placeholder="请输入角色"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-input v-model="row.name" type="text" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-input v-model="row.address" type="text" placeholder="请输入地址"></vxe-input>
            </template>
          </vxe-column>
        </vxe-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Designer', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Test', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Test', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' },
                { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: '0', sex2: ['1'], num1: 33, age: 30, address: 'Shenzhen', date12: '', date13: '' },
                { id: 100012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '1', sex2: ['1'], num1: 22, age: 20, address: 'Guangzhou', date12: '', date13: '2020-04-11' },
                { id: 100013, name: 'Test13', nickname: 'T13', role: 'Designer', sex: '1', sex2: ['1'], num1: 19, age: 34, address: 'BeiJing', date12: '', date13: '2020-01-10' }
              ],
              validRules: {
                role: [
                  { required: true, message: '角色值必须填写' }
                ],
                name: [
                  { required: true, message: '名称必须填写' }
                ],
                address: [
                  { required: true, message: '地址必须填写' }
                ]
              }
    }
  },
  mounted() {
    for (const item of this.tableData) {
      // if (item.parentId === '-1') {
      item.role = `${item.role}\u00A0\u00A0${item.nickname}\u00A0\u00A0${item.age}`
      // }
    }
  },
  methods: {
            insertEvent () {
              const $table = this.$refs.xTable
              const record = {}
              $table.insert(record).then(({ row }) => {
                $table.setActiveCell(row, 'role')
              })
            },
            async saveEvent () {
              const $table = this.$refs.xTable
              const body = $table.getRecordset()
              const { insertRecords, removeRecords, updateRecords } = body
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                const errMap = await $table.validate().catch(errMap => errMap)
                if (errMap) {
                  this.$refs.xTable.modal.message({ status: 'error', content: '校验不通过！' })
                } else {
                  this.$refs.xTable.modal.message({ content: '保存成功！', status: 'success' })
                }
              } else {
                this.$Message.info('数据未改动！')
              }
            },
            // 通用行合并函数（将相同多列数据合并为一行）
            rowspanMethod ({ row, _rowIndex, column, visibleData }) {
              let fields = ['role']
              let cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                let prevRow = visibleData[_rowIndex - 1]
                let nextRow = visibleData[_rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = visibleData[++countRowspan + _rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: 1, colspan: 3 }
                  }
                }
              }
            }
          }
}
</script>
<style scoped lang="scss">
/* 设置表头背景色 */
:deep(.header) {
  background-color: #eef5f5 !important;
}
:deep(.el-table) {
  /* 解决索引不居中的问题 */
  .cell {
    // @include flex;
    padding: 5px 0px;
  }

  .el-table__placeholder {
    display: none;
  }

  .is-center {
    .cell {
      justify-content: center;
    }
  }

  .is-left {
    .cell {
      padding-left: 30px;
    }
  }

  .el-table__row--level-0 {
    .cell {
      justify-content: flex-start;
      /* prettier-ignore */
      padding-left: 20PX;
    }
  }

  /* 替换默认展开收起图片 */
  .el-table__expand-icon {
    width: 16px;
    height: 16px;
    // background: url("~@assets/imgs/tree/8.png") no-repeat;
    background-size: 100% 100%;

    .el-icon {
      display: none;
    }
  }
  .el-table__expand-icon--expanded {
    transform: none;
    // background: url("~@assets/imgs/tree/9.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

