import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Components/Home'

import '../src/App.css'


// import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
