<template>
  <div>
    <div class="optoins-container" style="margin-bottom: 50px;">
      <!-- 头部标题 -->
      <div class="options-header">
        <div class="options-title">
          <h4>选项列表</h4>
        </div>
        <div class="add-newoption-container">
          <div class="add-newoption">
            <span class="add-multiple">
              <span><i class="el-icon-plus" /></span>
              <el-button type="text" @click="openAddMultipleOption" :disabled="designKey !== 'dropdownOptions' && currentOptions.length === 20">添加多个选项</el-button>
            </span>
            <span class="add-separator">|</span>
            <span class="add-single">
              <span><i class="el-icon-plus" /></span>
              <el-button type="text" @click="addSingleOption" :disabled="designKey !== 'dropdownOptions' && currentOptions.length === 20">添加选项</el-button>
            </span>
            <div v-if="designKey !== 'dropdownOptions' && remainingOptionCount <= 15" class="add-remaining">最多再添加 {{ remainingOptionCount }} 个</div>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="options-list-table">
        <div class="options-list-header">
          <div class="header-order header-base">订单</div>
          <div class="header-name header-base">
            <span>选项名称</span>
            <span>*</span>
          </div>
          <!-- 【安装类型】 【颜色】 【覆盖材料】【镜架材质】 -->
          <div v-if="isHasProductImage" class="header-product-image header-base">主要</div>
          <div class="header-thumbnail-image header-base">缩略图</div>
          <div class="header-preview-image header-base">预览</div>
          <div class="header-price header-base">价格差额</div>
          <div class="header-delete header-base">删除</div>
        </div>
        <!-- 可拖拽的选项 -->
        <div>
          <div class="options-draggable">
            <draggable 
              tag="div"
              v-model="currentOptions"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <div 
                  class="options-draggable-item"
                  v-for="(element, index) in currentOptions"
                  :key="index"
                >
                  <div class="compact-cell compact-reorder">
                    <span><i class="el-icon-d-caret" /></span>
                  </div>
                  <div class="compact-cell compact-name">
                    <div v-if="designKey === 'productSize'">
                      <el-input
                        type="text"
                        placeholder="请输入内容"
                        v-model="element.name"
                        size="small"
                      >
                        <template slot="append">{{ productUnit }}</template>
                      </el-input>
                      <div>请按照“宽 x 高”的格式输入数值</div>
                    </div>
                    <el-input
                      v-else
                      type="text"
                      placeholder="请输入内容"
                      v-model="element.name"
                      maxlength="50"
                      show-word-limit
                      size="small"
                    ></el-input>
                  </div>
                  <!-- 【安装类型】 【颜色】 【覆盖材料】【镜架材质】 才有 productImage -->
                  <div v-if="element.productImage" class="compact-cell compact-product-image">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <div v-if="element.productImage.imageUrl" class="image-box">
                        <img :src="element.productImage.imageUrl" class="avatar">
                      </div>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="compact-cell compact-thumbnail-image">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <div v-if="element.thumbnailImage.imageUrl" class="image-box">
                        <img :src="element.thumbnailImage.imageUrl" class="avatar">
                      </div>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="compact-cell compact-preview-image">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <div v-if="element.overlayImage.imageUrl" class="image-box">
                        <img :src="element.overlayImage.imageUrl" class="avatar">
                      </div>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="compact-cell compact-price">
                    <el-input placeholder="请输入内容" v-model="element.additionalCost.amount" size="small">
                      <template slot="prepend">$ + </template>
                    </el-input>
                  </div>
                  <div class="compact-cell compact-action">
                    <span @click="removeOption(index)"><i class="el-icon-delete-solid" /></span>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
      <div class="add-newoption">
        <span class="add-multiple">
          <span><i class="el-icon-plus" /></span>
          <el-button type="text" @click="openAddMultipleOption" :disabled="designKey !== 'dropdownOptions' && currentOptions.length === 20">添加多个选项</el-button>
        </span>
        <span class="add-separator">|</span>
        <span class="add-single">
          <span><i class="el-icon-plus" /></span>
          <el-button type="text" @click="addSingleOption" :disabled="designKey !== 'dropdownOptions' && currentOptions.length === 20">添加选项</el-button>
        </span>
        <div v-if="designKey !== 'dropdownOptions' && remainingOptionCount <= 15" class="add-remaining">最多再添加 {{ remainingOptionCount }} 个</div>
      </div>
    </div>
    <!-- 添加多个选项 -->
    <el-dialog
      title="添加多个选项"
      :visible.sync="addOptionDialog"
      width="30%"
      :before-close="handleCloseAddOption">
      <div> 最多添加 20 个选项并以逗号分隔。</div>
      <div style="margin-bottom: 10px;">示例: 选项 1、选项 2、选项 3</div>
      <el-input v-model="addOptionIptValue" type="textarea" placeholder="输入选项" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseAddOption">取 消</el-button>
        <el-button type="primary" @click="addMultipleOption">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  name: 'OptionsList',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    designKey: {
      type: String,
      default: ''
    },
    // 选择的 商品数量
    productUnit: {
      type: String,
      default: ''
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    remainingOptionCount() {
      if (!this.currentOptions) {
        return 0
      }

      return Math.max(0, 20 - this.currentOptions.length);
    },
    isHasProductImage() {
      return this.currentOptions.some(item => Object.prototype.hasOwnProperty.call(item, 'productImage'))
    },
  },
  data() {
    return {
      currentOptions: this.options,
      drag: false,
      addOptionDialog: false,
      addOptionIptValue: '',
    }
  },
  methods: {
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    openAddMultipleOption() {
      this.addOptionDialog = true
    },
    addSingleOption() {
      const newOption = {
        "identifier": "",
        "name": "",
        "label": "",
        "additionalCost": {
          "amount": 0
        },
        "thumbnailImage": {
          "imageUrl": "",
          "dimension": {
            "width": 0,
            "height": 0
          }
        },
        "overlayImage": {
          "imageUrl": "",
          "dimension": {
            "width": 0,
            "height": 0
          }
        }
      }
      if (this.isHasProductImage) {
        newOption.productImage = {
          "imageUrl": "",
          "dimension": {
            "width": 0,
            "height": 0
          }
        }
      }
      this.currentOptions.push(newOption)
    },
    addMultipleOption() {
      const newItems = this.addOptionIptValue.split(",").map(item => {
        // 创建基础对象
        const newItem = {
          "identifier": "",
          "name": item.trim(),
          "label": item.trim(),
          "additionalCost": {
            "amount": 0
          },
          "thumbnailImage": {
            "imageUrl": "",
            "dimension": {
              "width": 0,
              "height": 0
            }
          },
          "overlayImage": {
            "imageUrl": "",
            "dimension": {
              "width": 0,
              "height": 0
            }
          }
        };

        if (this.isHasProductImage) {
          newItem.productImage = {
            "imageUrl": "",
            "dimension": {
              "width": 0,
              "height": 0
            }
          };
        }

        return newItem;
      });
      this.currentOptions.push(...newItems);
      this.addOptionIptValue = "";
      this.addOptionDialog = false;
    },
    removeOption(index) {
      this.currentOptions.splice(index, 1);
    },
    handleCloseAddOption() {
      this.addOptionDialog = false;
      this.addOptionIptValue = '';
    },
  }
}
</script>

