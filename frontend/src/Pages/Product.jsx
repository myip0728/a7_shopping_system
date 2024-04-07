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
        const isVisited = history.includes(productId);

        if (!isVisited) {
            updateHistory(productId);
            console.log(history);
        }
    })

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