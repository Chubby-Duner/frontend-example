<template>
    <button @click="change">点我</button>
</template>

<script>
export default {
  props: {
    propStr: {
      type: String
    }
  },
  data() {
    return {
      data: this.propStr,
      data1: ''
    }
  },
  mouted() {
    console.log(this.data);
  },
  watch: {
    strHandle() {
      this.data1 = this.propStr;
      console.log(this.data1);
    }
  },
  methods: {
    change() {
      this.$emit('changHandle','66666')
    },
  }

}
</script>

<style>

</style>