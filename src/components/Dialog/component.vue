1<!-- el-dialog为elementui 2.5版本的组件，尚无拖拽弹窗功能，如需在vue2中添加拖拽功能，可以查看其他文档 -->
<!-- 测试后，此处el-dialog可以替换为antd或其他UI库dialog弹窗，同时也可以自己编写弹窗样式，皆可以满足调用 -->
<template>
  <el-dialog append-to-body :title="title" :visible.sync="visible" v-bind="dialogOption">
    <!-- props传入到组件内数据，接受即可 -->
    <component :is="component" v-bind="props" @cancel="cancel" @confirm="confirm"></component>
  </el-dialog>
</template>


<script>
let resolve = null
export default {
  data() {
    return {
      props: {},
      title: '',
      dialogOption: {},
      component: null,
      visible: true,
      onClose: () => { },
    }
  },
  methods: {
    //还可以更加精简，但是目前为了方便易懂，先如此处理
    open({ title, dialogOption, component, props, onClose }) {
      this.title = title
      this.dialogOption = dialogOption
      this.component = component
      this.props = props
      this.visible = true
      this.onClose = onClose
      //异步处理相关逻辑，未来可用
      return new Promise((resolse, reject) => {
        resolve = resolse
      })
    },
    confirm(arg) {
      console.log('confirm');
      this.close()
      resolve(arg)
    },
    cancel() {
      console.log('cancel');
      this.close()
      resolve()
    },
    close() {
      console.log(11111);
      //调用回调close,回传传入的close方法，销毁组件
      this.visible = false
      this.$emit('close')
    }
  },
};
</script>


<style>

</style>
