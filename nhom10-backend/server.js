const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./auth/auth');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const Tour = require('./models/tour');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/UD')
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3000', // Cho phép frontend trên localhost:3000 truy cập vào backend
    methods: 'GET,POST', // Các phương thức HTTP được phép
    credentials: true, // Nếu cần sử dụng cookies hoặc thông tin xác thực
}));

app.use(express.json());

// Cấu hình session
app.use(session({
    secret: 'Hung12345',
    resave: true,
    saveUninitialized: true
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng các route từ authRoutes
app.use('/', authRoutes);

app.get('/api/tours', async (req, res) => {
  try {
    // Truy vấn tất cả các tour và sử dụng populate để lấy thông tin từ bảng 'DiaDanh' thông qua trường 'matp_den'
    const tours = await Tour.find().populate('matp_den'); 

    // Trả dữ liệu về cho frontend
    res.json(tours);
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err);
    res.status(500).send('Lỗi server');
  }
});

// Khởi động server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});