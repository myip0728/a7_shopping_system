import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
    const PriceNotEqual = props.new_price !== props.old_price;

    return (
        <Link to={`/product/${props.id}`}>
            <div className='item' onClick={window.scrollTo(0, 0)}>
                <img className="item-image" src={props.images[0]} alt="" />
                <p>{props.name}</p>
                <div className="item-prices">
                    <div className="item-price-new">
                        ${props.new_price}
                    </div>
                    <div className="item-price-old">
                        {PriceNotEqual && <div>${props.old_price}</div>}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Item