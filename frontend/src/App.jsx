import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import AddProduct from './Components/AddProduct.jsx'
import UpdateProduct from './Components/UpdateProduct.jsx'
import Home from './Components/Home.jsx'
import Protected from './Components/Protected.jsx'
import LogOut from './Components/LogOut.jsx'
import Products from './Components/Products.jsx'
import ProductDetails from './Components/ProductDetails.jsx'
import Cart from './Components/Cart.jsx'
import Checkout from './Components/Checkout.jsx'
import OrderSuccess from './Components/OrderSuccess.jsx'
import Orders from './Components/Orders.jsx'
import OrderDetails from './Components/OrderDetails.jsx'


function App() {
  

  return (
    <>
      <div className = "App">
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
           <Route path="/checkout" element={<Checkout />} />
          <Route path="/update-product" element={<Protected><UpdateProduct /> </Protected>} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/products-list" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/order/success/:id" element={<OrderSuccess />} />
           <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />


        </Routes>
        </BrowserRouter>
       
      </div>
      
    </>
  )
}

export default App
