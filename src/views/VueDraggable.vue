<template>
  <draggable
    v-model="myArray"
    group="people"
    @start="startDrag"
    @end="endDrag"
    chosen-class="chosen"
    force-fallback="true"
    animation="600"
  >
    <transition-group>
      <div class="item" v-for="element in myArray" :key="element.id">{{ element.name }}</div>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

/* 
  介绍：Vue.Draggable是一款基于Sortable.js实现的vue拖拽插件。支持移动设备、拖拽和选择文本、智能滚动，可以在不同列表间拖拽、不依赖jQuery为基础、vue 2过渡动画兼容、支持撤销操作，总之是一款非常优秀的vue拖拽组件。本篇将介绍如何搭建环境及简单的例子，使用起来特别简单对被拖拽元素也没有CSS样式的特殊要求。

  官方文档：https://github.com/SortableJS/Vue.Draggable
  中文文档：http://www.itxst.com/vue-draggable/tutorial.html

  1、通过animation属性配合transition-group设置vue.draggable过渡效果，这样拖动时过渡位置就不会显的太生硬。

  2、事件名称	            说明
      start	      开始拖动时触发的事件
      add	        从一个数组拖拽到另外一个数组时触发的事件
      remove	    移除事件
      update	    拖拽变换位置时触发的事件
      end	        拖拽完成时的事件
      choose	    鼠标点击选中要拖拽元素时的事件
      unchoose	  选中后松开鼠标的事件
      sort	      位置变化时的事件
      clone	      从一个数组拖拽到另外一个数组时触发的事件和add不同，clone是复制了数组元素

  3、
*/

export default {
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      myArray: [
        { id: 1, name: "www.itxst.com" },
        { id: 2, name: "www.jd.com" },
        { id: 3, name: "www.baidu.com" },
        { id: 4, name: "www.taobao.com" },
      ],
    };
  },
  methods: {
    startDrag() {
      // 移动会改变原数组
      this.drag = true;
      console.log(this.myArray);
    },

    endDrag() {
      this.drag = false;
      console.log(this.myArray);
    }
  }
};
</script>

<style>
/*被拖拽对象的样式*/
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}

.item:hover {
  background-color: #f1f1f1;
  cursor: move;
}
/*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
</style>