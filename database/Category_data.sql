-- Chèn dữ liệu vào bảng Categories
INSERT INTO Categories (category_id, category_name, parent_category_id, star_category) VALUES
('catebd19734', 'Thực phẩm', NULL, false),
('cat8e70e2ce', 'Đồ uống', NULL, false),
('catba528773', 'Bánh kẹo & Đồ ăn nhẹ', NULL, false),
('catdef39bd3', 'Hóa mỹ phẩm', NULL, false),
('catcc743f21', 'Gia dụng & Đồ dùng nhà bếp', NULL, false),
('cat1cf169e7', 'Gia vị', NULL, false),
('cat30bce247', 'Chăm sóc bé', NULL, false),
('cat16d54357', 'Sách và văn phòng phẩm', NULL, false),
('cat0b804dc4', 'Sản phẩm vệ sinh nhà cửa', NULL, false),
('cat22193abf', 'Đồ đông lạnh', 'catebd19734', false),
('cat11dc5d03', 'Thực phẩm khô', 'catebd19734', false),
('cat41e27761', 'Đồ hộp', 'catebd19734', false),
('cat319a4951', 'Nước giải khát', 'cat8e70e2ce', false),
('cat07fcb8e3', 'Sữa & Các sản phẩm từ sữa', 'cat8e70e2ce', false),
('cat0968c1d0', 'Đồ uống có cồn', 'cat8e70e2ce', false),
('cat9619acef', 'Bánh kẹo', 'catba528773', false),
('cat67100550', 'Đồ ăn nhẹ', 'catba528773', false),
('cat2111d2a2', 'Chăm sóc cá nhân', 'catdef39bd3', false),
('cat07dd697b', 'Chăm sóc da', 'catdef39bd3', false),
('cat88adbc92', 'Chăm sóc tóc', 'catdef39bd3', false),
('cat5f643e15', 'Trang điểm', 'catdef39bd3', false),
('catc32b5f24', 'Đồ dùng nhà bếp', 'catcc743f21', false),
('cat6f5a48af', 'Thiết bị điện gia dụng', 'catcc743f21', false),
('catbef89cff', 'Đồ dùng dọn dẹp', 'catcc743f21', false),
('cat67630b32', 'Dầu ăn', 'cat1cf169e7', false),
('cat1624741c', 'Nước mắm & Nước chấm', 'cat1cf169e7', false),
('cat53532821', 'Đường', 'cat1cf169e7', false),
('cat2d2e9090', 'Nước tương (xì dầu)', 'cat1cf169e7', false),
('cat35a18c5f', 'Hạt nêm', 'cat1cf169e7', false),
('cat62028cb4', 'Tương các loại', 'cat1cf169e7', false),
('cat3434754a', 'Sản phẩm cho bé', 'cat30bce247', false),
('cat58cd0363', 'Đồ chơi trẻ em', 'cat30bce247', false),
('cat346c7162', 'Sách', 'cat16d54357', false),
('cat1c518e93', 'Văn phòng phẩm', 'cat16d54357', false),
('cat2991f416', 'Chất tẩy rửa', 'cat0b804dc4', false),
('catf3492699', 'Dụng cụ vệ sinh', 'cat0b804dc4', false),
('cat87c37b0d', 'Rau củ quả', 'catebd19734', true),
('cat5aaf8732', 'Thức ăn nhanh', 'catebd19734', false),
('cata003459e', 'Thịt & Hải sản', 'catebd19734', true);
