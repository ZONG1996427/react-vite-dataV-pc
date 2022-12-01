import React, {useEffect, useState} from 'react'
import {Card, Col, Row, Spin} from 'antd';
import CommonCard from "../CommonCard/index.jsx";
import style from './TopView.module.scss'
import {OrderTotal, OrderEcharts} from './Order/index.jsx'
import {Charts as SalesCharts, Total as SalesTotal} from './Sales/index.jsx'
import {UserEcharts, UserTotal} from './Users/index.jsx'
import {CumulativeTotal, CumulativeEcharts} from './Cumulative/index.jsx'
import {getTopViewData} from '../../api/index'

const TopView = () => {
    const [topViewData, setTopViewData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getTopViewList()
    }, [])
    const getTopViewList = async () => {
        try {
            const res = await getTopViewData()
            setTopViewData(res)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }
    const {cumulative, order, sales, user} = topViewData
    if (loading) {
        return (
            <div className={style.content}>
                <Row gutter={20}>
                    <Spin
                        size="large"
                        style={{
                            height: `180px`,
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                        }}
                    />
                </Row>
            </div>

        );
    }
    return (
        <div className={style.content}>
            <Row gutter={20}>
                <Col span={6}>
                    <Card hoverable>
                        <CommonCard title={'累计销售额'}
                                    value={`${sales.total}`}
                                    chart={<SalesCharts monthCompare={sales?.monthCompare}
                                                        dayCompare={sales?.dayCompare}/>}
                                    total={<SalesTotal salesVlume={sales?.salesVlume}/>}/>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable>
                        <CommonCard title={'累计订单量'}
                                    value={`${order.total}`}
                                    total={<OrderTotal {...order}/>}
                                    chart={<OrderEcharts {...order}/>}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable>
                        <CommonCard title={'今日交易用户数'} value={`${user.total}`} chart={<UserEcharts {...cumulative}/>}
                                    total={<UserTotal  {...cumulative}/>}/>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable>
                        <CommonCard title={'累计用户数'} value={`${cumulative.total}`} chart={<CumulativeEcharts {...user}/>}
                                    total={<CumulativeTotal {...user}/>}/>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default TopView
