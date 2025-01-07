<template>
  <div class="page-content">
  <el-button size="mini" @click="saveModule">保存</el-button>
  <div class="editor">
    <!-- 左侧模块 -->
    <div class="module-list">
      <h3>添加模块</h3>
      <draggable
        :list="availableModules"
        :group="{ name: 'modules', pull: 'clone', put: false }"
        :clone="clone"
        class="draggable-source"
        @start="handleDragStart"
        @end="handleDropEnd"
      >
        <div v-for="module in availableModules" :key="module.type" class="add-moudle">
          <img :src="module.icon" alt="模块图标" class="add-module-img">
          <div>{{ module.label }}</div>
        </div>
      </draggable>

      <h3>使用中的模块({{ modules.length }})</h3>
      <ul class="used-modules" v-if="modules.length > 0">
        <li
          v-for="(module, index) in modules"
          :key="index"
          :class="{ active: activeModule === index, hover: hoverModule === index }"
          @click="selectModule(index)"
          @mouseover="hoverModule = index"
          @mouseleave="hoverModule = null"
        >
          <i class="el-icon-s-operation" style="margin-right: 5px;"></i>{{ module.label }}
          <!-- 悬浮时显示的操作按钮 -->
          <div v-if="hoverModule === index" class="module-actions">
            <el-link :underline="false" @click.stop="moveModuleUp(index)" title="上移" :disabled="isUsedMoveUpDisabled"><i class="el-icon-arrow-up"></i></el-link>
            <el-link :underline="false" @click.stop="moveModuleDown(index)" title="下移" :disabled="isUsedMoveDownDisabled"><i class="el-icon-arrow-down"></i></el-link>
            <el-link :underline="false" @click.stop="copyModule(index)" title="复制"><i class="el-icon-document"></i></el-link>
            <el-link :underline="false" @click.stop="deleteModule(index)" title="删除"><i class="el-icon-delete"></i></el-link>
          </div>
        </li>
      </ul>
      <div v-else class="notInUseModuleBox">暂无使用中的模块</div>
    </div>

    <!-- 中间拖拽区域 -->
    <div class="drag-area">
      <draggable
        v-model="modules"
        :group="{ name: 'modules', pull: false, put: true }"
        class="draggable-target"
        ghost-class="ghost"
      >
        <div v-if="modules.length > 0">
          <div
            v-for="(module, index) in modules"
            :key="index"
            class="module-item"
            :class="{ active: activeModule === index }"
            @click="selectModule(index)"
            :style="{
              fontSize: module.fontSize + 'px',
              color: module.fontColor,
              align: module.align,
              backgroundColor: module.backgroundColor,
            }"
          >
            <!-- 文字模块 -->
            <div
              v-if="module.type === 'text'"
              class="text-module"
            >
              <template v-if="module.text">
                {{ module.text }}
              </template>
              <template v-else>
                <img 
                  :src="smtNewDescTextIcon" 
                  alt="文字" 
                  width="100"
                />
              </template>
            </div>
            <!-- 图片模块 -->
            <div v-else-if="module.type === 'image'" class="image-module">
              <img v-if="module.imgUrl" class="desc-image" :src="module.imgUrl" alt="图片" width="100" />
              <img v-else class="empty-image" :src="module.icon" alt="图片" width="100" />
            </div>
          </div>
        </div>
        <!-- 没有模块 -->
        <img v-if="!isDragging && modules.length === 0" class="emptyModule" :src="smtNewEditorModalEmpty" alt="拖拽左侧模块进行添加">
      </draggable>
    </div>

    <!-- 右侧操作栏 -->
    <div v-show="activeModule !== null" class="action-bar">
      <div class="actions">
        <div><el-link :underline="false" size="mini" @click="moveModuleUp(activeModule)" :disabled="isMoveUpDisabled" title="上移"><i class="el-icon-arrow-up"></i></el-link></div>
        <div><el-link :underline="false" size="mini" @click="moveModuleDown(activeModule)" :disabled="isMoveDownDisabled" title="下移"><i class="el-icon-arrow-down"></i></el-link></div>
        <div><el-link :underline="false" size="mini" @click="copyModule(activeModule)" title="复制"><i class="el-icon-copy-document"></i></el-link></div>
        <el-popover trigger="hover" placement="right" :width="44">
          <div slot="reference"><el-link :underline="false" size="mini" title="插入模块"><i class="el-icon-plus"></i></el-link></div>
          <div style="margin-bottom: 5px;"><el-link :underline="false" size="mini" @click="insertTextModule" title="文字模块"><i class="el-icon-document"></i></el-link></div>
          <div><el-link :underline="false" size="mini" @click="insertImageModule" title="图片模块"><i class="el-icon-picture"></i></el-link></div>
        </el-popover>
        <div><el-link :underline="false" size="mini" @click="deleteModule(activeModule)" title="删除"><i class="el-icon-delete"></i></el-link></div>
      </div>
    </div>

    <!-- 右侧模块编辑器 -->
    <div class="module-editor" v-if="modules.length > 0 && activeModule !== null">
      <div class="module-editor-header">
        <h3>{{ modules[activeModule].label }}模块</h3>
        <!-- 关闭按钮 -->
        <el-button size="mini" @click="closeEditor" icon="el-icon-close" circle></el-button>
      </div>

      <el-form class="module-editor-form" :model="modules[activeModule]">
        <!-- 如果是文本模块 -->
        <div v-if="modules[activeModule].type === 'text'">
          <el-form-item label="">
            <el-input
              v-model="modules[activeModule].text"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 10}"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>

          <!-- 字体大小 -->
          <el-form-item label="字号：">
            <el-input-number
              v-model="modules[activeModule].fontSize"
              :min="12"
              :max="12"
              size="small"
            ></el-input-number>
          </el-form-item>

          <!-- 字体颜色 -->
          <el-form-item label="颜色：">
            <el-color-picker
              v-model="modules[activeModule].fontColor"
              size="mini"
            ></el-color-picker>
          </el-form-item>

          <!-- 文字对齐方式 -->
          <el-form-item label="对齐：">
            <el-radio-group class="align-radio" v-model="modules[activeModule].align">
              <el-radio label="left">左对齐</el-radio>
              <el-radio label="center">居中</el-radio>
              <el-radio label="right">右对齐</el-radio>
              <el-radio label="justify">两端对齐</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 背景颜色 -->
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="modules[activeModule].backgroundColor"
              size="mini"
            ></el-color-picker>
          </el-form-item>
        </div>

        <!-- 如果是图片模块 -->
        <div v-if="modules[activeModule].type === 'image'">
          <el-form-item label="">
            <div class="image-edit-content-box" :class="{ 'check-image-content-box': modules[activeModule].imgUrl }">
              <!-- 图片 -->
              <img v-if="modules[activeModule].imgUrl" class="imageBox" :src="modules[activeModule].imgUrl" alt="上传的图片" />
              <!-- 上传 -->
              <div class="btn-dropdown btnDropdownHover" :style="{ display: modules[activeModule].imgUrl ? 'none' : 'block' }">
                <el-dropdown>
                  <span class="el-dropdown-link" :style="{ color: modules[activeModule].imgUrl ? '#fff' : '#428bca'}">
                    {{ modules[activeModule].imgUrl ? '更换图片' : '上传图片' }}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-upload
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleImageSuccess"
                      >
                        <el-button class="upload-btn" size="small" type="text">上传图片</el-button>
                      </el-upload>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="addPic(modules[activeModule])">网络图片</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import draggable from "vuedraggable";

