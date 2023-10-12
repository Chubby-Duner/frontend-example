<template>
  <div>
    <el-upload
      ref="upload"
      :auto-upload="false"
      action=""
      :file-list="fileList"
      :on-change="fileChange"
      :on-remove="fileRemove"
      multiple
      accept=".xls,.xlsx,.psd,.jpg"
      size="small"
      style="display: inline-block; margin-top: 10px"
    >
      <el-button size="small" type="primary"
        ><i class="el-icon-upload"></i>选择文件</el-button
      >
    </el-upload>
    <p style="font-weight: bold;">总上传文件数：{{ fileList.length }}</p>
      <el-button size="small" type="primary" @click="submitUpload">上传</el-button>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    // 检测文件是否有变动
    fileChange(file, fileList) {
      let fileName = file.name.lastIndexOf(".");
      let ext = file.name.substr(fileName + 1);
      if (ext != "xls" && ext != "xlsx" && ext != "psd" && ext != "jpg") {
        this.$message({
          type: "warning",
          message: `请上传后缀名为xls或xlsx或psd或jpg的文件!`,
        });
        this.fileList = [];
      } else {
        let existFile = fileList
          .slice(0, fileList.length - 1)
          .find((f) => f.name === file.name);
        if (existFile) {
          this.$message.error("当前文件已经存在!");
          fileList.pop();
        }
        this.fileList = fileList;
      }
      console.log(file, fileList);
    },
    //检测文件删除
    fileRemove(file, fileList) {
        this.fileList = fileList;
    },
    // 模拟上传请求
    submitUpload() {
       if (this.fileList.length === 0) {
        this.$message({
          type: "warning",
          message: `请选择上传的文件！`,
        });
      } else {
        /* 
          按要求设置接口请求头参数

          headers: { "Content-Type": "multipart/form-data" },
          transformRequest: [
            function (data) {
              return data;
            },
          ],

        */
        // console.log(this.adFileList, 'this.this.adFileList');
        // 请求操作
        const formData = new FormData();
        this.fileList.forEach((e) => {
          // formData.append("file", e.raw);  // 文件流
          // const fileReader = new FileReader()
          // // 小文件分片读取 1
          // fileReader.readAsArrayBuffer(e.raw);
          // fileReader.onload = e => {
          //   console.log(e);
          //   // https://segmentfault.com/a/1190000022920399  https://blog.csdn.net/MFWSCQ/article/details/110948598
          //   const md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
          //   console.log(md5);
          // }

          // 大文件分片读取 1
          // const file = e.raw;
          // const sliceLength = 10;
          // const chunkSize = Math.ceil(file.size / sliceLength);
          // const fileReader = new FileReader();
          // const md5 = new SparkMD5.ArrayBuffer();
          // let index = 0;
          // const loadFile = () => {
          //   const slice = file.slice(index, index + chunkSize);
          //   fileReader.readAsArrayBuffer(slice);
          // }
          // loadFile();
          // fileReader.onload = e => {
          //   md5.append(e.target.result);
          //   if (index < file.size) {
          //     console.log(1)
          //     index += chunkSize;
          //     loadFile();
          //   } else {
          //     console.log(md5.end());
          //   }
          // };


          // 大文件分片读取 2
          let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
          // file = this.files[0],
          file = e.raw,
          //以2MB为一个分片, Read in chunks of 2MB
          chunkSize = 2097152, 
          //计算该文件一共有多少个分片
          chunks = Math.ceil(file.size / chunkSize),
          //当前分片
          currentChunk = 0,
          //创建一个spark md5计算arrayBuffer的对象
          spark = new SparkMD5.ArrayBuffer(),
          //创建fileReader对象
          fileReader = new FileReader();
          //当前分片读取完成
          fileReader.onload = function (e) {
              //当前的分片和总分片可以了解当前上传的进度
              console.log('read chunk nr', currentChunk + 1, 'of', chunks);
              // Append array buffer
              spark.append(e.target.result); 
              //计数累加
              currentChunk++;
      
              if (currentChunk < chunks) {
                  //当前分片的md5 hash值
                  console.log('current chunck hash:',SparkMD5.ArrayBuffer.hash(e.target.result));
                  //不是最后一个分片，加载下一个分片
                  loadNext();
              } else {
                  console.log('finished loading');
                  // Compute hash
                  //最后一个分片，结束，spark.end()就是最后文件的MD5hash值
                  console.info('computed hash：', spark.end()); 
              }
          };
          //错误
          fileReader.onerror = function () {
              console.warn('oops, something went wrong.');
          };
      
          //读取文件分片
          function loadNext() {
              //开始位置
              const start = currentChunk * chunkSize,
              //结束位置
                  end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
              //fileReader读取下一个文件分片
              fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
          }
          //首次调用开始读取文件分片
          loadNext()

        });
        // api(formData).then(() => {
        //   // ...
        // }).catch(() => {
        //   // .... 
        // })
      }
    }
  },
};
</script>

<style scoped>
/* 多个上传更改el-upload显示文件列表，只展示前5个 */
.el-upload-list .el-upload-list__item:nth-child(n+6) {
    display: none !important;
}
</style>