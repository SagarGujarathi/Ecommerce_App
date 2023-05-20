import { useState } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import StoreItem from './StoreItem'
import Button1 from './Button1'
function StoreItemPage({ data, heading, button }) {
    const [sortData, setSortData] = useState(data)
    return (
        <div className="main-wrap-container">
            <div className="main-wrap-heading">{heading}</div>
            {
                button ?
                    <div className="main-wrap-button-container">
                        {
                            data.map(item => {
                                return (
                                    <Button1
                                        name={item.sectionName}
                                        onClick={() => setSortData(data.filter(section => { return  section.sectionName == item.sectionName }))}
                                        style={{ backgroundColor: (sortData == item) ? 'rgb(0, 61, 41)' : '', color: (sortData == item) ? 'white' : '' }}
                                    />
                                )
                            })
                        }
                    </div>
                    : ''
            }
            <div className="grid-wrap-container">
                {
                    sortData.map(item => {
                        return item.sectionItems.map(data => {
                            return data.sectionItems.map(product => {
                                return (
                                    <>
                                        <Link to={`${product.itemName}`} style={{ textDecoration: 'none' }}>
                                            <StoreItem productData={product} />
                                        </Link>
                                    </>
                                )
                            })
                        })
                    })
                }
            </div>
        </div>

    )
}

export default StoreItemPage