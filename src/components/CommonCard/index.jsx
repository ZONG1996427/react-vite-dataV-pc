import React from 'react'
import style from './CommonCard.module.scss'

const CommonCard = ({title, value, chart, total}) => {
    return <>
        <div className={style.title}>{title}</div>
        <div className={style.value}>{value}</div>
        <div className={style.chart}>{chart}</div>
        <div className={style.line}></div>
        <div className={style.total}>{total}</div>
    </>
}
export default CommonCard
