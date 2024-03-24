import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrums = (props) => {
    const { product } = props;

    return (
        <div className="breadcrums">
            <a href="../">HOME</a>
            <img src={arrow_icon} alt="" />
            <a href={`../${product.category}`}>{product.category}</a>
            <img src={arrow_icon} alt="" />
            {product.name}
        </div>
    );
};

export default Breadcrums;