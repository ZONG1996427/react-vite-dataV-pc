import request from "../utils/request";

// 获取排行榜
const getRankingList = () => {
    return request({
        url: '/getRankingList',
        method: 'get'
    })
}
// 获取top视图数据
const getTopViewData = () => {
    return request({
        url: '/getTopViewData',
        method: 'get'
    })
}
// 获取销售跟访问图表数据
const getVolumeAndVisit = () => {
    return request({
        url: '/getVolumeAndVisit',
        method: 'get'
    })
}
// 获取关键搜索区域数据
const getSearchData = () => {
    return request({
        url: '/searchData',
        method: 'get'
    })
}
// 获取关键搜索区域图表数据
const searchEchartsData = () => {
    return request({
        url: '/searchEchartsData',
        method: 'get'
    })
}
// 获取分类销售数据
const getClassifiedSales = () => {
    return request({
        url: '/getClassifiedSales',
        method: 'get'
    })
}
export {
    getRankingList,
    getTopViewData,
    getVolumeAndVisit,
    getSearchData,
    searchEchartsData,
    getClassifiedSales
}
