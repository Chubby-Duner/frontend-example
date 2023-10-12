<template>
  <div>
    <MiniTable border :columns="columns" :data="tableData">
        <template slot="avatar" slot-scope="scope">
            <img slot="avatar" width="40" :src="scope.data.row.avatar" />
        </template>
        <template slot="options" slot-scope="scope">
            <el-button type="primary" size="small" @click="editRow(scope.data.row)">编辑</el-button>
        </template>
        <template slot="province" slot-scope="scope">
            <span>9999+{{ scope.data.row.province }}</span>
        </template>
        <template slot="city" slot-scope="scope">
            <span>{{ scope.data.row.province }}/{{ scope.data.row.city }}</span>
        </template>
    </MiniTable>
  </div>
</template>

<script>
import MiniTable from "./components/MyTable.vue";
export default {
    data() {
        return {
            columns: [
                { label: '姓名', prop: 'name', align: 'center', __children: [], header: false },
                { label: '头像', prop: 'avatar', align: 'center', __slotName: 'avatar', header: true, isClick: true},
                { label: '年龄', prop: 'age', align: 'center' },
                { label: '爱好', prop: 'hobby', align: 'center' },
                { label: '学历', prop: 'education', align: 'center' },
                { label: '籍贯', prop: 'nativePlace', align: 'center' },
                { label: '地址信息',
                    prop: 'address', 
                    align: 'center',
                    __children: [
                        {
                            label: '省份',
                            prop: 'province',
                            align: 'center',
                            __slotName: 'province'
                        },
                        {
                            label: '城市',
                            prop: 'city',
                            align: 'center',
                            __slotName: 'city'
                        }
                    ]
                },
                { label: '备注', prop: 'remark', align: 'center', width: 200 },
                { label: '操作', prop: 'options', align: 'center', width: 200, __slotName: 'options' }
            ],
            tableData: [{ id: '111', name: '花花', avatar: 'https://img0.baidu.com/it/u=417568979,1404552108&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=708', age: 18, hobby: 'eat', education: '本科', nativePlace: '上海', province: '广东', city: '上海', remark: '漂亮' },{ name: '明明', avatar: 'https://img0.baidu.com/it/u=417568979,1404552108&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=708', age: 18, hobby: 'eat', education: '本科', nativePlace: '南京', province: '广东', city: '南京', remark: '漂亮' },{ id: '222', name: '东东', avatar: 'https://img0.baidu.com/it/u=417568979,1404552108&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=708', age: 18, hobby: 'eat', education: '本科', nativePlace: '杭州', province: '广东', city: '广州', remark: '漂亮' },{ id: '333', name: '西西', avatar: 'https://img0.baidu.com/it/u=417568979,1404552108&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=708', age: 18, hobby: 'eat', education: '硕士', nativePlace: '厦门', province: '广东', city: '厦门', remark: '漂亮' }]
        }
    },
    components: {
        MiniTable
    },
    methods: {
        editRow(row) {  
            console.log('row', row)
        }
    }
}
</script>

<style>

</style>