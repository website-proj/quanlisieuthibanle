-- Chèn dữ liệu vào bảng Categories
INSERT INTO Categories (category_id, category_name, parent_category_id, image) VALUES
('catebd19734', 'Thực phẩm', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736512370/stream_sjxh6s.jpg'),
('cat8e70e2ce', 'Đồ uống', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736512654/stream_ftndpa.jpg'),
('catba528773', 'Bánh kẹo & Đồ ăn nhẹ', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736512891/stream_j3e0qu.jpg'),
('catdef39bd3', 'Hóa mỹ phẩm', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736512992/stream_ulhnnf.jpg'),
('catcc743f21', 'Gia dụng & Đồ dùng nhà bếp', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736513072/stream_lhmfws.jpg'),
('cat1cf169e7', 'Gia vị', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736513175/stream_ibm0rd.jpg'),
('cat30bce247', 'Chăm sóc bé', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736513245/stream_l1o4kz.jpg'),
('cat16d54357', 'Sách và văn phòng phẩm', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736513553/stream_kjapq6.jpg'),
('cat0b804dc4', 'Sản phẩm vệ sinh nhà cửa', NULL, 'https://res.cloudinary.com/do1uf5lkr/image/upload/v1736513714/stream_ynat3x.jpg'),
('cat22193abf', 'Đồ đông lạnh', 'catebd19734', NULL),
('cat11dc5d03', 'Thực phẩm khô', 'catebd19734', NULL),
('cat41e27761', 'Đồ hộp', 'catebd19734', NULL),
('cat319a4951', 'Nước giải khát', 'cat8e70e2ce', NULL),
('cat07fcb8e3', 'Sữa & Các sản phẩm từ sữa', 'cat8e70e2ce', NULL),
('cat0968c1d0', 'Đồ uống có cồn', 'cat8e70e2ce', NULL),
('cat9619acef', 'Bánh kẹo', 'catba528773', NULL),
('cat67100550', 'Đồ ăn nhẹ', 'catba528773', NULL),
('cat2111d2a2', 'Chăm sóc cá nhân', 'catdef39bd3', NULL),
('cat07dd697b', 'Chăm sóc da', 'catdef39bd3', NULL),
('cat88adbc92', 'Chăm sóc tóc', 'catdef39bd3', NULL),
('cat5f643e15', 'Trang điểm', 'catdef39bd3', NULL),
('catc32b5f24', 'Đồ dùng nhà bếp', 'catcc743f21', NULL),
('cat6f5a48af', 'Thiết bị điện gia dụng', 'catcc743f21', NULL),
('catbef89cff', 'Đồ dùng dọn dẹp', 'catcc743f21', NULL),
('cat67630b32', 'Dầu ăn', 'cat1cf169e7', NULL),
('cat1624741c', 'Nước mắm & Nước chấm', 'cat1cf169e7', NULL),
('cat53532821', 'Đường', 'cat1cf169e7', NULL),
('cat2d2e9090', 'Nước tương (xì dầu)', 'cat1cf169e7', NULL),
('cat35a18c5f', 'Hạt nêm', 'cat1cf169e7', NULL),
('cat62028cb4', 'Tương các loại', 'cat1cf169e7', NULL),
('cat3434754a', 'Sản phẩm cho bé', 'cat30bce247', NULL),
('cat58cd0363', 'Đồ chơi trẻ em', 'cat30bce247', NULL),
('cat346c7162', 'Sách', 'cat16d54357', NULL),
('cat1c518e93', 'Văn phòng phẩm', 'cat16d54357', NULL),
('cat2991f416', 'Chất tẩy rửa', 'cat0b804dc4', NULL),
('catf3492699', 'Dụng cụ vệ sinh', 'cat0b804dc4', NULL),
('cat87c37b0d', 'Rau củ quả', 'catebd19734', NULL),
('cata003459e', 'Thịt & Hải sản', 'catebd19734', NULL);
