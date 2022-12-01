import {Table} from 'antd';
import React from 'react';
import style from './TablePage.module.scss'

const columns = [
    {
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '关键词',
        dataIndex: 'keyWord',
        key: 'keyWord',
    },
    {
        title: '总搜索量',
        dataIndex: 'searchTotal',
        key: 'searchTotal',
    },
    {
        title: '搜索用户数',
        dataIndex: 'searchUserTotal',
        key: 'searchUserTotal',
    },
];

const TablePage = ({data, pageChange}) => {
    const SizeChange = (current, size) => {
        // 页面变化时调用echarts接口
        pageChange()
    }
    return <>
        <Table pagination={{
            total: data.length,
            pageSize: 5,
            onChange: SizeChange
        }} className={style['table']} columns={columns}
               dataSource={data} rowKey='id'/>
    </>
};

export default TablePage;
