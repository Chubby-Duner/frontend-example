<template>
  <div class="home">
    <el-virtual-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入城市拼音"
      v-model="value"
      :data="data"
    >
    </el-virtual-transfer>
  </div>
</template>

<script>
import ElVirtualTransfer from 'el-virtual-transfer';
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
      value: [1, 2],
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
    ElVirtualTransfer
  }
};
</script>