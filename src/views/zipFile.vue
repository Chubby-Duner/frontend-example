<!--
 *
 * @Description: 批量下载压缩
 * @link: https://juejin.cn/post/6970866355977486349
 * @npm: jszip file-saver  
-->
<template>
  <div>
    <el-button type="primary" @click="download">下载</el-button>
    <el-input v-model="iptVal" ref="inputArea" id="input"></el-input>
    <div v-for="(item, index) in list" :key="index" @click="add(item)" style="margin-bottom: 10px;width: 30px;height: 30px;background: yellow;">{{ item }}</div>
  </div>
</template>

<script>
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
    data() {
        return {
            imgList: [
                { fileUrl: 'https://img0.baidu.com/it/u=3295490998,3808337108&fm=253&fmt=auto&app=120&f=JPEG?w=1131&h=800',
                  fileName: '钢铁侠1',
                },
                { fileUrl: 'https://img0.baidu.com/it/u=1227555560,3445532195&fm=253&fmt=auto&app=138&f=JPEG?w=625&h=500',
                  fileName: '钢铁侠2',
                },
                { fileUrl: 'https://img1.baidu.com/it/u=630009923,2732990452&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=362',
                  fileName: '钢铁侠3',
                },
            ],
            iptVal: '嘤嘤嘤',
            list: ['aa', 'bb', 'cc'],
            blurIndex: ''
        }
    },
    methods: {
        download() {
            const zip = new JSZip() 
            this.imgList.forEach(item => {
                zip.file(item.fileName, item.fileUrl, { binary: true })
                 zip.generateAsync({
                    type: "blob",
                    compression: "DEFLATE",  // STORE：默认不压缩 DEFLATE：需要压缩
                    compressionOptions: {
                        level: 9               // 压缩等级1~9    1压缩速度最快，9最优压缩方式
                    }
                }).then(res => {
                    console.log(res, 'res')
                    FileSaver.saveAs(res, item.fileName ? item.fileName : "压缩包.zip") // 利用file-saver保存文件
                })
            })
        },
        testBlur(e) {
          this.blurIndex = e.srcElement.selectionStart
          console.log(e);
          console.log(e.srcElement);
          console.log(e.srcElement.selectionStart);
        },
        add(insertTxt) {
          let element = document.getElementById('input'); // 获取到指定标签
          let startPos = element.selectionStart; // 获取光标开始的位置
          let endPos = element.selectionEnd; // 获取光标结束的位置
          if (startPos === undefined || endPos === undefined) return; // 如果没有光标位置 不操作
          
          let oldTxt = element.value; // 获取输入框的文本内容
          let result = oldTxt.substring(0, startPos) + `${insertTxt}` + oldTxt.substring(endPos); // 将文本插入
          element.value = result; // 将拼接好的文本设置为输入框的值
          element.focus(); // 重新聚焦输入框
          element.selectionStart = startPos + insertTxt.length; // 设置光标开始的位置
          element.selectionEnd = startPos + insertTxt.length; // 设置光标结束的位置
        }
    }
}
</script>

<style>

</style>