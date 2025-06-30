<template>
  <div class="about">
    <h1>This is a Mock Test Page</h1>
    <button @click="login">login</button>
    <button @click="getMsg">getMsg</button>
    <ul v-for="(item,index) in nameList" :key="index">
      <div style="border-bottom: 1px solid #000;padding:10px">
        <li style="list-style:none">id: {{ item.id }}</li>
        <li style="list-style:none">serialNumber: {{ item.serialNumber }}</li>
        <li style="list-style:none">email: {{ item.email }}</li>
        <li style="list-style:none">cnName: {{ item.cnName }}</li>
        <li style="list-style:none">enName: {{ item.enName }}</li>
        <li style="list-style:none">age: {{ item.age }}</li>
        <li style="list-style:none">number: {{ item.num }}</li>
        <li style="list-style:none">url: {{ item.url }}</li>
        <li style="list-style:none">address: {{ item.address }}</li>
        <li style="list-style:none">date: {{ item.date }}</li>
        <li style="list-style:none">star: {{ item.star }}</li>
        <li style="list-style:none">templete: {{ item.templete }}</li>
      </div>
    </ul>
  </div>
</template>

<script>

// 引入axios
import axios from 'axios'

export default {
  data() {
    return {
      nameList: []
    }
  },
  methods: {
    login() {
      axios.get('/getResource').then(res => {
        if (res.data) {
          console.log('login res ==>', res);
        }
      })
    },
    getMsg() {
      axios.get('/getMsg').then(res => {
        if (res.data) {
          console.log('name ==> ', res)
          this.nameList = res.data
        }
      })
    },
    
  }
}
</script>
