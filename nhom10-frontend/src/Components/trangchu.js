import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/navbar';
import HeroSection from '../Components/HeroSection';
import axios from 'axios';
import styles from '../Css/trangchu.module.css';

function Trangchu() {
    const [diadanhs, setDiadanhs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDiadanh, setSelectedDiadanh] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchDiadanhs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/diadanhs');
                setDiadanhs(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải dữ liệu địa danh. Vui lòng thử lại sau!');
                setLoading(false);
            }
        };

        fetchDiadanhs();
    }, []);

    // Thay đổi hình ảnh tự động mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                diadanhs.length > 0 ? (prevIndex + 1) % diadanhs.length : 0
            );
        }, 5000);

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [diadanhs]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <HeroSection />
                <div className={styles.loadingText}>Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <HeroSection />
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar />
            <HeroSection />
            {/* Hiển thị hình ảnh địa danh hiện tại trong carousel */}
            {diadanhs.length > 0 && (
                <div className={styles.carousel}>
                    <img
                        src={diadanhs[currentIndex]?.hinhanh || 'https://via.placeholder.com/800x400'}
                        alt={`Địa danh ${diadanhs[currentIndex]?.tendd}`}
                        className={styles.carouselImage}
                    />
                    <h2 className={styles.carouselTitle}>
                        {diadanhs[currentIndex]?.tendd || 'Tên địa danh'}
                    </h2>
                </div>
            )}

            <div className={styles.tourContainer}>
                <h1 className={styles.heading}>Danh sách Địa Danh</h1>
                <div className={styles.tourList}>
                    {diadanhs.map((diadanh) => (
                        <div key={diadanh._id} className={styles.tourItem}>
                            <div className={styles.tourBox}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={diadanh.hinhanh || 'https://via.placeholder.com/150'}
                                        alt={`Địa danh ${diadanh.tendd}`}
                                        className={styles.tourImage}
                                    />
                                    <button
                                        className={styles.infoButton}
                                        onClick={() => setSelectedDiadanh(diadanh)}
                                    >
                                        i
                                    </button>
                                </div>
                                <h2 className={styles.tourTitle}>{diadanh.tendd}</h2>
                                <p><strong>Địa chỉ:</strong> {diadanh.diachi}</p>
                                <p><strong>Giá:</strong> {diadanh.giatien || 'Chưa có giá'} VND</p>
                                <Link
                                    to={`/xemchitiet/${diadanh._id}`}
                                    state={{ diadanh }} // Truyền dữ liệu qua state
                                    className={styles.bookButton}
                                >
                                    Đặt vé
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedDiadanh && (
                <div className={styles.modalOverlay} onClick={() => setSelectedDiadanh(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setSelectedDiadanh(null)}
                        >
                            X
                        </button>
                        <h2>{selectedDiadanh.tendd}</h2>
                        <p><strong>Địa chỉ:</strong> {selectedDiadanh.diachi}</p>
                        <p><strong>Mô tả:</strong> {selectedDiadanh.mota || 'Không có mô tả'}</p>
                        <p><strong>Giá:</strong> {selectedDiadanh.giatien}</p>
                        <img
                            src={selectedDiadanh.hinhanh}
                            alt={`Địa danh ${selectedDiadanh.tendd}`}
                            className={styles.modalImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Trangchu;