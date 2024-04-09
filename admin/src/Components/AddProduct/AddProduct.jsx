import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload.svg'


const AddProduct = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    images: [],
    category: "headphone",
    new_price: "",
    old_price: "",
    tag: "",
    no_stock: "",
    short_description: "",
    description: ""
  })

  const imageHandler = (e, setImage) => {
    setImage(e.target.files[0]);
  }

  const imageHandler1 = (e) => {
    setImage1(e.target.files[0]);
  }

  const imageHandler2 = (e) => {
    setImage2(e.target.files[0]);
  }
  const imageHandler3 = (e) => {
    setImage3(e.target.files[0]);
  }
  const imageHandler4 = (e) => {
    setImage4(e.target.files[0]);
  }
  const imageHandler5 = (e) => {
    setImage5(e.target.files[0]);
  }
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let product = productDetails;
    let upload_failureflag = false;

    const image_list = [image1, image2, image3, image4, image5];
    const image_urls = [];


    for (let i = 0; i < 5; i++) {
      if (image_list[i] !== false) {
        let formData = new FormData();
        formData.append('product', image_list[i]);
        await fetch('http://localhost:4000/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }).then((resp) => resp.json()).then((data) => {
          if (data.success !== 1) {
            upload_failureflag = true;
          }
          image_urls.push(data.image_url);
        });
      }
    }

    if (!upload_failureflag) {
      product.images = image_urls;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Product added.") : alert("Add product failed")
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
        <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Tag</p>
        <input value={productDetails.tag} onChange={changeHandler} type="text" name='tag' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" min="1" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" min="0" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Number of stock</p>
        <input value={productDetails.no_stock} onChange={changeHandler} type="number" name="no_stock" min="1" placeholder='Type here' />
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
        <label htmlFor="file-input-1">
          <img src={image1 ? URL.createObjectURL(image1) : upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e, setImage1) }} type="file" name='image1' id='file-input-1' hidden />
        <label htmlFor="file-input-2">
          <img src={image2 ? URL.createObjectURL(image2) : upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e, setImage2) }} type="file" name='image2' id='file-input-2' hidden />
        <label htmlFor="file-input-3">
          <img src={image3 ? URL.createObjectURL(image3) : upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e, setImage3) }} type="file" name='image3' id='file-input-3' hidden />
        <label htmlFor="file-input-4">
          <img src={image4 ? URL.createObjectURL(image4) : upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e, setImage4) }} type="file" name='image4' id='file-input-4' hidden />
        <label htmlFor="file-input-5">
          <img src={image5 ? URL.createObjectURL(image5) : upload} className='add-product-thumnail-img' alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e, setImage5) }} type="file" name='image5' id='file-input-5' hidden />
      </div>
      <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
    </div>
  )
}
export default AddProduct