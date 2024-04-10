import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload2.svg'


const AddProduct = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [no_tags, setNo_tags] = useState(0);
  const [tag, setTag] = useState([]);
  const [no_opts, setNo_opts] = useState(0);
  const [optType, setOptType] = useState("");
  const [option, setOption] = useState([]);

  const [productDetails, setProductDetails] = useState({
    name: "",
    images: [],
    category: "headphone",
    new_price: "",
    old_price: "",
    option_type: "",
    option: [],
    tag: [],
    no_stock: "",
    short_description: "",
    description: ""
  })

  const imageHandler = (e, setImage) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  //Getting Tags input
  const handleTagChange = (e, index) => {
    const updatedTag = tag.map((old_tag, i) =>
      i === index ? e.target.value : old_tag
    );
    setTag(updatedTag);
  }

  const no_tagshandler = (event) => {
    const inputElement = event.target; // Get the input element
    const inputValue = parseInt(inputElement.value); // Retrieve the input value as an integer
    setNo_tags(inputValue);
    // Create a new array with the desired length and fill it with empty strings
    const newArray = Array.from({ length: inputValue }, () => "");
    // Update the state variable with the new array
    setTag(newArray);
  };

  //Getting Option input
  const handleOptChange = (e, index) => {
    const updatedTag = option.map((old_opt, i) =>
      i === index ? e.target.value : old_opt
    );
    setOption(updatedTag);
  }

  const no_optionshandler = (event) => {
    const inputElement = event.target; // Get the input element
    const inputValue = parseInt(inputElement.value); // Retrieve the input value as an integer
    setNo_opts(inputValue);
    // Create a new array with the desired length and fill it with empty strings
    const newArray = Array.from({ length: inputValue }, () => "");
    // Update the state variable with the new array
    setOption(newArray);
  };

  const handleOptTypeChange = (e) => {
    setOptType(e.target.value)
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let product = productDetails;
    let upload_failureflag = false;

    const image_list = [image1, image2, image3, image4, image5];
    const image_urls = [];

    //Uploading the image to the server
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
      product.tag = tag.slice(0, no_tags);
      product.option_type = optType;
      product.option = option.slice(0, no_opts);
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
      <div className="addproduct-details">
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
          <textarea value={productDetails.description} onChange={changeHandler} type="text" name='description' row="5" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Number of tags</p>
          <input value={no_tags} onChange={no_tagshandler} type="number" name='no_tags' placeholder='Type here' min="0" />
          {tag.length !== 0 ?
            <div className='render-variables'>
              <p>Tags:</p>
              {tag.map((tag, index) => {
                return <input value={tag} onChange={(e) => { handleTagChange(e, index) }} id={`tag-${index}`} type="text" name='tag' placeholder='Type here' />
              })}
            </div> : null}
        </div>
        <div className="addproduct-itemfield">
          <p>Number of option</p>
          <input value={no_opts} onChange={no_optionshandler} type="number" name='no_opts' placeholder='Type here' min="0" />
          {option.length !== 0 ?
            <div className='render-variables'>
              <p>Option Type:</p>
              <input value={optType} onChange={(e) => { handleOptTypeChange(e) }} id="opt_type" type="text" name='option_type' placeholder='Type here' />
              <p>Option:</p>
              {option.map((opt, index) => {
                return <input value={opt} onChange={(e) => { handleOptChange(e, index) }} id={`opt-${index}`} type="text" name='option' placeholder='Type here' />
              })}
            </div> : null}
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
            <option value="headphone">Headphone</option>
            <option value="laptop">Laptop</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
          </select>
        </div>
      </div>
      <div className="addproduct-item-image">
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