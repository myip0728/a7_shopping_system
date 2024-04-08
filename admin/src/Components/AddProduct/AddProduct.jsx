import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload.svg'


const AddProduct = () => {
  const [image,setImage]=useState(false);

  const [productDetails,setProductDetails]=useState({
    name:"",
    image:"",
    category:"headphone",
    new_price:"",
    old_price:""
  })

  const imageHandler=(e)=>{
    setImage(e.target.files[0]);
  }

  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const Add_Product=async()=>{
    console.log(productDetails);
    
  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="headphone">headphone</option>
          <option value="laptop">laptop</option>
          <option value="keyboard">keyboard</option>
          <option value="mouse">mouse</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
        <img src={image?URL.createObjectURL(image):upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input  onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}
  export default AddProduct