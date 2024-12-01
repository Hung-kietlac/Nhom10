const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserGmail = require('../models/UserGmail');
const nodemailer = require('nodemailer');
const router = express.Router();

// API Đăng ký
router.post('/Dangky', async (req, res) => {
  try {
    const { customerName, phone, gender, password, dateOfBirth } = req.body;

    // Kiểm tra nếu số điện thoại đã tồn tại
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Số điện thoại đã tồn tại!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      customerName,
      phone,
      gender,
      password: hashedPassword,
      dateOfBirth,
    });

    // Lưu vào MongoDB
    await newUser.save();

    // Phản hồi thành công
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!' });
  }
});

async function sendLoginNotification(userEmail) {
    try {
        // Truy xuất cấu hình email từ MongoDB
        const config = await EmailConfig.findOne({ _id: "config1" });

        if (!config) {
            throw new Error("Cấu hình email không tồn tại trong MongoDB.");
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,  // Lấy email từ MongoDB
                pass: config.password // Lấy mật khẩu từ MongoDB
            }
        });

        const mailOptions = {
            from: config.email, // Sử dụng email từ MongoDB
            to: userEmail,      // Email của người dùng
            subject: 'Thông báo đăng ký thành công',
            text: 'Bạn đã đăng ký thành công trên trang web của Nhóm 10.'
        };

        await transporter.sendMail(mailOptions);
        console.log('Email thông báo đã được gửi.');
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
    }
}

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/Dangnhap', successRedirect: 'http://localhost:3000/Trangchu' }),
    async (req, res) => {
        // Logic xử lý sau khi đăng nhập thành công từ Google
        try {
            if (!req.user || !req.user._json) {
                return res.redirect('/Dangnhap');
            }

            const { sub, name, email, picture } = req.user._json;
            let user = await User.findOne({ googleId: sub });

            if (!user) {
                user = new UserGmail({
                    googleId: sub,
                    name: name,
                    email: email,
                    picture: picture
                });

                await user.save();
            }

            res.redirect('http://localhost:3000/Trangchu');
        } catch (error) {
            console.error(error);
            res.redirect('/Dangnhap');
        }
    }
);

module.exports = router;