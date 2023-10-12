<template>
    <div>
        bus事件： {{ text1 }}
        <!--导出按钮-->
        <el-button type="primary" style="margin:20px;" @click="exportExcelSelect">导出Excel</el-button>
        <!--原始表格-->
        <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
               type="selection"
            >
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
            >
            </el-table-column>
            <el-table-column label="详细地址">
                <el-table-column
                        prop="province"
                        label="省份"
                >
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="市区"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                >
                </el-table-column>
                <el-table-column
                        prop="zip"
                        label="邮编"
                >
                </el-table-column>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
            >
                <template>
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--预览弹窗表格-->
        <el-dialog title="表格保存预览" width="70%" :visible.sync="selectWindow">
            <el-table :data="selectData" id="selectTable" height="380px">
                <el-table-column
                        prop="date"
                        label="日期"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column label="详细地址">
                    <el-table-column
                            prop="province"
                            label="省份"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="city"
                            label="市区"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="zip"
                            label="邮编"
                    >
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="exportExcel">确定保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import htmlToExcel from '@/utils/htmlToExcel'
    import bus from '@/utils/eventBus'

    export default {
        name: "ExcelPage",
        data(){
            return{
                //表格数据
                tableData: [
                    {
                        date: '2016-05-03',
                        name: '王小天',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        date: '2016-05-02',
                        name: '王小明',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        date: '2016-05-04',
                        name: '王小智',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        date: '2016-05-01',
                        name: '王小红',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        date: '2016-05-08',
                        name: '王小华',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        date: '2016-05-06',
                        name: '王小丽',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        date: '2016-05-07',
                        name: '王小花',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }
                ],
                //表格中选中的数据
                selectData:[],
                selectWindow:false,
                text1: ''
            }
        },
        created() {
            // return new Promise(resolve => {
                // const that = this
                bus.$on('share', function (val) {
                    console.log('eventbus ==> ', val);
                    this.text1 = val
                    // this.$set(this.text, val)
                    console.log(this.text1, 111);
                }.bind(this))
                // resolve()
                // console.log(this.text, 222);
            // })
        },
        methods:{
            //导出
            exportExcel() {
                // htmlToExcel.getExcel('#selectTable','导出的自定义标题')

                // 参数1 表格id
                // 参数2 保存的excel文件名
                // let xlsx = new htmlToExcel('#selectTable', '下载.xlsx');
                // xlsx.createCustomizeTable()

            },
            //显示预览弹窗
            exportExcelSelect(){
                if (this.selectData.length < 1){
                    this.$message.error('请选择要导出的内容！');
                    return false;
                }
                this.selectWindow = true;
            },
            //选中数据
            handleSelectionChange(val) {
                this.selectData = val;
            },
        }
    }
</script>

<style scoped>
</style>
