<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/mock">Mock</router-link> |
      <router-link to="/table">Table</router-link> |
      <router-link to="/limitline">LimitLine</router-link> |
      <router-link to="/tailwind">TailWind</router-link> |
      <router-link to="/table2">Table2</router-link> |
      <router-link to="/normaltable">NormalTable</router-link> |
      <router-link to="/mixin">Mixin</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/ordersystem">OrderSystem</router-link> |
      <router-link to="/system">System</router-link> |
      <router-link to="/interval1">interval1</router-link> |
      <router-link to="/dynamictable">DynamicTable</router-link> |
      <router-link to="/vuedraggable">VueDraggable</router-link> |
      <router-link to="/vchart">vChart</router-link> |
      <router-link to="/slottest">SlotTest</router-link> |
      <router-link to="/scrollnumber">ScrollNumber</router-link> |
      <router-link to="/eltransfer">ElTransfer</router-link> |
      <router-link to="/i18n">i18n</router-link> |
      <router-link to="/upload">upload</router-link> |
      <router-link to="/editTable">editTable</router-link> |
      <router-link to="/validator">validator</router-link> |
      <router-link to="/treeTable">treeTable</router-link> |
      <router-link to="/generateJSON">generateJSON</router-link> |
      <router-link to="/dragDialog">drag-dialog</router-link> |
      <router-link to="/todo">todo</router-link> |
      <router-link to="/backToTop">BackToTop</router-link> |
      <router-link to="/clipboard">Clipboard</router-link> |
      <router-link to="/packageElTable">PackageElTable</router-link> |
      <router-link to="/trsTable">TrsTable</router-link> |
      <router-link to="/reWriteMessage">reWriteMessage</router-link> |
      <router-link to="/sortTable">sortTable</router-link> |
      <router-link to="/exportExcel">exportExcel</router-link> |
      <router-link to="/vxeTable">vxeTable</router-link> |
      <router-link to="/carouselMenu">carouselMenu</router-link> |
      <router-link to="/myTable">MyTable</router-link> |
      <router-link to="/zipFile">批量下载压缩</router-link> |
      <router-link to="/vmodel">v-model</router-link> |
      <router-link to="/waterFall">瀑布流</router-link> |
    </div>
    <!-- <div>
      <button @click="push">跳转</button>
    </div>
    <div>
      <span>test split</span>
      <div v-html="formatterColumn(msg)"></div>
    </div>

    <button @click="testEvent($event)" name="哈哈">单击</button> -->
    <!-- <Home @getNum="getSonNum">getNum</Home> -->
    <!-- <tabs></tabs> -->
    <!-- <div style="background-color: red; margin-top: 20px">{{ sumHandle }}</div> -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- <prop :str="props"></prop>

    <button @click="asyncClick">点点点</button> -->
  </div>
</template>

<script>
// import Home from "@/views/Home.vue";
// import tabs from "@/views/tabs.vue";
// import prop from "@/components/propsText.vue";

export default {
  data() {
    return {
      parantData: "",
      props: "abcd",
      msg: 'abc<br>007'
    };
  },
  computed: {
    sumHandle() {
      return `${this.parantData}----拼接666`;
    },
  },
  methods: {
    getSonNum(num) {
      this.parantData = num;
      console.log(this.parantData, typeof this.parantData);
    },
    changeHandle() {
      // this.
    },
    asyncClick() {},
    // 测试连续跳转同一路由  (会报错，不能这样写)  
    push() {
      let arr = [{id: 111, value: 'a'}, {id: 123, value: 'b'}]
      let i = 0
      const timer = setInterval(() => {
        if (i < arr.length) {
          const singleObj = arr[i]
          const params = {
            id: singleObj.id,
            name: singleObj.value
          }

          this.$router.push({ name: 'Form' , params: { routerParams: params }})
          i++
        } else {
          window.clearInterval(timer)
        }
      }, 200)
    },
    formatterColumn(val) {
      if (val === undefined || val === null) {
        return ''
      } else {
        const status = val.split('<br>')
        return status[status.length - 1]
      }
    },
    testEvent(e) {
      console.log(e)
    }
  },
  components: {
    // Home,
    // tabs,
    // prop,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: sticky;
  top: 0;
  z-index: 1;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
