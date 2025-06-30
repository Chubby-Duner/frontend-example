<template>
  <div>
    <div class="data-input-row">
      <div class="standard-input-row" style="display: inline-block;">
        <div class="standard-title">
          <span>文本示例 （可选）</span>
          <el-tooltip
            class="commissionTips"
            effect="dark"
            content="向买家显示的文本示例"
            placement="right"
          >
            <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
          </el-tooltip>
        </div>
        <div>
          <el-input
            style="width: 250px;"
            type="text"
            placeholder="文本示例"
            v-model="currentDesignData.childrenData.placeholder"
            maxlength="30"
            show-word-limit
            size="small"
          ></el-input>
        </div>
      </div>
      <div class="standard-input-row" style="display: inline-block;margin-left: 20px">
        <div class="standard-title">
          <span>允许的字符</span>
          <span>*</span>
          <el-tooltip
            class="commissionTips"
            effect="dark"
            content="用于评估买家输入或将买家输入限制在特定字符范围内的一组规则"
            placement="right"
          >
            <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
          </el-tooltip>
        </div>
        <div>
          <el-select v-model="currentDesignData.childrenData.regexChoice" size="small" placeholder="请选择">
            <el-option
              v-for="item in allowCharacterList"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="standard-input-row" style="display: inline-block;margin-left: 20px">
        <div class="standard-title">
          <span>字符数限制</span>
          <span>*</span>
          <el-tooltip
            class="commissionTips"
            effect="dark"
            content="允许买家输入文本的字符数限制"
            placement="right"
          >
            <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
          </el-tooltip>
        </div>
        <div>
          <div style="display: inline-block;text-align: center;">
            <el-input
              type="number"
              placeholder=""
              style="width: 100px;"
              size="small"
              min="1"
              v-model="currentDesignData.childrenData.minLength"
            ></el-input>
            <div>最小值</div>
          </div>
          <div style="display: inline-block;text-align: center;margin-left: 10px;">
            <el-input
              type="number"
              placeholder=""
              style="width: 100px;"
              size="small"
              max="1000"
              v-model="currentDesignData.childrenData.maxLength"
            ></el-input>
            <div>最大值</div>
          </div>
        </div>
      </div>
      <div class="standard-input-row" style="display: inline-block;margin-left: 20px">
        <div class="standard-title">
          <span>允许的文本行数</span>
          <span>*</span>
          <el-tooltip
            class="commissionTips"
            effect="dark"
            content="买家可以输入的文本行数"
            placement="right"
          >
            <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
          </el-tooltip>
        </div>
        <div>
          <el-select v-model="currentDesignData.childrenData.maxLines" size="small" placeholder="请选择">
            <el-option
              v-for="item in allowLineList"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="standard-input-row">
      <div class="standard-title">
        <span>价格差异（如有） （可选）</span>
      </div>
      <div>
        <el-input style="width: 250px;" placeholder="" v-model="currentDesignData.priceDelta.amount" size="small">
          <template slot="prepend">€ +</template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DataDesignComponent',
  props: {
    designData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      currentDesignData: this.designData,
      allowCharacterList: [], // 允许的字符
      allowLineList: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 }
      ], // 允许的行数
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.standard-input-row {
  margin-bottom: 10px;
}

.standard-title {
  margin-bottom: 5px;
  font-size: 14px;
  color: #002f36;
}

.data-input-row {
  display: flex;
}
</style>