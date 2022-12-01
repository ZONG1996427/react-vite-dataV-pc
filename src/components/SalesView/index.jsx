import React, {useEffect, useRef, useState} from 'react'
import {Card, DatePicker, Menu, message, Radio} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import * as echarts from 'echarts'
import {getRankingList, getVolumeAndVisit} from '../../api/index'
// eslint-disable-next-line
import style from './salesView.module.scss'

const {RangePicker} = DatePicker;

const SalesView = () => {
    const chartRef = useRef()
    const [current, setCurrent] = useState('1');
    const [dateRange, setDateRange] = useState([])
    const [rankingData, setRankingData] = useState([])
    const [VolumeAndVisitData, setVolumeAndVisitData] = useState([])
    const onClick = (e) => {
        if (e.key !== current) {
            getVolumeAndVisitData()
        }
        setCurrent(e.key);
    };
    useEffect(() => {
        getRankingData()
        getVolumeAndVisitData()
    }, [])
    useEffect(() => {
        const chart = echarts.init(chartRef.current)
        chart.setOption(options)
        return () => {
            chart.dispose()
        }
        // 依赖VolumeAndVisitData，数据变化时init
    }, [VolumeAndVisitData])

    const options = {
        title: {
            text: current === '1' ? '销售额' : '访问量', textStyle: {
                fontSize: 13, color: '#666'
            }, left: 25, top: 15
        }, xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                alignWithLabel: true, // 让x轴的对其点是跟x轴label对齐
                lineStyle: {
                    color: '#999'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                color: '#333'
            }
        }, yAxis: {
            axisLine: {
                show: false
            }, axisTick: {
                show: false
            }, splitLine: { // 修改y轴样式，设置实线为虚线，默认为实线
                lineStyle: {
                    type: 'dotted', color: '#eee'
                }
            }
        }, series: [{
            type: 'bar', barWidth: '35%', data: VolumeAndVisitData?.map(x => x.num)
        }], color: ['#3398DB'], grid: {
            top: 70, left: 60, right: 60, bottom: 50
        }
    }
    const items = [{
        label: '销售额', key: '1'
    }, {
        label: '访问量', key: '2',
    },];

    const plainOptions = [{
        label: '本日', key: '1'
    }, {
        label: '本周', key: '2'
    }, {
        label: '本月', key: '3'
    }, {
        label: '本年', key: '4'
    }];
    // 获取排行榜
    const getRankingData = async () => {
        const res = await getRankingList()
        setRankingData(res)
    }
    // 获取销售/访问
    const getVolumeAndVisitData = async () => {
        const res = await getVolumeAndVisit()
        setVolumeAndVisitData(res)
    }

    const rangePickerChange = (dates, dateStrings) => {
        setDateRange(dates)
        getRankingData()
    }
    const plainonChange = (e) => {
        getVolumeAndVisitData()
        message.warning('仅展示模拟效果，具体传参只需要传入真实参数')
    }
    return (<div className={style.content}>
        <Card>
            <div className={style['menu-container']}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
                <div className={style['menu-right']}>
                    <Radio.Group onChange={plainonChange} defaultValue="1" buttonStyle="solid">
                        {plainOptions.map(button => {
                            return <Radio.Button key={button.key}

                                                 value={button.key}>{button.label}</Radio.Button>
                        })}
                    </Radio.Group>
                    <RangePicker onChange={rangePickerChange} value={dateRange}
                                 locale={locale} className={style.RangePicker}
                    />
                </div>
            </div>
            <div className={style['content-container']}>
                <div style={{width: "100%", height: "270px"}} ref={chartRef}
                     className={style['content-container-left']}>
                </div>
                <div className={style['content-container-right']}>
                    <p style={{
                        marginTop: `15px`
                    }}>排行榜</p>
                    <div className={style['ranking-list']}>
                        {rankingData.map((item, index) => {
                            return <div key={index} className={style['ranking-item']}>
                                <div className={index < 3 ? style['b-3'] : ''}>{index + 1}</div>
                                <div>{item.text}</div>
                                <div>{item.price}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </Card>
    </div>)
}
export default SalesView





