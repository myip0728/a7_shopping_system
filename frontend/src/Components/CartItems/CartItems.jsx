import React, { useContext, useState, useEffect } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = (props) => {
    const { all_product, editCart } = useContext(ShopContext);
    const productId = props.productId;
    const option = props.option;
    const [quantity, setQuantity] = useState(props.quantity);
    const [name, setName] = useState("");
    const [image, setImage] = useState();
    const [option_type, setOptionType] = useState();
    const [old_price, setOldPrice] = useState();
    const [new_price, setNewPrice] = useState();


    useEffect(() => {
        const getProductData = (id) => {
            for (let i = 0; i < all_product.length; i++) {
                if (id === all_product[i].id) {
                    setName(all_product[i].name);
                    setImage(all_product[i].images[0]);
                    setOptionType(all_product[i].option_type);
                    setOldPrice(all_product[i].old_price);
                    setNewPrice(all_product[i].new_price);
                }
            }
            return null;
        }

        getProductData(productId);
    })

    const handleQuantityChange = (event) => {
        //and Update the shopping cart
        editCart(productId, option, parseInt(event.target.value));
        setQuantity(parseInt(event.target.value));
    }

    const generateQuantityOptions = () => {
        const options = [];
        for (let i = 1; i <= 50; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    return (
        <div className='cartitem'>
            <div className="cartitem-left">
                <img src={image} alt="" />
            </div>
            <div className="cartitem-right">
                <h1>{name}</h1>
                <p>{option_type}: {option}</p>
                <div className='cartitem-prices'>
                    <div className='cartitem-price-old'>${old_price}</div>
                    <div className='cartitem-price-new'>${new_price}</div>
                </div>
                <p>Quantity: </p>
                <form>
                    <select value={quantity} onChange={handleQuantityChange}>
                        {generateQuantityOptions()}
                    </select>
                </form>
                <h2>Subtotal: {new_price * quantity}</h2>
            </div>
        </div>
    )
};

export default CartItems
