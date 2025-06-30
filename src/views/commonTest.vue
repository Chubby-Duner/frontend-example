<template>
  <div class="ad-settings">
    <el-form label-width="100px" :inline="false" :model="form" class="ad-form">
      <!-- 广告类型选择 -->
      <el-form-item label="广告类型：">
        <el-checkbox-group v-model="form.adTypes">
          <el-checkbox label="自动广告" />
          <el-checkbox label="手动广告-关键词" />
          <el-checkbox label="手动广告-定位ASIN" />
        </el-checkbox-group>
      </el-form-item>

      <!-- 广告方式选择 -->
      <el-form-item>
        <el-button-group>
          <el-button type="primary" plain>自动广告</el-button>
          <el-button plain>手动广告-关键词</el-button>
          <el-button plain>手动广告-定位ASIN</el-button>
        </el-button-group>
      </el-form-item>

      <!-- 预算金额 -->
      <el-form-item label="预算金额：">
        <el-input v-model="form.budget" placeholder="请输入" style="width: 200px" />
      </el-form-item>

      <!-- 匹配类型 -->
      <el-form-item label="匹配类型：">
        <el-checkbox v-model="form.match.tight">紧密</el-checkbox>
        <el-checkbox v-model="form.match.broad">宽泛</el-checkbox>
      </el-form-item>

      <!-- 竞价限制 -->
      <el-form-item label="竞价限制：">
        <el-checkbox v-model="form.limit.default">默认</el-checkbox>
        <el-checkbox v-model="form.limit.tight">紧密</el-checkbox>
        <el-checkbox v-model="form.limit.broad">宽泛</el-checkbox>
      </el-form-item>

      <!-- 竞价设置 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="默认竞价：">
            <el-input placeholder="开始价" v-model="form.defaultBid.start" style="width: 80px" />
            <el-input placeholder="最大" v-model="form.defaultBid.max" style="width: 80px; margin-left: 10px" />
            <el-input placeholder="最小" v-model="form.defaultBid.min" style="width: 80px; margin-left: 10px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧密竞价：">
            <el-input placeholder="开始价" v-model="form.tightBid.start" style="width: 80px" />
            <el-input placeholder="最大" v-model="form.tightBid.max" style="width: 80px; margin-left: 10px" />
            <el-input placeholder="最小" v-model="form.tightBid.min" style="width: 80px; margin-left: 10px" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 产品限制 -->
      <el-form-item label="产品限制：">
        <el-select v-model="form.productLimit.op" placeholder="选择">
          <el-option label="大于" value=">" />
          <el-option label="小于" value="<" />
        </el-select>
        <el-input v-model="form.productLimit.value" placeholder="单价" style="width: 100px; margin-left: 10px" />
      </el-form-item>

      <!-- 变化类型 -->
      <el-form-item label="变化类型：">
        <el-checkbox v-model="form.changeType.start">开始竞价</el-checkbox>
        <el-checkbox v-model="form.changeType.max">最大竞价</el-checkbox>
      </el-form-item>

      <!-- 分隔线 -->
      <el-divider><strong>竞价规则</strong></el-divider>

      <!-- ACOS规则 -->
      <el-form-item label="ACOS规则：">
        <el-select v-model="form.rules.acos.type" placeholder="ACOS范围" style="width: 120px">
          <el-option label="ACOS范围" value="range" />
        </el-select>
        <el-input v-model="form.rules.acos.min" placeholder="大于等于" style="width: 80px; margin-left: 10px" />
        <el-input v-model="form.rules.acos.max" placeholder="小于" style="width: 80px; margin-left: 10px" />
        <el-select v-model="form.rules.acos.period" placeholder="计算周期" style="width: 100px; margin-left: 10px">
          <el-option label="1" value="1" />
          <el-option label="7" value="7" />
        </el-select>
      </el-form-item>

      <!-- CTR规则 -->
      <el-form-item label="CTR规则：">
        <el-select v-model="form.rules.ctr.type" placeholder="CTR范围" style="width: 120px">
          <el-option label="CTR范围" value="range" />
        </el-select>
        <el-input v-model="form.rules.ctr.min" placeholder="大于等于" style="width: 80px; margin-left: 10px" />
        <el-input v-model="form.rules.ctr.max" placeholder="小于" style="width: 80px; margin-left: 10px" />
        <el-select v-model="form.rules.ctr.period" placeholder="计算周期" style="width: 100px; margin-left: 10px">
          <el-option label="1" value="1" />
          <el-option label="7" value="7" />
        </el-select>
      </el-form-item>

      <!-- 点击量规则 -->
      <el-form-item label="点击量规则：">
        <el-select v-model="form.rules.click.type" placeholder="点击量范围" style="width: 120px">
          <el-option label="点击量范围" value="range" />
        </el-select>
        <el-input v-model="form.rules.click.min" placeholder="大于等于" style="width: 80px; margin-left: 10px" />
        <el-input v-model="form.rules.click.max" placeholder="小于" style="width: 80px; margin-left: 10px" />
        <el-select v-model="form.rules.click.period" placeholder="计算周期" style="width: 100px; margin-left: 10px">
          <el-option label="1" value="1" />
          <el-option label="7" value="7" />
        </el-select>
      </el-form-item>

      <!-- 期望点击量、连续天数 -->
      <el-form-item label="期望点击量：">
        <el-select v-model="form.rules.expectClick.op" placeholder="等于" style="width: 100px" />
        <el-input v-model="form.rules.expectClick.value" placeholder="值" style="width: 100px; margin-left: 10px" />
        <el-input v-model="form.rules.expectClick.days" placeholder="符合条件天数" style="width: 150px; margin-left: 10px" />
      </el-form-item>

      <!-- 销售额 -->
      <el-form-item label="销售额：">
        <el-select v-model="form.rules.sales.op" placeholder="等于" style="width: 100px" />
        <el-input v-model="form.rules.sales.value" placeholder="金额" style="width: 100px; margin-left: 10px" />
        <el-select v-model="form.rules.sales.period" placeholder="计算周期" style="width: 100px; margin-left: 10px">
          <el-option label="1" value="1" />
          <el-option label="7" value="7" />
        </el-select>
      </el-form-item>

      <!-- 费用规则 -->
      <el-form-item label="费用规则：">
        <el-select v-model="form.rules.cost.type" placeholder="广告花费范围" style="width: 140px" />
        <el-input v-model="form.rules.cost.min" placeholder="大于等于" style="width: 100px; margin-left: 10px" />
        <el-input v-model="form.rules.cost.max" placeholder="小于" style="width: 100px; margin-left: 10px" />
      </el-form-item>

      <!-- 最终竞价行为 -->
      <el-divider><strong>竞价行为</strong></el-divider>
      <el-form-item label="竞价：">
        <el-checkbox v-model="form.bidAction.default">默认</el-checkbox>
        <el-checkbox v-model="form.bidAction.tight">紧密</el-checkbox>
        <el-checkbox v-model="form.bidAction.broad">宽泛</el-checkbox>
      </el-form-item>

      <el-form-item label="默认：">
        <el-select v-model="form.bidAction.actionType" placeholder="上调/下调" style="width: 100px">
          <el-option label="上调" value="increase" />
          <el-option label="下调" value="decrease" />
        </el-select>
        <el-select v-model="form.bidAction.method" placeholder="固定/百分比" style="width: 100px; margin-left: 10px">
          <el-option label="固定" value="fixed" />
          <el-option label="百分比" value="percent" />
        </el-select>
        <el-input v-model="form.bidAction.amount" placeholder="竞价金额" style="width: 100px; margin-left: 10px" />
      </el-form-item>

      <!-- 匹配类型下拉 -->
      <el-form-item label="过滤匹配类型：">
        <el-select v-model="form.matchFilter" placeholder="选择" style="width: 150px" />
      </el-form-item>

      <!-- 单价变化规则 -->
      <el-form-item label="产品单价变化：">
        <el-select v-model="form.unitPrice.op" placeholder="大于/小于" style="width: 100px" />
        <el-input v-model="form.unitPrice.value" placeholder="金额" style="width: 100px; margin-left: 10px" />
      </el-form-item>

      <el-form-item label="竞价金额变化：">
        <el-input v-model="form.bidChangeValue" placeholder="变化值" style="width: 150px" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        adTypes: [],
        budget: '',
        match: { tight: false, broad: false },
        limit: { default: true, tight: false, broad: false },
        defaultBid: { start: '', max: '', min: '' },
        tightBid: { start: '', max: '', min: '' },
        productLimit: { op: '', value: '' },
        changeType: { start: true, max: false },
        rules: {
          acos: { type: '', min: '', max: '', period: '' },
          ctr: { type: '', min: '', max: '', period: '' },
          click: { type: '', min: '', max: '', period: '' },
          expectClick: { op: '', value: '', days: '' },
          sales: { op: '', value: '', period: '' },
          cost: { type: '', min: '', max: '' }
        },
        bidAction: {
          default: true,
          tight: false,
          broad: false,
          actionType: '',
          method: '',
          amount: ''
        },
        matchFilter: '',
        unitPrice: { op: '', value: '' },
        bidChangeValue: ''
      }
    };
  }
};
</script>

<style scoped>
.ad-settings {
  padding: 20px;
  background-color: #fff;
}
.ad-form .el-form-item {
  margin-bottom: 20px;
}
</style>
