import React, {useEffect, useRef} from 'react'
import SearchNum from '../SearchNum/index.jsx'
import * as echarts from 'echarts'

const SearchTotal = ({data, title, value}) => {
    const chartRef = useRef()
    const options = {
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            show: false
        },
        tooltip: {},
        series: [{
            type: 'line',
            data,
            areaStyle: {
                color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
                color: 'rgb(95,187,255)'
            },
            itemStyle: {
                opacity: 0
            },
            smooth: true
        }],
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
    }, [data])

    return <div style={{
        flex: 1,
        minHeight: '100px',
        marginRight: title === '搜索用户数' ? '10px' : '',
        marginLeft: title === '搜索量' ? '10px' : '',
    }}>
        <SearchNum title={title} value={value}/>
        <div style={{width: "100%", height: "100%"}} ref={chartRef}></div>
    </div>
}

export default SearchTotal
