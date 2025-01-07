<template>
  <div>
    <!-- 子规格勾选区域 -->
    <div v-for="spec in specInformation" :key="spec.parentSpecId" class="parent-spec">
      <!-- <h3>{{ spec.parentSpecName }}</h3> -->
      <el-select
        v-model="spec.parentSpecId"
        size="small"
        class="input-field"
        style="width: 200px"
        @change="(parentSpecId) => handleParentSpecChange(parentSpecId, spec)"
      >
        <el-option
          v-for="item in parentSpecList"
          :key="item.parentSpecId"
          :value="item.parentSpecId"
          :label="item.parentSpecName"
        />
      </el-select>
      <el-checkbox-group
        v-model="spec.specIds"
        @change="updateTableData"
      >
        <el-checkbox
          v-for="option in spec.sonSpecList"
          :key="option.specId"
          :label="option.specId"
        >
          {{ option.specName }}
        </el-checkbox>
      </el-checkbox-group>
      <!-- 添加子规格 -->
      <div class="add-sub-spec">
        <el-input
          v-model="spec.specInputValue"
          placeholder="新增子规格值"
          @keyup.enter.native="addSubSpec(spec.parentSpecId)"
        />
        <el-button
          type="primary"
          size="mini"
          @click="addSubSpec(spec.parentSpecId)"
        >
          添加子规格
        </el-button>
      </div>
    </div>

    <!-- 表格展示 -->
    <!-- <el-table :data="itemInfos" border>
      <el-table-column
        v-for="spec in selectedSpecInformation"
        :key="spec.parentSpecId"
        :prop="spec.parentSpecId"
        :label="spec.parentSpecName"
      >
        <template slot-scope="scope">
          {{ getSpecName(scope.row.itemInfo.parentSpec, spec) }}
        </template>
      </el-table-column>
      <el-table-column label="country">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.country"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column label="SKU">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.productSku"
            size="small"
            :class="{ 'is-error': scope.row.errors && scope.row.errors.sku }"
            @blur="validateField(scope.row, 'sku')"
          />
          <div v-if="scope.row.errors && scope.row.errors.sku" class="error-text">
            {{ scope.row.errors.sku }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="尺寸">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.specificationsInfo.length"
            size="small"
            placeholder="长度"
            :class="{ 'is-error': scope.row.errors && scope.row.errors.length }"
            @blur="validateDimensions(scope.row, 'length')"
          />
          <el-input
            v-model="scope.row.specificationsInfo.width"
            size="small"
            placeholder="宽度"
            :class="{ 'is-error': scope.row.errors && scope.row.errors.width }"
            @blur="validateDimensions(scope.row, 'width')"
          />
          <el-input
            v-model="scope.row.specificationsInfo.height"
            size="small"
            placeholder="高度"
            :class="{ 'is-error': scope.row.errors && scope.row.errors.height }"
            @blur="validateDimensions(scope.row, 'height')"
          />
          <div v-if="scope.row.errors && scope.row.errors.dimensions" class="error-text">
            {{ scope.row.errors.dimensions }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.price"
            size="small"
            :class="{ 'is-error': scope.row.errors && scope.row.errors.price }"
            @blur="validateField(scope.row, 'price')"
          />
          <div v-if="scope.row.errors && scope.row.errors.price" class="error-text">
            {{ scope.row.errors.price }}
          </div>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <el-select
      v-model="warehouseIds"
      size="small"
      class="input-field inline-block"
      placeholder="仓库"
      multiple
      collapse-tags
      @change="updateTableData"
    >
      <el-option
        v-for="item in warehouseList"
        :key="item.refWarehouseId"
        :value="item.refWarehouseId"
        :label="item.warehosueName"
      />
    </el-select>
 -->
    <el-table :data="itemInfos" border>
      <el-table-column
        v-for="spec in selectedSpecInformation"
        :key="spec.parentSpecId"
        :prop="spec.parentSpecId"
        :label="spec.parentSpecName"
      >
        <template slot-scope="scope">
          {{ getSpecName(scope.row.itemInfo.parentSpec, spec) }}
        </template>
      </el-table-column>

      <el-table-column
        v-for="warehouse in warehouseIds"
        :key="warehouse"
        :label="getWarehouseName(warehouse)"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.itemInfo.inventoryList.find(stock => stock.warehouseId === warehouse).targetStockAvailable"
            size="small"
            style="width: 120px"
          />
        </template>
      </el-table-column>
      <el-table-column label="SKU MultiPack">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.itemInfo.skuMultiPack.skuClassification"
            size="small"
            style="width: 120px"
          />
          <el-input
            v-model="scope.row.itemInfo.skuMultiPack.numberOfPieces"
            size="small"
            style="width: 120px"
          />
          <el-input
            v-model="scope.row.itemInfo.skuMultiPack.pieceUnitCode"
            size="small"
            style="width: 120px"
          />
        </template>
      </el-table-column>
    </el-table>

    

    <el-button @click="save">保存</el-button>


    <!-- <div>
      <el-checkbox-group v-model="selectedSpecs">
        <el-checkbox
          v-for="(spec, index) in specList"
          :key="index"
          :label="spec.specId"
          :style="{ maxWidth: '150px', display: 'inline-block', marginRight: '10px' }"
        >
          {{ spec.specName }}
        </el-checkbox>
      </el-checkbox-group>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSpecs: [],
      specList: [
        { specId: 'spec1', specName: 'White' },
        { specId: 'spec2', specName: 'Red' },
        { specId: 'spec3', specName: 'Blue' },
        { specId: 'spec4', specName: 'Green' },
        { specId: 'spec5', specName: 'Black' },
        { specId: 'spec6', specName: 'Yellow' },
      ],
      defaultSpecInformation: [
        {
          parentSpecId: '',
          parentSpecName: '',
          specInputValue: '', // 用于新增子规格的输入值
          specIds: [], // 已选子规格
          sonSpecList: [],
        },
        {
          parentSpecId: '',
          parentSpecName: '',
          specInputValue: '', // 用于新增子规格的输入值
          specIds: [], // 已选子规格
          sonSpecList: [],
        },
      ],
      
      productObj: {
        productInfos: [
          {
            name: 'aaa',
            itemInfos: [
              {
                specificationsInfo: {
                  length: 0.1,
                  width: 0.1,
                  height: 0.1,
                },
                errors: {}, // 用于存储每一行的错误信息
                country: 'CN',
                productSku: 'test#red',
                price: 300,
                itemInfo: {
                  parentSpec: [
                    { parentSpecId: '45114199', parentSpecName: '型号', specId: 'a1', specName: 'a1-name' },
                    // { parentSpecId: '45114199', parentSpecName: '型号', specId: 'a2', specName: 'a2-name' },
                    // { parentSpecId: '18012', parentSpecName: '风格', specId: 'b1', specName: 'b1-name' }
                  ],
                  inventoryList: [
                    {
                        "warehouseId": "WH-00362750034072135",
                        "targetStockAvailable": 64
                    }
                  ],
                  skuMultiPack: {
                    skuClassification: 1,
                    numberOfPieces: 1,
                    pieceUnitCode: 1
                  },
                },
              },
              {
                specificationsInfo: {
                  length: 0.1,
                  width: 0.1,
                  height: 0.1,
                },
                errors: {}, // 用于存储每一行的错误信息
                country: 'US',
                productSku: 'test#white',
                price: 400,
                itemInfo: {
                  parentSpec: [
                    { parentSpecId: '45114199', parentSpecName: '型号', specId: 'a2', specName: 'a2-name' },
                    // { parentSpecId: '18012', parentSpecName: '风格', specId: 'b1', specName: 'b1-name' }
                  ],
                  inventoryList: [
                    {
                        "warehouseId": "WH-00362750034072135",
                        "targetStockAvailable": 63
                    }
                  ],
                  skuMultiPack: {
                    skuClassification: 3,
                    numberOfPieces: 3,
                    pieceUnitCode: 3
                  },
                },
              },
            ],
          },
        ],
      },
      specInformation: [],
      warehouseIds: [],
      warehouseList: [
        { warehosueName: '仓库1', refWarehouseId: 'WH-00362750034072135' },
        { warehosueName: '仓库3', refWarehouseId: 'warehouse3' }
      ],
      parentSpecList: [
          {
            parentSpecName: "颜色",
            parentSpecId: "1001",
            type: "COLOR"
          },
          {
            parentSpecName: "尺码",
            parentSpecId: "3001",
            type: "SIZE"
          },
          {
            parentSpecName: "风格",
            parentSpecId: "18012",
            type: "STYLE"
          },
          {
            parentSpecName: "材质",
            parentSpecId: "17017",
            type: "MATERIAL"
          },
          {
            parentSpecName: "口味",
            parentSpecId: "18013",
            type: "TASTE"
          },
          {
            parentSpecName: "适用人群",
            parentSpecId: "17018",
            type: "FOR_THE_CROWD"
          },
          {
            parentSpecName: "容量",
            parentSpecId: "18014",
            type: "CAPACITY"
          },
          {
            parentSpecName: "成分",
            parentSpecId: "17019",
            type: "COMPONENT"
          },
          {
            parentSpecName: "重量",
            parentSpecId: "18016",
            type: "WEIGHT"
          },
          {
            parentSpecName: "品类",
            parentSpecId: "17020",
            type: "CATEGORY"
          },
          {
            parentSpecName: "数量",
            parentSpecId: "15998553",
            type: "NUMBER"
          },
          {
            parentSpecName: "型号",
            parentSpecId: "45114199",
            type: "MODEL"
          },
          {
            parentSpecName: "头发长度",
            parentSpecId: "44214483",
            type: "HAIR_LENGTH"
          },
          {
            parentSpecName: "被套尺码",
            parentSpecId: "50546518",
            type: "SIZE_OF_DUVET_COVER"
          }
      ],
      categoryAttributes: [
        {
          valueInOption: false,
          valueMultiple: true,
          showAdditionalAttribute: false,
          selectedValueOptions: ['aa', 'bb']
        },
        {
          valueInOption: false,
          valueMultiple: false,
          showAdditionalAttribute: false,
          selectedValueOptions: ''
        },
        {
          valueInOption: true,
          valueMultiple: false,
          showAdditionalAttribute: false,
          valueOptions: [{ id: 'cc', name: 'CC' }],
          selectedValueOptions: ['cc']
        },
        {
          valueInOption: true,
          valueMultiple: true,
          showAdditionalAttribute: false,
          valueOptions: [{ id: 'dd', name: 'DD' }],
          selectedValueOptions: ['dd']
        },
        {
          valueInOption: true,
          valueMultiple: true,
          showAdditionalAttribute: true,
          valueOptions: [{ id: 'ee', name: 'EE', isInAttribute: true, attributeViewList: [] }],
          selectedValueOptions: ['ee']
        }
      ],
      existingSpecIds: [],
      previousItemInfos: []
    };
  },
  computed: {
    itemInfos() {
      return this.productObj.productInfos[0].itemInfos;
    },
    selectedSpecInformation() {
      return this.specInformation.filter(spec => spec.specIds.length > 0);
    },
  },
  methods: {
    updateSpecInformation() {
      const parentSpecIds = new Set();
      const parentSpecMap = {};

      if (this.productObj.productInfos && this.productObj.productInfos[0]) {
        this.productObj.productInfos.forEach(productInfo => {
          productInfo.itemInfos.forEach(itemInfo => {
            itemInfo.itemInfo.parentSpec.forEach(spec => {
              parentSpecIds.add(spec.parentSpecId);
              if (!parentSpecMap[spec.parentSpecId]) {
                parentSpecMap[spec.parentSpecId] = {
                  parentSpecId: spec.parentSpecId,
                  parentSpecName: spec.parentSpecName,
                  specInputValue: '',
                  specIds: [],
                  sonSpecList: []
                };
              }
              if (!parentSpecMap[spec.parentSpecId].specIds.includes(spec.specId)) {
                parentSpecMap[spec.parentSpecId].specIds.push(spec.specId);
              }
              if (!parentSpecMap[spec.parentSpecId].sonSpecList.find(s => s.specId === spec.specId)) {
                parentSpecMap[spec.parentSpecId].sonSpecList.push({
                  specId: spec.specId,
                  specName: spec.specName
                });
              }
            });
          });
        });
      }

      // 将 map 转换为数组
      const specInformation = Array.from(parentSpecIds).map(id => parentSpecMap[id]);



      if (specInformation.length === 1) {
        // 找出除了已有的父规格
        const excludeExitParentSpec = this.parentSpecList.filter(item => item.parentSpecId !== specInformation[0].parentSpecId)
        const firstParentSpec = excludeExitParentSpec[0]

        // 默认值选择除了已有的父规格第一个
        const cloneDefaultSpec = JSON.parse(JSON.stringify(this.defaultSpecInformation[0]))
        cloneDefaultSpec.parentSpecId = firstParentSpec.parentSpecId
        cloneDefaultSpec.parentSpecName = firstParentSpec.parentSpecName
        cloneDefaultSpec.renderHtml = 'checkboxGroup'
        cloneDefaultSpec.isAllowAddSpec = true

        const newParentSpecItem = cloneDefaultSpec
        specInformation.push(newParentSpecItem)
      }

      // 将新属性添加到 productInfos 下
      this.specInformation = specInformation; // 更新 data 中的 specInformation
      console.log("🚀 ~ updateSpecInformation ~ this.specInformation:", this.specInformation);
      // this.updateTableData();
    },
    updateTableData() {
  // 创建一个映射来存储历史数据，使用父规格名称+子规格ID组合作为键
  const historyMap = new Map();
  
  // 如果有历史数据，填充映射
  this.productObj.productInfos[0].itemInfos.forEach(item => {
    const key = item.itemInfo.parentSpec.map(ps => `${ps.parentSpecName}-${ps.specId}`).sort().join('-');
    historyMap.set(key, { ...item }); // 深拷贝以防修改原始数据
  });

  console.log("🚀 ~ updateTableData ~ historyMap:", historyMap);

  const specSelections = this.selectedSpecInformation.map((spec) => spec.specIds);
  console.log("🚀 ~ updateTableData ~ specSelections:", specSelections);

  if (specSelections.length === 0) {
    this.productObj.productInfos[0].itemInfos = [];
    return;
  }

  const cartesianProduct = (arr) =>
    arr.reduce(
      (acc, curr) =>
        acc
          .map((x) => curr.map((y) => [...x, y]))
          .reduce((a, b) => a.concat(b), []),
      [[]]
    );

  const combinations = cartesianProduct(specSelections);
  console.log("🚀 ~ updateTableData ~ combinations:", combinations);
  console.log("🚀 ~ updateTableData ~ this.selectedSpecInformation:", this.selectedSpecInformation);

  // 初始化 itemInfos 为空数组，准备重新生成
  this.productObj.productInfos[0].itemInfos = [];

  // 根据规格组合生成表格数据
  combinations.forEach((combination) => {
    // 使用父规格名称+子规格ID组合作为唯一键
    const key = combination.map((value, i) => 
      `${this.selectedSpecInformation[i].parentSpecName}-${value}`
    ).sort().join('-');

    // 查找与新组合相匹配的历史数据
    let existingRow = null;
    if (combination.length > 0) {
      // 尝试找到部分匹配的历史数据
      for (let i = 1; i <= combination.length; i++) {
        const partialKey = combination.slice(0, i).map((value, j) => 
          `${this.selectedSpecInformation[j].parentSpecName}-${value}`
        ).sort().join('-');
        existingRow = historyMap.get(partialKey);
        if (existingRow) break;
      }
    }
    console.log("🚀 ~ combinations.forEach ~ existingRow:", existingRow);

    // 初始化新行或复制历史数据
    const newRow = existingRow
      ? { ...existingRow } // 如果有原始数据，使用原有的 SKU 和其他信息
      : { 
          specificationsInfo: { length: 0.1, width: 0.1, height: 0.1 },
          errors: {}, // 用于存储每一行的错误信息
          country: '', 
          productSku: '', 
          price: null, 
          itemInfo: { 
            parentSpec: [], 
            inventoryList: [
              {
                "warehouseId": null,
                "targetStockAvailable": null
              }
            ], 
            skuMultiPack: {
              skuClassification: 0,
              numberOfPieces: 0,
              pieceUnitCode: 0
            } 
          } 
        }; // 否则初始化空值

    // 更新或设置 parentSpec 和库存信息
    if (newRow.itemInfo) {
      newRow.itemInfo.parentSpec = combination.map((value, i) => ({
        parentSpecId: this.selectedSpecInformation[i].parentSpecId,
        parentSpecName: this.selectedSpecInformation[i].parentSpecName,
        specId: value,
        specName: this.getSpecNameById(value, this.selectedSpecInformation[i]),
      }));

      // 初始化库存信息，同时保留已有仓库的库存数据
      newRow.itemInfo.inventoryList = this.warehouseIds.map(warehouse => {
        const existingStock = newRow.itemInfo.inventoryList.find(stock => stock.warehouseId === warehouse);
        return {
          warehouseId: warehouse,
          targetStockAvailable: existingStock ? existingStock.targetStockAvailable : null
        };
      });

      // 清除不再选择的仓库
      newRow.itemInfo.inventoryList = newRow.itemInfo.inventoryList.filter(stock => this.warehouseIds.includes(stock.warehouseId));
    }

    // 添加到 itemInfos 中
    this.productObj.productInfos[0].itemInfos.push(newRow);
  });
  console.log("🚀 ~ combinations.forEach ~ this.productObj.productInfos[0].itemInfos:", this.productObj.productInfos[0].itemInfos);

  // 删除无效的行（即那些没有完全匹配所有选定规格的行）
  this.productObj.productInfos[0].itemInfos = this.productObj.productInfos[0].itemInfos.filter(row => {
    return row.itemInfo.parentSpec.length === this.selectedSpecInformation.length;
  });
}



,

    addSubSpec(parentSpecId) {
      console.log("🚀 ~ addSubSpec ~ parentSpecId:", parentSpecId);
      const parentSpec = this.specInformation.find((spec) => spec.parentSpecId === parentSpecId);
      const newValue = parentSpec.specInputValue.trim();

      if (!newValue) {
        this.$message.error('子规格值不能为空！');
        return;
      }

      parentSpec.sonSpecList.push({ specId: newValue, specName: newValue });
      parentSpec.specIds.push(newValue);
      parentSpec.specInputValue = ''; // 清空输入框
      this.updateTableData();
    },

    handleParentSpecChange(parentSpecId, spec) {
       // 找到新选中的父规格
      const newParentSpec = this.parentSpecList.find(item => item.parentSpecId === spec.parentSpecId);
      if (!newParentSpec) {
        this.$message.error('无法找到选中的父规格！');
        return;
      }

      // 更新父规格的名称
      spec.parentSpecName = newParentSpec.parentSpecName;

      // 如果子规格列表为空，则初始化子规格列表
      // if (!spec.sonSpecList.length) {
      //   spec.sonSpecList = [
      //     { specId: '默认值1', specName: '默认子规格1' },
      //     { specId: '默认值2', specName: '默认子规格2' }
      //   ];
      // }

      // 保留已选的子规格数据
      this.updateTableData(); // 更新表格数据
    },
    // 校验字段
    validateField(row, field) {
      if (field === "sku") {
        if (!row.productSku) {
          if (!row.errors) row.errors = {};
          this.$set(row.errors, "sku", "SKU 是必填项");
        } else {
          if (row.errors) this.$delete(row.errors, "sku");
        }
      }
      if (field === "price") {
        if (!row.price) {
          if (!row.errors) row.errors = {};
          this.$set(row.errors, "price", "价格是必填项");
        } else {
          if (row.errors) this.$delete(row.errors, "price");
        }
      }
    },
    // 校验尺寸字段
    validateDimensions(row, field) {
      const { length, width, height } = row.specificationsInfo;

      if (!row.errors) row.errors = {};

      // 检查当前字段
      if (!row.specificationsInfo[field] || Number(row.specificationsInfo[field]) === 0) {
        this.$set(row.errors, field, true);
      } else {
        this.$delete(row.errors, field);
      }

      // 如果任何一个尺寸没填，设置统一的错误提示
      if (!length || !width || !height || Number(length) === 0 || Number(width) === 0 || Number(height) === 0) {
        this.$set(row.errors, "dimensions", "尺寸字段不能为空或为 0");
      } else {
        this.$delete(row.errors, "dimensions");
      }
    },
    save() {
      let isValid = true;

      this.productObj.productInfos[0].itemInfos.forEach(row => {
        // 初始化错误对象
        if (!row.errors) row.errors = {};

        // SKU 校验
        if (!row.productSku) {
          row.errors.sku = "SKU 是必填项";
          isValid = false;
        }

        // 价格校验
        if (!row.price) {
          row.errors.price = "价格是必填项";
          isValid = false;
        }

        // 尺寸校验
        const { length, width, height } = row.specificationsInfo;
        if (!length || !width || !height || Number(length) === 0 || Number(width) === 0 || Number(height) === 0) {
          row.errors.dimensions = "尺寸字段不能为空或为 0";
          isValid = false;
        }
      });

      if (!isValid) {
        this.$message.error("请修正表单中的错误后再提交！");
      } else {
        this.$message.success("提交成功！");
        // console.log("提交的数据：", this.itemInfos);
        console.log('保存的规格数据：', this.productObj);
      }
    },

    getSpecName(parentSpecArray, spec) {
      const specItem = parentSpecArray.find(ps => ps.parentSpecId === spec.parentSpecId);
      const specId = specItem ? specItem.specId : '';
      return this.getSpecNameById(specId, spec);
    },

    getSpecNameById(specId, spec) {
      const specItem = spec.sonSpecList.find(item => item.specId === specId);
      return specItem ? specItem.specName : '';
    },


    extractWarehouseIds() {
      const allWarehouseIds = new Set();
      // this.productObj.productInfos.forEach(productInfo => {
      //   productInfo.itemInfos.forEach(itemInfo => {
      //     itemInfo.itemInfo.inventoryList.forEach(inventory => {
      //       allWarehouseIds.add(inventory.warehouseId);
      //     });
      //   });
      // });
      this.productObj.productInfos[0].itemInfos[0].itemInfo.inventoryList.forEach(inventory => {
        allWarehouseIds.add(inventory.warehouseId);
      });
      this.warehouseIds = Array.from(allWarehouseIds);
      console.log("🚀 ~ extractWarehouseIds ~ this.warehouseIds:", this.warehouseIds);
    },

    getWarehouseName(warehouseId) {
      const warehouse = this.warehouseList.find(w => w.refWarehouseId === warehouseId);
      return warehouse ? warehouse.warehosueName : '';
    }
  },
  created() {
    this.updateSpecInformation();
    this.extractWarehouseIds();
    this.updateTableData();
  },
};
</script>

<style>
.parent-spec {
  margin-bottom: 20px;
}
.add-sub-spec {
  margin-top: 10px;
}

.is-error .el-input__inner{
  border: 1px solid red !important;
}
.error-text {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.el-checkbox {
  flex: 1 1 150px; /* 设置最大宽度 */
  max-width: 150px; /* 最大宽度 */
}
</style>