<template>
  <div>
    <el-form ref="walmartRuleForm" :model="walmartStatusForm">
      <el-row
        style="margin-top: 10px"
        v-for="(item, index) in walmartStatusForm.inventory"
        :gutter="20"
        :key="index"
      >
        <el-col :span="6">
          <div class="grid-content centerText warehouseName">
            {{ item.warehouseName }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-form-item
              :prop="`inventory.${index}.walmartInventory`"
              :rules="walmartStatusRules.walmartInventory"
            >
              <el-input
                v-model.number="item.walmartInventory"
                placeholder="请输入库存"
                style="width: 185px"
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-button @click="resetForm('walmartRuleForm')">Reset</el-button>
      <el-button type="primary" @click="submit('walmartRuleForm')"
        >Send</el-button
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    const checkInventory = (rule, value, callback) => {
      console.log(rule);
      console.log(value);
      if (!value) {
        return callback(new Error("库存不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      walmartStatusRules: {
        walmartInventory: [
          { required: true, validator: checkInventory, trigger: "blur" },
        ],
      },
      // 用于绑定walmart的上下架表单
      walmartStatusForm: {
        inventory: [
          {
            id: 10086,
            walmartInventory: 10,
            code: 101,
            warehouseName: "仓库1",
          },
          {
            id: 10087,
            walmartInventory: 20,
            code: 102,
            warehouseName: "仓库2",
          },
        ],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交前的验证
    submit(formName) {
      // console.log(this.$refs[formName],'this.$refs[formName]')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "表单验证通过！",
            type: "success",
          });
        } else {
          this.$message({
            message: "表单验证不通过！",
            type: "error",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>