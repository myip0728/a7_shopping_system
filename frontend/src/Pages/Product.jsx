import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
    const { all_product, history, updateHistory } = useContext(ShopContext)
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId))

    useEffect(() => {
        const isVisited = history.includes(parseInt(productId));
        if (!isVisited) {
            updateHistory(parseInt(productId));
            console.log(history);
        }
    }, [all_product, history, product, productId, updateHistory])

    if (!product) { //If the product is not retrieved
        return null;
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox product={product} />
            <RelatedProducts product={product} />
        </div>
    )
}

export default Product