import React from 'react'
import { Link } from 'react-router-dom'
import '../Header.css'

const Header = () => {
  return (
      <header className="fancy-header">
      <nav>
        {
          localStorage.getItem("accessToken") ?
          <>
          <Link to="/products-list">Product</Link>
          <Link to="/">Home</Link>
           <Link to="/add-product">Add Product</Link>
          <Link to="/update-product">Update Product</Link>
          <Link to="/cart">View Cart</Link>
          <Link to="/logout">Log Out</Link>
          </>
          :
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        }
        
        
       
      </nav>
    </header>
  )
}

export default Header