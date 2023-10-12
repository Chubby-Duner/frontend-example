<template>
    <div>
        <el-table v-bind="$attrs" v-on="$listeners" :data="data" :row-key="idKey">
            <el-table-column
                v-if="isCheck"
                align="center"
                width="70"
                type="selection"
                :reserve-selection="isCheckMemory"
            />
            <template v-for="(item) in columns">
                <!-- 正常显示 -->
                <el-table-column
                    v-if="!item.__slotName"
                    v-bind="item"
                    :key="item.prop"
                    show-overflow-tooltip
                > 
                    <!-- 自定义表头 -->
                    <template v-if="item.header" slot="header">
                        <span v-if="item.isClick"><el-button>aaa{{ item.label }}</el-button></span>
                        <span v-else>{{ item.label }}</span>
                    </template>

                    <!-- 二级表头 -->
                    <div v-if="item.__children &&  item.__children.length > 0">
                        <template v-for="obj in item.__children">
                            <my-table-column v-if="obj.__children" :item="obj" v-bind="obj" :key="obj.prop"></my-table-column>
                            
                            <el-table-column
                                v-else
                                :key="obj.prop"
                                align="center"
                                v-bind="obj"
                            >
                                <template v-if="obj.__slotName" v-slot="scope">
                                    <slot :name="obj.__slotName" :data="scope"></slot>
                                </template>
                            </el-table-column>
                        </template>
                        
                    </div>
                </el-table-column>
                <!-- <el-table-column
                    v-if="!item.__slotName"
                    v-bind="item"
                    :key="item.prop"
                    show-overflow-tooltip
                > 
                    <template v-for="obj in item.__children">
                        <my-table-column v-if="obj.__children" :item="obj" v-bind="obj" :key="obj.prop"></my-table-column>
                        <el-table-column
                            v-else
                            :key="obj.prop"
                            v-bind="obj"
                            show-overflow-tooltip
                        > 
                            <template v-if="obj.__slotName" v-slot="scope">
                                <slot :name="obj.__slotName" :data="scope"></slot>
                            </template>
                        </el-table-column>
                    </template>
                </el-table-column> -->
            

                <!-- 插槽显示 -->
                <el-table-column
                    v-else
                    :key="item.prop"
                    align="center"
                    v-bind="item"
                >
                    <!-- 自定义表头 -->
                    <template v-if="item.header" slot="header">
                        <span v-if="item.isClick"><el-button>aaa{{ item.label }}</el-button></span>
                        <span v-else>{{ item.label }}</span> 
                    </template>

                    <template slot-scope="scope">
                        <slot :name="item.__slotName" :data="scope" />
                    </template>
                </el-table-column>
                
            </template>
        </el-table>
        <el-pagination
            class="pagination"
            background
            v-if="hasPagination"
            @size-change="sizeChange"
            @current-change="currentChange"
            :total="pagination.totalRow"
            :current-page="pagination.pageIndex"
            :page-size="pagination.pageSize"
            :page-sizes="pageSizes"
            :layout="layout">
        </el-pagination>
    </div>
</template>

<script>
import MyTableColumn from './MyTableColumn'

export default {
  name: 'miniTable',
  components: {
   MyTableColumn
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * 
     * @param { Array } pageSizes 每页显示的个数
     */
    pageSizes: {
        type: Array,
        default: () => [20, 50, 100]
    },
    /**
     * 
     * @param { String } layout 分页布局
     */
    layout: {
        type: String,
        default: 'total,sizes,prev,pager,next,jumper'
    },
    /**
     * 
     * @param { String } layout 是否需要分页
     */
    hasPagination: {
        type: Boolean,
        default: true
    },
    isCheck: {
        type: Boolean,
        default: true
    },
    /**
     * 是否需要跨页勾选
     */
    isCheckMemory: {
      type: Boolean,
      default: false
    },
    /**
     * 表格行数据的唯一键
     */
    idKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
        pagination: {
            totalRow: 0,
            pageIndex: 1,
            pageSize: 20
        }
    }
  },
  methods: {
    /**
     * 切换分页数量
     * @param { Number } pageSize 页数
     */
    sizeChange (pageSize) {
        this.pagination.pageIndex = 1
        this.pagination.pageSize = pageSize
        this.queryData()
    },
    /**
     * 切换页码
     * @param { Number } pageIndex 页码
     */
    currentChange (pageIndex) {
        this.pagination.pageIndex = pageIndex
        this.queryData(true)
    },
    downloadByALabel( { url, load = '', download = '', style = ''} ) {
      /* 
        load:  下载文件的名称
        download:  通过地址路径下载
        style:  样式
      */
      const a = document.createElement('a')
      a.setAttribute('href', url)
      if (load) {
        a.setAttribute('load', load)
      }
      if (download) {
        a.setAttribute('dowmload', '')
      }
      if (style) {
        a.setAttribute('style', style)
      }
      document.body.append(a)
      a.click()
      a.remove()
    },
  }
}
</script>

<style scoped>
.pagination {
    text-align: right;
}

</style>