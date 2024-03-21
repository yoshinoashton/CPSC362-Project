import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import './assets/css/main.css';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import ListingCreate from './pages/ListingCreate';
import Listing from './pages/Listing';
import SignUp from './pages/SignUp';
import User from './pages/User'
import Inventory from './pages/Inventory.js';
import Pal from './pages/Pal.js';
import PalCreate from './pages/PalCreate.js'
import { UserContextProvider } from './context/userContext.js';

function App() {
  return (
    <UserContextProvider>
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/listing/:id' element={<Listing />}/>
            <Route path='/listing/create' element={<ListingCreate />}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/user/:id' element={<User />}/>
            <Route path='/user/:id/inventory' element={<Inventory />}/>
            <Route path='/pal/new' element={<PalCreate />}/>
            <Route path='/user/:id/inventory/:palID' element={<Pal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </UserContextProvider>
  );
}

export default App;