import smtNewDescTextIcon from "@/assets/images/smtNewDescTextIcon.png";
import smtNewDescImgIcon from "@/assets/images/smtNewDescImgIcon.png";
import smtNewEditorModalEmpty from "@/assets/images/smtNewEditorModalEmpty.png";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      // 左侧可用模块
      availableModules: [
        {
          // 文字
          lang: "zh",
          type: "text",
          priority: 0,
          key: "DecImage",
          text: "",
          fontSize: 12,
          fontColor: "#000000",
          align: "left",
          backgroundColor: "#ffffff",
          // 用于显示
          label: "文字",
          icon: smtNewDescTextIcon
        },
        {
          // 图片
          lang: "zh",
          type: "image",
          priority: 0,
          key: "DecImage",
          imgUrl: null,
          width: null,
          height: null,
          // 用于显示
          label: "图片",
          icon: smtNewDescImgIcon
        }
      ],
      smtNewDescTextIcon,
      smtNewEditorModalEmpty,
      // 是否正在拖拽
      isDragging: false,
      // 中间区域拖拽的模块
      modules: [],
      // 当前激活的模块索引
      activeModule: null,
      hoverModule: null, // 用于存储鼠标悬浮的模块索引
      // 图片上传的URL接口
      uploadUrl: '/upload',  // 替换为实际上传图片的接口
    };
  },
  computed: {
    // 判断是否能上移
    isMoveUpDisabled() {
      return this.activeModule <= 0;
    },
    // 判断是否能下移
    isMoveDownDisabled() {
      return this.activeModule >= this.modules.length - 1;
    },
    // 使用中的判断
    // 判断是否能上移
    isUsedMoveUpDisabled() {
      return this.hoverModule <= 0;
    },
    // 判断是否能下移
    isUsedMoveDownDisabled() {
      return this.hoverModule >= this.modules.length - 1;
    }
  },
  methods: {
    // 克隆模块数据
    clone(module) {
      const newModule = JSON.parse(JSON.stringify(module));
        if (newModule.type === "text" && !newModule.text) {
        newModule.text = ""; // 保留为空，显示默认图片
      }
      if (newModule.type === "image" && !newModule.imgUrl) {
        newModule.icon = smtNewDescImgIcon;
      }
      return {
        ...newModule,
        priority: module.priority++
      }
    },
    // 更新priority
    updateModulePriority() {
      this.modules.forEach((module, index) => {
        module.priority = index; // 从0开始分配priority
      });
    },
    // 拖拽开始
    handleDragStart() {
      this.isDragging = true
    },
    // 拖放完成的动作
    handleDropEnd(event) {
      
      console.log("🚀 ~ handleDropEnd ~ event:", event);
      window.console.log("🚀 ~ window. ~ event:", event);
      // 如果拖拽的是从左侧添加到中间，则选中新添加的模块
      const newIndex = event.newIndex; // 获取新添加模块的索引
      // 更新priority
      this.selectModule(newIndex); // 自动选中该模块
      this.updateModulePriority();
      this.isDragging = false;
    },
    // 编辑模块
    editModule(index) {
      this.activeModule = index;
    },
    // 选择模块
    selectModule(index) {
      this.activeModule = index;
      // 如果模块被选中，更新状态，确保操作按钮能正常显示和工作
      this.hoverModule = null; // 取消其他模块的悬浮

      const moduleRef = this.$refs['module' + index][0]
      if (moduleRef) {
        moduleRef.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    },
     // 离开悬浮
     leaveModule() {
      this.isHovered = null;
    },
    // 上移模块
    moveModuleUp(upIndex) {
      if (upIndex !== null && upIndex > 0) {
        const module = this.modules.splice(upIndex, 1)[0];
        this.modules.splice(upIndex - 1, 0, module);
        this.activeModule = upIndex - 1;
        this.updateModulePriority();
      }
    },
    // 下移模块
    moveModuleDown(downIndex) {
      if (downIndex !== null && downIndex < this.modules.length - 1) {
        const module = this.modules.splice(downIndex, 1)[0];
        this.modules.splice(downIndex + 1, 0, module);
        this.activeModule = downIndex + 1;
        this.updateModulePriority();
      }
    },
    // 复制模块
    copyModule(copeIndex) {
      const module = { ...this.modules[copeIndex] };
      this.modules.splice(copeIndex + 1, 0, module);
      this.activeModule = copeIndex + 1;
      this.updateModulePriority();
    },
    // 插入模块
    insertTextModule() {
      const newModule = { 
        lang: "zh",
        type: "text",
        priority: 0,
        key: "DecImage",
        text: "",
        fontSize: 12,
        fontColor: "#000000",
        align: "left",
        backgroundColor: "#ffffff",
        // 用于显示
        label: "文字",
        icon: smtNewDescTextIcon
       };
      this.modules.push(newModule);
    },
    insertImageModule() {
      const newModule = { 
        lang: "zh",
        type: "image",
        priority: 0,
        key: "DecImage",
        imgUrl: null,
        width: null,
        height: null,
        // 用于显示
        label: "图片",
        icon: smtNewDescImgIcon
       };
      this.modules.push(newModule);
    },
    // 删除模块
    deleteModule(deleteIndex) {
      if (deleteIndex !== null) {
        this.modules.splice(deleteIndex, 1);
        // 如果删除的是当前选中的模块，清空选中状态
        if (this.activeModule === deleteIndex) {
          this.activeModule = null;
        } else if (deleteIndex < this.activeModule) {
          this.activeModule -= 1; // 修正选中索引
        }
      } 
    },
    // 关闭编辑器，取消选中的模块
    closeEditor() {
      this.activeModule = null; // 取消选中的模块，隐藏编辑器
    },
    // 处理图片上传成功
    handleImageSuccess(response, file, fileList) {
      // 假设返回的图片URL是 response.imgUrl
      this.modules[this.activeModule].imgUrl = response.imgUrl;
    },
    // 添加网络图片
    addPic(moudle) {
      console.log("🚀 ~ addPic ~ moudle:", moudle);
      moudle.imgUrl = "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960";
    },
    saveModule() {
      console.log("保存模块数据：", this.modules);
    }
  },
};
</script>

