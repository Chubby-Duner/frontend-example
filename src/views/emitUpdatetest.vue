<template>
  <div class="auth-wrapper">
    <div class="auth-container" >
      <EmitUpdateCompoent  :authItem.sync="authObj">
        <template v-slot:headerContent>
          <span class="font-weight">哈哈哈</span>
          <el-button type="success" size="small">哈哈哈</el-button>
        </template>
      </EmitUpdateCompoent>

      <EmitUpdateCompoent  :authItem.sync="authObj1">
        <template v-slot:headerContent>
          <span class="font-weight">xxx</span>
          <el-button type="success" size="small">xxx</el-button>
        </template>

      </EmitUpdateCompoent>
      <el-button type="success" size="small" class="fr" @click="submit">submit</el-button>
    </div>
    <!-- 自授权 -->
  </div>
</template>

<script>
import EmitUpdateCompoent from "../components/EmitUpdateCompoent.vue"

export default {
  components: { EmitUpdateCompoent },
  data() {
    return {
      authObj: {
        clientId: 'clientId',
        clientSecret: 'clientSecret',
        redirectUrl: 'redirectUrl'
      },
      authObj1: {
        clientId: '111',
        clientSecret: '222',
        redirectUrl: '333'
      }
    }
  },
  methods: {
    submit() {
      console.log(this.authObj, 'authObj')
    }
  }
}
</script>

<style>

</style>