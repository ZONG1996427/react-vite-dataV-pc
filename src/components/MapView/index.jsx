import React from 'react'
import BmapEcharts from './BmapEcharts.jsx'
import LiquidFill from '../LiquidFill/index.jsx'
import Wordcloud from '../Wordcloud/index.jsx'
import {Card} from 'antd';
import style from './MapView.module.scss'

const MapView = () => {
    return (
        <div className={style['content']}>
            <div style={{
                flex: '1'
            }}>
                <BmapEcharts/>
            </div>
            <div className={style['card-content']}>
                <Card className={style['card']}>
                    <LiquidFill/>
                </Card>
                <div style={{
                    height: '20px',
                    width: '100%'
                }}></div>
                <Card className={style['card']}>
                    <Wordcloud/>
                </Card>
            </div>
        </div>
    )
}
export default MapView
