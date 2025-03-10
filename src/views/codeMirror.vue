<template>
  <div>
    <codemirror v-model="code" :options="cmOptions" class="editor" />
    <button @click="formatCode" class="format-btn">格式化代码</button>

    <Photoshop v-model="color" @input="updateValue" />
    

    <el-popover
      placement="bottom"
      width="220"
      v-model="visible">
        <Sketch v-model="color" @input="updateValue" />

        <button @click="cancleColor" class="format-btn">取消</button>
        <button @click="confirmColor" class="format-btn" style="margin-left: 20px;">确认</button>
      <el-button slot="reference">手动激活</el-button>
    </el-popover>


    <el-popconfirm
      confirm-button-text='确认'
      cancel-button-text='取消'
      title="颜色选择"
      @confirm="confirmColor"
      @cancle="cancleColor"
    >
      <Sketch v-model="color" @input="updateValue" />
      <el-button slot="reference">删除</el-button>
    </el-popconfirm>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/mode/python/python"; // 引入 Python 语法
import "codemirror/lib/codemirror.css";
import beautify from "js-beautify";
// import { loadPyodide } from "pyodide";

import { Photoshop, Sketch } from 'vue-color'

export default {
  components: { codemirror, Photoshop, Sketch },                                                                                                                                                                                      
  data() {
    return {
      visible: false,
      color: '',
      colorList: [],
      code: ` print("欢迎来到猜数字游戏！我已经想好了一个1到100之间的数字。")
 number_to_guess = random.randint(1, 100)
 attempts = 0

 while True:
try:
            # 获取玩家的猜测
            guess = int(input("请输入你的猜测: "))
            attempts += 1
            
            # 判断玩家猜测的数字与目标数字的关系
            if guess < number_to_guess:
                print("太低了，请再试一次。")
            elif guess > number_to_guess:
                print("太高了，请再试一次。")
            else:
                print(f"恭喜你，猜对了！你总共猜了 {attempts} 次。")
                break
        except ValueError:
            print("请输入一个有效的数字。")`,
      cmOptions: {
        mode: "python", // 设置 Python 语法高亮
        lineNumbers: true,
        tabSize: 4
      },
      pyodide: null
    };
  },
  methods: {
    updateValue() {
      console.log(this.color, 'this.color')
    },
    formatCode() {
      this.code = beautify(this.code, {
        indent_size: 4, // Python 通常使用 4 空格缩进
        space_in_empty_paren: false
      });
      // console.log(this.pyodide, 'this.pyodide')
      // this.code = this.pyodide.runPython(`
      //     import autopep8
      //     autopep8.fix_code("""${this.code}""")
      //   `);
    },
    openColor() {
      this.visible = true;
    },
    cancleColor() {
      this.visible = false
    },
    confirmColor() {
      console.log(this.color, 'confirmColor-color')
      this.colorList.push(this.color.hex)
      this.visible = false
      console.log(this.colorList, 'confirmColor-colorList')
    }
  }
};
</script>

<style scoped>
.editor {
  height: 300px;
  border: 1px solid #ddd;
}
.format-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
