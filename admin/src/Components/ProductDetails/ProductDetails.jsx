import React, { useState, useEffect } from 'react'
import '../AddProduct/AddProduct.css'
import upload from '../../assets/upload2.svg'
import { useLocation } from 'react-router-dom';


const ProductDetails = () => {
  const server_address = "http://localhost:4000/" //For checking is the picture already uploaded
  const location = useLocation();
  const { product, edit } = location.state;
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [firstEditflag, setFirstEditflag] = useState([false, false, false, false, false]);
  const [no_tags, setNo_tags] = useState(product.tag.length);
  const [tag, setTag] = useState(product.tag);
  const [no_opts, setNo_opts] = useState(product.option.length);
  const [optType, setOptType] = useState(product.option_type);
  const [option, setOption] = useState(product.option);
  const [productDetails, setProductDetails] = useState({
    id: product.id,
    name: product.name,
    images: product.images,
    category: product.category,
    new_price: product.new_price,
    old_price: product.old_price,
    option_type: product.option_type,
    option: product.option,
    tag: product.tag,
    no_stock: product.no_stock,
    short_description: product.short_description,
    description: product.description
  })

  useEffect(() => {
    const updateImageStates = () => {
      const imageStates = [setImage1, setImage2, setImage3, setImage4, setImage5];

      for (let i = 0; i < product.images.length; i++) {
        imageStates[i](product.images[i]);
      }

      for (let i = product.images.length; i < imageStates.length; i++) {
        imageStates[i](false);
      }
    };

    console.log('Product:', product);
    updateImageStates();
  }, [product]);

  const imageHandler = (e, index) => {
    const file = e.target.files[0]
    const imageStates = [setImage1, setImage2, setImage3, setImage4, setImage5];
    if (file) {
      imageStates[index](file);
      updateFirstEditFlag(index);
    }
    else {
      console.log("User canceled the file selection.");
      imageStates[index](false)
    }
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

  const updateFirstEditFlag = (index) => {
    setFirstEditflag((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = true;
      return updatedArray;
    });
  };


  const Add_Product = async () => {
    let product = productDetails;
    let upload_failureflag = false;
    const image_list = [image1, image2, image3, image4, image5];
    const image_urls = []


    //Uploading the image to the server
    for (let i = 0; i < 5; i++) {
      console.log(i);
      console.log(typeof (image_list[i]));
      console.log(!toString(image_list[i]).includes(server_address));

      if (image_list[i] !== false) {
        if (typeof (image_list[i]) === "string") {
          image_urls.push(image_list[i]);
        } else { //for checking whether the server already have the photo
          console.log(image_list[i]);
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
    }

    console.log(image_urls);

    if (!upload_failureflag) {
      product.images = image_urls;
      product.tag = tag.slice(0, no_tags);
      product.option_type = optType;
      product.option = option.slice(0, no_opts);
      console.log(product);
      await fetch('http://localhost:4000/updateproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Product Edit.") : alert("Edit product failed")
      })
    }
  }

  return (
    <div className='add-product'>
      <div className="addproduct-details">
        Product ID: {product.id}
        <div className="addproduct-itemfield">
          <p>Product Name</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' readOnly={!edit} />
        </div>
        <div className="addproduct-itemfield">
          <p>Short Description</p>
          <input value={productDetails.short_description} onChange={changeHandler} type="text" name='short_description' placeholder='Type here' readOnly={!edit} />
        </div>
        <div className="addproduct-itemfield">
          <p>Product Description</p>
          <textarea value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' row="5" readOnly={!edit} />
        </div>
        <div className="addproduct-itemfield">
          <p>Number of tags</p>
          <input value={no_tags} onChange={no_tagshandler} type="number" name='no_tags' placeholder='Type here' min="1" readOnly={!edit} />
          {tag.length !== 0 ?
            <div className='render-variables'>
              <p>Tags:</p>
              {tag.map((tag, index) => {
                return <input value={tag} onChange={(e) => { handleTagChange(e, index) }} id={`tag-${index}`} type="text" name='tag' placeholder='Type here' readOnly={!edit} />
              })}
            </div> : null}
        </div>
        <div className="addproduct-itemfield">
          <p>Number of option</p>
          <input value={no_opts} onChange={no_optionshandler} type="number" name='no_opts' placeholder='Type here' min="0" readOnly={!edit} />
          {option.length !== 0 ?
            <div className='render-variables'>
              <p>Option Type:</p>
              <input value={optType} onChange={(e) => { handleOptTypeChange(e) }} id="opt_type" type="text" name='option_type' placeholder='Type here' readOnly={!edit} />
              <p>Option:</p>
              {option.map((opt, index) => {
                return <input value={opt} onChange={(e) => { handleOptChange(e, index) }} id={`opt-${index}`} type="text" name='option' placeholder='Type here' readOnly={!edit} />
              })}
            </div> : null}
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" min="1" placeholder='Type here' readOnly={!edit} />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" min="0" placeholder='Type here' readOnly={!edit} />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Number of stock</p>
          <input value={productDetails.no_stock} onChange={changeHandler} type="number" name="no_stock" min="1" placeholder='Type here' readOnly={!edit} />
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' readOnly={!edit}>
            <option value="headphone">Headphone</option>
            <option value="laptop">Laptop</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
          </select>
        </div>
      </div>
      {edit ?
        <div className="addproduct-item-image">
          <p>Upload Image</p>
          <label htmlFor="file-input-1">
            {image1 ? (
              <div>
                <img src={!firstEditflag[0] ? image1 : URL.createObjectURL(image1)} className='add-product-thumnail-img' alt="" />
                <button onClick={() => { setImage1(false); updateFirstEditFlag(0); }}>Remove</button>
              </div>
            ) : (
              <img src={upload} className='add-product-thumnail-img' alt="" />
            )}
          </label>
          <input onChange={(e) => { imageHandler(e, 0) }} type="file" name='image1' id='file-input-1' hidden />
          <label htmlFor="file-input-2">
            {image2 ? (
              <div>
                <img src={!firstEditflag[1] ? image2 : URL.createObjectURL(image2)} className='add-product-thumnail-img' alt="" />
                <button onClick={() => { setImage2(false); updateFirstEditFlag(1); }}>Remove</button>
              </div>
            ) : (
              <img src={upload} className='add-product-thumnail-img' alt="" />
            )}
          </label>
          <input onChange={(e) => { imageHandler(e, 1) }} type="file" name='image2' id='file-input-2' hidden />
          <label htmlFor="file-input-3">
            {image3 ? (
              <div>
                <img src={!firstEditflag[2] ? image3 : URL.createObjectURL(image3)} className='add-product-thumnail-img' alt="" />
                <button onClick={() => { setImage3(false); updateFirstEditFlag(2); }}>Remove</button>
              </div>
            ) : (
              <img src={upload} className='add-product-thumnail-img' alt="" />
            )}
          </label>
          <input onChange={(e) => { imageHandler(e, 2) }} type="file" name='image3' id='file-input-3' hidden />
          <label htmlFor="file-input-4">
            {image4 ? (
              <div>
                <img src={!firstEditflag[3] ? image4 : URL.createObjectURL(image4)} className='add-product-thumnail-img' alt="" />
                <button onClick={() => { setImage4(false); updateFirstEditFlag(3); }}>Remove</button>
              </div>
            ) : (
              <img src={upload} className='add-product-thumnail-img' alt="" />
            )}
          </label>
          <input onChange={(e) => { imageHandler(e, 3) }} type="file" name='image4' id='file-input-4' hidden />
          <label htmlFor="file-input-5">
            {image5 ? (
              <div>
                <img src={!firstEditflag[4] ? image5 : URL.createObjectURL(image5)} className='add-product-thumnail-img' alt="" />
                <button onClick={() => { setImage5(false); updateFirstEditFlag(4); }}>Remove</button>
              </div>
            ) : (
              <img src={upload} className='add-product-thumnail-img' alt="" />
            )}
          </label>
          <input onChange={(e) => { imageHandler(e, 4) }} type="file" name='image5' id='file-input-5' hidden />
        </div> :
        <div className="addproduct-item-image">
          {product.images.map((image_url) => {
            return <img src={image_url} className='add-product-thumnail-img' alt="" />
          })}
        </div>
      }
      {edit ? <button onClick={() => { Add_Product() }} className='addproduct-btn'>Edit</button> : null}
    </div>
  )
}
export default ProductDetails