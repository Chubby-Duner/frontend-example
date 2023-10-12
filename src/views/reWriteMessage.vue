<template>
   <div>
     <el-button :plain="true" @click="open2">弹出Message</el-button>
     <el-button v-copy="copyText">一键复制</el-button>
   </div>
</template>

<script>
export default {
  data() {
    return {
      copyText: '要 Copy 的内容'
    }
  },
  methods: {
    open2() {   
      this.$message({
        message: '恭喜你，这是一条成功消息', 
        type: 'success'
      });
    }
  }
}
</script>

<style>

</style>