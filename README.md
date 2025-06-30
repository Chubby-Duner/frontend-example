
# 文件描述

1. service --- 封装的axios请求接口
2. utils/axios.js  --- 封装的axios
3. common/js --- 存放element ui table组件`循环渲染`所需的数据 (`utils.js`用于Table.vue，`data.js`用于Table2.vue，`array.js`权限设置的函数)
4. views/Home --- element 日期选择器，格式化日期
5. views/LimitLine --- 文本内容显示n行，超出n行出现显示更多按钮，css样式超出行数只能使用...去替代
6. views/Mixin --- Vue Mixin的用法
7. views/Mock --- Mock简单使用的demo
8. views/Table,views/Table2 --- element ui table表格的使用，包括`单/全选(会改变当前行的颜色)`，`表头悬浮`，`固定列`，`自定义选择列`，表格使用的`循环渲染`的方法，易于维护
9. views/tabs --- element ui tabs组件的使用
10. views/tailwind --- tailWind css插件(未实现效果)
11. views/Form --- element ui 表单验证(套了个transition组件内置动画，使用了v-if，直接销毁dialog,从而不用清空数据和表单验证，不是很频繁的打开关闭相对来说性能会好一点点)
12. views/Interval1 和 views/Interval2 --- 定时器的使用与销毁问题
13. views/DynamicTable --- elementUI表格动态添加删除，行列的添加删除自定义表格的标题（[参考链接：掘金](https://juejin.cn/post/6869382712089247751)）
14. views/VueDraggable --- Vue.Draggable是一款基于Sortable.js实现的vue拖拽插件
15. views/VChart --- 基于 Vue2.0 和 echarts 封装的 v-charts 图表组件
16. views/slot 和 views/SlotTest --- 插槽的基本使用
17. views/ScrollNumber --- 竖直滚动数字效果
18. views/ElTransfer --- elementUI的穿梭框
19. views/I18n --- Vue i18n前端国际化
20. views/editTable --- element ui 的可编辑表格
21. views/upload --- element ui 的上传组件（md5分片上传）
22. views/表单验证 --- element ui 使用v-for生成的el-form-item的表单验证
23. views/treeTable --- el-table的树形结构懒加载的测试
24. views/generateJSON --- 实现的功能是新增一条数据，减少一条数据。eg: 页面进行操作然后生成对应的JSON
25. views/dragDialog --- 实现el-dialog的拖拽
26. views/clipboard  --- vue-clipboard2 复制功能
27. views/PackageElTable --- 封装el-table
28. views/TrsTable --- 封装el-table
29. views/reWriteMessage --- 改写el-message(utils/reWriteMessage.js，main.js中引用)
30. views/vxeTable --- vxeTable, flex一行4个布局, 旋转菜单
31. views/carouselMenu --- html + css3 实现的旋转菜单
32. views/packageEleTable --- 封装的el-table
33. views/waterFall --- 水印（报错）
34. views/views/packageEleTable --- 封装的el-table
35. views/fileChunksUpload --- 分片上传
36. views/emitUpdatetest --- $emit(update: xxx)的用法
37. views/tinymce --- 富文本
38. views/cartesian --- 笛卡尔乘积生成的表格
39. views/dynamicBlock --- 通过坐标信息动态生成元素（元素可拖拽可改变大小）
40. views/VueDraggable2 --- VueDraggable拖拽实例example
41. views/treeCategory --- 树形结构类目分区块显示与回显（可参考temuCategory）
42. views/codeMirror --- 代码编辑器
43. views/directiveLoadingSelectOptions --- 自定义指令实现el-select的options的loading效果
44. views/girdLayout --- gird布局
45. views/h5_signature --- H5横屏签名
46. views/infiniteScrollTransfer --- 虚拟列表穿梭框

## css

box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.09);
