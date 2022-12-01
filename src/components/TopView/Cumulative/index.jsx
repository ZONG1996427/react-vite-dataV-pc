import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import style from "../TopView.module.scss";

const CumulativeTotal = ({dayCompare, monthCompare}) => {
    return <div className={style['slot-total']}>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className={style['flex-center']}>
                <span>日同比：</span>
                <span className={style.money}>{dayCompare}%</span>
                <span className={`${style.increase} ${style['common-crease']}`}></span>
            </div>
            <div className={style['flex-center']} style={{marginLeft: '20px'}}>
                <span>月同比：</span>
                <span className={style.money}>{monthCompare}%</span>
                <span className={`${style.decrease} ${style['common-crease']}`}></span>
            </div>
        </div>
    </div>
}
const CumulativeEcharts = ({lastMonth, thisMonth, chartTotal}) => {
    const chartRef = useRef()
    const options = {
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        xAxis: {
            type: 'value',
            show: false
        },
        yAxis: {
            type: 'category',
            show: false
        },
        series: [{
            name: '上月平台用户数',
            type: 'bar',
            stack: '总量',
            data: [lastMonth],
            barWidth: 10,
            itemStyle: {
                color: '#45c946'
            }
        }, {
            name: '今月平台用户数',
            type: 'bar',
            stack: '总量',
            data: [lastMonth * 2],
            itemStyle: {
                color: '#eee'
            }
        }, {
            type: 'custom',
            stack: '总量',
            data: [lastMonth],
            renderItem: (params, api) => {
                const value = api.value(0)
                const endPoint = api.coord([value, 0])

                return {
                    type: 'group',
                    position: endPoint,
                    children: [{
                        type: 'path',
                        shape: {
                            d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                            x: -5,
                            y: -20,
                            width: 10,
                            height: 10,
                            layout: 'cover'
                        },
                        style: {
                            fill: '#45c946'
                        }
                    }, {
                        type: 'path',
                        shape: {
                            d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                            x: -5,
                            y: 10,
                            width: 10,
                            height: 10,
                            layout: 'cover'
                        },
                        style: {
                            fill: '#45c946'
                        }
                    }]
                }
            }
        }]
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
    CumulativeTotal,
    CumulativeEcharts
}
