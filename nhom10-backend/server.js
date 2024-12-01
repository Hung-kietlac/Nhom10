const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./auth/auth');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const order = require('./routes/order');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Diadanh = require('./models/diadanh');

const app = express();

// Cấu hình view (nếu sử dụng view, nhưng API hiện không cần)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Cài đặt `strictQuery` để tránh cảnh báo Mongoose
mongoose.set('strictQuery', false); // Chuẩn bị cho Mongoose 7 (hoặc bạn có thể chọn `true` nếu muốn giữ hành vi cũ)

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/UD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Cho phép frontend từ localhost:3000 truy cập
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Cấu hình session
app.use(session({
  secret: 'Hung12345',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes);
app.use('/order', order);

app.get('/api/diadanhs', async (req, res) => {
  try {
    // Lấy tất cả các địa danh từ collection Diadanh
    const diadanhs = await Diadanh.find(); // Chỉ lấy các trường cần thiết

    // Kiểm tra nếu không có dữ liệu địa danh
    if (diadanhs.length === 0) {
      return res.status(404).json({ message: "Không có dữ liệu địa danh" });
    }

    // Trả về tất cả dữ liệu địa danh với các trường tên, mô tả, giá tiền và hình ảnh
    res.json(diadanhs);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu địa danh:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu địa danh' });
  }
});

// Middleware xử lý lỗi
app.use(function (req, res, next) {
  res.status(404).json({
    error: 'Không tìm thấy tài nguyên yêu cầu.',
  });
});

// Xử lý lỗi server
app.use(function (err, req, res, next) {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Có lỗi xảy ra.',
      status: err.status || 500,
    },
  });
});

// Khởi động server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});