<template>
  <el-dialog :visible.sync="visible" title="买家预览" width="60%" top="4vh" :before-close="closeDialog">
  <div class="design-preview-container">
    <!-- 左侧图片预览区域 -->
    <div class="preview-section">
      <div class="preview-container">
        <div 
          class="base-image-container"
          :class="{ 'loading': isImageLoading }"
          :style="{
            width: scaledBackgroundWidth + 'px',
            height: scaledBackgroundHeight + 'px',
            backgroundImage: `url(${baseImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 30000
          }"
        >
          <!-- 蒙版图层 -->
          <div 
            v-if="maskImageUrl"
            class="overlay-image"
            :style="{
              backgroundImage: `url(${maskImageUrl})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              zIndex: 30000,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }"
          ></div>
          
          <!-- 选中的OverlayImage蒙版图层 -->
          <div 
            v-if="selectedOverlayImage"
            class="selected-overlay-image"
            :style="{
              backgroundImage: `url(${selectedOverlayImage})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              zIndex: 15000,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }"
          ></div>
            
          <!-- 文本块区域 -->
          <div
            v-for="textBlock in textBlocks"
            :key="textBlock.name"
            class="text-block-region"
            :style="{
              left: textBlock.position.x * scaleRatio + 'px',
              top: textBlock.position.y * scaleRatio + 'px',
              width: textBlock.dimension.width * scaleRatio + 'px',
              height: textBlock.dimension.height * scaleRatio + 'px',
              zIndex: selectedTextBlock === textBlock ? 14000 : (textBlock.isFreePlacement ? 12000 : 10000),
            }"
          >
              <!-- 文本输入显示区域 -->
              <div
                v-if="textBlock.inputValue"
                class="text-input-display"
                :style="{
                  position: 'absolute',
                  left: textBlock.isFreePlacement ? 
                    ((textBlock.textPosition && textBlock.textPosition.x) || 0) * scaleRatio + 'px' : 
                    '0px',
                  top: textBlock.isFreePlacement ? 
                    ((textBlock.textPosition && textBlock.textPosition.y) || 0) * scaleRatio + 'px' : 
                    (textBlock.dimension.height * scaleRatio - getTextHeight(textBlock)) / 2 + 'px',
                  fontSize: textBlock.isFreePlacement ? textBlock.fontSize + 'px' : getAdaptiveFontSize(textBlock) + 'px',
                  fontFamily: textBlock.fontFamily,
                  color: textBlock.textColor,
                  cursor: textBlock.isFreePlacement ? 'move' : 'default',
                  userSelect: 'none',
                  transform: textBlock.isFreePlacement ? `scale(${textBlock.textScale || 1})` : 'none',
                  transformOrigin: 'center center',
                  whiteSpace: 'nowrap'
                }"
                @mousedown="handleTextMouseDown($event, textBlock)"
              >
              {{ textBlock.inputValue }}
            
            <!-- 拖拽调整手柄 - 只在选中且可自由放置时显示 -->
            <div
              v-if="textBlock.isFreePlacement && selectedTextBlock === textBlock"
              class="resize-handle top-left"
                  @mousedown.stop="handleTextResizeStart($event, 'top-left', textBlock)"
            />
            <div
              v-if="textBlock.isFreePlacement && selectedTextBlock === textBlock"
              class="resize-handle top-right"
                  @mousedown.stop="handleTextResizeStart($event, 'top-right', textBlock)"
            />
            <div
              v-if="textBlock.isFreePlacement && selectedTextBlock === textBlock"
              class="resize-handle bottom-left"
                  @mousedown.stop="handleTextResizeStart($event, 'bottom-left', textBlock)"
            />
            <div
              v-if="textBlock.isFreePlacement && selectedTextBlock === textBlock"
              class="resize-handle bottom-right"
                  @mousedown.stop="handleTextResizeStart($event, 'bottom-right', textBlock)"
                />
              </div>
            </div>
            
            <!-- 图片块区域 -->
            <div
              v-for="imageBlock in imageBlocks"
              :key="imageBlock.name"
              class="image-block-region"
              :style="{
                left: imageBlock.position.x * scaleRatio + 'px',
                top: imageBlock.position.y * scaleRatio + 'px',
                width: imageBlock.dimension.width * scaleRatio + 'px',
                height: imageBlock.dimension.height * scaleRatio + 'px',
                zIndex: selectedImageBlock === imageBlock ? 14000 : (imageBlock.isFreePlacement ? 12000 : 10000),
                overflow: 'hidden'
              }"
            >
              <!-- 图片显示区域 -->
              <div
                v-if="imageBlock.uploadedImage"
                class="image-display"
                :style="{
                  position: 'absolute',
                  left: imageBlock.isFreePlacement ? 
                    ((imageBlock.imagePosition && imageBlock.imagePosition.x) || 0) * scaleRatio + 'px' : 
                    '0px',
                  top: imageBlock.isFreePlacement ? 
                    ((imageBlock.imagePosition && imageBlock.imagePosition.y) || 0) * scaleRatio + 'px' : 
                    '0px',
                  width: imageBlock.dimension.width * scaleRatio + 'px',
                  height: imageBlock.dimension.height * scaleRatio + 'px',
                  backgroundImage: `url(${imageBlock.uploadedImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  cursor: imageBlock.isFreePlacement ? 'move' : 'default',
                  userSelect: 'none',
                  overflow: 'hidden'
                }"
                @mousedown="handleImageMouseDown($event, imageBlock)"
              ></div>
          </div>
        </div>
      </div>
      <div class="preview-note">注意：显示为近似预览。</div>
    </div>

    <!-- 右侧配置选项区域 -->
    <div class="config-section">
      <div class="config-content">
        <!-- 渲染FlatContainerComponent的children -->
        <div 
          v-for="component in flatContainerChildren" 
          :key="component.name"
          class="config-item"
        >
          <!-- 选项选择器 -->
          <div v-if="component.type === 'OptionChooserComponent'" class="option-chooser">
            <div class="config-title">
              <!-- <span class="required-field" v-if="component.isRequired">*</span> -->
              {{ component.name || component.label }}
            </div>
            <div class="options-container">
              <div
                v-for="option in component.options"
                :key="option.name"
                class="option-item"
                :class="{ active: selectedOptions[component.name] === option.name }"
                @click="selectOption(component.name, option.name)"
              >
                <div v-if="hasThumbnailImages(component.options)" class="option-thumbnail">
                  <img v-if="option.thumbnailImage" :src="option.thumbnailImage.imageUrl" :alt="option.label" />
                  <div v-else class="option-placeholder"></div>
                </div>
                <div class="option-content">
                  <span class="option-label">{{ option.label }}</span>
                  <span v-if="option.additionalCost.amount > 0" class="additional-cost">
                    + $ {{ option.additionalCost.amount }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 文本输入组件 -->
          <div v-else-if="component.key === 'text'" class="text-input-component">
            <!-- 字体选择 -->
            <div v-if="getFontChooser(component)" class="font-chooser">
              <div class="config-title">{{ getFontChooser(component).label }}</div>
              <div class="instructions-preview">{{ getFontChooser(component).instructions }}</div>
              <el-select 
                v-model="selectedFonts[component.name]" 
                placeholder="选择字体"
                size="small"
              >
                <el-option
                  v-for="font in getFontChooser(component).fontOptions"
                  :key="font.family"
                  :label="font.family"
                  :value="font.family"
                />
              </el-select>
            </div>

              <!-- 颜色选择 -->
             <div v-if="getColorChooser(component)" class="color-chooser">
               <div class="config-title">
                 {{ getColorChooser(component).label }}:
                 <span v-if="getSelectedColor(component) && getSelectedColor(component).name" class="selected-color-name">
                   {{ getSelectedColor(component).name }}
                 </span>
               </div>
               <div class="instructions-preview">{{ getColorChooser(component).instructions }}</div>
               <div class="color-options">
                 <div class="color-options-grid" :class="{ 'expanded': colorOptionsExpanded[component.name] }">
                   <div
                     v-for="(colorOption) in getColorChooser(component).colorOptions"
                     :key="colorOption.name"
                     class="color-option"
                     :class="{ active: selectedColors[component.name] && selectedColors[component.name].name === colorOption.name }"
                     @click="selectColor(component.name, colorOption.name)"
                   >
                     <div class="color-swatch" :style="{ backgroundColor: colorOption.value }"></div>
                   </div>
                 </div>
                 
                 <!-- 显示更多/隐藏按钮 - 移到底部 -->
                 <div v-if="getColorChooser(component).colorOptions.length > 7" class="show-more-colors">
                   <el-button 
                     type="text" 
                     size="small"
                     @click="toggleColorOptions(component.name)"
                   >
                     {{ colorOptionsExpanded[component.name] ? '收起' : `显示更多 (${getColorChooser(component).colorOptions.length - 7})` }}
                   </el-button>
                 </div>
               </div>
             </div>

            <!-- 文本块 -->
            <div v-if="getTextBlocks(component)" class="text-blocks">
              <div 
                v-for="textBlock in getTextBlocks(component)" 
                :key="textBlock.name"
                class="text-block-item"
              >
                <div class="config-title" style="margin-bottom: 0;">
                  <!-- <span class="required-field" v-if="getTextInputComponent(textBlock).isRequired">*</span> -->
                  {{ getTextInputComponent(textBlock).label }}
                </div>
                <div class="instructions-preview">{{ getTextInputComponent(textBlock).instructions }}</div>
                <el-input
                    :value="getTextBlockInputValue(textBlock.name)"
                  placeholder="请输入文本"
                  size="small"
                    @input="updateTextBlockDisplay(textBlock.name, $event)"
                />
              </div>
            </div>
          </div>

          <!-- Data输入组件 -->
          <div v-else-if="component.key === 'Data'" class="data-input-component">
            <div class="config-title" style="margin-bottom: 0;">
              <!-- <span class="required-field" v-if="getDataComponent(component).isRequired">*</span> -->
              {{ getDataComponent(component).label }}
            </div>
            <div class="instructions-preview">{{ getDataComponent(component).instructions }}</div>
            <el-input
              v-model="component.inputValue"
              placeholder="请输入数据"
              size="small"
              @input="updateDataInput(component)"
            />
            <div v-if="getDataComponent(component).maxLength" class="character-count">
              {{ getRemainingCharacters(component) }} character(s) left
            </div>
          </div>

          <!-- Image上传组件 -->
          <div v-else-if="component.key === 'image'" class="image-upload-component">
            <div class="config-title" style="margin-bottom: 0;">
              <!-- <span class="required-field" v-if="getImageComponent(component).isRequired">*</span> -->
              {{ getImageComponent(component).label }}
            </div>
            <div class="instructions-preview">{{ getImageComponent(component).instructions }}</div>
            
            <!-- 未上传状态 -->
            <div v-if="!getUploadedImage(component)" class="upload-area">
              <el-upload
                v-if="!getUploadedImage(component)"
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :on-change="(file, fileList) => handleImageChange(file, fileList, component)"
                :file-list="component.fileList || []"
                accept="image/jpeg,image/png"
                :limit="1"
                :show-file-list="false"
                :drag="false"
              >
                <div class="upload-container">
                  <div class="upload-button">
                    <i class="el-icon-upload"></i>
                    <div>Upload</div>
                  </div>
                </div>
              </el-upload>
            </div>
            
            <!-- 已上传状态 -->
            <div v-else class="uploaded-area">
              <div class="uploaded-container">
                <div class="image-preview">
                  <img :src="getUploadedImage(component)" alt="Uploaded image" />
                </div>
                <div class="image-actions">
                  <el-upload
                    class="replace-upload"
                    action="#"
                    :auto-upload="false"
                    :on-change="(file, fileList) => handleImageChange(file, fileList, component)"
                    :file-list="[]"
                    accept="image/jpeg,image/png"
                    :limit="1"
                    :show-file-list="false"
                    :drag="false"
                  >
                    <div class="action-button">
                      <i class="el-icon-upload"></i>
                      <div>Replace</div>
                    </div>
                  </el-upload>
                  <div class="action-button" @click="handleDeleteImage(component)">
                    <i class="el-icon-delete"></i>
                    <div>Delete</div>
                  </div>
                </div>
              </div>
              <div class="success-message">
                <i class="el-icon-success"></i>
                Image accepted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DesignPreview',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    designData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 背景图片相关
      backgroundWidth: 400,
      backgroundHeight: 400,
      displayWidth: 400,
      displayHeight: 400,
      
      // 拖拽调整相关
      resizeStartX: 0,
      resizeStartY: 0,
      resizeDirection: null,
      isResizing: false,
      currentResizingBlock: null,
      currentResizingType: null,
      
      // 拖拽移动相关
      dragStartX: 0,
      dragStartY: 0,
      isDragging: false,
      currentDraggingBlock: null,
      currentDraggingType: null,
      
      // 选中的选项
      selectedOptions: {},
      
      // 选中的字体
      selectedFonts: {},
       
      // 选中的颜色
      selectedColors: {},
       
      // 颜色选项展开状态
      colorOptionsExpanded: {},
       
      // 文本块数据
      textBlocks: [],
      
      // 图片块数据
      imageBlocks: [],
       
      // 选中的蒙版图
      selectedOverlayImage: null,
       
      // 图片加载状态
      isImageLoading: false,
      
      // 选中状态管理
      selectedTextBlock: null,
      selectedImageBlock: null
    }
  },
  computed: {
    // 基础图片URL
    baseImageUrl() {
      return (this.designData && this.designData.children && this.designData.children[0] && this.designData.children[0].baseImage && this.designData.children[0].baseImage.imageUrl) || ''
    },
    
    // 蒙版图URL
    maskImageUrl() {
      return (this.designData && this.designData.children && this.designData.children[0] && this.designData.children[0].maskImage && this.designData.children[0].maskImage.imageUrl) || ''
    },
    
    // 获取FlatContainerComponent的children
    flatContainerChildren() {
      const container = (this.designData && this.designData.children && this.designData.children[0] && this.designData.children[0].children && this.designData.children[0].children[0])
      return (container && container.children) || []
    },
    
    // 缩放比例
    scaleRatio() {
      return Math.min(
        this.displayWidth / this.backgroundWidth,
        this.displayHeight / this.backgroundHeight
      )
    },
    
    // 缩放后的背景尺寸
    scaledBackgroundWidth() {
      return this.backgroundWidth * this.scaleRatio
    },
    
    scaledBackgroundHeight() {
      return this.backgroundHeight * this.scaleRatio
    }
  },
  watch: {
    visible(newVal, oldVal) {
      if (newVal) {
        this.initializeTextBlocks(this.designData)
        this.initializeImageBlocks(this.designData)
        this.updateOverlayImage()
        // 添加点击空白区域取消选中的事件监听
        this.$nextTick(() => {
          document.addEventListener('click', this.handleDocumentClick)
        })
      } else {
        // 移除事件监听
        document.removeEventListener('click', this.handleDocumentClick)
      }
    }
  },
  beforeDestroy() {
    // 清理事件监听器
    document.removeEventListener('click', this.handleDocumentClick)
  },
  methods: {
    // 初始化文本块
    initializeTextBlocks(data) {
      this.textBlocks = []
      
      // 遍历数据结构，找到文本块
      const traverse = (components) => {
        components.forEach(component => {
          if (component.key === 'text') {
            const textBlocks = this.getTextBlocks(component)
            if (textBlocks) {
              textBlocks.forEach(block => {
                // 获取字体和颜色信息
                const fontChooser = this.getFontChooser(component)
                const colorChooser = this.getColorChooser(component)
                
                // 获取第一个颜色选项作为默认颜色
                const defaultColor = (colorChooser && colorChooser.colorOptions && colorChooser.colorOptions[0]) ? colorChooser.colorOptions[0].value : '#000000'
                const defaultColorName = (colorChooser && colorChooser.colorOptions && colorChooser.colorOptions[0]) ? colorChooser.colorOptions[0].name : null
                
                // 确保block有position和dimension属性
                if (block.position && block.dimension) {
                  this.textBlocks.push({
                    ...block,
                    name: block.name || block.label || `text-block-${Date.now()}`,
                    inputValue: '', // 输入的值
                    fontSize: 16,
                    fontFamily: (fontChooser && fontChooser.fontOptions && fontChooser.fontOptions[0] && fontChooser.fontOptions[0].family) || 'Arial',
                    textColor: defaultColor,
                    componentId: component.name,
                    textPosition: { 
                      x: Math.floor(block.dimension.width / 2) - Math.floor(block.dimension.width / 4),
                      y: Math.floor(block.dimension.height / 2) - Math.floor(block.dimension.height / 4)
                    }, // 初始位置
                    textScale: 1, // 缩放倍率
                    isFreePlacement: block.isFreePlacement !== undefined ? block.isFreePlacement : true
                  })
                  
                  // 自动选择第一个颜色选项
                  if (defaultColorName && component.name) {
                    this.$set(this.selectedColors, component.name, colorChooser.colorOptions[0])
                  }
                }
              })
            }
          }
          
          if (component.children) {
            traverse(component.children)
          }
        })
      }
      
      if (data && data.children) {
        traverse(data.children)
      }
    },
    
    // 初始化图片块
    initializeImageBlocks(data) {
      this.imageBlocks = []
      
      // 遍历数据结构，找到图片块
      const traverse = (components) => {
        components.forEach(component => {
          if (component.template_name === 'image') {
            // 确保component有position和dimension属性
            if (component.position && component.dimension) {
              this.imageBlocks.push({
                ...component,
                uploadedImage: null,
                componentId: component.name,
                imagePosition: { x: 0, y: 0 },
                imageSize: { width: component.dimension.width, height: component.dimension.height }, // 图片默认跟限制区域一样大
                isFreePlacement: component.isFreePlacement !== undefined ? component.isFreePlacement : true
              })
            }
          }
          
          if (component.children) {
            traverse(component.children)
          }
        })
      }
      
      if (data && data.children) {
        traverse(data.children)
      }
    },
    
    // 获取字体选择器
    getFontChooser(component) {
      return (component.children && component.children.find(child => child.type === 'FontChooserComponent')) || null
    },
    
    // 获取颜色选择器
    getColorChooser(component) {
      return (component.children && component.children.find(child => child.type === 'ColorChooserComponent')) || null
    },
    
    // 获取文本块
    getTextBlocks(component) {
      const textBlocksContainer = (component.children && component.children.find(child => 
        child.template_name === 'Text Blocks'
      )) || null
      return (textBlocksContainer && textBlocksContainer.children) || []
    },
    
    // 获取TextInputComponent
    getTextInputComponent(textBlock) {
      const firstChild = (textBlock.children && textBlock.children[0]) || null
      const textInputComponent = (firstChild && firstChild.children && firstChild.children.find(child => 
        child.type === 'TextInputComponent'
      )) || null
      return textInputComponent || {}
    },
    
    // 获取Data组件
    getDataComponent(component) {
      const dataComponent = (component.children && component.children.find(child => 
        child.type === 'DataInputComponent' || child.type === 'TextInputComponent'
      )) || null
      return dataComponent || {}
    },
    
    // 获取Image组件
    getImageComponent(component) {      
      // 查找子组件中的图片组件
      const imageComponent = (component.children && component.children.find(child => 
        child.type === 'ImageInputComponent'
      )) || null
      return imageComponent
    },
    
    // 检查选项数组中是否有缩略图
    hasThumbnailImages(options) {
      return options.some(option => option.thumbnailImage)
    },
    
    // 获取选中的颜色
    getSelectedColor(component) {
      const componentKey = component.name
      const selectedColor = this.selectedColors[componentKey]
      return selectedColor || null
    },
    
    // 选择选项
    selectOption(componentId, optionId) {
      this.$set(this.selectedOptions, componentId, optionId)
      this.updateOverlayImage()
    },
     
    // 更新背景图，以最后一个有选择的选项为准
    updateOverlayImage() {
      // 显示loading状态，给用户视觉反馈
      this.isImageLoading = true
      
      // 用于存储找到的最后一个有overlayImage的选项
      let lastSelectedOverlayImage = null
      
      // 从后往前遍历所有组件，确保最后一个有选择的选项优先级最高
      for (let i = this.flatContainerChildren.length - 1; i >= 0; i--) {
        const component = this.flatContainerChildren[i]
        
        // 只处理选项选择器组件
        if (component.type === 'OptionChooserComponent') {
          // 获取当前组件选中的选项ID
          const selectedOptionId = this.selectedOptions[component.name]
          
          // 如果该组件有选中的选项
          if (selectedOptionId) {
            // 根据选项ID找到对应的选项对象
            const selectedOption = (component.options && component.options.find(option => option.name === selectedOptionId)) || null
            
            // 检查选中的选项是否有overlayImage且imageUrl不为空
            if (selectedOption && selectedOption.overlayImage && selectedOption.overlayImage.imageUrl) {
              // 找到有效的overlayImage，保存URL并跳出循环
              // 因为是从后往前遍历，所以这个就是最后一个有效的overlayImage
              lastSelectedOverlayImage = selectedOption.overlayImage.imageUrl
              break
            }
          }
        }
      }
      
      // 延迟更新图片，给loading效果一些时间显示
      setTimeout(() => {
        // 更新选中的overlayImage
        this.selectedOverlayImage = lastSelectedOverlayImage
        
        // 延迟关闭loading状态，确保图片加载完成
        setTimeout(() => {
          this.isImageLoading = false
        }, 300)
      }, 200)
    },
     
    // 切换颜色选项展开状态
    toggleColorOptions(componentId) {
      this.$set(this.colorOptionsExpanded, componentId, !this.colorOptionsExpanded[componentId])
    },
     
    // 选择颜色
    selectColor(componentId, colorId) {
      const component = this.flatContainerChildren.find(comp => comp.name === componentId)
      const colorChooser = this.getColorChooser(component)
      const selectedColor = (colorChooser && colorChooser.colorOptions && colorChooser.colorOptions.find(option => option.name === colorId)) || null
      this.$set(this.selectedColors, componentId, selectedColor)
      this.updateTextBlockColor(componentId, colorId)
    },
    
    // 获取文本块输入值
    getTextBlockInputValue(blockName) {
      const block = this.textBlocks.find(b => b.name === blockName)
      return block ? block.inputValue : ''
    },
    
    // 更新文本块显示
    updateTextBlockDisplay(blockName, value) {
      const block = this.textBlocks.find(b => b.name === blockName)
      if (block) {
        block.inputValue = value
      }
    },
     
    // 更新文本块颜色
    updateTextBlockColor(componentId, colorId) {
      const selectedColor = this.selectedColors[componentId]
      if (selectedColor) {
        this.textBlocks.forEach(block => {
          if (block.componentId === componentId) {
            block.textColor = selectedColor.value
          }
        })
      }
    },
     
    // 更新Data输入
    updateDataInput(component) {
      // 可以在这里添加数据处理逻辑
    },
     
    // 获取剩余字符数
    getRemainingCharacters(component) {
      const currentLength = (component.inputValue && component.inputValue.length) || 0
      const maxLength = this.getDataComponent(component).maxLength || 0
      return maxLength - currentLength
    },
     
    // 获取已上传的图片
    getUploadedImage(component) {
      const imageBlock = this.imageBlocks.find(block => block.componentId === component.name)
      return imageBlock ? imageBlock.uploadedImage : null
    },
    
    // 处理图片上传
    handleImageChange(file, fileList, component) {
      if (file.size > 15 * 1024 * 1024) {
        this.$message.error('文件大小不能超过15MB')
        return false
      }
      
      // 如果没有传入component参数，则查找第一个图片组件（向后兼容）
      const targetComponent = component || this.flatContainerChildren.find(comp => comp.key === 'image')
      if (targetComponent) {
        const imageBlock = this.imageBlocks.find(block => block.componentId === targetComponent.name)
        if (imageBlock) {
          imageBlock.uploadedImage = URL.createObjectURL(file.raw)
        }
      }
    },
    

    
    // 处理删除图片
    handleDeleteImage(component) {
      const imageBlock = this.imageBlocks.find(block => block.componentId === component.name)
      if (imageBlock) {
        imageBlock.uploadedImage = null
      }
    },
    
    // 处理文本鼠标按下事件
    handleTextMouseDown(event, textBlock) {
      event.stopPropagation()
      
      // 设置选中状态
      this.selectedTextBlock = textBlock
      this.selectedImageBlock = null
      
      // 如果可自由放置，则开始拖拽
      if (textBlock.isFreePlacement) {
        this.handleTextDragStart(event, textBlock)
      }
    },
    
    // 处理文档点击事件
    handleDocumentClick(event) {
      // 检查点击是否在预览区域内
      const previewContainer = event.target.closest('.preview-container')
      if (!previewContainer) {
        // 点击在预览区域外，取消所有选中状态
        this.selectedTextBlock = null
        this.selectedImageBlock = null
      }
    },
    
    // 处理图片鼠标按下事件
    handleImageMouseDown(event, imageBlock) {
      event.stopPropagation()
      
      // 设置选中状态
      this.selectedImageBlock = imageBlock
      this.selectedTextBlock = null
      
      // 如果可自由放置，则开始拖拽
      if (imageBlock.isFreePlacement) {
        this.handleImageDragStart(event, imageBlock)
      }
    },
    
    // 开始拖拽文本
    handleTextDragStart(event, textBlock) {
      if (this.isResizing) return
      
      event.stopPropagation()
      event.preventDefault()
      
      this.isDragging = true
      this.currentDraggingBlock = textBlock
      this.currentDraggingType = 'text'
      
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
      
      document.addEventListener('mousemove', this.handleTextDragMove)
      document.addEventListener('mouseup', this.handleTextDragEnd)
    },
    
    // 处理文本拖拽移动
    handleTextDragMove(event) {
      if (!this.isDragging || !this.currentDraggingBlock || this.currentDraggingType !== 'text') return
      
      event.preventDefault()
      
      const deltaX = (event.clientX - this.dragStartX) / this.scaleRatio
      const deltaY = (event.clientY - this.dragStartY) / this.scaleRatio
      
      const textPosition = this.currentDraggingBlock.textPosition
      const blockDimension = this.currentDraggingBlock.dimension
      
      let newX = textPosition.x + deltaX
      let newY = textPosition.y + deltaY
      
      const estimatedTextWidth = (this.currentDraggingBlock.inputValue.length * this.currentDraggingBlock.fontSize * 0.6) * (this.currentDraggingBlock.textScale || 1)
      const estimatedTextHeight = this.currentDraggingBlock.fontSize * 1.2 * (this.currentDraggingBlock.textScale || 1)
      
      newX = Math.max(0, Math.min(newX, blockDimension.width - estimatedTextWidth))
      newY = Math.max(0, Math.min(newY, blockDimension.height - estimatedTextHeight))
      
      textPosition.x = Math.round(newX)
      textPosition.y = Math.round(newY)
      
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
    },
    
    // 结束文本拖拽
    handleTextDragEnd() {
      if (!this.isDragging || this.currentDraggingType !== 'text') return
      
      this.isDragging = false
      this.currentDraggingBlock = null
      this.currentDraggingType = null
      
      this.dragStartX = 0
      this.dragStartY = 0
      
      document.removeEventListener('mousemove', this.handleTextDragMove)
      document.removeEventListener('mouseup', this.handleTextDragEnd)
    },
    
    // 开始拖拽图片
    handleImageDragStart(event, imageBlock) {
      if (this.isResizing) return
      
      event.stopPropagation()
      event.preventDefault()
      
      this.isDragging = true
      this.currentDraggingBlock = imageBlock
      this.currentDraggingType = 'image'
      
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
      
      document.addEventListener('mousemove', this.handleImageDragMove)
      document.addEventListener('mouseup', this.handleImageDragEnd)
    },
    
    // 处理图片拖拽移动
    handleImageDragMove(event) {
      if (!this.isDragging || !this.currentDraggingBlock || this.currentDraggingType !== 'image') return
      
      event.preventDefault()
      
      const deltaX = (event.clientX - this.dragStartX) / this.scaleRatio
      const deltaY = (event.clientY - this.dragStartY) / this.scaleRatio
      
      const imagePosition = this.currentDraggingBlock.imagePosition
      
      let newX = imagePosition.x + deltaX
      let newY = imagePosition.y + deltaY
      
      imagePosition.x = Math.round(newX)
      imagePosition.y = Math.round(newY)
      
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
    },
    
    // 结束图片拖拽
    handleImageDragEnd() {
      if (!this.isDragging || this.currentDraggingType !== 'image') return
      
      const imagePosition = this.currentDraggingBlock.imagePosition
      const blockDimension = this.currentDraggingBlock.dimension
      const imageSize = this.currentDraggingBlock.imageSize
      
      const isCompletelyOutside = 
        imagePosition.x + imageSize.width <= 0 || 
        imagePosition.y + imageSize.height <= 0 || 
        imagePosition.x >= blockDimension.width || 
        imagePosition.y >= blockDimension.height
      
      if (isCompletelyOutside) {
        imagePosition.x = 0
        imagePosition.y = 0
      }
      
      this.isDragging = false
      this.currentDraggingBlock = null
      this.currentDraggingType = null
      
      this.dragStartX = 0
      this.dragStartY = 0
      
      document.removeEventListener('mousemove', this.handleImageDragMove)
      document.removeEventListener('mouseup', this.handleImageDragEnd)
    },
    
    // 开始文本缩放
    handleTextResizeStart(event, direction, textBlock) {
      if (this.isDragging) return
      
      event.stopPropagation()
      event.preventDefault()
      
      this.resizeDirection = direction
      this.isResizing = true
      this.currentResizingBlock = textBlock
      this.currentResizingType = 'text'
      
      this.resizeStartX = event.clientX
      this.resizeStartY = event.clientY
      
      document.addEventListener('mousemove', this.handleTextResizeMove)
      document.addEventListener('mouseup', this.handleTextResizeEnd)
    },
    
    // 处理文本缩放移动
    handleTextResizeMove(event) {
      if (!this.isResizing || !this.currentResizingBlock || this.currentResizingType !== 'text') return
      
      event.preventDefault()
      
      const deltaX = (event.clientX - this.resizeStartX) / this.scaleRatio
      const deltaY = (event.clientY - this.resizeStartY) / this.scaleRatio
      
      let scaleFactor = 1
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        scaleFactor = deltaX > 0 ? 1.02 : 0.98
      } else {
        scaleFactor = deltaY > 0 ? 1.02 : 0.98
      }
      
      switch (this.resizeDirection) {
        case 'top-left':
          scaleFactor = (deltaX < 0 || deltaY < 0) ? 1.02 : 0.98
          break
        case 'top-right':
          scaleFactor = (deltaX > 0 || deltaY < 0) ? 1.02 : 0.98
          break
        case 'bottom-left':
          scaleFactor = (deltaX < 0 || deltaY > 0) ? 1.02 : 0.98
          break
        case 'bottom-right':
          scaleFactor = (deltaX > 0 || deltaY > 0) ? 1.02 : 0.98
          break
      }
      
      const newScale = Math.max(0.1, Math.min(3.0, this.currentResizingBlock.textScale * scaleFactor))
      this.currentResizingBlock.textScale = Math.round(newScale * 100) / 100
      
      this.resizeStartX = event.clientX
      this.resizeStartY = event.clientY
    },
    
    // 结束文本缩放
    handleTextResizeEnd() {
      if (!this.isResizing || this.currentResizingType !== 'text') return
      
      this.isResizing = false
      this.resizeDirection = null
      this.currentResizingBlock = null
      this.currentResizingType = null
      
      this.resizeStartX = 0
      this.resizeStartY = 0
      
      document.removeEventListener('mousemove', this.handleTextResizeMove)
      document.removeEventListener('mouseup', this.handleTextResizeEnd)
    },
    
    // 获取文本宽度
    getTextWidth(textBlock) {
      if (textBlock.isFreePlacement) {
        return textBlock.inputValue.length * textBlock.fontSize * 0.6 * (textBlock.textScale || 1) * this.scaleRatio
      } else {
        const fontSize = this.getAdaptiveFontSize(textBlock)
        return textBlock.inputValue.length * fontSize * 0.6 * this.scaleRatio
      }
    },
    
    // 获取文本高度
    getTextHeight(textBlock) {
      if (textBlock.isFreePlacement) {
        return textBlock.fontSize * 1.2 * (textBlock.textScale || 1) * this.scaleRatio
      } else {
        const fontSize = this.getAdaptiveFontSize(textBlock)
        return fontSize * 1.2 * this.scaleRatio
      }
    },
    
    // 获取自适应字体大小
    getAdaptiveFontSize(textBlock) {
      if (textBlock.isFreePlacement) {
        return textBlock.fontSize
      }
      
      const baseFontSize = textBlock.fontSize * 1.5
      
      const textWidth = textBlock.inputValue.length * baseFontSize * 0.6
      const textHeight = baseFontSize * 1.2
      const availableWidth = textBlock.dimension.width
      const availableHeight = textBlock.dimension.height
      
      const widthScaleFactor = textWidth > availableWidth ? availableWidth / textWidth : 1
      const heightScaleFactor = textHeight > availableHeight ? availableHeight / textHeight : 1
      
      const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor)
      
      const adaptiveFontSize = baseFontSize * scaleFactor
      return Math.max(textBlock.fontSize * 0.3, adaptiveFontSize)
    },
    
    closeDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/newTest.scss";
</style>
