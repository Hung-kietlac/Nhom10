import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/navbar';
import HeroSection from '../Components/HeroSection';

function XemChiTiet() {
    const { state } = useLocation(); // Lấy dữ liệu địa danh từ state
    const diadanh = state?.diadanh;

    if (!diadanh) {
        return <p>Không tìm thấy thông tin địa danh!</p>;
    }

    return (
        <>
            <Navbar />
            <HeroSection />
            <div style={{ padding: '20px' }}>
                <img
                    src={diadanh.hinhanh}
                    alt={`Địa danh ${diadanh.tendd}`}
                    style={{ maxWidth: '400px', borderRadius: '10px', marginTop: '20px' }}
                />
                <h1>Chi tiết địa danh: {diadanh.tendd}</h1>
                <p><strong>Địa chỉ:</strong> {diadanh.diachi}</p>
                <p><strong>Giá:</strong> {diadanh.giatien} VND</p>
                <p><strong>Mô tả:</strong> {diadanh.mota}</p>
            </div>
        </>
    );
    
}

export default XemChiTiet;