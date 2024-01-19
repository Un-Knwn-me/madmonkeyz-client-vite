import './App.css'
import { Route, Routes } from 'react-router-dom'
import Mens from './pages/Mens'
import ProductView from './pages/ProductView'
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Checkout from './pages/Payment';
import Pincode from './pages/Pincode';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import Home from './pages/Home';

// export const Backend_URL = "http://localhost:8080";
export const Backend_URL = "https://madmonkez-server-153001c412bc.herokuapp.com";
// export const getAuthToken = () => {
//   return localStorage.getItem('token') || '';
// };

function App() {

  return (
    <>
    <Routes>
 
     <Route exact path='/' element={<Home />} />

     <Route path='/login' element={<Login />} />
 
     <Route path='/signup' element={<SignUp />} />
 
     <Route path='/category' element={<Mens />} />
 
     <Route path='/category/:id' element={<ProductView />} />

     <Route path='/wishlist' element={<Wishlist/>} />
 
     <Route path='/cart' element={<Cart />} />

     <Route path='/order-history' element={<OrderHistory />} />

     <Route path='/order-history/:orderId' element={<OrderDetails/>} />

     <Route path='/payment/:orderId' element={<Checkout />} />

     <Route path='/pincode' element={<Pincode />} />
     
    </Routes>
    </>
  )
}

export default App
