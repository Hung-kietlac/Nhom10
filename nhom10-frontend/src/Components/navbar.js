import React from 'react';
import styles from '../Css/Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>Nhom10</div>
            <div className={styles.menu}>
                <button>Khách sạn</button>
                <button><Link to="/Chitiet">Vé máy bay</Link></button>
                <button>Tour du lịch</button>
                <button>Chuyến bay của tôi</button>
                <button>Khác</button>
            </div>
            <div className={styles.authButtons}>
                <button>Đăng Nhập</button>
                <button>Đăng Ký</button>
            </div>
        </div>
    );
}

export default Navbar;