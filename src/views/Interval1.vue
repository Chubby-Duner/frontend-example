<template>
  <div>
    <h1>这里是A页面</h1>
    <el-button @click="count">启动定时器</el-button>
    <el-button @click="jump">前往B页面</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    count() {
      this.timer = setInterval(() => {
        console.log(1);
      }, 1000);

      //  方法2
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once("hook:beforeDestroy", () => {
        console.log("定时器即将销毁");
        clearInterval(this.timer);
      });
    },
    jump() {
      this.$router.push({ path: "/interval2" });
    },
  },

  // 方法1
  // beforeDestroy() {
  //   console.log("定时器即将销毁");
  //   clearInterval(this.timer);
  //   this.timer = null;
  // },
  // destroyed() {
  //   console.log("定时器销毁完毕");
  // }
};
</script>

<style>
</style>