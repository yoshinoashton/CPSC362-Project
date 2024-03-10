import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

// pages & components
import './assets/css/main.css';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import ListingCreate from './pages/ListingCreate';
import Listing from './pages/Listing';
import SignUp from './pages/SignUp';
//import Inventory from './pages/Inventory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/listing/:id' element={<Listing />}/>
            <Route path='/listing/create' element={<ListingCreate />}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUp />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
