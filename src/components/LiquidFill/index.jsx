import * as echarts from 'echarts'
import 'echarts-liquidfill'
import {useEffect, useRef} from "react";

const LiquidFill = () => {
    const chartRef = useRef()
    const options = {
        // title: {// 标题
        //     text: '补贴资金剩余',
        //     textStyle: {// 标题的样式
        //         color: '#888', // 字体颜色
        //         fontFamily: 'Microsoft YaHei', // 字体
        //         fontSize: 24,
        //         fontWeight: '400',
        //         align: 'center', // 文字的水平方式
        //         baseline: 'middle',
        //         position: 'inside',
        //         verticalAlign: 'middle'// 文字的垂直方式
        //     },
        //     left: 'center', // 定位
        //     top: '20%'
        // },
        series: [{
            type: 'liquidFill',
            radius: '90%', // 可以修改图形与当前容器的距离
            waveAnimation: true,
            data: [{
                value: Math.random().toFixed(2),
                direction: 'left',
                itemStyle: {
                    normal: {
                        color: '#1890ff'
                    }
                }
            }],
            outline: {
                // show: true , //是否显示轮廓 布尔值
                borderDistance: 1, // 外部轮廓与图表的距离 数字
                itemStyle: {
                    borderColor: '#1890ff', // 边框的颜色
                    borderWidth: 3 // 边框的宽度
                    // shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                    // shadowColor: '#000' //外部轮廓的阴影颜色
                }
            },
            itemStyle: {
                opacity: 0.9, // 波浪的透明度
                shadowBlur: 0 // 波浪的阴影范围
            },
            backgroundStyle: {
                color: '#fff' // 图表的背景颜色
            },
            label: { // 数据展示样式
                show: true,
                color: '#000',
                insideColor: '#fff',
                fontSize: 24,
                fontWeight: 400,
                align: 'center',
                baseline: 'middle',
                position: 'inside'
            }
        }]
    }
    useEffect(() => {
        const chart = echarts.init(chartRef.current)
        chart.setOption(options)
        return () => {
            chart.dispose()
        }
    },)
    return (<div>
        <div style={{
            width: '100%',
            padding: '5px',
            borderBottom: '1px solid #eeeeee'
        }}>用户月同比增长
        </div>
        <div style={{width: "100%", height: "200px"}} ref={chartRef}></div>
    </div>)
}
export default LiquidFill
