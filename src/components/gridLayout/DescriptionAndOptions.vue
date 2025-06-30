<!-- 

  定制内容
  
    1、【下拉选项】【方向】【哑光色】【商品形状】传参几乎一样；不一样的点：下拉选项的label是填写的，方向似乎是固定的 { "default": "Orientation", "stringId": "gestalt-picture-frame-orientation-option-label-override" }

    2、【安装类型】 【颜色】 【覆盖材料】【镜架材质】一样 （与第一点不同的是，多了个主要图片（productImage）的上传）

-->
<template>
  <!-- 后面这个div的style要删掉 -->
  <!-- <div style="margin: 30px auto;width: 80%;"> -->
  <div class="child-content">
    <!-- 改为动态 图片 和 文本 的 单独写-->
    <div v-if="currentDesignData.key === 'image'">
      <h3>放置</h3>
      <div>设置此定制项在预览中的位置。</div>
      <h3>图片定制</h3>
      <div>输入图片的详细信息。</div>
    </div>
    <div v-if="currentDesignData.key === 'text'">
      <h3>文本输入</h3>
      <div>定义文本输入规格。</div>
      <h3>字体</h3>
      <div>选择可供买家选择的字体。</div>
    </div>
    <div v-if="currentDesignData.key !== 'dropdownOptions'" class="container-header-instructions">{{ currentDesignData.designTips }}</div>
    <div class="building-block-content">
      <!-- 是否设为必选项 勾选框 -->
      <div class="option-checkbox-required">
        <el-checkbox v-model="currentDesignData.isRequired">将此选项设为买家必填项</el-checkbox>
        <el-tooltip
          class="commissionTips"
          effect="dark"
          content="如果选项不是必需的，我们将自动生成一个为买家预先选择的“无”选项，让他们无需选择选项。"
          placement="right"
        >
          <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
        </el-tooltip>
      </div>
      <div class="standard-inputs-container">
        <div class="standard-input-row">
          <div class="standard-title">
            <span>标签 </span>
            <span>*</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              :content="['dropdownOptions', 'number'].includes(currentDesignData.key) ? '输入定制标签' : '向客户显示的标签。这是不可编辑。'"
              placement="right"
            >
              <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
            </el-tooltip>
          </div>
          <div>
            <!-- 下拉列表 数字输入 标签可填写 -->
            <div v-if="['dropdownOptions', 'number'].includes(currentDesignData.key)">
              <el-input
                type="text"
                placeholder="标签"
                v-model="currentDesignData.label"
                maxlength="100"
                show-word-limit
              ></el-input>
            </div>
            <div v-else class="label-text">{{ currentDesignData.label }}</div>
          </div>
        </div>
        <div class="standard-input-row">
          <div class="standard-title">
            <span>说明 (可选)</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="向买家提供说明"
              placement="right"
            >
              <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
            </el-tooltip>
          </div>
          <div v-if="currentDesignData.key === 'productSize'" class="label-text">{{ currentDesignData.label }}</div>
          <div v-else>
            <el-input
              type="textarea"
              placeholder="说明"
              v-model="currentDesignData.instructions"
              maxlength="200"
              show-word-limit
            ></el-input>
          </div>
        </div>
        <!-- 商品尺寸才有 -- 商品数量  -->
        <div v-if="currentDesignData.key === 'productSize'">
          <div class="standard-input-row">
            <div class="standard-title">
              <span>商品数量</span>
              <span>*</span>
              <el-tooltip
                class="commissionTips"
                effect="dark"
                content="用于此定义的单位"
                placement="right"
              >
                <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
              </el-tooltip>
            </div>
            <div>
              <el-select v-model="currentDesignData.unit" placeholder="请选择">
                <el-option
                  v-for="item in testProductNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <!-- 选项列表 -->
      <div v-if="hasOptionList.includes(currentDesignData.key)">
        <OptionsList :options="currentDesignData.options" :design-key="currentDesignData.key" />
      </div>
      <!-- 数字类型 -->
      <div v-if="currentDesignData.key === 'number'">
        <div class="standard-input-row" style="display: inline-block;">
          <div class="standard-title">
            <span>占位符 （可选）</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="标签字段输入示例"
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
            ></el-input>
          </div>
        </div>
        <div class="standard-input-row" style="display: inline-block;margin-left: 30px">
          <div class="standard-title">
            <span>允许的数字</span>
            <span>*</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="此输入字段允许的范围"
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
                style="width: 125px;"
                size="small"
                min="-100000000"
                v-model="currentDesignData.childrenData.minValue"
              ></el-input>
              <div>最小值</div>
            </div>
            <div style="display: inline-block;text-align: center;margin-left: 10px;">
              <el-input
                type="number"
                placeholder=""
                style="width: 125px;"
                size="small"
                max="100000000"
                v-model="currentDesignData.childrenData.maxValue"
              ></el-input>
              <div>最大值</div>
            </div>
          </div>
        </div>
        <div class="standard-input-row">
          <div class="standard-title">
            <span>价格差异（如有） （可选）</span>
          </div>
          <div>
            <el-input style="width: 250px;" placeholder="" v-model="currentDesignData.priceDelta.amount" size="small">
              <template slot="prepend">$ + </template>
            </el-input>
          </div>
        </div>
      </div>
      <!-- 数据输入 -->
      <div v-if="currentDesignData.key === 'data'">
        <DataDesignComponent :designData="currentDesignData" />
      </div>
      <!-- 图片 -->
      <div v-if="currentDesignData.key === 'image'">
        <div class="standard-input-row">
          <div class="standard-title">
            <span>建议最低图片分辨率 （可选）</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="输入您推荐的图片分辨率，这将为您的商品信息提供最佳的印制质量。如果客户上传的图片分辨率低于您推荐的分辨率，他们将收到警告。"
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
                min="80"
                max="10000"
                v-model="currentDesignData.childrenData.minResolution.width"
              ></el-input>
              <div>宽度</div>
            </div>
            <div style="display: inline-block;text-align: center;margin-left: 10px;">
              <el-input
                type="number"
                placeholder=""
                style="width: 100px;"
                size="small"
                min="80"
                max="10000"
                v-model="currentDesignData.childrenData.minResolution.height"
              ></el-input>
              <div>高度</div>
            </div>
          </div>
        </div>
        <ImagePositionComponent :designData="currentDesignData" />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import OptionsList from "./OptionsList.vue"
