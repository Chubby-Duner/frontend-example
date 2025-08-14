import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//引入-------------- nprogress  -----------
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mock',
    name: 'Mock',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Mock.vue')
  },
  {
    path: '/table',
    name: 'Table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue')
  },
  {
    path: '/limitline',
    name: 'limitLine',
    component: () => import('../views/LimitLine.vue')
  },
  {
    path: '/tailwind',
    name: 'tailWind',
    component: () => import('../views/tailwind.vue')
  },
  {
    path: '/table2',
    name: 'Table2',
    component: () => import('../views/Table2.vue')
  },
  {
    path: '/mixin',
    name: 'Mixin',
    component: () => import('../views/Mixin.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/Form.vue')
  },
  {
    path: '/ordersystem',
    name: 'orderSystem',
    component: () => import('../views/OrderSystem.vue')
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('../views/System.vue')
  },
  {
    path: '/interval1',
    name: 'Interval1',
    component: () => import('../views/Interval1.vue')
  },
  {
    path: '/interval2',
    name: 'Interval2',
    component: () => import('../views/Interval2.vue')
  },
  {
    path: '/dynamictable',
    name: 'DynamicTable',
    component: () => import('../views/DynamicTable.vue')
  },
  {
    path: '/vuedraggable',
    name: 'VueDraggable',
    component: () => import('../views/VueDraggable.vue')
  },
  {
    path: '/vuedraggable2',
    name: 'VueDraggable2',
    component: () => import('../views/VueDraggable2.vue')
  },
  {
    path: '/vchart',
    name: 'vChart',
    component: () => import('../views/Vchart.vue')
  },
  {
    path: '/slottest',
    name: 'SlotTest',
    component: () => import('../views/SlotTest.vue')
  },
  {
    path: '/scrollnumber',
    name: 'ScrollNumber',
    component: () => import('../views/ScrollNumber.vue')
  },
  {
    path: '/eltransfer',
    name: 'ElTransfer',
    component: () => import('../views/ElTransfer.vue')
  },
  {
    path: '/i18n',
    name: 'I18n',
    component: () => import('../views/I18n.vue')
  },
  {
    path: '/normaltable',
    name: 'NormalTable',
    component: () => import('../views/NormalTable.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/upload.vue')
  },
  {
    path: '/editTable',
    name: 'EditTable',
    component: () => import('../views/editTable/index.vue')
  },
  {
    path: '/validator',
    name: 'Validator',
    component: () => import('../views/表单验证.vue')
  },
  {
    path: '/treeTable',
    name: 'TreeTable',
    component: () => import('../views/treeTable.vue')
  },
  {
    path: '/generateJSON',
    name: 'GenerateJSON',
    component: () => import('../views/generateJSON.vue')
  },
  {
    path: '/dragDialog',
    name: 'DragDialog',
    component: () => import('../views/dragDialog.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('../views/todoList/index.vue')
  },
  {
    path: '/backToTop',
    name: 'BackToTop',
    component: () => import('../views/backToTop/index.vue')
  },
  {
    path: '/clipboard',
    name: 'Clipboard',
    component: () => import('../views/clipboard.vue')
  },
  {
    path: '/packageElTable',
    name: 'PackageElTable',
    component: () => import('../views/packageEleTable/Table.vue')
  },
  {
    path: '/trsTable',
    name: 'TrsTable',
    component: () => import('../views/packageEleTable/TrsTable.vue')
  },
  {
    path: '/reWriteMessage',
    name: 'reWriteMessage',
    component: () => import('../views/reWriteMessage.vue')
  },
  {
    path: '/sortTable',
    name: 'sortTable',
    component: () => import('../views/sortTable.vue')
  },
  {
    path: '/exportExcel',
    name: 'exportExcel',
    component: () => import('../views/exportExcel.vue')
  },
  {
    path: '/vxeTable',
    name: 'vxeTable',
    component: () => import('../views/vxeTable.vue')
  },
  {
    path: '/zipFile',
    name: 'ZipFile',
    component: () => import('../views/zipFile.vue')
  },
  {
    path: '/carouselMenu',
    name: 'carouselMenu',
    component: () => import('../views/carouselMenu.vue')
  },
  {
    path: '/myTable',
    name: 'MyTable',
    component: () => import('../views/packageEleTable/MyTable.vue')
  },
  {
    path: '/vmodel',
    name: 'Vmodel',
    component: () => import('../views/v-model.vue')
  },
  {
    path: '/waterFall',
    name: 'WaterFall',
    component: () => import('../views/waterFall.vue')
  },
  {
    path: '/emitUpdatetest',
    name: 'EmitUpdateCompoent',
    component: () => import('../views/emitUpdatetest.vue')
  },
  {
    path: '/dialogCompoentIndex',
    name: 'DialogCompoentIndex',
    component: () => import('../views/dialogCompoentIndex.vue')
  },
  {
    path: '/treeTransfer',
    name: 'TreeTransfer',
    component: () => import('../views/treeTransfer.vue')
  },
  {
    path: '/fileChunksUpload',
    name: 'FileChunksUpload',
    component: () => import('../views/fileChunksUpload.vue')
  },
  {
    path: '/tinymce',
    name: 'Tinymce',
    component: () => import('../views/tinymce.vue')
  },
  {
    path: '/cartesian',
    name: 'Cartesian',
    component: () => import('../views/cartesian.vue')
  },
  {
    path: '/dynamicBlock',
    name: 'Dynamic block',
    component: () => import('../views/dynamicBlock.vue')
  },
  {
    path: '/treeCategory',
    name: 'TreeCategory',
    component: () => import('../views/treeCategory.vue')
  },
  {
    path: '/codeMirror',
    name: 'CodeMirror',
    component: () => import('../views/codeMirror.vue')
  },
  {
    path: '/directiveLoadingSelectOptions',
    name: 'DirectiveLoadingSelectOptions',
    component: () => import('../views/directiveLoadingSelectOptions.vue')
  },
  {
    path: '/girdLayout',
    name: 'GirdLayout',
    component: () => import('../views/girdLayout.vue')
  },
  {
    path: '/commonTest',
    name: 'CommonTest',
    component: () => import('../views/commonTest.vue')
  },
  {
    path: '/infiniteScrollTransfer',
    name: 'InfiniteScrollTransfer',
    component: () => import('../views/infiniteScrollTransfer.vue')
  },
  {
    path: '/infiniteScrollTransferByElVirtual',
    name: 'InfiniteScrollTransferByElVirtual.vue',
    component: () => import('../views/infiniteScrollTransferByElVirtual.vue')
  },
  {
    path: '/selectLoadmore',
    name: 'SelectLoadmore',
    component: () => import('../views/selectLoadmore.vue')
  },
  {
    path: '/newTestParent',
    name: 'NewTestParent',
    component: () => import('../views/newTestParent.vue')
  },
  {
    path: '/loadFontFamily',
    name: 'LoadFontFamily',
    component: () => import('../views/loadFontFamily.vue')
  },
  {
    path: '*',
    component: () => import('../components/page404/index.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, form, savedPosition) {

    // return 期望滚动到哪个的位置

    console.log(to, form, savedPosition);
    // 例子：https://vueschool.io/lessons/how-to-control-the-scroll-behavior-of-vue-router
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        // 可适用于顶部固定导航栏，点击自动滚动到相对应标题的位置
        if (to.hash === '#nav') {
           position.offset = { y: 140 }
        }
        // 如果跳转的时候携带hash这个参数值，就回到页面顶部
        if (document.querySelector(to.hash)) {
          return position;
        }
        // return false就不会回滚到页面顶部，减少用户多余的滚动操作
        return false;
      }
    }
  }
})

NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from , next) => {

  console.log('NProgress ==> ', NProgress);

  // 每次切换页面时，调用进度条
  NProgress.start();

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router
