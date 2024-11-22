<template>
  <div>
    <el-upload
      ref="upload"
      action=""
      multiple
      accept=".xls,.xlsx,.psd,.jpg"
      size="small"
      :data="uploadData"
      :http-request="uploadFileContinue"
    >
      <el-button size="small" type="primary"><i class="el-icon-upload"></i>选择文件</el-button>
    </el-upload>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
export default {
  data() {
    return {
      uploadData: {
        key: ""
      },
    };
  },
  // 可能要添加props来确定是否可以拖拽上传的那种类型或者单个上传的，以及图标的使用问题等等
  methods: {
    async uploadFileContinue({ file }) {
      try {
        const res = await this.uploadByPieces(file);
        console.log('🚀 ~ uploadFileContinue ~ res:', res)
        res[0].forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        return res;
      } catch (e) {
        return e;
      }
    },
    // 获取总文件的MD5
    getFileMD5(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();  
        reader.readAsArrayBuffer(file);  
        reader.onload = (e) => {  
          const content = e.target.result;  
          const spark = new SparkMD5.ArrayBuffer();  
          spark.append(content);  
          const md5 = spark.end();  
          console.log('MD5:', md5);  
          resolve(md5)
          // return md5;
        };
      });

    },
    // 计算每个分片的大小
    calculateChunkSizes(totalSize, chunkSize) {
      const totalChunks = Math.ceil(totalSize / chunkSize); // 计算总分片数
      const chunkSizes = new Array(totalChunks).fill(chunkSize); // 初始化分片大小数组
      
      // 调整最后一个分片的大小
      if (totalSize % chunkSize !== 0) {
          chunkSizes[totalChunks - 1] = totalSize % chunkSize;
      }
      
      return chunkSizes; // 数组
    },

    async uploadByPieces(file) {
      console.log('🚀 ~ uploadByPieces ~ file:', file)
      // 文件的MD5
      const fileMD5 = await this.getFileMD5(file)
      console.log('🚀 ~ uploadByPieces ~ fileMD5:', fileMD5)

      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      //以2MB为一个分片, Read in chunks of 2MB
      const chunkSize = 1024 * 1024
      //计算该文件一共有多少个分片
      const totalChunks = Math.ceil(file.size / chunkSize)
      // 每个分片的大小
      const chunkSizesList = this.calculateChunkSizes(file.size, chunkSize)
      //当前分片
      let currentChunk = 0
      //当前分片的大小
      let currentChunkSize = null

      // 获取当前chunk数据
      const getChunkInfo = async (file, index) => {
        const start = index * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        
        const chunkFile = file.slice(start, end);
        const chunkMd5 = await this.getFileMD5(chunkFile)
        console.log('🚀 ~ getChunkInfo ~ chunkMd5:', chunkMd5)
        return { start, end, chunkFile, chunkMd5 };
      }

      // 针对单个文件进行chunk上传
      const readChunk= async (index) => {
        const { chunkFile, chunkMd5 } = await getChunkInfo(file, index);
        let fetchForm = new FormData();
        fetchForm.append("chunkNumber", index + 1); // 分片序号
        fetchForm.append("chunkSize", chunkSize); // 分片大小
        fetchForm.append("currentChunkSize", chunkSizesList[index]); // 当前分片大小
        fetchForm.append("totalChunk", totalChunks); // 文件总数
        fetchForm.append("chunkMd5", chunkMd5); // 文件总数
        fetchForm.append("identifier", fileMD5); // 文件标识
        fetchForm.append("fileName", `${ fileMD5 }_${ index + 1 }`); // 文件名
        fetchForm.append("totalSize", file.size); // 文件总大小
        fetchForm.append("fileMd5", fileMD5); // 总文件md5
        fetchForm.append("chunkFile", chunkFile); // 分片文件
        
        console.log('🚀 ~ readChunk ~ index:', index + 1)
        console.log('🚀 ~ readChunk ~ chunkSize:', chunkSize)
        console.log('🚀 ~ readChunk ~ chunkSizesList[index]:', chunkSizesList[index])
        console.log('🚀 ~ readChunk ~ totalChunks:', totalChunks)
        console.log('🚀 ~ readChunk ~ chunkMd5:', chunkMd5)
        console.log('🚀 ~ readChunk ~ fileMD5:', fileMD5)
        console.log('🚀 ~ readChunk ~ `${fileMD5}_${index}`:', `${ fileMD5 }_${ index + 1 }`)
        console.log('🚀 ~ readChunk ~ file.size:', file.size)
        console.log('🚀 ~ readChunk ~ fileMD5:', fileMD5)
        console.log('🚀 ~ readChunk ~ chunk:', chunkFile)
        
        return uploadChunk(fetchForm)
      }


      // 上传接口
      const uploadChunk= (params) => {
        return new Promise((resolve, reject) => {
          console.log(params, 'upload-params')
          resolve(params)
        })
      }

      // 生成promise集合，进行异步处理
      // 也就是Promise.all的使用
      const promiseList = []
      try {
        for (let index = 0; index < totalChunks; ++index) {
          //异步执行分片上传
          // currentChunk = index
          promiseList.push(readChunk(index))
        }
        const res = await Promise.all(promiseList)
        console.log('🚀 ~ promiseList ~ res:', res)
        return res
      } catch (e) {
        return e
      }
    },
    
  }
}
</script>

<style scoped>
</style>