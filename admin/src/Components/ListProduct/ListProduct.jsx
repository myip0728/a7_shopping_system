import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import view_icon from '../../assets/view_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import remove_icon from '../../assets/remove_icon.png'
import { useNavigate } from 'react-router-dom';


const ListProduct = () => {
  const navigate = useNavigate();
  const [allproducts, setAllProduct] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProduct(data) });
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
    await fetchInfo();
  }

  const viewProduct = (id) => {
    let selectedproduct;
    for (let i = 0; i < allproducts.length; i++) {
      if (allproducts[i].id === id) {
        selectedproduct = allproducts[i];
        break; // Exit the loop once the product is found
      }
    }
    navigate('/productdetails', { state: { product: selectedproduct, edit: false } });
  };

  const editProduct = (id) => {
    let selectedproduct;
    for (let i = 0; i < allproducts.length; i++) {
      if (allproducts[i].id === id) {
        selectedproduct = allproducts[i];
        break; // Exit the loop once the product is found
      }
    }
    navigate('/productdetails', { state: { product: selectedproduct, edit: true } });
  };
  return (
    <div className='list-product'>
      <h1>All  Products</h1>
      <div className="listproduct-format-main">
        <p>ID</p>
        <p>Products</p>
        <p>Name</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>View</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <div key={index} className="listproduct-format-main listproduct-format">
            <p>{product.id}</p>
            <img src={product.images[0]} className="listproduct-product-image" alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => { viewProduct(product.id) }} className='listproduct-icon' src={view_icon} alt="" />
            <img onClick={() => { editProduct(product.id) }} className='listproduct-icon' src={edit_icon} alt="" />
            <img onClick={() => { removeProduct(product.id) }} className='listproduct-icon-remove' src={remove_icon} alt="" />
          </div>
        })}
      </div>
    </div>
  )
}
export default ListProduct