<style scoped>
.page-content {
  background-color: #eff2f9;
}

.editor {
  margin-left: auto;
  margin-top: 20px;
  margin-right: auto;
  padding-bottom: 50px;
  width: 1200px;
}

.module-list {
  /* border: 1px solid #ddd; */
  padding: 10px;
  background-color: #fff;
  width: 235px;
  min-height: 230px;
  display: inline-block;
  max-height: 500px;
  position: fixed;
  margin: 0;
  box-sizing: border-box;
}

.add-moudle {
  display: inline-block;
  width: 90px;
  color: #737679;
}

.add-module-img {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: 35px;
}

.add-moudle div {
  display: inline-block;
  padding-left: 5px;
  vertical-align: top;
}

.used-modules {
  list-style: none;
  padding: 0;
}
.used-modules li {
  margin: 5px 0;
  padding: 7px;
  border: 1px solid #ddd;
  background: #f2f2f2;
  cursor: pointer;
  position: relative;
}
.used-modules li.active {
  background-color: #e6f7ff;
}
.used-modules li.active::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: #00aaff;
}
.used-modules li.hover .module-actions {
  display: block;
}

.notInUseModuleBox {
  margin-top: 10px;
  color: #a0a3a6;

}

.module-actions {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  border-radius: 4px;
  display: none;
}
.module-actions .el-link {
  margin-right: 5px;
}
.drag-area {
  /* border: 1px solid #ddd; */
  min-height: 300px;
  padding: 10px;
  background-color: #fff;
  display: inline-block;
  width: 500px;
  margin-left: 245px;
  box-sizing: border-box;
}

