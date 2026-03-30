// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' }); // Đọc file .env ở thư mục ngoài

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối Database MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Đã kết nối Database!'))
  .catch(err => console.error('Lỗi kết nối DB:', err));

// Tạo bảng dữ liệu Sinh viên đơn giản
const Student = mongoose.model('Student', { name: String });

// 1. Route /health (Yêu cầu 3.2)
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// 2. Route /about (Yêu cầu 3.1 - SỬA THÔNG TIN CỦA BẠN VÀO ĐÂY)
app.get('/about', (req, res) => {
  res.json({ 
    ho_ten: "Nguyễn Chí Trung", 
    mssv: "2251220085", 
    lop: "22CT2" 
  });
});

// 3. API GET: Lấy danh sách (Yêu cầu 1)
app.get('/api/data', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// 4. API POST: Thêm người mới (Yêu cầu 1)
app.post('/api/data', async (req, res) => {
  const newStudent = new Student({ name: req.body.name });
  await newStudent.save();
  res.json({ message: "Đã lưu vào DB!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend chạy ở cổng ${PORT}`));