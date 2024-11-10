import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import HeroSection from '../Components/HeroSection';

function Trangchu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tours') // Gọi API backend
            .then(response => response.json())
            .then(data => setData(data)) // Cập nhật state với dữ liệu nhận được
            .catch(err => console.error('Lỗi khi lấy dữ liệu:', err));
    }, []);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <div className="tour-list">
                <h2>Danh sách Tour</h2>
                <ul>
                    {data.map((tour, index) => (
                        <li key={index} className="tour-item">
                            <p><strong>Địa danh:</strong> {tour.matp_den?.tendd || 'Chưa có dữ liệu'}</p>
                            <p><strong>Mô tả:</strong> {tour.matp_den?.mota || 'Chưa có dữ liệu'}</p>
                            <p><strong>Giá tiền:</strong> {tour.gia_tien} VND</p>
                            <img src={tour.anh} alt={`Tour ${tour.matour}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Trangchu;