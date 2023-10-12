const Mock = require('mockjs')
const Random = Mock.Random

const getResource = () => {
    let resources = []
    for (let i = 0; i < 10; i++) {
        resources.push({
            id: Random.date() + ' ' + Random.time(),
            label: '一级' + Random.csentence(2, 5),
            children: [{
                label: '二级 1-1-1'
            }]
        })
    }
    return resources

}

const getMsg = () => {
    let res = []
    for(let i = 0 ; i < 10; i++) {
        res.push({
            'id|+1': 1, // id每次循环自增 1 
            'serialNumber|1': ['HKG-TC1', 'BKG-YG1', 'KUY-AD5', 'UIO-EG6', 'QTD-OP4'], // 编号 每次随机取其中之一
            email: Random.email(),  // 邮箱
            cnName: '@cname',  // 随机中文姓名 或者 Random.cname() --> 不会每次变
            enName: '@name',  // 随机英文名字 或者 Random.cname() --> 不会每次变
            'age|10-20': 10,  // 年龄
            num: Random.natural(), // 自然数
            url: Random.url('http'), // 网址
            address: Random.county(true), // 布尔值。指示是否生成所属的省、市。
            'date|': '@datetime', // 日期 （年月日 时分秒） 随机
            'star|1-10': "★", // 评星
            templete: Mock.toJSONSchema({'key|1-10': '*'}), // { path:[], properties:[], rule:{}, templete:{} }
            cparagraph: Random.cparagraph(), // Random.cparagraph( min?, max? )  (句子的最小个数/默认3,句子的最大个数/默认7)
        })
    }
    return res
}
/**
 * 格式： Mock.mock(url, post/get , 返回的数据)；Mock.mock( rurl?, rtype?, template|function( options ) )
 * 当post或get请求到路由的时候mock会拦截并返回
 * 注意写全路径 (http://localhost:8080/getResource) / (/getResource)
 **/
Mock.mock('/getResource', 'get', getResource())
Mock.mock('/getMsg', 'get', getMsg())