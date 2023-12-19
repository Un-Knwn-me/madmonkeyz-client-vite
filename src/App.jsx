import './App.css'
import { Route, Routes } from 'react-router-dom'
import Mens from './pages/Mens'
import ProductView from './pages/ProductView'
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Checkout from './pages/Payment';

// export const Backend_URL = "http://localhost:8080";
export const Backend_URL = "https://madmonkeyz-ecom.onrender.com";
export const token = localStorage.getItem('token');

function App() {

  return (
    <>
    <Routes>
 
     <Route exact path='/' element={<Login />} />
 
     <Route path='/signup' element={<SignUp />} />
 
     <Route path='/men' element={<Mens />} />
 
     <Route path='/men/:id' element={<ProductView />} />
 
     <Route path='/cart' element={<Cart />} />

     <Route path='/payment/:orderId' element={<Checkout />} />
     
    </Routes>
    </>
  )
}

export default App
