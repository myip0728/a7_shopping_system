import React from 'react'
import './AddProduct.css'


const AddProduct = () => {
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
      <p>Product title</p>
      <input type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" placeholder='Type here' />
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className='add-product-selector'>
          <option value="headphone">headphone</option>
          <option value="laptop">laptop</option>
          <option value="keyboard">keyboard</option>
          <option value="mouse">mouse</option>
        </select>
      </div>
    </div>
  )
  }
  export default AddProduct