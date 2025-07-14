<template>
  <div class="container">
    <el-select
      v-model="selectedValue"
      v-el-select-loadmore="loadMore"
      filterable
      remote
      placeholder="请选择"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <p>已选择: {{ selectedValue || '未选择' }}</p>
  </div>
</template>

<script>
const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

export default {
  directives: {
    // 局部注册滚动加载指令
    'el-select-loadmore': {
      inserted(el, binding) {
        const scrollWrap = el.querySelector(
          '.el-select-dropdown .el-select-dropdown__wrap, ' +
          '.el-select-dropdown__list-wrapper .el-scrollbar__wrap'
        );
        
        if (!scrollWrap) {
          console.warn('未找到滚动容器');
          return;
        }

        const scrollHandler = function() {
          const { scrollTop, scrollHeight, clientHeight } = this;
          // 滚动到底部（距离底部20px时触发）
          if (scrollHeight - (scrollTop + clientHeight) <= 20) {
            binding.value();
          }
        };

        // 添加防抖（300ms）
        const debouncedHandler = debounce(scrollHandler, 300);
        scrollWrap.addEventListener('scroll', debouncedHandler);

        // 保存引用以便移除
        el._scrollHandler = debouncedHandler;
      },
      unbind(el) {
        const scrollWrap = el.querySelector(
          '.el-select-dropdown .el-select-dropdown__wrap, ' +
          '.el-select-dropdown__list-wrapper .el-scrollbar__wrap'
        );
        if (scrollWrap && el._scrollHandler) {
          scrollWrap.removeEventListener('scroll', el._scrollHandler);
        }
      }
    }
  },
  data() {
    return {
      selectedValue: '',
      options: [],       // 当前显示的选项
      allOptions: [],    // 全部模拟数据
      loading: false,
      currentPage: 1,
      pageSize: 20
    }
  },
  created() {
    // 初始化生成所有模拟数据
    this.generateMockData(100);
    // 加载第一页数据
    this.loadData();
  },
  methods: {
    // 生成模拟数据
    generateMockData(total) {
      for (let i = 1; i <= total; i++) {
        this.allOptions.push({
          value: `value_${i}`,
          label: `选项 ${i}`
        });
      }
    },
    
    // 加载数据（模拟分页）
    loadData() {
      this.loading = true;
      // 模拟异步请求
      setTimeout(() => {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const newData = this.allOptions.slice(start, end);
        
        if (this.currentPage === 1) {
          this.options = newData;
        } else {
          this.options = [...this.options, ...newData];
        }
        
        this.currentPage++;
        this.loading = false;
      }, 500);
    },
    
    // 滚动加载更多
    loadMore() {
      if (!this.loading) {
        console.log('触发加载更多');
        this.loadData();
      }
    },
    
    // 远程搜索方法
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.options = this.allOptions.filter(item => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
          this.loading = false;
        }, 200);
      } else {
        // 清空时恢复第一页数据
        this.currentPage = 1;
        this.loadData();
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 300px;
  margin: 50px auto;
}
</style>