import style from "../TopView.module.scss";

const Charts = ({dayCompare, monthCompare}) => {
    return <div className={style['slot-charts']}>
        <div className={style.compare}>
            <span>日同比</span>
            <span className={style.money}>{dayCompare}%</span>
            <span className={`${style.increase} ${style['common-crease']}`}></span>
        </div>
        <div className={style.compare}>
            <span>月同比</span>
            <span className={style.money}>{monthCompare}%</span>
            <span className={`${style.decrease} ${style['common-crease']}`}></span>
        </div>
    </div>
}
const Total = ({salesVlume}) => {
    return <div className={style['slot-total']}>
        <span>昨日销售额：</span>
        <span className={style.money}>￥{salesVlume}</span>
    </div>
}

export {
    Total,
    Charts
}