import DataDesignComponent from "./DataDesignComponent.vue"
import ImagePositionComponent from "./ImagePositionComponent.vue"

export default {
  components: {
    OptionsList,
    DataDesignComponent,
    ImagePositionComponent
  },
  name: 'DescriptionAndOptions',
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
      hasOptionList: ['dropdownOptions', 'direction', 'matteColor', 'productShape', 'productSize','installationType', 'color', 'coverMaterial', 'frameMaterial'], // 哪些定制类型是有选项列表表格的
      testProductNumList: [],
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
    /* 
      需要实现的
        1、把 外层的 isRequired 赋值给 childrenData.isRequired
        2、把 外层的 instructions 赋值给 childrenData.instructions
        3、把 外层的 label 赋值给 childrenData.label
        4、把外层的 label 和 name都设置成 designOrderLabel 的值
        5、外层对象新增一个children字段，数组形式，值就是childrenData这个对象，然后删掉childrenData这个对象
    */
  }
}
</script>

<style lang="scss" scoped>
.label-text {
  font-size: 14px;
  font-weight: 700;
}

.child-content {
  padding: 30px;
  border-top: 1px solid #008296;

  .container-header-instructions {
    margin-bottom: 10px;
    color: #5e6a78;
  }

  .option-checkbox-required {
    margin-bottom: 20px;
  }

  .standard-inputs-container {
    margin-right: 20px;
  }

  .standard-input-row {
    margin-bottom: 10px;
  }

  .standard-title {
    margin-bottom: 5px;
    font-size: 14px;
    color: #002f36;
  }
}

.data-input-row {
  display: flex;
}
</style>
