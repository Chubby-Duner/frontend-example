<template>
  <div>
    // 使用树形穿梭框组件
    <!-- <tree-transfer 
      ref="aaa"
      :title="title"                 
      :from_data='fromData'        
      :to_data='toData'             
      :defaultProps="{label:'label'}"
      @add-btn='add'                
      @remove-btn='remove'      
      :mode='mode'                
      height='400px'            
      filter                    
      openAll>                  
    </tree-transfer>
    <el-button type="primary" @click="getChecked">确 定</el-button> -->


    <!-- <el-table :data="arr" border style="width: 100%">
      <el-table-column prop="name" label="Name" width="180" :span-method="objectSpanMethod"></el-table-column>
      <el-table-column v-for="(header, index) in headers" :key="index" :label="header.label" :prop="header.prop" width="180">
        <template #default="{ row }">
          <div v-for="(item, idx) in row[header.prop]" :key="idx">{{ item[header.label] }}</div>
        </template>
      </el-table-column>
    </el-table> -->


    <el-table :data="expandedArr" border style="width: 100%" :span-method="objectSpanMethod">
      <!-- Name column with cell merging -->
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <!-- Hobby columns -->
      <el-table-column v-for="(header, index) in headers" :key="index" :label="header.label" :prop="header.prop" width="180">
        <template #default="{ row }">
          {{ row[header.label] }}
        </template>
      </el-table-column>
    </el-table>


    <el-table :data="expandedData" border style="width: 100%" :span-method="spanMethod">
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column prop="bobbyName" label="Bobby Name" width="180"></el-table-column>
      <el-table-column prop="level" label="Level" width="180"></el-table-column>
    </el-table>

    <el-table :data="processedData" border style="width: 100%" :span-method="getRowSpanForName">
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="bobbyName" label="Hobby" width="180" />
      <el-table-column prop="level" label="Level" width="180" />
    </el-table>


    <!-- <el-table :data="flattenedData" :span-method="mergeCell">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="hobbyName" label="Hobby Name"></el-table-column>
    </el-table> -->

    <el-table :data="flattenedData" border style="width: 100%" :span-method="objectSpanMethod1">
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别" width="180">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="hobbyName" label="Hobby Name" width="180"></el-table-column>
      <el-table-column prop="level" label="Level" width="180"></el-table-column>
    </el-table>

    <el-table
    :data="amountData"
    :span-method="objectSpanMethod3"
    height="400"
    border
    style="width: 100%;"
  >
    <el-table-column prop="feeType" label="费用类型" align="center" />
    <el-table-column
      label="费用权重"
      align="center"
    >
      <template slot-scope="scope">
        <p>{{ scope.row.feePriority | formatAmountPriority }}</p>
      </template>
    </el-table-column>
    <el-table-column prop="feeDescription" label="费用描述" align="center" />
    <el-table-column prop="feeAmount" label="费用金额" align="center" />
    <el-table-column prop="feeCurrencyCode" label="费用币种" align="center" />
    <el-table-column prop="postedDate" label="费用结算时间" align="center" />
    <el-table-column
      prop="parentId"
      label="Parent ID"
      align="center"
    >
      <template slot-scope="scope">
        <p v-if="scope.row.parentId !== null">{{ scope.row.parentId }}</p>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'

