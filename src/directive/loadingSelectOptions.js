// export default {
//   install(Vue) {
//     Vue.directive("loading-select-options", {
//       inserted(el, binding, vnode) {
//         let firstLoad = true; // 标记是否是第一次触发
//         const selectComponent = vnode.context.$refs[binding.arg];

//         if (!selectComponent) {
//           console.warn("v-loading-select-options: 未找到 el-select 组件，请检查 ref 是否正确");
//           return;
//         }

//         // 监听 el-select 展开事件
//         selectComponent.$on("visible-change", async (visible) => {
//           if (!visible || !firstLoad) return;
//           firstLoad = false; // 标记已加载

//           // 等待下拉框渲染
//           setTimeout(async () => {
//             const dropdown = document.querySelector(".el-select-dropdown");

//             if (dropdown) {
//               // 显示 loading
//               const instance = vnode.context.$loading({
//                 target: dropdown,
//                 background: "rgba(255, 255, 255, 0.7)"
//               });

//               // 关闭 loading
//               setTimeout(() => {
//                 instance.close();
//               }, 500);
//             }
//           }, 50);
//         });
//       }
//     });
//   }
// };

import { Loading } from 'element-ui'

export default {
  install(Vue) {
    Vue.directive("loading-select-options", {
      bind(el, binding, vnode) {
        // 获取select组件实例
        const select = vnode.componentInstance
        if (!select) return
    
        // 标记是否已经加载过数据
        let hasLoaded = false
        let loadingInstance = null
    
        // 监听select的visible-change事件
        select.$on('visible-change', async (visible) => {
          // 只在展开时触发，且未加载过数据
          if (visible && !hasLoaded) {
            // 等待下拉框渲染完成
            await new Promise(resolve => setTimeout(resolve, 0))
            
            // 获取下拉选项容器
            const dropdown = document.querySelector('.localSelect1')
            console.log("🚀 ~ select.$on ~ dropdown:", dropdown);
            if (!dropdown) return

            // dropdown.style.display = 'block'

            // 显示loading
            loadingInstance = Loading.service({
              target: dropdown,
              text: '加载中...',
              background: 'rgba(255, 255, 255, 0.7)'
            })
    
            try {
              console.log("🚀 ~ select.$on ~ binding.value:", binding.value);
              // 调用传入的请求方法
              if (typeof binding.value === 'function') {
                await binding.value()
              }
              
              // 标记已加载
              hasLoaded = true
            } catch (error) {
              console.error('Select loading error:', error)
            } finally {
              // 关闭loading
              if (loadingInstance) {
                loadingInstance.close()
                loadingInstance = null
              }
            }
          }
        })
      }
    });
  }
} 