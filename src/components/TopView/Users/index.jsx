import React, {useEffect, useRef} from 'react'

import * as echarts from 'echarts'

// 销售
import style from "../TopView.module.scss";

const UserTotal = ({dayTotal}) => {
    return <div className={style['slot-total']}>
        <span>退货率：</span>
        <span className={style.money}>{dayTotal}%</span>
    </div>
}
const UserEcharts = ({cumulativeData}) => {
    const chartRef = useRef()
    const options = {
        color: ['#3398DB'],
        tooltip: {},
        series: [{
            name: '用户实时交易量',
            type: 'bar',
            data: cumulativeData.map(x => x.num),
            barWidth: '60%'
        }],
        xAxis: {
            type: 'category',
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
            show: false
        },
        yAxis: {
            show: false
        },
        grid: {
            top: 0,
            left: 0,
            bottom: 0,
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
    UserTotal,
    UserEcharts
}
