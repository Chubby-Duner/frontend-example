<template>
  <div>
    <div class="placement-container-configuration">
      <div class="placement-container-fields">
        <div class="standard-input-row">
          <div class="standard-title">
            <span>位置</span>
            <span>*</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="定制项的位置"
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
                min="0"
                max="399"
                v-model="currentDesignData.position.x"
                @input="handleRegionInputChangePosition(currentDesignData.position, 'x', $event)"
              ></el-input>
              <div>X</div>
            </div>
            <div style="display: inline-block;text-align: center;margin-left: 10px;">
              <el-input
                type="number"
                placeholder=""
                style="width: 100px;"
                size="small"
                min="0"
                max="399"
                v-model="currentDesignData.position.y"
                @input="handleRegionInputChangePosition(currentDesignData.position, 'y', $event)"
              ></el-input>
              <div>Y</div>
            </div>
            <!-- 错误提示信息 -->
            <div class="error-text" v-if="currentDesignData.position.x < 0 || currentDesignData.position.x > 399 || currentDesignData.position.y < 0 || currentDesignData.position.y > 399">x/y的值应介于 0 和 399 之间</div>
          </div>
        </div>
        <div class="standard-input-row" style="margin-left: 10px;">
          <div class="standard-title">
            <span>尺寸</span>
            <span>*</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="定制项尺寸"
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
                max="400"
                v-model="currentDesignData.dimension.width"
                @input="handleRegionInputChangeDimension(currentDesignData.dimension, 'width', $event)"
              ></el-input>
              <div>宽度</div>
            </div>
            <div style="display: inline-block;text-align: center;margin-left: 10px;">
              <el-input
                type="number"
                placeholder=""
                style="width: 100px;"
                size="small"
                min="1"
                max="400"
                v-model="currentDesignData.dimension.height"
                @input="handleRegionInputChangeDimension(currentDesignData.dimension, 'height', $event)"
              ></el-input>
              <div>高度</div>
            </div>
            <!-- 错误提示信息 -->
            <div class="error-text" v-if="currentDesignData.dimension.width < 0 || currentDesignData.dimension.width > 400 || currentDesignData.dimension.height < 0 || currentDesignData.dimension.height > 400">宽度/高度的值应介于 0 和 400 之间</div>
          </div>
        </div>
        <div class="standard-input-row">
          <div class="standard-title">
            <span>将设计居中</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="将设计水平或垂直居中"
              placement="right"
            >
              <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
            </el-tooltip>
          </div>
          <div>
            <div style="display: inline-block;text-align: center;" @click="setHorizontalCenter">
              <div class="placement-btn-box">
                <svg class="icon-align-vertical-base" width="24px" height="24px" viewBox="0 0 24 24"><path d="M21.312,24 L24,24 L24,21.312 L21.312,21.312 L21.312,24 Z M21.312,18.688 L24,18.688 L24,16 L21.312,16 L21.312,18.688 Z M21.312,13.312 L24,13.312 L24,10.6864762 L21.312,10.6864762 L21.312,13.312 Z M21.312,8 L24,8 L24,5.312 L21.312,5.312 L21.312,8 Z M21.312,2.688 L24,2.688 L24,0 L21.312,0 L21.312,2.688 Z M16,24 L18.688,24 L18.688,21.312 L16,21.312 L16,24 Z M16,13.312 L18.688,13.312 L18.688,10.6864762 L16,10.6864762 L16,13.312 Z M16,2.688 L18.688,2.688 L18.688,0 L16,0 L16,2.688 Z M5.312,24 L8,24 L8,21.312 L5.312,21.312 L5.312,24 Z M5.312,13.312 L8,13.312 L8,10.6864762 L5.312,10.6864762 L5.312,13.312 Z M5.312,2.688 L8,2.688 L8,0 L5.312,0 L5.312,2.688 Z M0,24 L2.688,24 L2.688,21.312 L0,21.312 L0,24 Z M0,18.688 L2.688,18.688 L2.688,16 L0,16 L0,18.688 Z M0,13.312 L2.688,13.312 L2.688,10.6864762 L0,10.6864762 L0,13.312 Z M0,8 L2.688,8 L2.688,5.312 L0,5.312 L0,8 Z M0,2.688 L2.688,2.688 L2.688,0 L0,0 L0,2.688 Z" id="Fill-183" fill="#7FC2BB"></path><polygon id="Fill-183" fill="#002F36" points="10.688 24 13.3135238 24 13.3135238 0 10.688 0"></polygon></svg>
              </div>
              <div>水平</div>
            </div>
            <div style="display: inline-block;text-align: center;margin-left: 10px;" @click="setVerticalCenter">
              <div class="placement-btn-box">
                <svg class="icon-align-vertical-base" width="24px" height="24px" viewBox="0 0 24 24"><path d="M21.312,24 L24,24 L24,21.312 L21.312,21.312 L21.312,24 Z M21.312,18.688 L24,18.688 L24,16 L21.312,16 L21.312,18.688 Z M21.312,8 L24,8 L24,5.312 L21.312,5.312 L21.312,8 Z M21.312,2.688 L24,2.688 L24,0 L21.312,0 L21.312,2.688 Z M16,24 L18.688,24 L18.688,21.312 L16,21.312 L16,24 Z M16,2.688 L18.688,2.688 L18.688,0 L16,0 L16,2.688 Z M10.688,24 L13.3135238,24 L13.3135238,21.312 L10.688,21.312 L10.688,24 Z M10.688,18.688 L13.3135238,18.688 L13.3135238,16 L10.688,16 L10.688,18.688 Z M10.6864762,8 L13.312,8 L13.312,5.312 L10.6864762,5.312 L10.6864762,8 Z M10.6864762,2.688 L13.312,2.688 L13.312,0 L10.6864762,0 L10.6864762,2.688 Z M5.312,24 L8,24 L8,21.312 L5.312,21.312 L5.312,24 Z M5.312,2.688 L8,2.688 L8,0 L5.312,0 L5.312,2.688 Z M0,24 L2.688,24 L2.688,21.312 L0,21.312 L0,24 Z M0,18.688 L2.688,18.688 L2.688,16 L0,16 L0,18.688 Z M0,8 L2.688,8 L2.688,5.312 L0,5.312 L0,8 Z M0,2.688 L2.688,2.688 L2.688,0 L0,0 L0,2.688 Z" id="Fill-179" fill="#7FC2BB"></path><polygon id="Fill-179" fill="#002F36" points="0 13.3135238 24 13.3135238 24 10.688 0 10.688"></polygon></svg>
              </div>
              <div>垂直</div>
            </div>
          </div>
        </div>
        <!-- 当时文本的时候显示 type === ContainerComponent -->
        <div v-if="currentDesignType === 'ContainerComponent'" class="standard-input-row" style="margin-left: 20px;">
          <div class="standard-title">
            <span>输入放置位置</span>
            <el-tooltip
              class="commissionTips"
              effect="dark"
              content="“静态放置”将限制买家放置其自定义输入内容的位置，“自由放置”将使买家能够在分配的区域内缩放、旋转和移动其自定义输入内容。"
              placement="right"
            >
              <span><i class="el-icon-question" style="margin-left: 10px;font-size: 18px;" /></span>
            </el-tooltip>
          </div>
          <div>
            <el-radio-group v-model="currentDesignData.isFreePlacement">
              <el-radio :label="true">自由放置</el-radio>
              <el-radio :label="false">静态放置</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="placement-container-preview">
        <div class="editor">
            <!-- 左侧编辑区域 -->
          <div
            class="canvas-container"
            :style="{
              width: scaledBackgroundWidth + 'px',
              height: scaledBackgroundWidth + 'px',
            }"
          >
            <!-- 横向标尺 -->
            <div class="ruler-x" :style="{ width: scaledBackgroundWidth + 'px' }">
              <div
                v-for="n in horizontalTicks + 1"
                :key="n"
                class="tick"
                :style="{ left: (n - 1) * scaledRulerInterval + 'px' }"
              >
                <!-- 每隔 rulerNumberInterval 显示数字 -->
                <span v-if="((n - 1) * rulerInterval) % rulerNumberInterval === 0">
                  {{ (n - 1) * rulerInterval }}
                </span>
              </div>
            </div>
            <!-- 纵向标尺 -->
            <div class="ruler-y" :style="{ height: scaledBackgroundWidth + 'px' }">
              <div
                v-for="n in verticalTicks + 1"
                :key="n"
                class="tick"
                :style="{ top: (n - 1) * scaledRulerInterval + 'px' }"
              >
                <!-- 每隔 rulerNumberInterval 显示数字 -->
                <span v-if="((n - 1) * rulerInterval) % rulerNumberInterval === 0">
                  {{ (n - 1) * rulerInterval }}
                </span>
              </div>
            </div>
            <!-- 背景及区域 -->
            <div
              ref="backgroundCanvas"
              class="background"
              :style="{
                width: scaledBackgroundWidth + 'px',
                height: scaledBackgroundWidth + 'px',
                backgroundImage: backgroundImageUrl,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }"
            >
              <div
                class="region"
                :style="{
                  left: currentDesignData.position.x * scaleRatio + 'px',
                  top: currentDesignData.position.y * scaleRatio + 'px',
                  width: currentDesignData.dimension.width * scaleRatio + 'px',
                  height: currentDesignData.dimension.height * scaleRatio + 'px',
                  zIndex: 9999,
                }"
                @mousedown="startDrag($event)"
              >
                <!-- 拖动调整宽高的四个手柄 -->
                <div
                  class="resize-handle top"
                  @mousedown="handleResizeStart($event, 'top')"
                />
                <div
                  class="resize-handle right"
                  @mousedown="handleResizeStart($event, 'right')"
                />
                <div
                  class="resize-handle bottom"
                  @mousedown="handleResizeStart($event, 'bottom')"
                />
                <div
                  class="resize-handle left"
                  @mousedown="handleResizeStart($event, 'left')"
                />
                <!-- 四个角的手柄 -->
                <div
                  class="resize-handle top-left"
                  @mousedown="handleResizeStart($event, 'top-left')"
                />
                <div
                  class="resize-handle top-right"
                  @mousedown="handleResizeStart($event, 'top-right')"
                />
                <div
                  class="resize-handle bottom-left"
                  @mousedown="handleResizeStart($event, 'bottom-left')"
                />
                <div
                  class="resize-handle bottom-right"
                  @mousedown="handleResizeStart($event, 'bottom-right')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePositionComponent',
  props: {
    designData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 背景图片
    backgroundImageUrl: {
      type: String,
      default: ''
    },
    // 用于判断是否为文本块定制 是的话才显示 《输入放置位置(isFreePlacement)》 这个选项 
    currentDesignType: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 横向刻度数量（动态生成）
    horizontalTicks() {
      return Math.ceil(this.backgroundWidth / this.rulerInterval)
    },
    // 纵向刻度数量（动态生成）
    verticalTicks() {
      return Math.ceil(this.backgroundHeight / this.rulerInterval)
    },
    // 背景缩放比例（适配固定区域）
    scaleRatio() {
      return Math.min(
        this.displayWidth / this.backgroundWidth,
        this.displayHeight / this.backgroundHeight
      )
      // return Math.min(ratio, 0.5) // 将缩放倍率的最大值限制在 0.4（或根据需要调整）
    },
    // 缩放后的刻度间隔
    scaledRulerInterval() {
      return this.rulerInterval * this.scaleRatio // 原始间隔 * 缩放比例
    },
    // 缩放后的背景宽高
    scaledBackgroundWidth() {
      return this.backgroundWidth * this.scaleRatio
    },
    scaledBackgroundHeight() {
      return this.backgroundHeight * this.scaleRatio
    }
  },
  data() {
    return {
      currentDesignData: this.designData,

      backgroundWidth: 400,
      backgroundHeight: 400, // 画布默认显示400

      rulerInterval: 20, // 刻度间隔
      displayWidth: 400, // 背景显示区域宽度（固定）
      displayHeight: 400, // 背景显示区域高度（固定）
      rulerNumberInterval: 120, // 刻度数字间隔

      // 拖动相关的状态变量
      dragStartX: 0, // 开始拖动时鼠标的X坐标
      dragStartY: 0, // 开始拖动时鼠标的Y坐标
      dragOffsetX: 0, // 鼠标相对于区域左上角的X轴偏移量
      dragOffsetY: 0, // 鼠标相对于区域左上角的Y轴偏移量
      isDragging: false, // 是否正在拖动状态

      // 调整大小相关的状态变量
      resizeStartX: 0, // 开始调整大小时鼠标的X坐标
      resizeStartY: 0, // 开始调整大小时鼠标的Y坐标
      resizeDirection: null, // 当前调整尺寸的方向（'top'|'right'|'bottom'|'left'|'top-left'|'top-right'|'bottom-left'|'bottom-right'）
      isResizing: false, // 标记是否正在调整大小状态

      // 记录区域调整前的初始状态
      regionStartWidth: 0, // 开始调整时区域的初始宽度
      regionStartHeight: 0, // 开始调整时区域的初始高度
      regionStartX: 0, // 开始调整时区域的初始X坐标
      regionStartY: 0, // 开始调整时区域的初始Y坐标
    }
  },
  methods: {
    // 调整水平居中
    setHorizontalCenter() {
      this.currentDesignData.position.x = Math.round((this.backgroundWidth - this.currentDesignData.dimension.width) / 2)
    },
    // 调整垂直居中
    setVerticalCenter() {
      this.currentDesignData.position.y = Math.round((this.backgroundHeight - this.currentDesignData.dimension.height) / 2)
    },
    /**
     * 开始调整区域大小的处理函数
     * @param {Event} event - 鼠标事件对象
     * @param {number} index - 当前操作的区域索引
     * @param {string} direction - 调整方向，可能的值：'top'|'right'|'bottom'|'left'|'top-left'|'top-right'|'bottom-left'|'bottom-right'
     */
    handleResizeStart(event, direction) {
      // 阻止事件冒泡和默认行为，防止拖动时选中文本等
      event.stopPropagation()
      event.preventDefault()

      // 设置当前选中的区域索引和调整方向
      this.resizeDirection = direction
      this.isResizing = true // 标记正在调整大小状态

      // 获取当前操作的区域对象
      // const region = this.customInfo.custom_list[this.selectedRegionIndex].region_map
      const position = this.currentDesignData.position
      const dimension = this.currentDesignData.dimension

      // 记录调整开始时的初始值
      // 使用 Number() 确保转换为数字类型，避免字符串计算导致的问题
      this.resizeStartX = event.clientX // 鼠标起始X坐标
      this.resizeStartY = event.clientY // 鼠标起始Y坐标
      this.regionStartWidth = Number(dimension.width) // 区域初始宽度
      this.regionStartHeight = Number(dimension.height) // 区域初始高度
      this.regionStartX = Number(position.x) // 区域初始X坐标
      this.regionStartY = Number(position.y) // 区域初始Y坐标

      // 绑定事件到 document
      document.addEventListener('mousemove', this.handleResizeMove)
      document.addEventListener('mouseup', this.handleResizeEnd)
    },
    /**
     * 处理区域大小调整时的移动事件
     * @param {Event} event - 鼠标事件对象
     */
    handleResizeMove(event) {
      // 如果不是调整状态或没有选中区域，则直接返回
      if (!this.isResizing || this.selectedRegionIndex === null) return

      event.preventDefault()

      // 获取当前操作的区域对象
      // const region = this.customInfo.custom_list[this.selectedRegionIndex].region_map
      const position = this.currentDesignData.position
      const dimension = this.currentDesignData.dimension

      // 计算鼠标移动的距离，需要考虑画布的缩放比例
      const deltaX = (event.clientX - this.resizeStartX) / this.scaleRatio // X轴移动距离
      const deltaY = (event.clientY - this.resizeStartY) / this.scaleRatio // Y轴移动距离

      // 预先声明变量，避免在case中声明（ESLint规则要求）
      let newWidth, newHeight, newX, newY // 用于存储计算后的新宽度、高度和位置
      let deltaWidth, deltaHeight // 用于存储宽度和高度的变化量

      switch (this.resizeDirection) {
        case 'right':
          // 向右拖动时只调整宽度，保持最小宽度20px
          newWidth = Math.max(20, this.regionStartWidth + deltaX)
          if (position.x + newWidth <= this.backgroundWidth) { // 确保不超出背景右边界
            dimension.width = newWidth
          }
          break

        case 'bottom':
          // 向下拖动时只调整高度，保持最小高度20px
          newHeight = Math.max(20, this.regionStartHeight + deltaY)
          if (position.y + newHeight <= this.backgroundHeight) { // 确保不超出背景底部边界
            dimension.height = newHeight
          }
          break

        case 'left':
          // 向左拖动需要同时调整x坐标和宽度
          deltaWidth = Math.min(deltaX, this.regionStartWidth - 20) // 限制最小宽度
          newX = Math.max(0, this.regionStartX + deltaWidth) // 确保不超出左边界
          newWidth = this.regionStartWidth - (newX - this.regionStartX) // 计算新宽度

          if (newX >= 0) {
            position.x = newX
            dimension.width = newWidth
          }
          break

        case 'top':
          deltaHeight = Math.min(deltaY, this.regionStartHeight - 20)
          newY = Math.max(0, this.regionStartY + deltaHeight)
          newHeight = this.regionStartHeight - (newY - this.regionStartY)

          if (newY >= 0) {
            position.y = newY
            dimension.height = newHeight
          }
          break

        case 'top-left':
          deltaWidth = Math.min(deltaX, this.regionStartWidth - 20)
          deltaHeight = Math.min(deltaY, this.regionStartHeight - 20)
          newX = Math.max(0, this.regionStartX + deltaWidth)
          newY = Math.max(0, this.regionStartY + deltaHeight)
          newWidth = this.regionStartWidth - (newX - this.regionStartX)
          newHeight = this.regionStartHeight - (newY - this.regionStartY)

          if (newX >= 0 && newY >= 0) {
            position.x = newX
            position.y = newY
            dimension.width = newWidth
            dimension.height = newHeight
          }
          break

        case 'top-right':
          newWidth = Math.max(20, this.regionStartWidth + deltaX)
          deltaHeight = Math.min(deltaY, this.regionStartHeight - 20)
          newY = Math.max(0, this.regionStartY + deltaHeight)
          newHeight = this.regionStartHeight - (newY - this.regionStartY)

          if (newY >= 0 && position.x + newWidth <= this.backgroundWidth) {
            dimension.width = newWidth
            position.y = newY
            dimension.height = newHeight
          }
          break

        case 'bottom-left':
          deltaWidth = Math.min(deltaX, this.regionStartWidth - 20)
          newX = Math.max(0, this.regionStartX + deltaWidth)
          newWidth = this.regionStartWidth - (newX - this.regionStartX)
          newHeight = Math.max(20, this.regionStartHeight + deltaY)

          if (newX >= 0 && position.y + newHeight <= this.backgroundHeight) {
            position.x = newX
            dimension.width = newWidth
            dimension.height = newHeight
          }
          break

        case 'bottom-right':
          newWidth = Math.max(20, this.regionStartWidth + deltaX)
          newHeight = Math.max(20, this.regionStartHeight + deltaY)

          if (position.x + newWidth <= this.backgroundWidth &&
              position.y + newHeight <= this.backgroundHeight) {
            dimension.width = newWidth
            dimension.height = newHeight
          }
          break
      }

      // 确保所有值都是整数，避免小数点导致的显示问题
      dimension.width = Math.round(dimension.width)
      dimension.height = Math.round(dimension.height)
      position.x = Math.round(position.x)
      position.y = Math.round(position.y)
    },
    /**
     * 结束区域大小调整的处理函数
     * 清理调整状态并移除事件监听器
     */
    handleResizeEnd() {
      // 如果不是调整状态，直接返回
      if (!this.isResizing) return

      // 重置调整大小相关的状态
      this.isResizing = false
      this.resizeDirection = null

      // 清理调整大小过程中使用的临时变量
      this.resizeStartX = 0
      this.resizeStartY = 0
      this.regionStartWidth = 0
      this.regionStartHeight = 0
      this.regionStartX = 0
      this.regionStartY = 0

      // 移除事件监听器，防止内存泄漏和重复绑定
      document.removeEventListener('mousemove', this.handleResizeMove)
      document.removeEventListener('mouseup', this.handleResizeEnd)
    },
    /**
     * 开始拖动区域
     * @param {number} index - 当前操作的区域索引
     * @param {Event} event - 鼠标事件对象
     */
    startDrag(event) {
      // 如果正在调整大小，则不允许拖动
      if (this.isResizing) return

      const position = this.currentDesignData.position
      const rect = this.$refs.backgroundCanvas.getBoundingClientRect()

      // 记录拖动开始时的状态
      this.dragStartX = event.clientX
      this.dragStartY = event.clientY
      // 记录鼠标相对于区域左上角的偏移量
      this.dragOffsetX = event.clientX - (position.x * this.scaleRatio + rect.left)
      this.dragOffsetY = event.clientY - (position.y * this.scaleRatio + rect.top)
      this.isDragging = true

      // 绑定事件到document，确保拖动时不会丢失鼠标事件
      document.addEventListener('mousemove', this.onDragMove)
      document.addEventListener('mouseup', this.endDrag)
    },
    /**
     * 处理拖动过程中的移动事件
     * @param {Event} event - 鼠标事件对象
     */
     onDragMove(event) {
      if (!this.isDragging) return

      event.preventDefault() // 添加这行，防止拖动时选中其他内容

      // const region = this.customInfo.custom_list[this.selectedRegionIndex].region_map
      const position = this.currentDesignData.position
      const dimension = this.currentDesignData.dimension

      const rect = this.$refs.backgroundCanvas.getBoundingClientRect()

      // 计算新位置（考虑缩放比例和画布偏移）
      let newX = (event.clientX - this.dragOffsetX - rect.left) / this.scaleRatio
      let newY = (event.clientY - this.dragOffsetY - rect.top) / this.scaleRatio

      // 限制在背景范围内
      newX = Math.max(0, Math.min(newX, this.backgroundWidth - dimension.width))
      newY = Math.max(0, Math.min(newY, this.backgroundHeight - dimension.height))

      // 更新区域位置，使用Math.round确保整数值
      position.x = Math.round(newX)
      position.y = Math.round(newY)
    },

    /**
     * 结束拖动区域的处理函数
     * 清理拖动状态并移除事件监听器
     */
    endDrag() {
      // 重置拖动状态
      this.isDragging = false

      // 移除事件监听器，防止内存泄漏
      document.removeEventListener('mousemove', this.onDragMove)
      document.removeEventListener('mouseup', this.endDrag)

      // 清理拖动相关的临时变量
      this.dragStartX = 0
      this.dragStartY = 0
      this.dragOffsetX = 0
      this.dragOffsetY = 0
    },
     /**
     * 处理区域坐标输入变化
     * @param {Object} position - 当前操作的区域对象的位置信息
     * @param {string} type - 变化的属性类型 ('x'|'y')
     * @param {number} value - 新的值
     */
    handleRegionInputChangePosition(position, type, value) {
      console.log("🚀 ~ handleRegionInputChangePosition ~ value:", value);
      // 转换为数字类型
      let newValue = Number(value)

      // 确保值不小于0
      newValue = Math.max(0, newValue)
      console.log("🚀 ~ handleRegionInputChangePosition ~ newValue:", newValue);

      switch (type) {
        case 'x':
          // x坐标不能导致区域超出右边界
          newValue = Math.min(newValue, this.backgroundWidth - this.currentDesignData.dimension.width)
          break
        case 'y':
          // y坐标不能导致区域超出下边界
          newValue = Math.min(newValue, this.backgroundHeight - this.currentDesignData.dimension.height)
          break
      }

      // 更新值
      this.currentDesignData.position[type] = Math.round(newValue)
    },
    /**
     * 处理区域尺寸的输入变化
     * @param {Object} dimension - 当前操作的区域对象的尺寸信息
     * @param {string} type - 变化的属性类型 ('width'|'height')
     * @param {number} value - 新的值
     */
    handleRegionInputChangeDimension(dimension, type, value) {
      // 转换为数字类型
      let newValue = Number(value)

      // 确保值不小于0
      newValue = Math.max(0, newValue)

      switch (type) {
        case 'width':
          // x坐标不能导致区域超出右边界
          newValue = Math.min(newValue, this.backgroundWidth - this.currentDesignData.position.x)
          break
        case 'height':
          // y坐标不能导致区域超出下边界
          newValue = Math.min(newValue, this.backgroundHeight - this.currentDesignData.position.y)
          break
      }

      // 更新值
      this.currentDesignData.dimension[type] = Math.round(newValue)
    },
  }
}
</script>

