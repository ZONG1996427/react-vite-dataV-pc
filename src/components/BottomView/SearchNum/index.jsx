import React from 'react'


const SearchNum = ({title, value}) => {

    return <>
        <div style={{
            fontSize: '13px',
            color: '#9e9e9e'
        }}>{title}
        </div>
        <div style={{
            fontSize: '20px',
            fontWeight: '600'
        }}>{value}
        </div>
    </>
}

export default SearchNum
