<template>
     <div>
        <input type="file" :value="fileValue" id="upImageFile" @change="ImageToBase64">
        <img :src="iconBase64" alt="" width="200"/>
        <button>上传</button>

        <el-input type="textarea" v-model="string" />
        {{ string }}
     </div>
</template>
 
<script>
    export default{
        data(){
            return{
                fileValue: "",
                iconBase64: "",
                string: ''
            }
        },
        methods: {
            //将本地图片转化为Base64
            ImageToBase64() {
                let files = document.getElementById('upImageFile').files[0];
                var reader = new FileReader()
                reader.readAsDataURL(files)
                reader.onload = () => {
                    console.log('file 转 base64结果：' + reader.result)
                    this.iconBase64 = reader.result
                    this.string += reader.result
                }
                reader.onerror = function (error) {
                    console.log('Error: ', error)
                }
            }
        }
    }
</script>    