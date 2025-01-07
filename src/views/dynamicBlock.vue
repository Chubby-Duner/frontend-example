<template>
<div id="app">
  <div class="editor">
    <!-- 左侧编辑区域 -->
    <div class="canvas-container">
      <!-- 横向标尺 -->
      <div class="ruler-x" :style="{ width: scaledBackgroundWidth + 'px' }">
        <div
          v-for="n in horizontalTicks + 1"
          :key="n"
          class="tick"
          :style="{ left: (n - 1) * rulerInterval * scaleRatio + 'px' }"
        >
          <!-- 每隔 rulerNumberInterval 显示数字 -->
          <span v-if="((n - 1) * rulerInterval) % rulerNumberInterval === 0">
            {{ (n - 1) * rulerInterval }}
          </span>
        </div>
      </div>
      <!-- 纵向标尺 -->
      <div class="ruler-y" :style="{ height: scaledBackgroundHeight + 'px' }">
        <div
          v-for="n in verticalTicks + 1"
          :key="n"
          class="tick"
          :style="{ top: (n - 1) * rulerInterval * scaleRatio + 'px' }"
        >
          <!-- 每隔 rulerNumberInterval 显示数字 -->
          <span v-if="((n - 1) * rulerInterval) % rulerNumberInterval === 0">
            {{ (n - 1) * rulerInterval }}
          </span>
        </div>
      </div>
      <!-- 背景及区域 -->
      <div
        class="background"
        :style="{ 
          width: scaledBackgroundWidth - 20 + 'px',
          height: scaledBackgroundHeight - 20 + 'px',
          backgroundImage: backgroundImage,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }"
      >
        <div
          v-for="(region, index) in regions"
          :key="index"
          class="region"
          :class="{ active: selectedRegionIndex === index }"
          :style="{
            left: region.x * scaleRatio + 'px',
            top: region.y * scaleRatio + 'px',
            width: region.width * scaleRatio + 'px',
            height: region.height * scaleRatio + 'px',
            zIndex: selectedRegionIndex === index ? 9999 : 0,
          }"
          @click="selectRegion(index)"
          @mousedown="startDrag(index, $event)"
        >
          <!-- 拖动调整宽高的四个手柄 -->
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle top" 
            @mousedown="handleResizeStart($event, index, 'top')"
          ></div>
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle right" 
            @mousedown="handleResizeStart($event, index, 'right')"
          ></div>
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle bottom" 
            @mousedown="handleResizeStart($event, index, 'bottom')"
          ></div>
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle left" 
            @mousedown="handleResizeStart($event, index, 'left')"
          ></div>
          <!-- 四个角的手柄 -->
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle top-left" 
            @mousedown="handleResizeStart($event, index, 'top-left')"
          ></div>
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle top-right" 
            @mousedown="handleResizeStart($event, index, 'top-right')"
          ></div>
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle bottom-left" 
            @mousedown="handleResizeStart($event, index, 'bottom-left')"
          ></div>
          <div
            v-if="selectedRegionIndex === index"
            class="resize-handle bottom-right" 
            @mousedown="handleResizeStart($event, index, 'bottom-right')"
          ></div>
      </div>
      </div>
    </div>

    <!-- 右侧控制面板 -->
    <div class="controls">
      <!-- 上传背景图 -->
      <label for="upload">
        上传背景图：
        <input type="file" id="upload" @change="updateBackground" />
      </label>
      <el-button type="primary" size="small" @click="addRegion">添加区域</el-button>
      <div
        v-for="(region, index) in regions"
        :key="index"
        class="control-panel"
        :class="{ active: selectedRegionIndex === index }"
        @click="selectRegion(index)"
      >
        <h4>
          定制区域{{ index + 1 }}
          <el-button type="danger" size="small" @click="deleteRegion(index)">删除</el-button>
        </h4>
        <label>
          X:
          <el-input style="width: 200px" type="number" v-model.number="region.x" />
        </label>
        <label>
          Y:
          <el-input style="width: 200px" type="number" v-model.number="region.y" />
        </label>
        <label>
          宽:
          <el-input style="width: 200px" type="number" v-model.number="region.width" />
        </label>
        <label>
          高:
          <el-input style="width: 200px" type="number" v-model.number="region.height" />
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      // 动态背景图 URL
      backgroundImage: "", // 默认空，用户上传后设置此值
      // 背景图片尺寸
      backgroundWidth: 800,
      backgroundHeight: 800,  // 改成接口获取尺寸， 如果是编辑只有url,可能要调用方法获取
      // 定制区域
      regions: [
        { x: 110, y: 110, width: 100, height: 100  },
        { x: 200, y: 200, width: 100, height: 100  },
      ],
      // 当前选中的区域索引
      selectedRegionIndex: null,
      rulerInterval: 60, // 刻度间隔
      displayWidth: 800, // 背景显示区域宽度（固定）
      displayHeight: 600, // 背景显示区域高度（固定）
      rulerNumberInterval: 300, // 刻度数字间隔
      dragStartX: 0,
      dragStartY: 0,
      dragOffsetX: 0,
      dragOffsetY: 0,
      isDragging: false,
      resizeStartX: 0,
      resizeStartY: 0,
      resizeDirection: null, // 当前调整尺寸的方向
      isResizing: false, // 标记是否正在调整大小
    }
  },
  computed: {
    // 横向刻度数量（动态生成）
    horizontalTicks() {
      return Math.ceil(this.backgroundWidth / this.rulerInterval);
    },
    // 纵向刻度数量（动态生成）
    verticalTicks() {
      return Math.ceil(this.backgroundHeight / this.rulerInterval);
    },
    // 背景缩放比例（适配固定区域）
    scaleRatio() {
      return Math.min(
        this.displayWidth / this.backgroundWidth,
        this.displayHeight / this.backgroundHeight
      );
    },
    // 缩放后的背景宽高
    scaledBackgroundWidth() {
      return this.backgroundWidth * this.scaleRatio;
    },
    scaledBackgroundHeight() {
      return this.backgroundHeight * this.scaleRatio;
    },
    // 计算拖动的最大 X 和 Y 范围（背景区域的宽度和高度限制）
    maxDragX() {
      const width = this.regions[this.selectedRegionIndex] ? this.regions[this.selectedRegionIndex].width : 0
      return (this.backgroundWidth - width) * this.scaleRatio;
    },
    maxDragY() {
      const height = this.regions[this.selectedRegionIndex] ? this.regions[this.selectedRegionIndex].height : 0
      return (this.backgroundHeight - height) * this.scaleRatio;
    },
  },
  methods: {
    // 添加区域
    addRegion() {
      this.regions.push({ x: 0, y: 0, width: 100, height: 100 });
      this.selectedRegionIndex = this.regions.length - 1;
    },
    // 删除区域
    deleteRegion(index) {
      this.regions.splice(index, 1);
      this.selectedRegionIndex = null;
    },
    // 选中区域
    selectRegion(index) {
      this.selectedRegionIndex = index;
    },
    // 更新背景图片
    updateBackground(event) {
      const file = event.target.files[0];
      console.log("🚀 ~ updateBackground ~ file:", file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
      }
    },
    // 拖动开始
    startDrag(index, event) {
      console.log("drag");
      if (this.isResizing) return; // 如果正在调整大小，则不允许拖动

      if (this.selectedRegionIndex !== index) {
        this.selectedRegionIndex = index;
      }
      const region = this.regions[index];
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.dragOffsetX = event.clientX - region.x * this.scaleRatio;
      this.dragOffsetY = event.clientY - region.y * this.scaleRatio;
      this.isDragging = true;

      // 绑定鼠标移动事件
      document.addEventListener("mousemove", this.onDragMove);
      document.addEventListener("mouseup", this.endDrag);
    },
    // 拖动过程中更新区域位置
    onDragMove(event) {
      if (this.isDragging) {
        const region = this.regions[this.selectedRegionIndex];
        
        // 计算新位置
        let newX = (event.clientX - this.dragOffsetX) / this.scaleRatio;
        console.log("🚀 ~ onDragMove ~ newX:", newX);
        let newY = (event.clientY - this.dragOffsetY) / this.scaleRatio;
        console.log("🚀 ~ onDragMove ~ newY:", newY);

        // 限制在背景内拖动
        newX = Math.max(0, Math.min(newX, this.backgroundWidth - region.width));
        newY = Math.max(0, Math.min(newY, this.backgroundHeight - region.height));

        // 更新区域位置
        region.x = Math.trunc(newX);
        region.y = Math.trunc(newY);
      }
    },
    // 拖动结束
    endDrag() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.onDragMove);
      document.removeEventListener("mouseup", this.endDrag);
    },
     // 调整大小
     handleResizeStart(event, index, direction) {
      console.log('resize')

      this.selectedRegionIndex = index;
      this.resizeStartX = event.clientX;
      this.resizeStartY = event.clientY;
      this.resizeDirection = direction;
      this.isResizing = true; // 标记正在调整大小

      document.addEventListener("mousemove", this.handleResizeMove);
      document.addEventListener("mouseup", this.handleResizeEnd);
    },
    handleResizeMove(event) {
      const region = this.regions[this.selectedRegionIndex];
      console.log("🚀 ~ handleResizeMove ~ region:", region);
      const deltaX = (event.clientX - this.resizeStartX) / this.scaleRatio;
      console.log("🚀 ~ handleResizeMove ~ deltaX:", deltaX);
      const deltaY = (event.clientY - this.resizeStartY) / this.scaleRatio;
      console.log("🚀 ~ handleResizeMove ~ deltaY:", deltaY);

      let newWidth, newHeight, newX, newY;

      console.log("🚀 ~ handleResizeMove ~ this.resizeDirection:", this.resizeDirection);
      switch (this.resizeDirection) {
        case "top":
          newHeight = region.height - deltaY;
          newY = region.y + deltaY;
          if (newHeight >= 20 && newY >= 0) {
            region.height = newHeight;
            region.y = newY;
          }
          break;
        case "bottom":
          newHeight = region.height + deltaY;
          if (newHeight >= 20 && newHeight <= this.backgroundHeight - region.y) {
            region.height = newHeight;
          }
          break;
        case "left":
          newWidth = region.width - deltaX;
          newX = region.x + deltaX;
          if (newWidth >= 20 && newX >= 0) {
            region.width = newWidth;
            region.x = newX;
          }
          break;
        case "right":
          newWidth = region.width + deltaX;
          if (newWidth >= 20 && newWidth <= this.backgroundWidth - region.x) {
            region.width = newWidth;
          }
          break;
        case "top-left":
          newWidth = region.width - deltaX;
          newHeight = region.height - deltaY;
          newX = region.x + deltaX;
          newY = region.y + deltaY;
          if (newWidth >= 20 && newHeight >= 20 && newX >= 0 && newY >= 0) {
            region.width = newWidth;
            region.height = newHeight;
            region.x = newX;
            region.y = newY;
          }
          break;
        case "top-right":
          newWidth = region.width + deltaX;
          newHeight = region.height - deltaY;
          newY = region.y + deltaY;
          if (newWidth >= 20 && newHeight >= 20 && newY >= 0) {
            region.width = newWidth;
            region.height = newHeight;
            region.y = newY;
          }
          break;
        case "bottom-left":
          newWidth = region.width - deltaX;
          newHeight = region.height + deltaY;
          newX = region.x + deltaX;
          if (newWidth >= 20 && newHeight >= 20 && newX >= 0) {
            region.width = newWidth;
            region.height = newHeight;
            region.x = newX;
          }
          break;
        case "bottom-right":
          newWidth = region.width + deltaX;
          newHeight = region.height + deltaY;
          console.log('🚀 ~ handleResizeMove ~ newWidth:', newWidth)

          if (newWidth >= 20 && newHeight >= 20 && newWidth <= this.backgroundWidth - region.x && newHeight <= this.backgroundHeight - region.y) {
            region.width = newWidth;
            region.height = newHeight;
          }
          break;
      }


      // 防止宽度和高度超过背景的边界
      if (region.x + region.width > this.backgroundWidth) {
        region.width = this.backgroundWidth - region.x;
      }
      if (region.y + region.height > this.backgroundHeight) {
        region.height = this.backgroundHeight - region.y;
      }

      this.resizeStartX = event.clientX;
      this.resizeStartY = event.clientY;
    },
    handleResizeEnd() {
      document.removeEventListener("mousemove", this.handleResizeMove);
      document.removeEventListener("mouseup", this.handleResizeEnd);
      this.isResizing = false; // 恢复拖动
      this.resizeDirection = null;
    },
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
.editor {
  display: flex;
}
.canvas-container {
  position: relative;
  width: 600px;
  height: 600px;
  /* border: 1px solid #ddd; */
  margin-right: 20px;
  overflow: hidden; /* 防止超出内容显示 */
}
.ruler-x,
.ruler-y {
  position: absolute;
  background: #f5f5f5;
}
.ruler-x {
  height: 20px;
  top: 0;
  left: 20px;
}
.ruler-y {
  width: 20px;
  top: 20px;
  left: 0;
}
.tick {
  position: absolute;
  font-size: 12px;
  color: #333;
}
.ruler-x .tick {
  top: 0;
  height: 20px;
  border-right: 1px solid #ddd;
}
.ruler-y .tick {
  left: 0;
  width: 20px;
  border-bottom: 1px solid #ddd;
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
  cursor: move;
}
.region.active {
  border: 1px solid #ff5722;
  background: rgba(255, 87, 34, 0.2);
}
.controls {
  flex: 1;
  margin-left: 100px;
}
.control-panel {
  margin-bottom: 20px;
}

.control-panel.active {
  border: 1px solid #ff5722;
}
/* .control-panel h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
} */
label {
  display: block;
  margin-bottom: 10px;
}
input {
  width: 60px;
  margin-left: 10px;
}
button {
  margin-top: 10px;
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
</style>