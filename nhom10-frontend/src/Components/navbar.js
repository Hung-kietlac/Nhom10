import React from 'react';
import styles from '../Css/Navbar.module.css';

function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>Nhom10</div>
            <div className={styles.menu}>
                <button>Khách sạn</button>
                <button>Vé máy bay</button>
                <button>Vé xe khách</button>
                <button>Đưa đón sân bay</button>
                <button>Cho thuê xe</button>
                <button>Hoạt động & Vui chơi</button>
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