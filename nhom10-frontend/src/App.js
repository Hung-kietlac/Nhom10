import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormProvider } from './Context/FormContext';
import DangKy from './Components/dangky';
import DangNhap from './Components/dangnhap';
import Quenmatkhau from "./Components/quenmatkhau";
import Trangchu from './Components/trangchu';
import Admin from "./Components/admin";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DangNhap />} />
          <Route path="/dangky" element={<DangKy />} />
          <Route path="/dangnhap" element={<DangNhap />} />
          <Route path="/quenmatkhau" element={<Quenmatkhau />} />
          <Route path="/trangchu" element={<Trangchu />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;