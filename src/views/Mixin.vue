<template>
  <div>
    <div>number => {{ number }}</div>
    <div>count => {{ count }}</div>
  </div>
</template>

<script>
//  mixin 组件的data以及methds  优先级 高于mixin data以及methods的优先级
//  生命周期函数, 先执行mixin里面的, 再执行组件里面的

// mixin混入
const myMixin = {
  data() {
    return {
      number: 2,
      count: "",
    };
  },
  created() {
    console.log("mixin number ==>", this.number);
  },
  methods: {
    total() {
      this.count = 1;
    },
    handlerClick() {
      console.log("mixin click");
    },
  },
};

export default {
  data() {
    return {
      number: 1,
    };
  },
  mounted() {
    this.total();
  },
  created() {
    console.log("vue number ==>", this.number);
  },
  mixins: [myMixin],
  methods: {
    handlerClick() {
      this.number = this.number + 1;
      this.count = this.number;
      console.log("组件 click");
    },
  },
};
</script>

<style>
</style>