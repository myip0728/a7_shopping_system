import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'


const ListProduct = () => {

  const [allproducts,setAllProduct] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res) => res.json())
    .then((data) => {setAllProduct(data)});
  }

  useEffect(() => {
    fetchInfo();
  },[])
  
  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
    method: 'POST',
    headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({id:id}),
  })
  await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All  Products</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Name</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index) =>{
            return <div key = {index} className="listproduct-format-main listproduct-format">
                  <img src={product.images} className="listproduct-product-image" alt="" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={()=>{removeProduct(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
          })}
        </div>
    </div>
  )
  }
  export default ListProduct