import React, {useEffect, useState} from 'react'
import {Card, Radio, Spin} from 'antd';
import style from './bottomView.module.scss'
import TablePage from './TablePage/index.jsx'
import RightChrat from './RightChrat/index.jsx'
import SearchComponent from './SearchComponent/index.jsx'
import {getClassifiedSales, getSearchData, searchEchartsData} from '../../api'

const plainOptions = [{
    label: '品类',
    key: '1'
}, {
    label: '商品',
    key: '2'
}];
const BottomView = () => {
    const [searchData, setSearchData] = useState({})
    const [searEchartsData, setSearEchartsData] = useState({})
    const [loading, setLoading] = useState(true)
    const [ClassifiedSalesData, setClassifiedSales] = useState([])
    const [echartTilte, setEchartTilte] = useState('品类')
    useEffect(() => {
        getKeyWordSearchData()
        getRightEchartsData()
    }, [])
    const getKeyWordSearchData = async () => {
        try {
            const res = await getSearchData()
            const data = await searchEchartsData()
            // const classData = await getClassifiedSales()
            setSearchData(res)
            setSearEchartsData(data)
            // setClassifiedSales(classData)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }
    const getEchartsSearchData = async () => {
        const data = await searchEchartsData()
        setSearEchartsData(data)
    }
    const getRightEchartsData = async () => {
        const data = await getClassifiedSales()
        setClassifiedSales(data)
    }
    const onTitleChange = (val) => {
        val.target.value === '1' ? setEchartTilte('品类') : setEchartTilte('商品')
        getRightEchartsData()
    }
    if (loading) {
        return (
            <div className={style['bottom-view']}>
                <Spin
                    size="large"
                    style={{
                        height: `528px`,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                    }}
                />
            </div>

        );
    }
    const {searchNumber, tableData} = searchData
    const {searchTotalData, searchUserData} = searEchartsData
    const {classData} = ClassifiedSalesData
    return (
        <div className={style['bottom-view']}>
            <Card className={style['card']}>
                <p className={style['title']}>关键词搜索</p>
                <div className={style['left-container']}>
                    <div className={style['chart-container']}>
                        <SearchComponent data={searchUserData.map(x => x.num)} title={'搜索用户数'}
                                         value={searchNumber?.user}/>
                        <SearchComponent data={searchTotalData.map(x => x.num)} title={'搜索量'}
                                         value={searchNumber?.total}/>
                    </div>
                    <div>
                        <TablePage data={tableData} pageChange={getEchartsSearchData}/>
                    </div>
                </div>
            </Card>
            <Card className={style['card']}>
                <div className={`${style['right-container']} ${style.title}`}>
                    <p>分类销售排行</p>
                    <Radio.Group onChange={onTitleChange} defaultValue="1" buttonStyle="solid">
                        {
                            plainOptions.map(button => {
                                return <Radio.Button key={button.key}
                                                     value={button.key}>{button.label}</Radio.Button>
                            })
                        }
                    </Radio.Group>
                </div>
                <RightChrat data={classData} title={echartTilte}/>
            </Card>

        </div>
    )
}
export default BottomView
