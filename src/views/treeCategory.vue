<template>
  <div class="category-selector">
    <div
      v-for="(column, columnIndex) in categories"
      :key="columnIndex"
      class="category-column"
    >
      <ul>
        <li
          v-for="item in column"
          :key="item.categoryId"
          :class="{ selected: selectedIds[columnIndex] === item.categoryId }"
          @click="handleClick(item, columnIndex)"
        >
          {{ item.categoryName }}
          <span v-if="!item.isLeaf">▶</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: [], // 分类的多级数组
      selectedIds: [], // 选中的分类ID列表
    };
  },
  methods: {
    async fetchCategories(parentId = null) {
      try {
        // const response = await axios.get('/api/categories', {
        //   params: { parentId }, // 传递父分类ID
        // });
        const data = [ { categoryName: '类目1', categoryId: 'xxx', isLeaf: false } ]
        return data; // 接口返回数据格式：[ { categoryName: 'xxx', categoryId: 'xxx' } ]
      } catch (error) {
        console.error('请求分类数据失败:', error);
        return [];
      }
    },
    async loadCategories(parentId, columnIndex = -1) {
      const children = await this.fetchCategories(parentId);

      if (children.length === 0) {
        return; // 如果子分类为空，直接返回
      }

      if (columnIndex === -1) {
        // 初始化加载一级分类
        this.categories = [children];
      } else if (this.categories[columnIndex + 1]) {
        // 更新现有列内容
        this.categories[columnIndex + 1] = children;
      } else {
        // 追加新列
        this.categories.push(children);
      }

      // 清除后续无关列
      this.categories = this.categories.slice(0, columnIndex + 2);
    },
    async initializeSelected(selectedIds) {
      this.selectedIds = selectedIds; // 设置选中的 ID 列表
      let parentId = null;

      for (let i = 0; i < selectedIds.length; i++) {
        const categoryId = selectedIds[i];
        await this.loadCategories(parentId, i - 1); // 请求并渲染当前列
        parentId = categoryId; // 更新父分类 ID
      }
    },
    async handleClick(item, columnIndex) {
      this.selectedIds = this.selectedIds.slice(0, columnIndex); // 保留之前的选中项
      this.selectedIds.push(item.categoryId); // 更新当前选中项

      if (item.isLeaf) {
        // 如果是叶子节点，直接输出当前选择项
        console.log("选中的叶子节点:", item);
        console.log("完整路径:", this.selectedIds);
        return;
      }

      // 如果不是叶子节点，加载下一级分类
      await this.loadCategories(item.categoryId, columnIndex);
    },
  },
  mounted() {
    this.loadCategories(null); // 初始化加载一级分类

    // 示例：回显选中路径 ['1', '1-1']
    // this.initializeSelected(['1', '1-1']);
  },
};
</script>

<style>
.category-column {
  display: inline-block;
  vertical-align: top;
  margin-right: 16px;
}
.category-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.category-column li {
  padding: 8px 16px;
  cursor: pointer;
}
.category-column li.selected {
  font-weight: bold;
  color: #1890ff;
  background-color: #f0f8ff;
}
</style>
