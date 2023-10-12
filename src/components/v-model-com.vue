<template>
  <el-input v-model="inputVal"></el-input>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    model: {
    /* 
        API参考：https://v2.cn.vuejs.org/v2/api/#model
        vue2要加这个属性，vue3可直接使用 https://cn.vuejs.org/guide/components/v-model.html#conventions-and-best-practices
    */
        prop: 'modelValue',
        event: 'update:modelValue'
    },
    computed: {
        inputVal: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
                // this.modelValue.num = value  如果是对象也可以直接更改props，因为vue2监听不到
            }
        }
    }
}
</script>

<style>

</style>