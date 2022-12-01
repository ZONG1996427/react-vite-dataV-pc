import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'


const colors = ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']
const RightChrat = ({data, title}) => {
    const chartData = data.map((item, index) => {
        // const percent = `${(item / total * 100).toFixed(2)}%`
        return {
            legendname: item.legendname, value: item.value, percent: item.percent, itemStyle: {
                color: colors[index]
            }, name: `${item.legendname} | ${item.percent}%`
        }
    })
    const chartRef = useRef()
    const options = {
        title: [{
            text: `${title}分布`, textStyle: {
                fontSize: 14, color: '#666'
            }, left: 20, top: 20
        }, {
            text: '累计订单量', subtext: 153, x: '34.5%', y: '42.5%', textStyle: {
                fontSize: 14, color: '#999'
            }, subtextStyle: {
                fontSize: 28, color: '#333'
            }, textAlign: 'center'
        }], series: [{
            name: '品类分布', type: 'pie', data: chartData, label: {
                normal: {
                    show: true, position: 'outter', formatter: function (params) {
                        return params.data.legendname
                    }
                }
            }, center: ['35%', '50%'], radius: ['45%', '60%'], labelLine: {
                normal: {
                    length: 5, length2: 3, smooth: true
                }
            }, clockwise: false, itemStyle: {
                borderWidth: 4, borderColor: '#fff'
            }
        }], legend: {
            type: 'scroll', orient: 'vertical', height: 250, left: '70%', top: 'middle', textStyle: {
                color: '#8c8c8c'
            }
        }, tooltip: {
            trigger: 'item', formatter: function (params) {
                return params.seriesName + '<br />' + params.marker + params.data.legendname + '<br />' + '数量：' + params.data.value + '<br />' + '占比：' + params.data.percent + '%'
            }
        }
    }
    useEffect(() => {
        const chart = echarts.init(chartRef.current)
        chart.setOption(options)
        return () => {
            chart.dispose()
        }
    }, [data])

    return <div style={{width: "100%", height: "582px"}} ref={chartRef}></div>
}

export default RightChrat
