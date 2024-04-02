import React, { useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"

const ProductDisplay = (props) => {
    const { product } = props
    const [selectedOption, setSelectedOption] = useState(null); // For indicating whether the option is selected
    const [images, setImages] = useState([...product.images]); //For indicating which is the main image

    //Fuction for rendering no. of review stars
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < product.review; i++) {
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
    const handleOptionClick = (index) => {
        setSelectedOption(index);
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
                    {product.review < 5 && (
                        Array.from({ length: 5 - product.review }).map((_, index) => (
                            <img key={index + product.review} src={star_dull_icon} alt="" />
                        ))
                    )}
                    <p>{product.no_review}</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    <h1>Short description:</h1>
                    <div>{product.description}</div>
                </div>

                <div className="quantity-container">
                    <h1>Quantity: </h1>
                    <form>
                        <input type="number" max="50" min="0" placeholder='0' />
                    </form>
                </div>

                <div className="productdisplay-right-option">
                    <h1>Select {product.option_type}</h1>
                    <div className="productdisplay-right-options">
                        {product.option.map((opt, index) => (
                            <div
                                key={index}
                                className={index === selectedOption ? 'active' : ''}
                                onClick={() => handleOptionClick(index)}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
                <button>Add to Cart</button>
                <p className="productdisplay-right-category"><span>Category: </span>{product.category}</p>
                <p className="productdisplay-right-category"><span>Tag: </span>{renderTags()}</p>
            </div>
        </div >
    )
}

export default ProductDisplay