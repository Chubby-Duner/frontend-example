export const setStroage = (name, value) => {
  return localStorage.setItem(name, value);
}

export const Allegro = [{
    field: "date",
    title: "店铺序号",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true,
  },
  {
    field: "name",
    title: "店铺名称",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true,
    color: true,
  },
  {
    field: "address",
    title: "负责人",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true,
  },
  {
    field: "sumMonth",
    title: "统计年月",
    algin: "center",
    key: Math.random(),
    isTrue: true,
    fixed: true
  },
  {
    field: "orderTotal",
    title: "店铺成交总额$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "maintainOrderTotal",
    title: "维护成交总额$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "refundTotal",
    title: "店铺退款总额$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "actualOrderTotal",
    title: "实际成交总额$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "refundRatio",
    title: "退款率",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "purchaseCost",
    title: "货物成本$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "shipping",
    title: "运费$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "packageFee",
    title: "包装材料费$",
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
    title: "广告花费$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  }, // 'Allegro','Lazada','Mercado' * -1
  {
    field: "rebateCommission",
    title: "返还税费$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  }, // 'Allegro','Lazada' * -1
  {
    field: "featureFee",
    title: "订阅费$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  }, // 'Allegro','Lazada' * -1
  {
    field: "refundCost",
    title: "退款成本$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "maintainProfit",
    title: "维护总利润$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "shopProfit",
    title: "店铺总利润$",
    algin: "center",
    key: Math.random(),
    isTrue: true,
  },
  {
    field: "profitRatio",
    title: "店铺利润率",
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

/* 
    参数说明：
      field: 参数字段
      title: 表头文字
      align: 文字是否居中
      key: 保证table每列都是唯一的
      fixed: 是否为固定列
      formatter: 格式化内容
      color: 是否添加颜色
*/

export const columns = {
  Aliexpress: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staff.staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumTime',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumTime);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'realShopTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shipping',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'afflicateFee',
      title: '联盟佣金',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'brushOrderCost',
      title: '刷单费用',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'brushOrderFee',
      title: '刷单佣金',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'brushOrderCount',
      title: '刷单订单个数',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'manualProcessFee',
      title: '人工处理费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'profitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.profitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    },
  ],
  Allegro: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumMonth',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumMonth);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'maintainOrderTotal',
      title: '维护成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shipping',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'adCost',
      title: '广告花费$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.adCost = row.adCost < -1 ? (row.adCost * -1) : row.adCost;
      },
      color: true
    }, // 'Allegro','Lazada','Mercado' * -1
    {
      field: 'rebateCommission',
      title: '返还税费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    }, // 'Allegro','Lazada' * -1
    {
      field: 'featureFee',
      title: '订阅费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    }, // 'Allegro','Lazada' * -1
    {
      field: 'otherFee',
      title: '其他费用$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    }, // 'Allegro','Lazada' * -1
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'maintainProfit',
      title: '维护总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'profitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.profitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    },
  ],
  Amazon: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staff.staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumTime',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumTime);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shippingFee',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'storageFee',
      title: '仓储费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'adCost',
      title: '广告成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'adSale',
      title: '广告销售$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'adCostRatio',
      title: '广告花费投资比$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.adCostRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'rmaRefaCost',
      title: '退件重发成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'rmaRefaShipping',
      title: '退件重发运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'manualProcessFee',
      title: '人工处理费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.shopProfitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    },
  ],
  B2w: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumMonth',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumMonth);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'maintainOrderTotal',
      title: '维护业绩',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shipping',
      title: '运费成本',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'clearanceTotal',
      title: '清货销售额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'firstCarrierFreight',
      title: '头程',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'manualProcessFee',
      title: '人工处理费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'adCost',
      title: '广告花费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'lastShopProfit',
      title: '上月利润',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '上月利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    },
    {
      field: 'maintainProfit',
      title: '维护利润',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'profitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.profitRatio + '%';
      }
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
  ],
  Joom: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumTime',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumTime);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'clearanceTotal',
      title: '清货销售额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shippingFee',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'discountTotal',
      title: '折扣$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.shopProfitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    }
  ],
  Lazada: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumMonth',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumMonth);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shipping',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'adCost',
      title: '广告花费$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.adCost = row.adCost < -1 ? (row.adCost * -1) : row.adCost;
      },
      color: true
    },
    {
      field: 'rebateCommission',
      title: '返还税费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'featureFee',
      title: '订阅费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'otherFee',
      title: '其他费用$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'profitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.profitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    }
  ],
  Mall: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staff.staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumTime',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumTime);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shipping',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'manualProcessFee',
      title: '人工处理费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'profitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.profitRatio + '%';
      }
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    }
  ],
  Mercado: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'siteName',
      title: '站点',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumMonth',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumMonth);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'maintainOrderTotal',
      title: '维护成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'clearanceTotal',
      title: '清货销售额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shipping',
      title: '运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'adCost',
      title: '广告花费$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.adCost = row.adCost < -1 ? (row.adCost * -1) : row.adCost;
      },
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'maintainProfit',
      title: '维护总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'profitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.profitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    }
  ],
  Shopee: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumMonth',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumMonth);
      }
    },
    {
      field: 'shopTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'realShopTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'purchaseCost',
      title: '货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'creditCardTransactionFee',
      title: '交易手续费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '包装材料费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'commissionFee',
      title: '佣金$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.commissionFee = row.commissionFee < -1 ? (row.commissionFee * -1) : row.commissionFee;
      },
      color: true
    },
    {
      field: 'manualProcessFee',
      title: '人工处理费',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'estimatedShippingFee',
      title: '固定运费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.shopProfitRatio + '%';
      }
    },
    {
      field: 'actualProfit',
      title: '实际总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'shopProfitR',
      title: '对比上月利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lastShopProfitRatio',
      title: '对比上月增长',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.lastShopProfitRatio + '%';
      }
    }
  ],
  Wish: [{
      field: 'shopNumber',
      title: '店铺序号',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'shopName',
      title: '店铺名称',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'staffName',
      title: '负责人',
      algin: 'cennter',
      key: Math.random(),
      fixed: true
    },
    {
      field: 'sumMonth',
      title: '统计年月',
      algin: 'cennter',
      key: Math.random(),
      fixed: true,
      formatter: function (row) {
        return dateFormat(row.sumMonth);
      }
    },
    {
      field: 'orderTotal',
      title: '店铺成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundTotal',
      title: '店铺退款总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'lostProfitOrderTotal',
      title: '实际利润成交额',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualOrderTotal',
      title: '实际成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'adCost',
      title: '广告花费总额$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'adSale',
      title: '广告成交总额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'purchaseCost',
      title: '实际利润货物成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'shippingFee',
      title: '实际利润运费成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'packageFee',
      title: '实际利润包装成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'processingFee',
      title: '实际利润人工处理费$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'clearanceTotal',
      title: '清货销售额$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'refundRatio',
      title: '退款率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.refundRatio + '%';
      }
    },
    {
      field: 'adCostRatio',
      title: '广告花费投资比$',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.adCostRatio * 100).toFixed(2) + '%';
      }
    },
    {
      field: 'refundCost',
      title: '退款成本$',
      algin: 'cennter',
      key: Math.random(),
      color: true
    },
    {
      field: 'infractionTotal',
      title: '罚款$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'actualProfit',
      title: '店铺实际总利润',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'infractionTotal',
      title: '罚款$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfit',
      title: '店铺总利润$',
      algin: 'cennter',
      key: Math.random()
    },
    {
      field: 'shopProfitRatio',
      title: '店铺利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return row.shopProfitRatio + '%';
      }
    },
    {
      field: 'actualProfitRatio',
      title: '实际利润率',
      algin: 'cennter',
      key: Math.random(),
      formatter: function (row) {
        return (row.actualProfitRatio * 100).toFixed(2) + '%';
      }
    },
  ]
}

//转换日期格式
export const dateFormat = (longTypeDate) => {
  var dateType = "";
  var date = new Date(Date.parse(longTypeDate.replace(/-/g, "/")));
  dateType = date.getFullYear() + "-" + getMonth(date); //yyyy-MM-dd格式日期
  return dateType;
}

//返回 01-12 的月份值
export const getMonth = (date) => {
  var month = "";
  month = date.getMonth() + 1; //getMonth()得到的月份是0-11
  if (month < 10) {
    month = "0" + month;
  }
  return month;
}

