<template>
  <div class="components-container">
    <aside>
      <span>富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见</span>
      <a
          target="_blank"
          class="link-type"
          href="https://armour.github.io/vue-typescript-admin-docs/features/components/rich-editor.html"
      >文档</a>
    </aside>
    <div v-show="tinymceActive">
      <Tinymce
          :height="400"
          v-model="content"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div
        class="editor-content"
        v-html="content"
    />
    <div class="button-group">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>

    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-container">
        <!-- SKU信息 -->
        <div class="section">
          <h3>SKU信息</h3>
          <div class="field">
            <label>产品SKU:</label>
            <el-input v-model="product.sku.productSku" placeholder="产品SKU" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>销售SKU:</label>
            <el-input v-model="product.sku.sellerSku" placeholder="销售SKU" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>价格:</label>
            <el-input v-model="product.sku.price" placeholder="价格" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>MSRP:</label>
            <el-input v-model="product.sku.msrp" placeholder="MSRP" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>币种:</label>
            <el-input v-model="product.sku.currencyCode" placeholder="币种" size="mini" class="input-field" />
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="section">
          <h3>商品信息</h3>
          <div class="field">
            <label>库存:</label>
            <el-input v-model="product.itemInfos.inventory" placeholder="库存" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>标识符类型:</label>
            <el-input v-model="product.itemInfos.identifierType" placeholder="标识符类型" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>标识符ID:</label>
            <el-input v-model="product.itemInfos.identifierId" placeholder="标识符ID" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>重量(kg):</label>
            <el-input v-model="product.itemInfos.weight" placeholder="重量" size="mini" class="input-field" />
          </div>
          <div class="field-group">
            <label>尺寸:</label>
            <el-input v-model="product.itemInfos.length" placeholder="长(cm)" size="mini" class="input-field" />
            <el-input v-model="product.itemInfos.width" placeholder="宽(cm)" size="mini" class="input-field" />
            <el-input v-model="product.itemInfos.height" placeholder="高(cm)" size="mini" class="input-field" />
          </div>
          <div class="field-group">
            <label>包装尺寸:</label>
            <el-input v-model="product.itemInfos.packageLength" placeholder="包装长(cm)" size="mini" class="input-field" />
            <el-input v-model="product.itemInfos.packageWidth" placeholder="包装宽(cm)" size="mini" class="input-field" />
            <el-input v-model="product.itemInfos.packageHeight" placeholder="包装高(cm)" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>包装重量(kg):</label>
            <el-input v-model="product.itemInfos.packageWeight" placeholder="包装重量" size="mini" class="input-field" />
          </div>
          <div class="field-group">
            <label>尺寸/颜色/风格:</label>
            <el-input v-model="product.itemInfos.size" placeholder="尺寸" size="mini" class="input-field" />
            <el-input v-model="product.itemInfos.color" placeholder="颜色" size="mini" class="input-field" />
            <el-input v-model="product.itemInfos.style" placeholder="风格" size="mini" class="input-field" />
          </div>
        </div>

        <!-- 文案 -->
        <div class="section">
          <h3>文案</h3>
          <div class="field">
            <label>标题:</label>
            <el-input v-model="product.copywriterInfo.productName" placeholder="标题" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>图片:</label>
            <el-input v-model="product.copywriterInfo.otherImages" placeholder="图片链接" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>描述:</label>
            <el-input v-model="product.copywriterInfo.description" placeholder="描述" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>五点描述:</label>
            <el-input v-model="product.copywriterInfo.bulletPoints" placeholder="五点描述" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>搜索关键词:</label>
            <el-input v-model="product.copywriterInfo.keywords" placeholder="搜索关键词" size="mini" class="input-field" />
          </div>
        </div>

        <!-- 模板信息 -->
        <div class="section">
          <h3>模板信息</h3>
          <div class="field">
            <label>产品类型:</label>
            <el-input v-model="product.templateInfo.productType" placeholder="产品类型" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>产地:</label>
            <el-input v-model="product.templateInfo.origin" placeholder="产地" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>品牌:</label>
            <el-input v-model="product.templateInfo.brand" placeholder="品牌" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>材质:</label>
            <el-input v-model="product.templateInfo.material" placeholder="材质" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>制造商:</label>
            <el-input v-model="product.templateInfo.manufacturer" placeholder="制造商" size="mini" class="input-field" />
          </div>
          <div class="field">
            <label>类目属性:</label>
            <el-input v-model="product.templateInfo.categoryAttributes" placeholder="类目属性" size="mini" class="input-field" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '../components/Tinymce/index.vue'

export default {
  name: "tinymce",
  components: {
    Tinymce
  },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="Logo" src="./favicon.ico" alt="Logo" width="100" height="100" /><ul>
      <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
    </ul>`,
      tinymceActive: true,
      products: [
        {
          id: 1,
          sku: { productSku: '', sellerSku: '', price: '', msrp: '', currencyCode: '' },
          itemInfos: { inventory: '', identifierType: '', identifierId: '', length: '', width: '', height: '', weight: '', packageLength: '', packageWidth: '', packageHeight: '', packageWeight: '', size: '', color: '', style: '' },
          copywriterInfo: { productName: '', otherImages: [], description: '', bulletPoints: '', keywords: '' },
          templateInfo: { productType: '', origin: '', identifierType: '', brand: '', material: '', manufacturer: '', categoryAttributes: '' }
        },
        //
        {
          id: 2,
          sku: { productSku: '', sellerSku: '', price: '', msrp: '', currencyCode: '' },
          itemInfos: { inventory: '', identifierType: '', identifierId: '', length: '', width: '', height: '', weight: '', packageLength: '', packageWidth: '', packageHeight: '', packageWeight: '', size: '', color: '', style: '' },
          copywriterInfo: { productName: '', otherImages: [], description: '', bulletPoints: '', keywords: '' },
          templateInfo: { productType: '', origin: '', identifierType: '', brand: '', material: '', manufacturer: '', categoryAttributes: '' }
        }
      ]
    }
  },
  deactivated() {
    this.tinymceActive = false
  },
  activated() {
    this.tinymceActive = true
  },
  methods: {
    submit() {
      console.log(this.content)
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}

.product-list {
  margin: 20px;
}

.product-container {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.section {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 10px;
  color: #333;
}

.field,
.field-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.field label,
.field-group label {
  min-width: 80px;
  text-align: right;
  margin-right: 10px;
}

.input-field {
  width: 200px;
  max-width: 100%;
  margin-right: 10px;
}
</style>
