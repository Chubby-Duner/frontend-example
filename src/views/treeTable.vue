<template>
  <div>
      <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    lazy
    :load="load"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
 data() {
      return {
        tableData: [],
        tableDataCopy: [],
        // 添加的数据
        addData: [{
          id: 1,
          date: '2016-05-02',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '张三',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '张三',
          address: '上海市普陀区金沙江路 1519 弄',
        }, {
          id: 4,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 5,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 6,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 7,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 8,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 9,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          id: 10,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {
        const arr = [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]

        this.tableDataCopy = arr || [] // 备份的全量数据


        this.tableData = JSON.parse(JSON.stringify(arr)).map(item => { // 展示数据
            // hasChildren 表示需要展示一个箭头图标
            item.hasChildren = item.id && (item.id != '' || item.id != null)
            // 只展示一层
            // 如果有children数据会自动加载
            item.children = null
            // 记住层级关系
            item.idList = [item.id]
            return item
        })
    },
    methods: {
      load(tree, treeNode, resolve) {
        //  层级关系备份
        const idCopy = JSON.parse(JSON.stringify(tree.idList))

        // 查找下一层数据
        let resolveArr = this.tableDataCopy
        let id
        // eslint-disable-next-line
        while (id = tree.idList.shift()) {
            const tarItem = resolveArr.find(item => item.id === id)
            tarItem.loadedChildren = true
            resolveArr = tarItem.children
        }

        // 处理下一层数据的属性
        resolveArr = JSON.parse(JSON.stringify(resolveArr))
        resolveArr.forEach(item => {
            item.hasChildren = item.id && (item.id != '' || item.id != null)
            item.children = null
            // 此处需要深拷贝，以防各个item的idList混乱
            item.idList = JSON.parse(JSON.stringify(idCopy))
            item.idList.push(item.id)
        })

        // 标识已经加载子节点
        tree.loadedChildren = true

        // 渲染子节点
        resolve(resolveArr)
      }
    },
}
</script>

<style>

</style>