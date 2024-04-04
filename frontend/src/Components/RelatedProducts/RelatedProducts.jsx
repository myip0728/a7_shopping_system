import React, { useContext, useState, useEffect } from 'react'
import './RelatedProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'


export const RelatedProducts = (props) => {
    const { product } = props; //Current Product
    const { all_product } = useContext(ShopContext); //using context to receive the product list
    const [filteredProducts, setFilteredProducts] = useState([]); //Used to show related filter product

    useEffect(() => {
        updateFilteredProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, all_product]);

    const updateFilteredProducts = () => {
        const relatedProducts = all_product.filter((item) => {
            return (
                item.category === product.category && item.id !== product.id
            );
        });

        const relatedProductsByTag = all_product.filter((item) => {
            return (
                item.category !== product.category &&
                item.tag.some((tag) => product.tag.includes(tag))
            );
        });

        const filtered = [];

        // Add 2 items with the same category as the current product
        const sameCategoryProducts = relatedProducts.slice(0, 2);
        filtered.push(...sameCategoryProducts);

        // Add 2 items with at least 1 matching tag, but different category
        const differentCategoryProducts = relatedProductsByTag.filter(
            (item) => !sameCategoryProducts.includes(item)
        );
        filtered.push(...differentCategoryProducts.slice(0, 2));

        setFilteredProducts(filtered);
    };

    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {filteredProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default RelatedProducts