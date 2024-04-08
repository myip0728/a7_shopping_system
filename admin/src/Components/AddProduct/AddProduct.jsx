import React from 'react'
import './AddProduct.css'
import upload from '../../assets/upload.svg'


const AddProduct = () => {
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
      <p>Product Name</p>
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
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
        <img src={upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input type="file" name='image' id='file-input' hidden/>
      </div>
      <button className='addproduct-btn'>ADD</button>
    </div>
  )
  }
  export default AddProduct