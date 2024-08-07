import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Exchanges from './Components/Exchanges'
import Navbar from './Components/Navbar'
import Coins from './Components/Coins'
import News from './Components/News'
import Home from './Components/Home';
import CoinDetails from './Components/CoinDetails';
function App() {
  

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/exchanges' element={<Exchanges/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path="/coin/:id" element={<CoinDetails />} />
      <Route path='/news' element={<News/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
