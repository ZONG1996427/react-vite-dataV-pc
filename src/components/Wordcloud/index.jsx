import * as echarts from 'echarts'
import 'echarts-wordcloud'
import {useEffect, useRef} from "react";

const Wordcloud = () => {
    const chartRef = useRef()
    const options = {
        backgroundColor: '#fff', // canvas背景颜色
        series: [
            {
                type: 'wordCloud',
                left: '-5%',                 // X轴偏移量
                top: '20%',                  // Y轴偏移量
                width: '100%',               // canvas宽度大小
                height: '100%',              // canvas高度大小
                sizeRange: [12, 50],         //  词典字体大小范围配置
                // rotationRange: [0, 0],       // 词典字体旋转角度配置，默认不旋转
                gridSize: 25,                // 词典字体间距配置
                layoutAnimation: true,       // 为false词典过度会阻塞
                textStyle: {                 // 词典样式配置
                    normal: {
                        color() {
                            // 颜色随机渐变
                            let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
                            return colors[parseInt(Math.random() * 10)]
                        }
                    }
                },
                // 渲染词典数据
                data: [{
                    value: '50',          // 词典大小配置
                    name: 'iPhone 13',     // 词典名称配置
                    textStyle: {          // 单独配置某个词典样式
                        shadowBlur: 4,
                        shadowOffsetY: 14,
                        color: '#BDBEFA'
                    }
                },
                    {value: '30', name: 'VIVO'},
                    {value: '29', name: 'OPPO'},
                    {value: '28', name: 'HONOR'},
                    {value: '27', name: 'iPhone 12 pro max'},
                    {value: '26', name: 'iPhone 12 pro max'},
                    {value: '25', name: 'HUAWEI MATE 10'},
                    {value: '24', name: 'ONEPLUS'},
                    {value: '23', name: 'Lenova T470'},
                    {value: '22', name: 'MacBook Air '},
                    {value: '21', name: 'SAMSUNG'},
                    {value: '20', name: 'iPad mini'}]
            }
        ]
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
        }}>热门搜索
        </div>
        <div style={{width: "100%", height: "200px"}} ref={chartRef}></div>
    </div>)
}
export default Wordcloud
