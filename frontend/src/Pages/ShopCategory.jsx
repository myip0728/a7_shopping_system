import React, { useContext, useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'


export const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext); //using context to receive the product list
    const [numToShow, setNumToShow] = useState(12); //Indicating how many product are showing currently
    const [filteredProducts, setFilteredProducts] = useState([]); //Indicating the Product list the are current showing to the user
    const [formVisble, setFormvisble] = useState(false);

    useEffect(() => { //This ensure rerendering when the web application switch page in different categories
        const updatedFilteredProducts = all_product.filter(
            (item) => props.category === item.category
        );
        setFilteredProducts(updatedFilteredProducts);
        setNumToShow(Math.min(12, updatedFilteredProducts.length));
    }, [all_product, props.category]);

    const productsToShow = filteredProducts.slice(0, numToShow);

    const handleLoadMore = () => { //This handle when the user click Explore more button to show more product under this category
        setNumToShow(numToShow + 12);
    };

    const handleSortby = () => {
        setFormvisble(!formVisble);
    };

    return (
        <div className='shop-category'>
            <img className="shopcategory-banner" src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p><span>Showing 1-{Math.min(numToShow, filteredProducts.length)}</span> out of {filteredProducts.length} products</p>

                <div className='shopcategory-sort' >
                    <div onClick={handleSortby} >Sort by </div>
                    {!formVisble && <img src={dropdown_icon} alt="" onClick={handleSortby} />}
                    {formVisble && <form action="">
                        <select id="cars" name="cars">
                            <option value="1">highest to lowest rating</option>
                            <option value="2">lowest to hightest rating</option>
                            <option value="3">highest to lowest price</option>
                            <option value="4">lowest to highest price</option>
                            <option value="5">alphabetical name order</option>
                        </select>
                    </form>}
                </div>
            </div>
            <div className="shopcategory-products">
                {productsToShow.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            {numToShow < filteredProducts.length && (
                <div className='shopcategory-loadmore' onClick={handleLoadMore}>
                    Explore more
                </div>
            )}
        </div>
    )
}

export default ShopCategory