.draggable-target {
  min-height: 300px;
  background-color: #fff;
}

.emptyModule {
  display: block;
  margin: 60px auto 0;
}

.module-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.module-item.active {
  border: 2px solid #00aaff;
}
.text-module,
.image-module {
  width: 100%;
  padding: 5px;
  /* line-height: 50px; */
  text-align: center;
}

.text-module img,
.image-module .empty-image {
  width: 50px;
  height: 50px;
}

.image-module .desc-image {
  width: 100%;
  height: auto;
}

.module-editor {
  width: 370px;
  /* border: 1px solid #ddd; */
  margin-left: 12px;
  padding: 10px;
  background-color: #fff;
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: 19px;
}

.module-editor-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.module-editor-header h3 {
  margin: 0;
  line-height: 28px;
}

.module-editor-form .el-form-item {
  margin-bottom: 10px;
}

.module-editor-form .el-form-item /deep/ .el-form-item__label {
  line-height: 30px !important;
}

.module-editor-form .el-form-item /deep/ .el-form-item__content {
  line-height: 30px !important;
}

.align-radio .el-radio {
  margin-right: 10px;
}

.action-bar {
  position: relative;
  margin-left: 10px;
  width: 15px;
  padding: 8px;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  top: 19px;
  background: #fff;
}

.actions div {
  margin: 10px 0;
}

/* 图片编辑模块 */
.image-edit-content-box {
  margin-top: 10px;
  position: relative;
  display: inline-block;
  border: 1px solid #ddd;
  width: 100%;
  height: 150px;
  text-align: center;
  background-color: #eee;
}

.btn-dropdown {
  position: relative;
  display: inline-block;
  margin-top: 65px;
}

.changeimg-text {
  padding: 5px;
  color: #fff;
  text-decoration: underline;
}

.uploadimg-text {
  color: #428bca;
  text-decoration: none;
}

.imageBox {
  max-width: 100%;
  height: 100%;
}

.check-image-content-box::before {
  content: '';
  display: none;
  opacity: 0.3;
  background: black;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  text-decoration: underline;
}

.check-image-content-box:hover::before {
  display: block;
}

.check-image-content-box:hover .btn-dropdown {
  display: block !important;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0)
}

.upload-btn {
  color: #606266;
  font-size: 14px;
}
</style>
