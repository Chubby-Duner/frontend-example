<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="card-hearder clearfix">
        <slot name="headerContent"></slot>
      </div>
      <slot name="authContent">
        <el-input v-model="currentAuthItem.clientId" @input="$emit('update:authItem', currentAuthItem)" size="small" />
        <el-input v-model="currentAuthItem.clientSecret" @input="updateAuth" size="small" />
        <el-input v-model="currentAuthItem.redirectUrl" @input="updateAuth" size="small" />
      </slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EmitUpdateCompoent',
  props: {
    authItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    currentAuthItem() {
      return this.authItem
    }
  },
  data() {
    return { }
  },
  methods: {
    updateAuth() {
      this.$emit('update:authItem', this.currentAuthItem)
    }
  }
}
</script>

<style>

</style>