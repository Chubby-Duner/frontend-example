<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">
      添加定制

      SL304!YK5001#LML20-FP1837
    </el-button>
    <el-button type="primary" @click="saveSurface">
      保存
    </el-button>

    <el-dialog :visible.sync="dialogVisible" title="添加定制" width="60%">
      <div class="container">
        <div class="container-list">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="container-list-item"
            :class="{ selected: selectedIndex === index }"
            @click="selectItem(index)"
          >
            <div class="container-list-item-content">
              <div class="content-header">
                {{ item.title }}
              </div>
              <div class="content-box">
                <p class="content-box-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelect">添加定制</el-button>
      </span>
    </el-dialog>


    <!-- 布局 -->
    <div class="surface-block-content">
      <div class="surface-list">
        <!-- 循环渲染 child-container -->
        <div v-for="(child, index) in surfaceData.children" :key="index" class="child-container">
          <!-- 未展开时的内容 -->
          <div class="child-header">
            <div class="number-cell">
              <h3>{{ index + 1 }}</h3>
            </div>
            <div class="label-cell">
              <div class="label-cell-tootip">
                <el-tooltip
                  effect="dark"
                  content="此标签仅用于帮助您整理定制项，不会对买家显示。"
                  placement="bottom"
                >
                  <span><i class="el-icon-info" /></span>
                </el-tooltip>
              </div>
              <div class="label-cell-input">
                <el-input
                  class="label-cell-input-element"
                  type="text"
                  placeholder="请输入内容"
                  v-model="child.surfaceLabel"
                  maxlength="50"
                  show-word-limit
                ></el-input>
              </div>
            </div>
            <div class="changeOrder-cell">更改顺序</div>
            <div class="delete-cell" @click.stop="removeSurface(index)">
              <span><i class="el-icon-delete-solid" /></span>
            </div>
            <div class="expand-cell" @click="toggleExpand(index)">
              <span><i :class="child.expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" /></span>
            </div>
          </div>
          <!-- 展开的内容 -->
          <div v-show="child.expanded" class="child-content">
            <div class="preview-container">
              <h4 class="container-header">预览图片</h4>
              <div class="container-header-instructions">为商品添加预览图片</div>
              <div class="building-block-content">
                <div class="preview-container-content">
                  <!-- 标签 说明 预览图片 裁切蒙版 -->
                  <div class="preview-container-image-upload">
                    <div class="standard-inputs-container">
                      <div class="standard-input-row">
                        <div class="standard-title">
                          <span>标签 </span>
                          <span>*</span>
                        </div>
                        <div>
                          <el-input
                            type="text"
                            placeholder="标签"
                            v-model="child.label"
                            maxlength="100"
                            show-word-limit
                          ></el-input>
                        </div>
                      </div>
                      <div class="standard-input-row">
                        <div class="standard-title">
                          <span>说明 (可选)</span>
                        </div>
                        <div>
                          <el-input
                            type="textarea"
                            placeholder="标签"
                            v-model="child.instructions"
                            maxlength="100"
                            show-word-limit
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="image-inputs-container">
                      <div class="image-input preview-container-baseimage-upload">
                        <div class="standard-title">
                          <span>预览图片 </span>
                          <span>*</span>
                        </div>
                        <div
                          class="image-edit-content"
                          :class="{
                            'check-image-content-box': child.baseImage.imageUrl
                          }"
                        >
                          <!-- 图片 -->
                          <img v-if="child.baseImage.imageUrl" :src="child.baseImage.imageUrl" class="imageBox" alt="背景图">
                          <!-- 上传 -->
                          <el-upload
                            :style="{ display: child.baseImage.imageUrl ? 'none' : 'block' }"
                            action="#"
                            class="upload-image"
                            accept=".jpg,.png,.jpeg"
                            :http-request="(param) => uploadLocalImage(param, 'bgImage')"
                            :show-file-list="false"
                          >
                            <i v-if="!child.baseImage.imageUrl" class="el-icon-upload2 upload-content upload-icon" />
                            <span v-else class="change-upload-text">更换图片</span>
                          </el-upload>
                        </div>
                        <div class="upload-tip">最小: 400x400px JPEG或PNG，最大大小12M</div>
                      </div>
                      <div class="image-input preview-container-maskimage-upload">
                        <div class="standard-title">
                          <span>裁切蒙版 (可选)</span>
                          <span>*</span>
                        </div>
                        <div
                          class="image-edit-content transparency"
                          :class="{
                            'check-image-content-box': child.maskImage.imageUrl
                          }"
                        >
                          <!-- 图片 -->
                          <img v-if="child.maskImage.imageUrl" :src="child.maskImage.imageUrl" class="imageBox" alt="背景图">
                          <!-- 上传 -->
                          <el-upload
                            :style="{ display: child.maskImage.imageUrl ? 'none' : 'block' }"
                            action="#"
                            class="upload-image"
                            accept=".jpg,.png,.jpeg"
                            :http-request="(param) => uploadLocalImage(param, 'bgImage')"
                            :show-file-list="false"
                          >
                            <i v-if="!child.maskImage.imageUrl" class="el-icon-upload2 upload-content upload-icon" />
                            <span v-else class="change-upload-text">更换图片</span>
                          </el-upload>
                        </div>
                        <div class="upload-tip">最小: 400x400px PNG，最大大小12M</div>
                      </div>
                    </div>
                  </div>
                  <!-- 定制项 -->
                  <div class="preview-container-children">
                    <h4 class="container-header">添加适用于您的商品的定制选项。</h4>
                    <div class="container-header-instructions">定制选项在“立即定制”窗口中以列表形式显示。选项可以包括颜色、哑光色、封面材质、物品尺寸、商品形状、框架材质、安装类型、方向、文本、数据、图像和选项下拉列表。</div>
                    <div class="preview-children-design-list">
                      
                      <div v-for="(designChild, designIndex) in child.children[0].children" :key="designIndex" class="child-container">
                        <!-- 未展开时的内容 -->
                        <div class="child-header">
                          <div class="number-cell">
                            <h3>{{ designIndex + 1 }}</h3>
                          </div>
                          <div class="label-cell">
                            <div class="label-cell-tootip">
                              <el-tooltip
                                effect="dark"
                                content="此标签仅用于帮助您整理定制项，不会对买家显示。"
                                placement="bottom"
                              >
                                <span><i class="el-icon-info" /></span>
                              </el-tooltip>
                            </div>
                            <div class="label-cell-input">
                              <el-input
                                class="label-cell-input-element"
                                type="text"
                                placeholder="请输入内容"
                                v-model="designChild.designLabel"
                                maxlength="50"
                                show-word-limit
                              ></el-input>
                            </div>
                          </div>
                          <div class="changeOrder-cell">更改顺序</div>
                          <div class="delete-cell" @click.stop="removeDesiginItem(child, designIndex)">
                            <span><i class="el-icon-delete-solid" /></span>
                          </div>
                          <div class="expand-cell" @click="toggleDesiginExpand(designChild)">
                            <span><i :class="designChild.expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" /></span>
                          </div>
                        </div>
                        <!-- 展开的内容 -->
                        <div v-show="designChild.expanded">
                          <DescriptionAndOptions :designData="designChild" />
                        </div>

                      </div>

                      <div class="surface-add-new">
                        <div class="surface-add-content">
                          <el-button type="primary" :disabled="child.children[0].children.length === 15" @click="openAddDesignItem(index)">添加定制</el-button>
                          <div class="remaining-addnum">您还可以添加 {{ 15 - child.children[0].children.length }} 个定制（最多 15 个）</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加表面 -->
      <div class="surface-add-new">
        <div class="surface-add-content">
          <el-button type="primary" :disabled="remainingSurfaceCount === 0" @click="addSurface">添加表面</el-button>
          <div class="remaining-addnum">您还可以添加 {{ remainingSurfaceCount }} 个表面（最多 5 个）</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import DescriptionAndOptions from "../components/gridLayout/DescriptionAndOptions.vue"

