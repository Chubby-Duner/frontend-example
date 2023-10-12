<template>
  <div>
    <div>
      <!--分发内容的内容会被承载到这个slot标签位置 -->
      <slot></slot>
    </div>
    <p>账号: <input /></p>
    <p>密码: <input type="password" /></p>
    <button>登录</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>