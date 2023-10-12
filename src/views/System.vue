<template>
  <div>
    <div class="row" style="font-size: 13px;padding-top: 7px;padding-bottom: 7px;">
      <el-row :gutter="20">
        <el-col :span="3">
          <span style="margin-left: 10px">数量/件：</span>
          <el-input
                  placeholder="请输入"
                  v-model="count"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
         <el-col :span="3">
          <span style="margin-left: 10px">单价/元：</span>
          <el-input
                  placeholder="请输入"
                  v-model="price"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
         <el-col :span="3">
          <span style="margin-left: 10px">合同号：</span>
          <el-input
                  placeholder="请输入"
                  v-model="contractNo"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
         <el-col :span="3">
          <span style="margin-left: 10px">合同总金额：</span>
          <el-input
                  placeholder="请输入"
                  v-model="contractPrice"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
         <el-col :span="3">
          <span style="margin-left: 10px">合同定金/元：</span>
          <el-input
                  placeholder="请输入"
                  v-model="contractDeposit"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
         <el-col :span="3">
          <span style="margin-left: 10px">计划出货日期：</span>
          <el-input
                  placeholder="请输入"
                  v-model="plannedShippingDate"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
         <el-col :span="3">
          <span style="margin-left: 10px">计划出货数量/件：</span>
          <el-input
                  placeholder="请输入"
                  v-model="plannedShipmentQuantity"
                  clearable 
                  style="width: 120px"
                  size="small">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tag type="success">正常结单</el-tag>
      <el-tag type="info">未结单</el-tag>
      <el-tag type="warning">异常结单</el-tag>
      <el-tag type="danger">废弃</el-tag>
    </div>
        <el-table
             :data="tableData"
              border
              ref="tableRef"
              highlight-current-row
              @cell-click="cellClick"
  >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="team" label="下单人/团队"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
        <el-table-column prop="sku" label="sku"></el-table-column>
        <el-table-column prop="product" label="产品名称"></el-table-column>
        <el-table-column prop="supplier" label="供应商"></el-table-column>
        <!-- <el-table-column prop="count" label="数量/件"></el-table-column>
        <el-table-column prop="price" label="单价/元"></el-table-column>
        <el-table-column prop="contractNo" label="合同号"></el-table-column>
        <el-table-column prop="contractPrice" label="合同总金额"></el-table-column>
        <el-table-column prop="contractDeposit" label="合同定金/元"></el-table-column>
        <el-table-column prop="plannedShippingDate" label="计划出货日期"></el-table-column>
        <el-table-column prop="plannedShipmentQuantity" label="计划出货数量/件"></el-table-column> -->
        <el-table-column prop="actualShipmentQuantity" label="实际出货数量/件"></el-table-column>
        <el-table-column prop="unshippedQuantity" label="未出货数量/件"></el-table-column>
        <el-table-column prop="spotQuantity" label="现货数量/件"></el-table-column>
        <el-table-column prop="spotStatus" label="现货状态"></el-table-column>
        <el-table-column prop="balancePaid" label="已付尾款/元"></el-table-column>
        <el-table-column prop="totalAmountPaid" label="已付总金额/元"></el-table-column>
        <el-table-column prop="unpaidAmount" label="未付金额/元"></el-table-column>
        <el-table-column prop="static" label="状态">
            <template slot-scope="scope">
                <el-tag type="success">{{scope.row.static}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="remarks" label="状态备注"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="warning" size="medium" @click.stop="editSupplier(scope.row)">编辑</el-button>
                <el-button type="danger" size="medium" @click.stop="deleteSupplier(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="sizes,prev,pager,next,jumper,->,total"
                   :total="total"
                   :page-sizes="[20,50,100]"
                   :current-page.sync="currentPage"
                   background
                   style="background-color: #f4f4f5"
  ></el-pagination>
  </div>
</template>
																		
<script>
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      tableData: [
        {
          team: '张三',
          orderTime: 'now',
          static: '正常结单'
        }
      ],
      plannedShipmentQuantity: '',
      plannedShippingDate: '',
      contractDeposit: '',
      contractPrice: '',
      contractNo: '',
      count: '',
      price: ''
    }
  },
  methods: {
      cellClick(row, column, cell, event) {
         console.log(row, column, cell, event);
      }
  }
}
</script>

<style>
  .el-col-3 {
    width: 13.5%;
  }
</style>