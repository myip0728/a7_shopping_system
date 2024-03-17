
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import ShopCategory from './Pages/ShopCategory'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Product from './Pages/Product'
import UserPage from './Pages/UserPage'
import Search from './Pages/Search';



function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/headphone' element={<ShopCategory category="headphone" />}></Route>
          <Route path='/laptop' element={<ShopCategory category="laptop" />}></Route>
          <Route path='/mouse' element={<ShopCategory category="mouse" />}></Route>
          <Route path='/keyboard' element={<ShopCategory category="keyboard" />}></Route>
          <Route path='/product' element={<Product />}>
            <Route path=':productID' element={<Product />} />
          </Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/userpage' element={<UserPage />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/login' element={<LoginSignup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
