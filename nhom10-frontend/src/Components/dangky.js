import React, { useContext } from "react";
import styles from "../Css/dangky.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "../Context/FormContext";
import maybayImage from '../image/maybay.jpg';
import axios from 'axios';

function DangKy() {
    const { formData, setFormData } = useContext(FormContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu đăng ký đến backend
            const response = await axios.post('http://localhost:5000/Dangky', {
                customerName: formData.customerName,
                phone: formData.phone,
                gender: formData.gender,
                password: formData.password,
                dateOfBirth: formData.dob,
            });

            // Kiểm tra phản hồi từ server
            if (response.status === 201) {
                alert(response.data.message); // Hiển thị thông báo thành công
                navigate("/Dangnhap"); // Chuyển hướng đến trang đăng nhập
            } else {
                alert('Đăng ký không thành công.'); // Hiển thị lỗi nếu đăng ký thất bại
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại.'); // Hiển thị lỗi khi có sự cố
        }
    };

    return (
        <div className={styles.signupbody}>
            <div className={styles.container}>
                <img src={maybayImage} alt="Airplane" className={styles.image} />
                <h2>Đăng Ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="customer-name" className={styles.label}>Tên khách hàng</label>
                            <input
                                type="text"
                                id="customer-name"
                                name="customer-name"
                                value={formData.customerName || ''}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone" className={styles.label}>Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="gender" className={styles.label}>Giới tính</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                required
                                className={styles.select}
                            >
                                <option value="">--Chọn giới tính--</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="dob" className={styles.label}>Ngày sinh</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob || ''}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="confirm-password" className={styles.label}>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                required
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.button}>Đăng Ký</button>
                    </div>
                </form>
                <div className={styles.footer}>
                    <p>Bạn đã có tài khoản? <Link to="/Dangnhap" className={styles.footerLink}>Đăng nhập</Link></p>
                </div>
            </div>
        </div>
    );
}

export default DangKy;
