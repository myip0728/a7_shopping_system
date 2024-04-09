import React, { useState, useEffect, useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'


const ProductDisplay = (props) => {
    const { product } = props
    const [selectedOption, setSelectedOption] = useState(""); // For indicating whether the option is selected
    const [images, setImages] = useState([...product.images]); //For indicating which is the main image
    const { addToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(0);
    const [stockAvailable, setStockAvailable] = useState(true);
    const [addToCartAvailable, setAddToCartAvailable] = useState(true);
    const [priceEqual, setPriceEqual] = useState(false);

    useEffect(() => {
        //This useEffect ensure the product image will be reloaded every time when the productDisplay section is reloaded
        setImages([...product.images]);
        //Checking whether the product is available
        if (product.no_stock === 0) {
            setStockAvailable(false);
        } else { setStockAvailable(true); }
        //Checking whether the asked quantity is greater than the no of stock
        if (product.no_stock - quantity < 0 || product.no_stock === 0) {
            setAddToCartAvailable(false);
        } else { setAddToCartAvailable(true); }
        //Checking are the new price and old price are equal
        if (product.new_price === product.old_price) {
            setPriceEqual(true);
        } else { setPriceEqual(false); }

    }, [product, quantity, stockAvailable]);

    //Function for rendering no. of rating stars
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < product.rating; i++) {
            stars.push(<img key={i} src={star_icon} alt="" />);
        }
        return stars;
    }

    //Function for rendering the tag
    const renderTags = () => {
        var tags = "";
        for (let i = 0; i < product.tag.length - 1; i++) {
            tags += product.tag[i];
            tags += ", "
        }
        tags += product.tag[product.tag.length - 1]
        return tags;
    }

    //Handling when user click on the option of the product
    const handleOptionClick = (opt) => {
        setSelectedOption(opt);
    };

    //Function for handling the user click on the other images
    const handleImageClick = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            const mainImage = updatedImages[0];
            updatedImages[0] = updatedImages[index];
            updatedImages[index] = mainImage;
            return updatedImages;
        });
    };

    //Function for handling the quantity of the quantity selected by user
    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        addToCart(product.id, selectedOption, parseInt(quantity))
        setQuantity(0);
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={images[0]} alt="" />
                </div>
                <div className="productdisplay-img-list">
                    {images.slice(1).map((image, index) => (
                        <div
                            key={index}
                            className="productdisplay-img-item"
                            onClick={() => handleImageClick(index + 1)}
                        >
                            <img src={image} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="product-right-star">
                    {renderStars()}
                    {product.rating < 5 && (
                        Array.from({ length: 5 - product.rating }).map((_, index) => (
                            <img key={index + product.rating} src={star_dull_icon} alt="" />
                        ))
                    )}
                </div>
                <p>No. of purchase: {product.no_order}</p>

                {/*If the Price are equal only show one of them */}
                {priceEqual === true ? <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div> : <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>}

                <div className="productdisplay-right-description">
                    <h1>Short description:</h1>
                    <div>{product.short_description}</div>
                    <h1>Stock availability:</h1>
                    {/*Render based on whether the product are in stock*/}
                    <div>{stockAvailable === true ? `Currently in stock: ${product.no_stock}` : "Out of Stock"}</div>
                </div>

                <div className="quantity-container">
                    <h1>Quantity: </h1>
                    <form>
                        <input type="number"
                            min="0"
                            placeholder='0'
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </form>
                </div>

                <div className="productdisplay-right-option">
                    <h1>Select {product.option_type}</h1>
                    {addToCartAvailable === true ?
                        <div className="productdisplay-right-options">
                            {product.option.map((opt) => (
                                <div
                                    className={opt === selectedOption ? 'active' : ''}
                                    onClick={() => handleOptionClick(opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div> :
                        <div className="productdisplay-right-options">
                            {product.option.map((opt, index) => (
                                <div key={index} className='unavailable'>
                                    {opt}
                                </div>
                            ))}
                        </div>
                    }
                </div>
                {/*Render based on whether the quantity the user choose is not available*/}
                {addToCartAvailable === true ?
                    <button className='add-to-cart-active' onClick={handleAddToCart}>Add to Cart</button> :
                    <button className='add-to-cart-inactive'>Sorry, the product is not available</button>}
                <p className="productdisplay-right-category"><span>Category: </span>{product.category}</p>
                <p className="productdisplay-right-category"><span>Tag: </span>{renderTags()}</p>
                <p className="productdisplay-right-category"><span>Product ID: </span>{product.id}</p>
            </div>
        </div >
    )
}

export default ProductDisplay