<!-- 

link: https://blog.csdn.net/hjb2722404/article/details/121407406?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&utm_relevant_index=2

-->

<template>
    <div class="swdTable">
        <div class="trs-table">
            <el-table
                :ref="table.ref"
                v-loading="table.loading"
                :data="tableDataCopy"
                :row-key="table.rowKey"
                tooltip-effect="dark"
                style="width: 100%;"
                :stripe="table.strip"
                :border="table.border"
                :height="table.height || 40"
                :header-cell-style="{
                    'background-color': '#fafafa'
                }"
                :element-loading-text="table.loadingText||'加载中'"
                @sort-change="handleTableSort"
                @selection-change="handleSelectionChange"
            >
                <el-table-column v-if="table.select" type="selection" width="55"></el-table-column>
                <el-table-column v-if="table.type" :label="table.typeText||'序号'" width="60" type="index" align="center"></el-table-column>
                <el-table-column
                    v-for="(col, index) in tableLableShow"
                    :key="index"
                    :fixed="col.fixed"
                    :label="col.title"
                    :width="tableLableShowCopy[index].width"
                    :sortable="col.sort"
                    :prop="tableLableShowCopy[index].prop"
                    :formatter="col.formatter"
                    :show-overflow-tooltip="col.ellipsis"
                    :align="col.align"
                    :column-key="index.toString()"
                    :header-align="col.headerAlign || col.align || table.align || 'left'"
                >
                    <template slot-scope="scope">
                        <slot v-if="tableLableShowCopy[index].slot" :name="tableLableShowCopy[index].slot" :scope="scope">
                        </slot>
                        <span v-else>{{ tableLableShowCopy[index].formatter? tableLableShowCopy[index].formatter(scope.row, col) : (scope.row[tableLableShowCopy[index].prop] || '--') }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 配置列的可见性，勾选的为可见，不勾选的不可见 -->
            <div v-if="table.labelToggle" ref="trsTableToggle" class="label-toggle">
                <span class="lable-toggle-switch" @click="toggleBoxSwitch"><i class="el-icon-setting"></i></span>
                <div v-if="labelToggle" class="label-toogle-box">
                    <ul>
                        <li v-for="(col, index) in tableLableToggle" :key="index">
                            <el-checkbox
                                v-model="col.visible"
                                :disabled="isLabelDisable(col)"
                            >
                                {{ col.title }}
                            </el-checkbox>
                        </li>
                    </ul>
                    <div class="toggle-btns">
                        <el-button @click="handleLabelChangeCancel">取消</el-button>
                        <el-button type="danger" @click="handleLabelChange">确定</el-button>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <div v-if="table.pagination" :style="{ textAlign: pagination.algin, color: 'red' }">
                <el-pagination
                    :current-page.sync="pagination.currentPage"
                    :page-sizes="pagination.pageList"
                    :background="pagination.background"
                    :layout="pagination.layout"
                    :total="pagination.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
</template>
<script>
import Sortable from 'sortablejs';
export default {
    name: 'TrsTable',
    components: {

    },
    props: {
        table: {  // 表格配置-对象(非必传)
            type: Object,
            default: () => {
                return {};
            },
        },
        tableLabel: {  // 表头字段配置-数组对象（必传，不可为空）
            type: Array,
            default: () => {
                return [];
            },
        },
        tableData: {  // 表格数据， 必传 
            type: Array,
            default: () => { 
                return [];
            },
        },
        pagination: {  // 分页
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            tableDataCopy: [],  // 表格数据
            tableLableShow: [],  // 表头数据
            tableLableShowCopy: [], // 复制表头，利用下标对应取值
            tableLableToggle: [], // 控制显隐
            labelToggle: false, // 显隐窗口
            scrollSensitivity: 30, // 距离固定列边缘多少距离时开始滚动 
            rows: 20,
            page: 1,
            // yuanmei
            YuanmeiSearchObj: {
                shop: [],
                staff: [],
                department: []
            },
            YuanmeiShop: [],
            YuanmeiStaff: [],
            YuanmeiDepartment: [],
        };
    },
    watch: {
        tableData: {
            // 监听数据变化
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.tableDataCopy = JSON.parse(JSON.stringify(newVal));
                }
                // 垂直滚动条回到顶部 
                this.$nextTick(() => {
                    if (this.tableLableShow.length) {
                        this.$refs[this.table.ref].$refs.bodyWrapper.scrollTop = 0;
                    }
                });
            },
            deep: true,
            immediate: false,
        },
        tableLabel: {
            // 监听表头变化
            handler(newVal, oldVal) { 
                this.dealLables();
            },
            deep: true,
            immediate: true,
        },
    },
    created() {
        var that = this;
        setTimeout(() => {
            that.dealLables();
        }, 0);
        this.tableDataCopy = JSON.parse(JSON.stringify(that.tableData));
    },
    mounted() {  
        document.addEventListener('click', this.toggleMenuClose);
        setTimeout(() => {
            this.columnDrop();
             this.rowDrop();
         }, 1000);
    },
    methods: {
        toggleMenuClose(e) {
            if (this.$refs.trsTableToggle && !this.$refs.trsTableToggle.contains(e.target)) {
                if (this.labelToggle === true) {
                    this.labelToggle = false;
                    this.handleLabelChangeCancel();
                }
            }
        }, 
        beforeDestroy() {
            document.removeEventListener('click', this.toggleMenuClose);
        },
        // 传入的表头复制一份作为配置数组，并且根据order进行排序
        dealLables() {
            const labels = [];
            for (let i = 0; i < this.tableLabel.length; i++) {
                const obj = Object.assign({}, this.tableLabel[i]);
                labels[i] = obj;
            }
            this.tableLableToggle = labels.sort((a, b) => {
                const v1 = a.order ?? labels.length;
                const v2 = b.order ?? labels.length;
                return v1 - v2;
            });
            this.lableToggleChange();
        },
        // 勾选项发生变化的回调
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', {
                multipleSelection: val,
            });
        },
        // 表格排序回调
        handleTableSort(item) {
            this.$emit('sort', item);
        },
        // 表头字段可见性发生变化的回调
        handleLabelChange() {
            this.lableToggleChange();
            this.$emit('lableChange', this.tableLableToggle);
        },
        // 表头设置改变
        lableToggleChange() {
            this.tableLableShow = this.tableLableToggle.filter(lable => lable.visible !== false);
            this.tableLableShowCopy = this.deepClone(this.tableLableShow);
            this.labelToggle = false;
        },
        // 更新表头字段可见性配置列表
        updateLabelToogle({ start, end }) {
            const moveCol = this.tableLableShowCopy[start];
            const targetCol = this.tableLableShowCopy[end];
            const moveColIndex = this.getIndexOfToggleLabel(moveCol);
            const targetColIndex = this.getIndexOfToggleLabel(targetCol);
            const removeCol = this.tableLableToggle.splice(moveColIndex, 1)[0];
            this.tableLableToggle.splice(targetColIndex, 0, removeCol);
        },
        // 获取给定列在表头字段可见性配置列表中的位置索引
        getIndexOfToggleLabel(col) {
            let index;
            for (let i = 0; i < this.tableLableToggle.length; i++) {
                if (this.tableLableToggle[i].title === col.title) {
                    index = i;
                }
            }
            return index || this.tableLableToggle.length - 1;
        },
        // 切换表头字段配置列表的收缩展开
        toggleBoxSwitch() {
            this.labelToggle = !this.labelToggle;
            if (!this.labelToggle) {
                this.handleLabelChangeCancel();
            }
        },
        // 取消对表头字段可见性配置列表的更改
        handleLabelChangeCancel() {
            this.tableLableToggle = this.tableLableToggle.map((label) => {
                const labelShow = this.tableLableShow.filter((item) => item.title === label.title);
                if (!labelShow.length) {
                    label.visible = false;
                } else {
                    label.visible = true;
                }
                return label;
            });
            this.labelToggle = false;
        },
        isLabelDisable(col) {
            if (col.fixed || !col.canHide) {
                return true;
            }
            return false;
        },
        /**
         * [columnDrop description] 列拖拽 
         * @return  {[type]}  [return description]  
         */
        columnDrop() {
            const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
            this.sortable = Sortable.create(wrapperTr, {
                animation: 180,
                delay: 0,
                dragoverBubble: true,
                disabled: !this.table.colDragble,
                forceFallback: true,
                onEnd: evt => {
                    const oldItem = this.tableLableShowCopy[evt.oldIndex];
                    this.updateLabelToogle({
                        start: evt.oldIndex,
                        end: evt.newIndex,
                    });
                    this.tableLableShowCopy.splice(evt.oldIndex, 1);
                    this.tableLableShowCopy.splice(evt.newIndex, 0, oldItem);
                    this.$emit('colChange', this.tableLableToggle);
                },
                onChange: (evt) => {
                    const leftFixDom = document.querySelector('.el-table__fixed');
                    const rightFixDom = document.querySelector('.el-table__fixed-right');
                    this.autoScroll(leftFixDom, rightFixDom, evt);
                },
            });
        },
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const _this = this;
            Sortable.create(tbody, {
                animation: 180,
                delay: 0,
                disabled: !this.table.rowDragble,
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.tableDataCopy.splice(oldIndex, 1)[0];
                    _this.tableDataCopy.splice(newIndex, 0, currRow);
                    _this.$emit('rowChange', oldIndex, newIndex);
                },
            });
        },
        autoScroll(leftFixDom, rightFixDom, evt) {
            this.autoScrollLeft(leftFixDom, evt);
            this.autoScrollRight(rightFixDom, evt);
        },
        autoScrollLeft(leftFixDom, evt) {
            const leftDomRect = leftFixDom.getBoundingClientRect();
            if (!evt.draggedRect) {
                evt.draggedRect = evt.item.getBoundingClientRect();
            }
            if (evt.draggedRect.left - this.scrollSensitivity < leftDomRect.right) {
                this.$refs[this.table.ref].$refs.bodyWrapper.scrollLeft -= evt.draggedRect.width * 2;
            }
        },
        autoScrollRight(rightFixDom, evt) {
            const rightFixRect = rightFixDom.getBoundingClientRect();
            if (!evt.draggedRect) {
                evt.draggedRect = evt.item.getBoundingClientRect();
            }
            if (evt.draggedRect.right + this.scrollSensitivity > rightFixRect.left) {
                this.$refs[this.table.ref].$refs.bodyWrapper.scrollLeft += evt.draggedRect.width * 2;
            }
        },
        handleSizeChange(rows) {
            this.pagination.currentPage = 1
            // this.rows = val
            console.log(rows, 'sizechange');
            this.$emit('handleSizeChange', rows)
        },
        handleCurrentChange(page) {
            console.log(page, 'currentchange');
            this.pagination.currentPage = page
            this.$emit('handleCurrentChange', page)
        },
        deepClone(obj) {
            const result = Array.isArray(obj) ? [] : {}
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (typeof obj[key] === 'object') {
                    result[key] = this.deepClone(obj[key]) // 递归复制
                } else {
                    result[key] = obj[key]
                }
                }
            }
            return result
        }
    },
};
</script>
<style lang="scss" scoped>
.swdTable {
    width: 100%;
    .trs-table {
        position: relative;
        .label-toggle {
            position: absolute;
            right: -10px;
            top: 10px;
            width: 200px;
            background: #fff;
            z-index: 100; // 因为列的拖动用的虚线框层级是99，所以这里要比虚线框高一层，否则无法点击到
            .lable-toggle-switch {
                position: absolute;
                right: 0;
                top: 0;
                width: 30px;
                height: 40px;
                cursor: pointer;
            }
            .label-toogle-box {
                border: 1px solid #cecece;
                padding-bottom: 15px;
                ul {
                    max-height: 50vh;
                    overflow-y: auto;
                    padding: 20px;
                    padding-right: 5px;
                    li {
                        width: 100%;
                        display: block;
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .toggle-btns {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }
            }
        }
        >>> .el-table {
            th {
                padding: 0;
                .thead-cell {
                    padding: 0;
                    display: inline-flex;
                    flex-direction: column;
                    align-items: left;
                    cursor: pointer;
                    overflow: initial;
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                    }
                    .virtual {
                        position: fixed;
                        display: none;
                        width: 0;
                        z-index: 99;
                        background: none;
                        border: 1px solid #aeaeae;
                        opacity: 0.5;
                        margin-top: -10px;
                    }
                    li {
                        list-style: none;
                        height: 40px;
                        line-height: 40px;
                    }
                }
                &.darg_active_left {
                    .thead-cell {
                        .virtual {
                            border-left: 2px dotted #666;
                        }
                    }
                }
                &.darg_active_right {
                    .thead-cell {
                        .virtual {
                            border-right: 2px dotted #666;
                        }
                    }
                }
            }
            /* stylelint-disable */
            .el-table__fixed-body-wrapper {
                top: 40px !important;
            }
            .el-table__header-wrapper {
                height: 40px;  // 动态渲染表头需要一开始就规定表头高度，否则表格高度计算会有bug
                .cell {
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            .el-table__fixed-header-wrapper {
                .cell {
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
            .el-table__body-wrapper, .el-table__empty-block {
                min-width: 85vw;
                height: calc(100% - 40px) !important;
            }
            /* stylelint-enable */
            .el-table__fixed-right {
                right: 0;
                &::before {
                    height: 0;
                }
            }
        }
    }
    .trs-table_moving {
        /* stylelint-disable */
        >>> .el-table {
            th {
                .thead-cell {
                    cursor: move !important;
                }
            }
        }
        /* stylelint-enable */
        >>> .el-table__fixed {
            cursor: not-allowed;
        }
    }
}
</style>

7e657fdd-534a-4415-82b5-f73463cd556d

AIuMR2f7bCiVgCQvkEp0rUTFD4S-mPXMcP2eatytCK6_3DUdmI4q1W69g5Tn9GlBYwoBWqQoxqUh9BNIUmlcmnQ


3a83734b-cf82-4957-8594-c37448da3798

L2igAh9iVTPRsF3Zvbzp2snHXAGkYSKa3T68F40s7vKs_AiQUyqzD-LkpivBtosF_fdWa1Z8886ZCtatXmmC8A