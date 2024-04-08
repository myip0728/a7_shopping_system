import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload.svg'


const AddProduct = () => {
  const [image,setImage]=useState(false);

  const [productDetails,setProductDetails]=useState({
    name:"",
    image:"",
    category:"",
    new_price:"",
    old_price:"",
    tag:"",
    no_stock:"",
    short_description:"",
    description:""
  })

  const imageHandler=(e)=>{
    setImage(e.target.files[0]);
  }

  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const Add_Product=async()=>{
    console.log(productDetails);
    let responseData;
    let product=productDetails;

    let formData=new FormData();
    formData.append('product',image);
    await fetch('http://localhost:4000/upload',{
      method:'POST',
      header:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data});

    if(responseData.success){
      product.image=responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product added."):alert("Add product failed")
      })
    }
  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Short Description</p>
        <input value={productDetails.short_description} onChange={changeHandler} type="text" name='short_description' placeholder='Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name='short_description' placeholder='Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Tag</p>
        <input value={productDetails.tag} onChange={changeHandler} type="text" name='tag' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
          <p>Number of stock</p>
          <input value={productDetails.no_stock} onChange={changeHandler} type="number" name="no_stock" placeholder='Type here' />
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
        <p>Upload Image</p>
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