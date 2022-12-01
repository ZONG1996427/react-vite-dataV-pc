import TopView from "../components/TopView/index.jsx";
import BottomView from "../components/BottomView/index.jsx";
import MapView from "../components/MapView/index.jsx";
import SalesView from "../components/SalesView/index.jsx";
// import React, {useEffect, useState} from 'react'
import style from './layout.module.scss'


const Layout = () => {
    return (
        <div className={style.home}>
            <TopView/>
            <SalesView/>
            <BottomView/>
            <MapView/>
        </div>
    )
}
export default Layout
