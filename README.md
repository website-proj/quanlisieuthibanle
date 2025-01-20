# Cài Đặt và Hướng Dẫn Sử Dụng

## 1. Giới Thiệu
Dự án web bán hàng siêu thị bán lẻ được thiết kế để cung cấp giao diện quản lý sản phẩm, đơn hàng, và hệ thống API tích hợp.

---

Lưu ý:  
Do chi phí sử dụng Amazon ElastiCache Redis, nhóm đã dừng sử dụng dịch vụ này. Vì vậy, chức năng đăng ký tài khoản sẽ không khả dụng trong phiên bản hiện tại.

Để truy cập website, vui lòng sử dụng tài khoản được cấp sẵn:

- **SuperAdmin**:  
  - Tài khoản: `thong@gmail.com`  
  - Mật khẩu: `1`

- **Admin**:  
  - Tài khoản: `admin@admin.com`  
  - Mật khẩu: `1`

## 2. Quy Trình Cài Đặt

### 2.1. Yêu cầu hệ thống
- **Docker**: Cài đặt Docker ([hướng dẫn](https://docs.docker.com/get-docker/)).
- **Git**: Để clone mã nguồn.
- **Node.js**: Phiên bản >= 16.x ([tải tại đây](https://nodejs.org/)).
- **Python**: Phiên bản >= 3.x ([tải tại đây](https://www.python.org/)).
### 2.2. Cài đặt

#### Bước 1: Clone mã nguồn
```bash
git clone https://github.com/website-proj/quanlisieuthibanle.git
cd quanlisieuthibanle
```

#### Bước 2: Cấu hình tệp `.env`
Tạo tệp `.env` trong thư mục chính, thêm các biến môi trường như sau:
```env
# Database Configuration
DB_HOST=<YOUR_HOST>
DB_PORT=5432
DB_NAME=<DATABASE_NAME>
DB_USER=<USERNAME>
DB_PASSWORD=<PASSWORD>

# Application Configuration
APP_PORT=3000
```

#### Bước 3: Khởi động hệ thống backend
```bash
docker-compose up -d
```
Lệnh trên sẽ khởi chạy tất cả các container Docker gồm backend và database.

#### Bước 4: Khởi chạy frontend
Chuyển vào thư mục frontend và khởi chạy:
```bash
cd frontend
npm install
npm run dev
```
Sau khi chạy, frontend sẽ được truy cập tại: `http://localhost:5173`.

---

## 3. Hướng Dẫn Sử Dụng

### 3.1. Truy cập giao diện web
- Mở trình duyệt và truy cập: `http://localhost:5173`.
- Đăng nhập bằng tài khoản được cung cấp.

### 3.3. Tích hợp API
- Tài liệu API: [API Documentation](https://documenter.getpostman.com/view/39199721/2sAYQXpZ9D).
- Sử dụng Postman hoặc công cụ tương tự để tích hợp.

---

## 4. Xử lý lỗi

### 4.1. Lỗi kết nối cơ sở dữ liệu
- Kiểm tra tệp `.env` đã điền đúng thông tin.
- Đảm bảo cổng 5432 đã được mở.

### 4.2. Lỗi container không khởi động
- Kiểm tra log Docker:
```bash
docker-compose logs
```
- Khắc phục theo thông báo lỗi.

---

## 5. Tham khảo
- Tài liệu Docker: [Docker Documentation](https://docs.docker.com/).
- Mã nguồn GitHub: [Project Repository](https://github.com/website-proj/quanlisieuthibanle).
