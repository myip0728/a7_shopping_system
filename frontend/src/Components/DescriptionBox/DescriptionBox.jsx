import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = (props) => {
    const { product } = props

    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Comments ({product.comment.length})</div>
            </div>
            <div className="descriptionbox-description">
                <p>{product.description}</p>
                <p>To access comprehensive information, we kindly encourage you to visit the official website of the displayed product. There, you'll find in-depth details, specifications, and more to assist you in making an informed decision.</p>
            </div>
        </div>
    )
}

export default DescriptionBox