<template>
    <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>

    <div>
        <div><br>分隔你，哈哈哈<br></div>
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" 
        v-clipboard:copy="inputData"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">
          copy
        </el-button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'directly',
            inputData: 'https://github.com/PanJiaChen/vue-element-admin'
        }
    },
    methods: {
        onCopy: function (e) {
            // e.text
            this.$message({
                message: 'Copy successfully',
                type: 'success',
                duration: 1500
            })
        },
        onError: function (e) {
            this.$message({
                message: 'Copy failed',
                type: 'error'
            })
        }
    }
}
</script>

<style>

</style>