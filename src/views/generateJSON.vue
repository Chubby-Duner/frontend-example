<template>
  <!--  实现的功能是新增一条数据，减少一条数据。eg: 页面进行操作然后生成对应的JSON  -->
  <div>
       <el-button @click="openJSONDialog" size="small" type="success">JSON生成</el-button>
        <el-dialog
            title="JSON生成"
            :visible.sync="couangJSONDialog"
            :close-on-click-modal="false">
        <div>
            <div>
                <el-row>
                    <el-col :span="12">
                        平台：
                        <el-select v-model="jsonPlat" filterable size="small" clearable style="width: 100px">
                            <el-option v-for="v in jsonPlatform"
                                       :key="v.value"
                                       :value="v.label"
                                       :label="v.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12" style="padding-right: 30px;">
                        <el-button @click="addNode" icon="el-icon-plus" circle type="primary" style="float: right"></el-button>
                    </el-col>
                </el-row>
            </div>
            <div v-for="(json,i) in jsonList" :gutter="10" style="display: flex;align-items: center;margin-top: 10px" :key="i">
                <div class="jsonWrapper">
                    <div :span="6" style="margin-right: 100px">
                        类型：
                        <el-select v-model="json.type" filterable size="small" clearable style="width: 134px">
                            <el-option v-for="v in imageType"
                                       :key="v.value"
                                       :value="v.label"
                                       :label="v.value"></el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <div :span="14" v-for="(content, j) in json.contentDetails" class="sigleContent" :key="j">
                            内容类型：
                            <el-select v-model="content.contentsType" filterable size="small" clearable style="width: 100px">
                                <el-option v-for="v in contentsType"
                                           :key="v.value"
                                           :value="v.label"
                                           :label="v.value"></el-option>
                            </el-select>
                            <el-input
                                    placeholder="请输入内容"
                                    size="small"
                                    v-model="content.contents"
                                    style="width: 150px"
                                    clearable>
                            </el-input>
                            <el-button @click="addContentDetailsNode(i)" type="primary" size="small">新增</el-button>
                            <el-button type="danger" @click="deleteContentDetailsNode(i, j)" size="small">删除</el-button>
                        </div>
                    </div>
                </div>
                <div class="jsonDelBtn">
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteNode(i)" style="float: right"></el-button>
                </div>
            </div>
            <el-row style="margin-top: 10px">
                <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="生成结果"
                        v-model="jsonResult">
                </el-input>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="couangJSONDialog = false">取 消</el-button>
            <el-button type="primary" @click="generateJSON">生成 JSON</el-button>
        </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
        couangJSONDialog: false,
        jsonPlat: '',
        jsonPlatform: [
            {
                label: 'Coupang',
                value: 'Coupang'
            }
        ],
        // 外层类型选择
        imageType: [
            {label: 'IMAGE', value: 'IMAGE'},
            {label: 'IMAGE_NO_SPACE', value: 'IMAGE_NO_SPACE'},
            {label: 'TEXT', value: 'TEXT'},
            {label: 'IMAGE_TEXT', value: 'IMAGE_TEXT'},
            {label: 'TEXT_IMAGE', value: 'TEXT_IMAGE'},
            {label: 'IMAGE_IMAGE', value: 'IMAGE_IMAGE'},
            {label: 'TEXT_TEXT', value: 'TEXT_TEXT'},
            {label: 'TITLE', value: 'TITLE'},
            {label: 'HTML', value: 'HTML'},
        ],
        // contentsType
        contentsType: [
            {label: 'IMAGE', value: 'IMAGE'},
            {label: 'TEXT', value: 'TEXT'}
        ],
        jsonList: [
            {
                type: '',
                contentDetails: [
                    {
                        contentsType: '',
                        contents: ''
                    }
                ]
            }
        ],
        jsonResult: ''  // json生成结果
        }
    },
    methods: {
        // 打开生成JSON面板
        openJSONDialog() {
            this.couangJSONDialog = true
        },
        // coupang 生成JSON
        generateJSON() {
            this.jsonResult = JSON.stringify(this.jsonList)
        },
        // 外层新增
        addNode() {
            this.jsonList.push({
                type: '',
                contentDetails: [
                    {
                        contentsType: '',
                        contents: ''
                    }
                ]
            })
        },
        // 外层删除
        deleteNode(i) {
            if (this.jsonList.length === 1) {
                this.$notify({
                    title: '错误',
                    message: '至少要存在一个！',
                    position: 'bottom-right',
                    type: 'error'
                });
                return
            }
            this.jsonList.splice(i, 1);  //删除index为i,位置的数组元素
        },
        addContentDetailsNode(i) {
            this.jsonList.forEach((item, index) => {
                if (i === index) {
                    item.contentDetails.push({
                        contentsType: '',
                        contents: ''
                    })
                }
            })
        },
        deleteContentDetailsNode(i, j) {
            this.jsonList.forEach((item, index) => {
                if (i === index) {
                    if (item.contentDetails.length === 1) {
                        this.$notify({
                            title: '错误',
                            message: '至少要存在一个！',
                            position: 'bottom-right',
                            type: 'error'
                        });
                    } else {
                        item.contentDetails.splice(j, 1);
                    }
                }
            })
        }
    }
}
</script>

<style scoped>

.content .sigleContent:not(:first-child){
    margin-top: 10px;
}

.jsonWrapper{
    border: 1px solid rgb(204, 204, 204);
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.jsonDelBtn{
    margin-left: 20px;
}
</style>