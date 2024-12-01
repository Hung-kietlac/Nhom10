import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormProvider } from './Context/FormContext';
import DangKy from './Components/dangky';
import DangNhap from './Components/dangnhap';
import Quenmatkhau from "./Components/quenmatkhau";
import Trangchu from './Components/trangchu';
import Admin from "./Components/admin";
import Thanhtoan from './Components/thanhtoan';
import Chitiet from "./Components/chitiet";
import Chuyenbaycuatoi from "./Components/myflights";
import XemChiTiet from './Components/xemchitiet';

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
          <Route path="/thanhtoan" element={<Thanhtoan />} />
          <Route path="/chitiet" element={<Chitiet />} />
          <Route path="/myflights" element={<Chuyenbaycuatoi />} />
          <Route path="/xemchitiet/:id" element={<XemChiTiet />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;