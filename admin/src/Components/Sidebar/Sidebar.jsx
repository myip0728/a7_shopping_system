import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
//import add_product_icon from '../../assets/Product_cart.svg'
//import list_product_icon from '../../assets/List_cart.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <p>List Product</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar