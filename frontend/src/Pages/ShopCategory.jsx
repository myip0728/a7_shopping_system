import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

export const ShopCategory = (props) => {
    //using context to receive the product list
    const { all_product } = useContext(ShopContext)
    return (
        <div className='shop-category'>
            <img className="shopcategory-banner" src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p><span>Shwoing 1-4</span> out of 4 products</p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />

                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore more
            </div>
        </div>
    )
}

export default ShopCategory