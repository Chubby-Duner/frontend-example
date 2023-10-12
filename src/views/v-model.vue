<template>
  <div>
    <p>
        使用v-model穿透（作用跟$emit一样），可以子组件写computed自定义set、get做穿透用，更新值都在子组件完成，父组件只需传值就可以
        <a href="https://cn.vuejs.org/guide/components/v-model.html#conventions-and-best-practices" target="_blank" rel="noopener noreferrer">文档</a>
    </p>
    <!-- 
        v-model就是:model-value 和 @update:model-value的缩写
        <myInput 
            :model-value="iptValue" 
            @update:model-value="e => updateIptValue(e)"
        />
     -->
    <myInput v-model="iptValue" />
    <el-button @click="getNum">输出value</el-button>
  </div>
</template>

<script>
import myInput from './../components/v-model-com.vue'
export default {
    components: {
        myInput
    },
    data() {
        return {
            iptValue: '555'
        }
    },
    methods: {
        getNum() {
            console.log(this.iptValue)
        },
        updateIptValue(val) {
            console.log(val)
        }
    }
}
</script>

<style>

</style>