import Signin from './signin';
import Tosignup from './tosignup';
import Upload from './upload';
import Debug from './debug';
import Home_page from './home_page';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Signin/>} />
      <Route path="/tosignup" element={<Tosignup />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/home_page" element={<Home_page />} />
      <Route path="/Debug" element={<Debug />} />
    </Routes>
  </BrowserRouter>
  )
}