export default {
  name: 'TreeTransfer',
  // components:{ treeTransfer }, // 注册
  data() {
    return {
      originalData: [
        { sex: 1, name: 'jack', groupId: '3679', hobbies: [{ hobbyName: 'pingpong', level: 'beginner', groupId: '3679' }, { hobbyName: 'basketball', level: 'advanced', groupId: '3679' }] },
        { sex: 2, name: 'mary', groupId: '5198', hobbies: [{ hobbyName: 'dancing', level: 'intermediate', groupId: '5198' }] }
      ],
      processedData: [],
      title: ["待选","已选"],    //标题 类型：Array 必填：false 默认：["源列表", "目标列表"]
      mode: "transfer", //设置模式，字段可选值为transfer|addressList 类型：String 必填：false 补充：mode默认为transfer模式，即树形穿梭框模式，可配置字段为addressList改为通讯录模式，通讯录模式时按钮不可自定义名字，如要自定义标题名在title数组传入四个值即可，addressList模式时标题默认为通讯录、收件人、抄送人、密送人
      fromData:[    //源数据 类型：Array 必填：true 补充：数据格式同element-ui tree组件，但必须有id和pid
        {
          id: "1",
          pid: 0,    //自定义pid的参数名，默认为"pid" 必填：false
          label: "一级 1",
          nameEn: 'a',
          nameCn: 'A',
          children: [
            {
              id: "1-1",
              pid: "1",
              label: "二级 1-1",
              nameEn: 'a-1',
              nameCn: 'A-1',
              children: []
            },
            {
              id: "1-2",
              pid: "1",
              label: "二级 1-2",
              nameEn: 'a-1-2',
              nameCn: 'A-1-2',
              children: [
                {
                  id: "1-2-1",
                  pid: "1-2",
                  children: [],
                  nameEn: 'a-1-2-1',
                  nameCn: 'A-1-2-1',
                  label: "二级 1-2-1"
                },
                {
                  id: "1-2-2",
                  pid: "1-2",
                  children: [],
                  nameEn: 'a-1-2-2',
                  nameCn: 'A-1-2-2',
                  label: "二级 1-2-2"
                },
                {
                  id: "1-2-3",
                  pid: "1-2",
                  children: [],
                  nameEn: 'a-1-2-3',
                  nameCn: 'A-1-2-3',
                  label: "二级 1-2-3"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          pid: 0,    //自定义pid的参数名，默认为"pid" 必填：false
          label: "一级 2",
          nameEn: 'a',
          nameCn: 'A',
          children: [
            {
              id: "2-1",
              pid: "2",
              label: "二级 2-1",
              nameEn: 'a-12',
              nameCn: 'A-12',
              children: []
            },
            {
              id: "2-2",
              pid: "2",
              label: "二级 1-2",
              nameEn: 'a-1-2',
              nameCn: 'A-1-2',
              children: [
                {
                  id: "2-2-1",
                  pid: "2-2",
                  children: [],
                  nameEn: 'a-2-2-1',
                  nameCn: 'A-2-2-1',
                  label: "二级 2-2-1"
                }
              ]
            }
          ]
        },
      ],
      toData:[],    //目标数据 类型：Array 必填：true 补充：数据格式同element-ui tree组件，但必须有id和pid
      arr: [
        { name: 'jack', hobby: [{ bobbyName: 'pingpong', level: 'beginner' }, { bobbyName: 'basketball', level: 'advanced' }] },
        { name: 'mary', hobby: [{ bobbyName: 'dancing', level: 'intermediate' }] }
      ],
      headers: [
        { prop: 'bobbyName', label: 'bobbyName' },
        { prop: 'level', label: 'level' }
      ],
      expandedArr: [],
      // flattenedData: [], // 用于存放展平后的数据
      expandedData: [], // 将用于存储展开后的数据
      rowIndexMap: new Map(), // 用于追踪每个name列行索引的映射
      amountData: [],
      amountSpanArr: [],
      amountPosition: 0,
    };
  },
  computed: {
  flattenedData() {
      return this.originalData.flatMap(item => 
        item.hobbies.map(hobby => ({
          // name: item.name,
          // sex: item.sex,
          // hobbyName: hobby.hobbyName,
          // level: hobby.level
          ...item,  // 拷贝 item 中的所有属性
          ...hobby  // 合并 hobby 中的属性
        }))
      );
    }
  },
  mounted() {
    // this.expandData();
    // this.expandHobbies();
    // this.flattenData();
    // this.processData();
    this.getList();
  },
  methods: {
    getList() {
      const data = [
        // 模拟接口返回的数据
        { id: 1, parentId: null, feeType: 'A', feePriority: 1, feeDescription: 'Desc A1', feeAmount: 100, feeCurrencyCode: 'USD', postedDate: '2024-08-01' },
        { id: 2, parentId: 1, feeType: 'A', feePriority: 2, feeDescription: 'Desc A2', feeAmount: 200, feeCurrencyCode: 'USD', postedDate: '2024-08-02' },
        { id: 3, parentId: 1, feeType: 'B', feePriority: 3, feeDescription: 'Desc B1', feeAmount: 300, feeCurrencyCode: 'EUR', postedDate: '2024-08-03' },
        { id: 4, parentId: null, feeType: 'C', feePriority: 4, feeDescription: 'Desc C1', feeAmount: 400, feeCurrencyCode: 'EUR', postedDate: '2024-08-04' },
        { id: 5, parentId: 4, feeType: 'C', feePriority: 5, feeDescription: 'Desc C2', feeAmount: 500, feeCurrencyCode: 'EUR', postedDate: '2024-08-05' },
      ];

      // 按 parentId 排序
      data.sort((prev, next) => {
        if (prev['parentId'] !== next['parentId']) {
          return prev['parentId'] === null ? -1 : (next['parentId'] === null ? 1 : prev['parentId'] - next['parentId']);
        }
        return 0;
      });

      this.amountData = data;
      this.rowspan();
    },
    rowSpan() {
      this.amountSpanArr = [];
      this.amountPosition = 0;

      this.amountData.forEach((item, index) => {
        if (index === 0) {
          this.amountSpanArr.push(1);
          this.amountPosition = 0;
        } else {
          // 如果 parentId 为 null 或与上一行相同，则合并
          if (item.parentId === null || item.parentId === this.amountData[index - 1].parentId) {
            this.amountSpanArr[this.amountPosition] += 1;
            this.amountSpanArr.push(0);
          } else {
            this.amountSpanArr.push(1);
            this.amountPosition = index;
          }
        }
      });
    },
    objectSpanMethod3({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.amountSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    processData() {
      let lastGroupName = null;
      let rowSpanCounter = 0;

      this.originalData.forEach(item => {
        item.hobbies.forEach(hobby => {
          if (lastGroupName !== item.name) {
            rowSpanCounter = item.hobbies.length;
            lastGroupName = item.name;
          } else {
            rowSpanCounter--;
          }

          this.processedData.push({
            name: item.name,
            bobbyName: hobby.bobbyName,
            level: hobby.level,
            _rowSpan: rowSpanCounter // 使用_private属性避免在模板中直接使用
          });
        });
      });
    },
    getRowSpanForName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // Only apply to the "name" column
        let span = row._rowSpan || 1;
        let nextRow = rowIndex + 1;

        // Mark the next rows as not to be rendered
        for (let i = 0; i < span - 1; i++) {
          if (nextRow + i < this.processedData.length) {
            this.$set(this.processedData[nextRow + i], '_rowSpan', 0);
          }
        }

        return {
          rowspan: span,
          colspan: 1
        };
      }
    },
    expandHobbies() {
      const expanded = [];
      let globalRowIndex = 0; // 全局的行索引计数器

      this.arr.forEach((item, idx) => {
        const hobbies = item.hobby || [];
        hobbies.forEach((hobby, hobbyIndex) => {
          // 为每个hobby创建一个独立的条目，并记录name列的行索引映射
          const newRow = { ...item, ...hobby };
          if (hobbyIndex === 0) { // 只有第一个hobby才增加name行
            newRow.__nameRowIndex__ = globalRowIndex; // 记录name列的行索引
          }
          expanded.push(newRow);
          if (hobbyIndex !== 0) { // 非第一个hobby时，全局行索引也需要增加
            globalRowIndex++;
          }
        });
        // 处理name列的跨度映射，只对name列进行跨行处理
        if (hobbies.length > 1) {
          for (let i = 1; i < hobbies.length; i++) {
            this.rowIndexMap.set(globalRowIndex + i - 1, hobbies.length); // 记录合并跨度
          }
        }
        globalRowIndex += hobbies.length;
      });

      this.expandedData = expanded;
      console.log('🚀 ~ expandHobbies ~ this.expandedData:', this.expandedData)
    },
    spanMethod({ row, column, rowIndex }) {
      if (column.property === 'name') {
        console.log('🚀 ~ spanMethod ~ this.rowIndexMap:', this.rowIndexMap)
        // 根据映射表获取name列的跨度
        return {
          rowspan: this.rowIndexMap.get(rowIndex) || 1,
          colspan: 1
        };
      }
      return {
        rowspan: 1,
        colspan: 1
      };
    },
    expandData() {
      const expanded = [];
      this.arr.forEach(item => {
        item.hobby.forEach((hobby, hobbyIndex) => {
          expanded.push({
            ...item,
            ...hobby,
            __rowSpan__: 1,
            __rowIndex__: hobbyIndex,
            isNameRow: hobbyIndex === 0
          });
        });
      });
      this.expandedArr = expanded;
      console.log('🚀 ~ expandData ~ this.expandedArr:', this.expandedArr)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // Only apply to the "name" column
        let span = 1;
        let nextRow = rowIndex + 1;

        // Check if the next row has the same name and is not already marked for merging
        while (nextRow < this.expandedArr.length && this.expandedArr[nextRow].name === row.name && !this.expandedArr[nextRow].isNameRow) {
          span++;
          nextRow++;
        }

        // Set the rowspan for the current row
        this.$set(row, '__rowSpan__', span);

        // Mark the next rows as not to be rendered
        for (let i = 0; i < span - 1; i++) {
          this.$set(this.expandedArr[rowIndex + i + 1], '__rowSpan__', 0);
        }

        return {
          rowspan: span,
          colspan: 1
        };
      }
    },


    // 将原始数据展平
    flattenData() {
      this.flattenedData = this.arr.reduce((acc, item) => {
        const { name, hobby } = item;
        hobby.forEach(h => {
          acc.push({ name, hobbyName: h.hobbyName });
        });
        return acc;
      }, []);
    },
    // 合并单元格
    mergeCell({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) { // 只处理name列的合并
        const previousRow = rowIndex > 0 ? this.flattenedData[rowIndex - 1] : null;
        const nextRow = rowIndex < this.flattenedData.length - 1 ? this.flattenedData[rowIndex + 1] : null;

        if (previousRow && row.name === previousRow.name) {
          return [0, 0]; // 如果是重复的name, 不显示
        }
        if (nextRow && row.name === nextRow.name) {
          const count = this.flattenedData.slice(rowIndex).filter(r => r.name === row.name).length;
          return [count, 1]; // 返回合并的行数
        }
      }
    },

    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    getChecked(data) {
      console.log(this.$refs.aaa.getChecked(), 'data')
    },
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex === 0) { // Only apply to the "name" column
      //   const startIndex = this.findIndex(rowIndex, columnIndex);
      //   const endIndex = this.findLastIndex(rowIndex, columnIndex);

      //   if (startIndex === -1 || endIndex === -1) return {};

      //   return {
      //     rowspan: endIndex - startIndex + 1,
      //     colspan: 1
      //   };
      // }
      // return {};
      const spanCols = ['sex', 'name'];

      if (spanCols.includes(column.property)) {
        const prevRows = this.flattenedData.slice(0, rowIndex);
        const prevRowCount = prevRows.filter(r => r[column.property] === row[column.property]).length;
        if (prevRowCount === 0) {
          const rowspan = this.flattenedData.filter(r => r[column.property] === row[column.property]).length;
          return { rowspan, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }
    },
    findIndex(rowIndex, columnIndex) {
      for (let i = rowIndex; i >= 0; i--) {
        if (this.arr[i].name !== this.arr[rowIndex].name) {
          return i + 1;
        }
      }
      return 0;
    },
    findLastIndex(rowIndex, columnIndex) {
      for (let i = rowIndex; i < this.arr.length; i++) {
        if (this.arr[i].name !== this.arr[rowIndex].name) {
          return i - 1;
        }
      }
      return rowIndex;
    }
  },
};
</script>

<style scoped>
</style>