<style lang="scss" scoped>
.placement-container-configuration {
  grid-column-gap: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;

  .placement-container-fields {
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
  }
}

.placement-btn-box {
  display: inline-block;
  border: 1px solid #aab7b8;
  padding: 4px 10px 0;
  text-align: center;
  width: 60px;
  cursor: pointer;
}

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

.editor {
  display: flex;
}
.canvas-container {
  position: relative;
  /* width: 600px;
  height: 600px; */
  max-width: 600px;
  margin-right: 20px;
}
.ruler-x {
  position: relative;
  left: 20px;
  height: 20px; /* 横向标尺高度 */
  background: #f0f0f0;
}

.ruler-x .tick {
  position: absolute;
  width: 1px; /* 每个刻度的宽度 */
  height: 100%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.ruler-x .tick span {
  position: absolute;
  bottom: 0;
  width: 30px;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.ruler-y {
  position: relative;
  width: 20px; /* 纵向标尺宽度 */
  background: #f0f0f0;
}

.ruler-y .tick {
  position: absolute;
  height: 1px; /* 每个刻度的高度 */
  width: 100%;
  background: #ccc;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.ruler-y .tick span {
  position: absolute;
  right: 0;
  width: 30px;
  font-size: 12px;
  color: #666;
}

.background {
  position: absolute;
  border: 1px dashed #333;
  top: 20px;
  left: 20px;
}
.region {
  position: absolute;
  border: 1px solid #4caf50;
  background: rgba(76, 175, 80, 0.2);
  cursor: pointer;
}
.region.active {
  border: 1px solid #fdc999;
  background: rgba(255, 87, 34, 0.2);
}

.resize-handle {
  position: absolute;
  background-color: #4caf50;
  width: 8px;
  height: 8px;
  cursor: pointer;
}

/* 边框调整 */
.resize-handle.top {
  top: -5px;
  left: 50%;
  right: 0;
  cursor: ns-resize;
}

.resize-handle.right {
  top: 50%;
  right: -5px;
  bottom: 0;
  cursor: ew-resize;
}

.resize-handle.bottom {
  bottom: -5px;
  left: 50%;
  right: 0;
  cursor: ns-resize;
}

.resize-handle.left {
  top: 50%;
  left: -5px;
  bottom: 0;
  cursor: ew-resize;
}

/* 四个角的手柄 */
.resize-handle.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.resize-handle.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}

.resize-handle.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.resize-handle.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

.error-text {
  color: red;
}
</style>