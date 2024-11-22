<template>
<div>
  <p><el-button type="primary" @click="dialogDynamticFunc('user1')">选择用户1</el-button></p>
  <p><el-button type="primary" @click="dialogDynamticFunc('user2')">选择用户2</el-button></p>
</div>
</template>

<script>
//引入封装组件及全局弹窗组件
import waterFall from './waterFall.vue'
import Dialog from '../components/Dialog/dialog'

export default{
  methods:{
    dialogDynamticFunc(title) {
      let vueIns = this
      //new一个全局类
      let win = new Dialog()
      //调用open方法，传入相关参数
      win.open({
        title,
        dialogOption: { width: '600px' },
        component: waterFall,
        props: {
          id: title
        },
        //定义回调关闭函数，
        onClose: () => {
          win.close()
        }
      })
    }
  }
}
</script>
