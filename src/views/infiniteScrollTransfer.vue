<!-- <template>
  <div class="about">
    <Transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      v-model="value"
      :data="data"
      :virtual-scroll="true"
    >
    </Transfer>
  </div>
</template>

<script>
import Transfer from './transfer/main.vue';
export default {
  name: 'HomeView',
  data() {
    const generateData = _ => {
      const data = [];
      // 生成 3000 个数据
      for (let i = 0; i < 9000; i++) {
        const label = `城市${i + 1}`;
        const key = i;
        const pinyin = `chengshi${i + 1}`;
        data.push({
          label: label,
          key: key,
          pinyin: pinyin
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  },
  created() {
  },
  methods: {
  },
  components: {
    Transfer
  }
};
</script> -->

<template>
    <div id="app">
         <!-- gitHub地址: https://github.com/Little-Gee/blog/tree/main/el-virtual-transfer -->
        <el-virtual-transfer v-model="value" :data="data" filterable @change="change"></el-virtual-transfer>

        <el-button @click="save">保存</el-button>
    </div>
</template>

<script>
export default {
    data() {
        const generateData = () => {
            const data = [];
            for (let i = 1; i <= 20000; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`
                });
            }
            return data;
        };

        return {
            data: generateData(),
            value: []
        };
    },
    methods: { 
      change(currentValue, dirction, checked) {
        console.log(currentValue, dirction, checked); 
      },
      save() {
        console.log(this.value);
      }
    },
};
</script>

<style>
/* #app {
    display: flex;
    justify-content: center;
    padding-top: 100px;
} */
</style>