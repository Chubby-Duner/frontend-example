//  单数据
export const Data = [{
    field: "date", // 对应后端返回数据的字段
    title: "统计年月", // 表头
    algin: "center", // 内容居中
    key: Math.random(), // 保持唯一性
    isTrue: true, // 控制列的显示隐藏
    fixed: true, //  是否为固定列
    tooltip: true,  // 悬浮提示
    status: 0 // 状态
  },
  {
    field: "name",
    title: "店铺名称",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true,
    color: true,
    status: 1
  },
  {
    field: "address",
    title: "负责人",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true,
    status: 2
  },
  {
    field: "sumMonth",
    title: "月",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true,
    status: 0
  },
  {
    field: "orderTotal",
    title: "店铺成交",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "maintainOrderTotal",
    title: "成交总额",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "refundTotal",
    title: "退款额",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "refundRatio",
    title: "退款",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "purchaseCost",
    title: "货物",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "shipping",
    title: "运费",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "packageFee",
    title: "包装",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "commissionFee",
    title: "佣金$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "adCost",
    title: "广告花费",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  }, // 'Allegro','Lazada','Mercado' * -1
  {
    field: "rebateCommission",
    title: "返还税费",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  }, 
  {
    field: "shopProfit",
    title: "总利润",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "profitRatio",
    title: "利润率",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "actualProfit",
    title: "实际总利润$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "shopProfitR",
    title: "对比上月利润",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "lastShopProfitRatio",
    title: "对比上月增长",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
]

//  多平台封装数据格式
export const ColData = {
  平台1: [
    {},
    {}
  ],
  平台2: [
    {},
    {}
  ],
  平台3: [
    {},
    {}
  ]
}