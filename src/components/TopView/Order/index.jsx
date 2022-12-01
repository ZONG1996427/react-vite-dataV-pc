import React, {useEffect, useRef} from 'react'

import * as echarts from 'echarts'

// 销售
import style from "../TopView.module.scss";

const OrderTotal = ({dayTotal}) => {
    return <div className={style['slot-total']}>
        <span>昨日订单量：</span>
        <span className={style.money}>{dayTotal}</span>
    </div>
}
const OrderEcharts = ({orderData}) => {
    const chartRef = useRef()
    const options = {
        xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false // 默认true，给x轴两边默认留一点边距的，即使改良grid里的left，right还是会留白，把这个改为false就好了
        },
        yAxis: {
            show: false // 不显示y'轴
        },
        series: [{
            type: 'line',
            data: orderData.map(x => x.num),
            areaStyle: {
                color: 'purple'
            },
            lineStyle: {
                width: 0
            },
            itemStyle: {
                opacity: 0
            },
            smooth: true // 开启圆滑曲线
        }],
        grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }
    useEffect(() => {
        const chart = echarts.init(chartRef.current)
        chart.setOption(options)
        return () => {
            chart.dispose()
        }
    }, [])
    return <div style={{width: "100%", height: "100%"}} ref={chartRef}></div>
}
export {
    OrderTotal,
    OrderEcharts
}
