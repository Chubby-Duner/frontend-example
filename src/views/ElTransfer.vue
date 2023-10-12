<template>
  <el-transfer 
    v-model="value" 
    :data="data"
    @change="change"
    @left-check-change="leftCheckChange"
    @right-check-change="rightCheckChange"   
    ></el-transfer>
</template>

<script>
export default {
  data() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };

    return {
      data: generateData(),
      value: [],
    };
  },
  methods: {
    // 右侧列表元素变化时触发
    change(arr) {
      console.log('change ==> ', arr.label);
      arr.forEach(element => {
        console.log(element.label);
      });
    },

    // 点击左边勾选框触发
    leftCheckChange(arr) {
      console.log('leftCheckChange ==> ', arr);
    },

    // 点击右边勾选框触发
    rightCheckChange(arr) {
      console.log('rightCheckChange ==> ', arr);
    },
  },
};
</script>

<style>
</style>