export default {
  components: {
    DescriptionAndOptions
  },
  data() {
    return {
      dialogVisible: false,
      selectedIndex: null, // 当前选中的 index
      list: [
        { key: "color", title: "颜色", desc: "允许客户选择颜色。", designTips: "添加您想为客户提供的颜色。" },
        { key: "matteColor", title: "哑光色", desc: "允许客户选择哑光颜色。", designTips: "添加您想为客户提供的哑光颜色。" },
        { key: "coverMaterial", title: "覆盖材料", desc: "允许客户选择封面材料。", designTips: "添加您想为客户提供的护套材料选项。" },
        { key: "productSize", title: "商品尺寸", desc: "允许客户更改尺寸（宽 x 高）。", designTips: "添加您想为客户提供的商品尺寸选项。" },
        { key: "productShape", title: "商品形状", desc: "允许客户选择商品形状。", designTips: "添加您想为客户提供的商品形状选项。" },
        { key: "frameMaterial", title: "镜架材质", desc: "允许客户选择框架材料。", designTips: "添加您想为客户提供的框架材料选项。" },
        { key: "installationType", title: "安装类型", desc: "客户可自行选择安装类型。", designTips: "添加您想为客户提供的安装类型选项。" },
        { key: "direction", title: "方向", desc: "允许客户选择方向。", designTips: "添加您想为客户提供的定位选项。" },
        { key: "text", title: "文本", desc: "允许买家在您的商品上添加个性化文本。非常适合打印在表面上的名字。", designTips: "" },
        { key: "data", title: "数据", desc: "允许买家提供与您的商品相关且不会影响图片预览的输入信息。非常适合定制尺寸或注释。", designTips: "输入数据要求的详细信息。" },
        { key: "image", title: "图片", desc: "所有客户均可通过上传自己的图片对您的商品进行个性化定制。", designTips: "" },
        { key: "dropdownOptions", title: "选项下拉列表", desc: "允许买家从您提供的不同选项组合中进行选择。", designTips: "" },
        { key: "number", title: "数字", desc: "允许买家输入数字。这可以用于长度、数量等。", designTips: "输入数字要求的详细信息。" }
      ],
      surfaceData: { 
        type: "PageContainerComponent", 
        children: [
          {
            type: "PreviewContainerComponent",
            surfaceLabel: '测试表面1', // 仅用于帮助您整理定制项
            name: "Custom Plaque",
            label: "Custom Plaque",
            children: [
              {
                type: "FlatContainerComponent",
                // 定制列表
                children: [
                  // {
                  //   "identifier": "Vl8vXV-G",
                  //   "type": "OptionChooserComponent",
                  //   designLabel: '方向 1',
                  //   expanded: false,
                  //   "name": "方向 1",
                  //   "instructions": "方向test",
                  //   "templateIdentifier": "f6cfe993-c002-4ad5-9a92-e4cb17c447a6",
                  //   "options": [
                  //     {
                  //       "identifier": "3zNezn7D",
                  //       "name": "选项 1",
                  //       "label": "选项 1",
                  //       "additionalCost": {
                  //         "amount": 0
                  //       },
                  //       "productImage": {
                  //         "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/13db09be-5eef-475f-a1f6-28a8c4e8f52f.png",
                  //         "dimension": {
                  //           "width": 1000,
                  //           "height": 1000
                  //         }
                  //       },
                  //       "thumbnailImage": {
                  //         "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/13db09be-5eef-475f-a1f6-28a8c4e8f52f.png",
                  //         "dimension": {
                  //           "width": 1000,
                  //           "height": 1000
                  //         }
                  //       },
                  //       "overlayImage": {
                  //         "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/2130e570-1f68-4d13-bddb-5353c31cc882.png",
                  //         "dimension": {
                  //           "width": 1600,
                  //           "height": 1600
                  //         }
                  //       }
                  //     },
                  //     {
                  //       "identifier": "8eiKcNPS",
                  //       "name": "选项 2",
                  //       "label": "选项 2",
                  //       "additionalCost": {
                  //         "amount": 0
                  //       },
                  //       "productImage": {
                  //         "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/13db09be-5eef-475f-a1f6-28a8c4e8f52f.png",
                  //         "dimension": {
                  //           "width": 1000,
                  //           "height": 1000
                  //         }
                  //       },
                  //       "thumbnailImage": {
                  //         "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/13db09be-5eef-475f-a1f6-28a8c4e8f52f.png",
                  //         "dimension": {
                  //           "width": 1000,
                  //           "height": 1000
                  //         }
                  //       },
                  //       "overlayImage": {
                  //         "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/2130e570-1f68-4d13-bddb-5353c31cc882.png",
                  //         "dimension": {
                  //           "width": 1600,
                  //           "height": 1600
                  //         }
                  //       }
                  //     }
                  //   ],
                  //   "isRequired": true,
                  //   "label": {
                  //     "default": "Orientation",
                  //     "stringId": "gestalt-picture-frame-orientation-option-label-override"
                  //   }
                  // }
                ]
              }
            ],
            instructions: "Start customizing your own night light!",
            baseImage: {
              imageUrl: "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/0513ac53ea3212b93081ceb3a39e11b3.jpg",
              dimension: {
                width: 1600,
                height: 1600
              }
            },
            maskImage: {
              imageUrl: "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/64af70e19a179419c838dbb1820e9df5.png",
              dimension: {
                width: 1600,
                height: 1600
              }
            },
            expanded: false
          },
          {
            type: "PreviewContainerComponent",
            surfaceLabel: '测试表面2', // 仅用于帮助您整理定制项
            name: "Couasd Qoasdu",
            label: "Couasd Qoasdu",
            children: [
              {
                type: "FlatContainerComponent",
                // 定制列表
                children: [
                  
                ]
              }
            ],
            instructions: "Start customizing your own night light!",
            baseImage: {
              imageUrl: "https://image.yuanmeinetwork.com/MqNyLsKcS8S3FqL4GGtTb.webp!x-oss-small-image",
              dimension: {
                width: 1600,
                height: 1600
              }
            },
            maskImage: {
              imageUrl: "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/64af70e19a179419c838dbb1820e9df5.png",
              dimension: {
                width: 1600,
                height: 1600
              }
            },
            expanded: false
          }
        ] 
      },
      defaultOptions: [
        {
          // "identifier": "hHtlcvN7", 
          "name": "",
          "label": "",
          "additionalCost": {
            "amount": 0
          },
          // "productImage": {
          //   "imageUrl": "",
          //   "dimension": {
          //     "width": 0,
          //     "height": 0
          //   }
          // },
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
        },
        {
          // "identifier": "hHtlcvN7",
          "name": "选项2",
          "label": "选项2",
          "additionalCost": {
            "amount": 0
          },
          // "productImage": {
          //   "imageUrl": "",
          //   "dimension": {
          //     "width": 0,
          //     "height": 0
          //   }
          // },
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
      ],
      defaultDesignItem1: {
        key: "", // 用于判断添加的是什么类型的定制选项
        "identifier": "",
        "type": "OptionChooserComponent",
        designLabel: '',
        designTips: '',
        expanded: false,
        "name": "",
        "instructions": "",
        "templateIdentifier": "",
        options: [],
        "isRequired": true,
        "label": {
          "default": "Orientation",
          "stringId": "gestalt-picture-frame-orientation-option-label-override"
        }
      },
      numberDesignItem: {
        key: "",
        designLabel: '',
        designTips: '',
        expanded: false,
        "instructions": "",
        "isRequired": true,
        "identifier": "Bpriclyi",
        "type": "FlatRatePriceDeltaContainerComponent",
        "templateIdentifier": "fd627e8c-e027-450f-9818-98622d3fcd16",
        "priceDelta": {
          "amount": 0
        },
        childrenData: {
          "identifier": "opU5XI0c",
          "type": "NumberInputComponent",
          "name": "",
          "label": "",
          "instructions": "",  // 需要把外层的赋值给这里， 因为页面统一绑定的是外层的
          "templateIdentifier": "ffc3201f-02f3-4903-a043-99f8e2f4c94e",
          "minValue": -100000000,
          "maxValue": 100000000,
          "isRequired": true, // 需要把外层的赋值给这里， 因为页面统一绑定的是外层的
          "placeholder": ""
        },
        designOrderLabel: '', // 这个字段才是真正取值，也就是页面填写的label，所以后期保存的时候 就是designOrderLabel和label的值互换一下，默认设置的就是已存在数字的第几个
        "label": "", // 真实传值 根据添加时来取值 数字x x为当前添加的第一个的顺序，但是页面绑定这个字段，所以其实这个值是要给 childrenData.label
        "name": "" // 需要取值为 designLabel
      },
      dataDesignItem: {
        key: "",
        designLabel: '',
        designTips: '',
        expanded: false,
        "instructions": "", // 要赋值给 childrenData.instructions
        "isRequired": true,
        "identifier": "Bpriclyi",
        "type": "FlatRatePriceDeltaContainerComponent",
        "templateIdentifier": "fd627e8c-e027-450f-9818-98622d3fcd16",
        "priceDelta": {
          "amount": 0
        },
        childrenData: {
          "identifier": "i1sZOFRs",
          "type": "TextInputComponent",
          "name": "",
          "label": "",
          "instructions": "",
          "templateIdentifier": "a338ef77-0857-40dd-8232-17eeeeba039a",
          "minLength": 1,
          "maxLength": 1000,
          "regexChoice": "", // 允许的字符 但是目前这个下拉框的选项不知道从哪里来 ？？？
          "isRequired": true,
          "placeholder": "",
          "maxLines": 1
        },
        designOrderLabel: '', // 这个字段才是真正取值，也就是页面填写的label，所以后期保存的时候 就是designOrderLabel和label的值互换一下，默认设置的就是已存在数字的第几个
        "label": "", // 真实传值 根据添加时来取值 数字x x为当前添加的第一个的顺序，但是页面绑定这个字段，所以其实这个值是要给 childrenData.label
        "name": "" // 需要取值为 designLabel
      },
      imageDesignItem: {
        key: "",
        designLabel: '',
        designTips: '',
        expanded: false,
        instructions: "", // 要赋值给 childrenData.instructions
        isRequired: true,
        identifier: "Bpriclyi",
        templateIdentifier: "fd627e8c-e027-450f-9818-98622d3fcd16",
        type: "PlacementContainerComponent",
        childrenData: {
          "identifier": "J6Sb8ReR",
          "type": "ImageInputComponent",
          "name": "",
          "label": "",
          "instructions": "",
          "templateIdentifier": "cb585042-7e79-469e-be05-90ef7afe1390",
          "isRequired": true,
          "minResolution": {
            "width": null,
            "height": null
          } // 最低图片分辨率
        },
        dimension: {
          "width": null,
          "height": null
        }, // 尺寸
        position: {
          "x": null,
          "y": null
        }, // 位置
        isFreePlacement: false, // 自由放置 还是 静态放置
        label: "",
        name: "",
      },
      textDesignItem: {
        key: "",
        designLabel: '',
        designTips: '',
        expanded: false,
        label: '',
        name: '',
        identifier: 'Q85Bcxiu',
        templateIdentifier: "4377cedf-0eb5-4423-b635-ae7d2bfb5f14",
        type: "ContainerComponent",
        children: [
          {
            "identifier": "3XUU3JZv",
            "type": "FontChooserComponent",
            "name": "",
            "label": "文本字体测试",
            "instructions": "文本字体测试",
            "templateIdentifier": "97cf2f29-90ce-43a1-89b7-4f72c52a4b08",
            "defaultFontIdentifier": "zntqr2pd",
            "fontOptions": [],
            "isRequired": false
          },
          {
            "identifier": "rCMywe4S",
            "type": "ColorChooserComponent",
            "name": "",
            "label": "文本颜色测试",
            "instructions": "文本颜色测试",
            "templateIdentifier": "375d43cd-557a-4bfd-99a9-6ef29268b83f",
            "colorOptions": [],
            "defaultColorIdentifier": "Y1hAH6Zn"
          },
          {
            "identifier": "wsTdXRW1",
            "type": "ContainerComponent",
            "templateIdentifier": "0b303c49-5c51-4ba4-ba98-b7e1bed324d6",
            // 文本块定制
            "children": [
              {
                "identifier": "7DKlQBem",
                "type": "PlacementContainerComponent",
                "templateIdentifier": "9b4e96a7-9648-4464-9413-7ab3f14ff961",
                "children": [
                  {
                    "identifier": "7hQugz9L",
                    "type": "FlatRatePriceDeltaContainerComponent",
                    "templateIdentifier": "54b3d602-9fa1-4bfb-b06d-1de4e3db36ac",
                    "priceDelta": {
                      "amount": 0
                    },
                    "children": [
                      {
                        "identifier": "jYz5oWNE",
                        "type": "TextInputComponent",
                        "name": "",
                        "label": "",
                        "instructions": "",
                        "templateIdentifier": "5238aef9-4949-4bc6-92a2-a58bc264faf2",
                        "minLength": 1,
                        "maxLength": 1000,
                        "regexChoice": "3052d23c-90ab-4d30-a117-45624940945b",
                        "isRequired": true,
                        "placeholder": "",
                        "maxLines": 1
                      }
                    ]
                  }
                ],
                "dimension": {
                  "width": null,
                  "height": null
                },
                "position": {
                  "x": null,
                  "y": null
                },
                "isFreePlacement": false,
                "label": "文本输入 1",
                "name": "文本输入 1"
              }
            ]
          }
        ]
      },
      productSizeDesignItem: {
        key: "",
        designLabel: '',
        designTips: '',
        expanded: false,
        attribute: {
          "attributeName": [
            "item_display_dimensions"
          ],
          "attributeType": "ComplexAttributeType",
          "fields": [
            {
              "capturingGroupIndex": 1,
              "catalogAttributeInfo": {
                "attributeType": "NumericAttributeType",
                "dataType": "Decimal"
              },
              "fieldName": "width"
            },
            {
              "capturingGroupIndex": 2,
              "catalogAttributeInfo": {
                "attributeType": "NumericAttributeType",
                "dataType": "Decimal"
              },
              "fieldName": "height"
            }
          ],
          "formatString": "${item_display_dimensions.width.value} x ${item_display_dimensions.height.value}"
        },
        identifier: "xF5tjW5Q",
        instructions: {
          "default": "Choose the W x H dimensions.",
          "stringId": "gestalt-picture-frame-item-dimensions-option-instructions-override"
        },
        isRequired: true,
        label: {
          "default": "Item Dimensions",
          "stringId": "gestalt-picture-frame-item-dimensions-option-label-override"
        },
        name: '', // e.g 商品尺寸1 也就是要把designLabel的值赋值给这个字段
        options: [],
        templateIdentifier: "6e46fae5-4a7a-48ae-9588-2ec3450f406a",
        type: "OptionChooserComponent",
        unit: '', // 商品数量
      },
      useDefaultDesignItem1TypeList: ['dropdownOptions', 'direction', 'matteColor', 'productShape', 'productSize', 'installationType', 'color', 'coverMaterial', 'frameMaterial'], // 哪些定制类型是使用这个defaultDesignItem1参数的
      hasProductImageOptionTypes: ['installationType', 'color', 'coverMaterial', 'frameMaterial'], // 哪些定制类型的options是有productImage的
      // 
      designData: {},
      selectedAddDesignSurfaceIndex: null // 当前点击添加定制的表面下标
    };
  },
  mounted() {
    
  },
  computed: {
    remainingSurfaceCount() {
      return Math.max(0, 5 - this.surfaceData.children.length);
    },
    remainingDesignCount() {
      return Math.max(0, 15 - this.surfaceData.children.length);
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    remainingOptionCount() {
      return Math.max(0, 20 - this.dragList.length);
    }
  },
  methods: {
    selectItem(index) {
      this.selectedIndex = index;
    },
    openAddDesignItem(surfaceIndex) {
      this.selectedAddDesignSurfaceIndex = surfaceIndex
      this.dialogVisible = true
    },
    confirmSelect() {
      if (this.selectedIndex !== null) {
        const selectedItem = this.list[this.selectedIndex];

        // 要改为 deepClone
        // 

        /* 
          【下拉选项】【方向】【哑光色】【商品形状】 【安装类型】 【颜色】 【覆盖材料】【镜架材质】 使用同样的结构

            不同点：1、下拉选项的label是填写的，方向似乎是固定的 { "default": "Orientation", "stringId": "gestalt-picture-frame-orientation-option-label-override" }
                   2、【安装类型】 【颜色】 【覆盖材料】【镜架材质】 的options里多了个 productImage
        */
        let addDesignItem = null

        // 有下拉选项列表的
        if (this.useDefaultDesignItem1TypeList.includes(selectedItem.key)) {
          addDesignItem = JSON.parse(JSON.stringify(this.defaultDesignItem1));

          const isHasProductImageOption = this.hasProductImageOptionTypes.includes(selectedItem.key)

          const cloneDefaultOptions = JSON.parse(JSON.stringify(this.defaultOptions))
          // 设置 name label
          cloneDefaultOptions.forEach((item, index) => {
            item.name = selectedItem.key === 'productSize' ? '' : `选项${index}`
            item.label = selectedItem.key === 'productSize' ? '' : `选项${index}`
          })

          const addDesignOptions = isHasProductImageOption ? cloneDefaultOptions.map(item => {
            return {
              ...item,
              productImage: {
                imageUrl: "",
                dimension: {
                  width: 0,
                  height: 0
                }
              }
            }
          }) : cloneDefaultOptions

          addDesignItem.options = addDesignOptions

          console.log("🚀 ~ confirmSelect ~ addDesignItem:", addDesignItem);
        } else if (selectedItem.key === 'number') {
          addDesignItem = JSON.parse(JSON.stringify(this.numberDesignItem))
        } else if (selectedItem.key === 'data') {
          addDesignItem = JSON.parse(JSON.stringify(this.dataDesignItem))
        } else if (selectedItem.key === 'image') {
          addDesignItem = JSON.parse(JSON.stringify(this.imageDesignItem))
        } else if (selectedItem.key === 'text') {
          addDesignItem = JSON.parse(JSON.stringify(this.textDesignItem))
        }

        addDesignItem.key = selectedItem.key
        addDesignItem.designTips = selectedItem.designTips


        // 设置 designLabel
        if (['dropdownOptions', 'number'].includes(selectedItem.key)) {
          const currentDesignList = this.surfaceData.children[this.selectedAddDesignSurfaceIndex].children[0].children
          const hasDesignNums = currentDesignList.length > 0 ? this.surfaceData.children[this.selectedAddDesignSurfaceIndex].children[0].children.filter(item => item.key === selectedItem.key).length : 0
          addDesignItem.designLabel = `${selectedItem.title}${hasDesignNums + 1}`  // 这个得更改为动态的，因为下拉选项是可以添加多个的，有些只能添加一个
        } else {
          addDesignItem.designLabel = `${selectedItem.title}1`  // 这个得更改为动态的，因为下拉选项是可以添加多个的，有些只能添加一个
        }

        // 设置label
        if (['dropdownOptions', 'number'].includes(selectedItem.key)) {
          addDesignItem.label = ''
        } 
        // else if (selectedItem.key === 'direction') {
        //   // !!! 待确认是不是这个 这样应该到保存的时候设置 ！！！
        //   addDesignItem.label = {
        //     "default": "Orientation",
        //     "stringId": "gestalt-picture-frame-orientation-option-label-override"
        //   }
        // } 
        /* 
        */
        else {
          // label: direction, productSize 的 好像都是固定的，保存的时候再重新赋值
          addDesignItem.label = selectedItem.title
        }

        // 单独设置数字的designOrderLabel
        if (selectedItem.key === 'number') {
          const hasNumberDesignNums = this.surfaceData.children[this.selectedAddDesignSurfaceIndex].children[0].children.filter(item => item.key === 'number').length
          addDesignItem.designOrderLabel = `${selectedItem.title}${hasNumberDesignNums + 1}`  // 这个得更改为动态的，因为下拉选项是可以添加多个的，有些只能添加一个
        }

        // console.log("🚀 ~ confirmSelect ~ this.surfaceData.children[this.selectedAddDesignSurfaceIndex]:", this.surfaceData.children[this.selectedAddDesignSurfaceIndex]);
        // console.log("🚀 ~ confirmSelect ~ this.selectedAddDesignSurfaceIndex:", this.selectedAddDesignSurfaceIndex);
        
        this.surfaceData.children[this.selectedAddDesignSurfaceIndex].children[0].children.push(addDesignItem)

        console.log("你选择了：", selectedItem);
        // TODO: 你可以在这里提交、发送、关闭弹窗等逻辑
        this.dialogVisible = false;
      } else {
        this.$message.warning("请先选择一个定制项");
      }
        
    },
    toggleExpand(index) {
      this.surfaceData.children[index].expanded = !this.surfaceData.children[index].expanded;
    },
    // 添加表面
    addSurface() {
      // 你可以加入一些条件判断，防止超出数量
      if (this.surfaceData.children.length < 5) {
        this.surfaceData.children.push({
          type: "PreviewContainerComponent",
          surfaceLabel: '测试表面', // 仅用于帮助您整理定制项
          name: "Couasd Qoasdu",
          label: "Couasd Qoasdu",
          instructions: "Start customizing your own night light!",
          baseImage: {
            imageUrl: "https://image.yuanmeinetwork.com/MqNyLsKcS8S3FqL4GGtTb.webp!x-oss-small-image",
            dimension: {
              width: 1600,
              height: 1600
            }
          },
          maskImage: {
            imageUrl: "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-us-east-1/ATVPDKIKX0DER/A1WVDLSHJBIRGW/64af70e19a179419c838dbb1820e9df5.png",
            dimension: {
              width: 1600,
              height: 1600
            }
          },
          expanded: false
        });
      } else {
        this.$message.warning("最多只能添加 5 个表面");
      }
    },
    // 删除表面
    removeSurface(index) {
      this.surfaceData.children.splice(index, 1);
    },
    removeDesiginItem(surfaceItem, designIndex) {
      surfaceItem.children[0].children.splice(designIndex, 1)
    },
    toggleDesiginExpand(designChild) {
      designChild.expanded = !designChild.expanded;
    },
    uploadLocalImage() {},
    saveSurface() {
      console.log(this.surfaceData, 'saveSurface')
      const cloneSurfaceData = JSON.parse(JSON.stringify(this.surfaceData))
      cloneSurfaceData.children.forEach(item => {

        if (item.children && item.children.length > 0) {
          // 定制列表
          console.log(item.children[0].children, '999')
          item.children[0].children.forEach(designItem => {
            // 处理 数字类型的 定制信息
            if (["number", 'data', 'image'].includes(designItem.key)) {
              // 1. 把外层的 isRequired 赋值给 childrenData.isRequired
              designItem.childrenData.isRequired = designItem.isRequired;

              // 2. 把外层的 instructions 赋值给 childrenData.instructions
              designItem.childrenData.instructions = designItem.instructions;

              // 3. 把外层的 label 赋值给 childrenData.label
              designItem.childrenData.label = designItem.label;

              // 4. 把外层的 label 和 name 都设置成 designOrderLabel 的值
              designItem.label = designItem.designOrderLabel;
              designItem.name = designItem.designOrderLabel;

              // 5. 外层对象新增一个 children 字段，值为 childrenData 对象，然后删除 childrenData
              // 如果是图片的话，把 minResolution 的 width 和 height 转换成数字类型
              if (designItem.key === 'image') {
                designItem.childrenData.minResolution.width = Number(designItem.childrenData.minResolution.width);
                designItem.childrenData.minResolution.height = Number(designItem.childrenData.minResolution.height);
              }
              designItem.children = [designItem.childrenData];
              delete designItem.childrenData;
            }
          })
        }
      });
      console.log(cloneSurfaceData, 'cloneSurfaceData')
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  max-height: 50vh;
  overflow-y: auto;

  .container-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 14px;
    margin-bottom: 14px;

    .container-list-item {
      background-color: #fafafa;
      cursor: pointer;
      min-height: 155px;
      border: 1px solid #d0d0d0;
      transition: all 0.2s;

      .container-list-item-content {
        display: flex;
        flex-direction: column;
        height: 100%;

        .content-header {
          line-height: 25px;
          border-bottom: 1px solid #d0d0d0;
          padding-left: 10px;
        }

        .content-box {
          text-align: center;

          .content-box-desc {
            margin-left: 14px;
            margin-right: 14px;
          }
        }
      }

      // 未选中项的 hover 效果
      &:hover:not(.selected) .content-header {
        background-color: #d0d0d0;
      }

      // 选中项样式
      &.selected {
        border-color: #008296;

        .content-header {
          background-color: #008296;
          color: #fff;
        }

        // 选中项 hover 时仍保持选中样式
        &.selected:hover .content-header {
          background-color: #008296;
        }
      }
    }
  }
}

// 布局
.surface-block-content {
  margin: 0 auto;
  width: 80%;

  .child-container {
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #008296;

    .child-header {
      background: #fff;
      display: flex;
      flex-direction: row;
      height: 40px;

      .number-cell,
      .changeOrder-cell,
      .delete-cell,
      .expand-cell {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        min-width: 40px;
      }

      .label-cell {
        align-items: center;
        border-left: 1px solid #d5dbdb;
        display: flex;
        flex-grow: 1;
        font-weight: 700;
        height: 100%;

        .label-cell-tootip {
          min-width: 40px;
          text-align: center;
        }

        .label-cell-input {
          width: 90%;
        }

        .label-cell-input-element >>> .el-input__inner {
          border: none !important;
        }
      }

      .changeOrder-cell {
        padding: 0 10px 0 10px;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .delete-cell,
      .expand-cell {
        border-left: 1px solid #d5dbdb;
        cursor: pointer;
      }
    }

    .child-content {
      padding: 30px;
      border-top: 1px solid #008296;

      .container-header {
        margin: 0 0 2px 0;
        font-size: 16px;
      }

      .container-header-instructions {
        margin-bottom: 10px;
        color: #5e6a78;
      }

      .preview-container-image-upload,
      .image-inputs-container {
        display: flex;
        flex-wrap: wrap;
      }

      .standard-inputs-container {
        margin-right: 20px;
        width: 40%;

        .standard-input-row {
          margin-bottom: 10px;
        }

        .standard-title {
          margin-bottom: 5px;
          font-size: 14px;
          color: #002f36;
        }
      }

      .image-inputs-container {
        width: 50%;

        .image-input {
          flex: 1 0 50%;
        }

        .image-edit-content {
          margin-top: 10px;
          position: relative;
          display: inline-block;
          border: 1px solid #ddd;
          width: 150px;
          height: 150px;
          text-align: center;
          background-color: #eee;
        }

        .transparency {
          background-image: linear-gradient(45deg, #ededed 25%, hsla(0, 0%, 100%, .1) 0), linear-gradient(-45deg, #ededed 25%, hsla(0, 0%, 100%, .1) 0), linear-gradient(45deg, hsla(0, 0%, 100%, .1) 75%, #ededed 0), linear-gradient(-45deg, #fefefe 75%, #ededed 0);
          background-position: 0 0, 0 10px, 10px -10px, -10px 0 !important;
          background-size: 20px 20px !important;
        }

        .upload-tip {
          color: #a69c9c;
        }

        .imageBox {
          max-width: 100%;
          height: 100%;
        }

        .background-image,
        .mask-image {
          width: 200px;
        }

        .background-image {
          margin-right: 50px;
          border-right: 1px solid #ddd;
        }

        .image-title {
          font-weight: bold;
        }

        .upload-image,
        .upload-image .el-upload {
          /* position: relative; */
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .check-image-content-box:hover .upload-image {
          display: block !important;
        }

        .upload-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
        }

        .change-upload-text {
          position: absolute;
          left: 50%;
          bottom: -9%;
          transform: translate(-50%, -50%);
          padding: 5px;
          width: 100%;
          color: #409eff;
          background: #717171;
          box-sizing: border-box;
        }

        .upload-icon {
          font-size: 30px;
        }
      }

      // 定制列表
      .preview-container-children {
        margin-top: 30px;
      }
    }
  }

  // 添加新表面
  .surface-add-new {
    margin-top: 20px;
    background: #fff;
    border: 1px dashed #008296;

    .surface-add-content {
      margin-top: 44px;
      margin-right: auto;
      margin-bottom: 44px;
      margin-left: auto;
      text-align: center;
      width: 50%;

      .remaining-addnum {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
</style>