<style lang="scss" scoped>
// 选项列表
.optoins-container {
  margin: 0 auto;
  margin-top: 50px;
  // width: 80%;

  .options-header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .options-title {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0;
      width: 50%;
      
      h4 {
        margin: 0;
        font-size: 16px;
      }
    }

    .add-newoption-container {
      align-items: flex-end;
      display: flex;
      justify-content: flex-end;
      padding: 0;
      width: 50%;
    }
  }

  .add-newoption {
    text-align: right;

    .add-multiple,
    .add-single {
      cursor: pointer;
    }

    .add-separator {
      padding: 0 5px 0 5px;
    }
  }

  .options-list-table {
    border: 1px solid #d5dbdb;
    border-spacing: 0;
    display: grid;
    margin-bottom: 8px;
    overflow: visible;
    width: 100%;

    .options-list-header {
      align-items: center;
      background: #e3eced;
      border-bottom: 1px solid #d5dbdb;
      display: flex;
      font-weight: 700;

      .header-base {
        align-items: center;
        padding: 8px 5px;
        word-break: break-all;
        box-sizing: border-box;
      }

      .header-order {
        display: flex;
        flex: 0 1;
        min-width: 60px;
      }

      .header-name {
        display: flex;
        flex: 0 1;
        min-width: 300px;
      }

      .header-product-image {
        display: flex;
        flex: 0 1;
        min-width: 150px;
      }

      .header-thumbnail-image {
        display: flex;
        flex: 0 1;
        min-width: 150px;
      }

      .header-preview-image {
        display: flex;
        flex: 0 1;
        min-width: 150px;
      }

      .header-price {
        display: flex;
        flex: 0 1;
        min-width: 250px;
      }

      .header-delete {
        display: flex;
        flex: 1 1;
        justify-content: flex-end;
        min-width: 60px;
      }
    }
 
    /* 动画样式 */
    .flip-list-move {
      transition: transform 0.5s;
    }

    .ghost {
      opacity: 0.5;
      background: #c8ebfb;
    }
    /* 动画样式 end */

    .compact-cell {
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9 !important;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 42px;
        height: 42px;
        line-height: 42px;
        text-align: center;
      }
      .avatar {
        width: 42px;
        height: 42px;
        // display: block;
        vertical-align: middle;
      }
    }

    .options-draggable {
      min-height: 80px;
      max-height: 500px;
      overflow-y: auto;
    }

    .options-draggable-item {
      background: #fff;
      border: 1px solid transparent;
      border-bottom-color: #d5dbdb;
      display: flex;
      flex-direction: row;
      // font-family: Amazon Ember, Arial, sans-serif !important;
      height: 80px;
      padding-bottom: 5px;
      padding-top: 5px;
      width: 100%;
      box-sizing: border-box;

      .compact-reorder {
        align-items: center;
        display: flex;
        flex: 0 1;
        justify-content: center;
        min-width: 60px;
        cursor: move;
        font-size: 18px;
      }

      .compact-name {
        display: flex;
        margin-top: 10px;
        min-width: 300px;
      }

      .compact-product-image,
      .compact-thumbnail-image,
      .compact-preview-image {
        display: flex;
        flex: 0 1;
        flex-direction: column;
        justify-content: center;
        min-width: 150px;
      }

      .compact-price {
        display: flex;
        flex: 0 1;
        flex-direction: column;
        justify-content: center;
        margin-top: 7px;
        min-width: 250px;
      }
      
      .compact-action {
        align-items: center;
        display: flex;
        flex: 1 1;
        justify-content: flex-end;
        min-width: 40px;
        cursor: pointer;
        font-size: 18px;
      }

      .image-box {
        background-image: linear-gradient(45deg, #ededed 25%, hsla(0, 0%, 100%, .1) 0), linear-gradient(-45deg, #ededed 25%, hsla(0, 0%, 100%, .1) 0), linear-gradient(45deg, hsla(0, 0%, 100%, .1) 75%, #ededed 0), linear-gradient(-45deg, #fefefe 75%, #ededed 0);
        background-position: 0 0, 0 10px, 10px -10px, -10px 0 !important;
        background-size: 20px 20px !important;
      }
    }
  }
}
</style>
