-- Danh mục chính
INSERT INTO Categories (category_name, start_category) VALUES
('Thực phẩm', True),
('Đồ uống', False),
('Bánh kẹo & Đồ ăn nhẹ', False),
('Hóa mỹ phẩm', TRUE),
('Gia dụng & Đồ dùng nhà bếp', TRUE),
('Gia vị', TRUE),
('Chăm sóc bé', TRUE),
('Sách và văn phòng phẩm', TRUE),
('Sản phẩm vệ sinh nhà cửa', TRUE);

-- Danh mục con cho "Thực phẩm"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Rau củ quả', 'cat1'),
('Thịt & Hải sản', 'cat1'),
('Đồ đông lạnh', 'cat1'),
('Thực phẩm khô', 'cat1'),
('Đồ hộp', 'cat1');

-- Danh mục con cho "Đồ uống"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Nước giải khát', 'cat2'),
('Sữa & Các sản phẩm từ sữa', 'cat2'),
('Đồ uống có cồn', 'cat2');

-- Danh mục con cho "Bánh kẹo & Đồ ăn nhẹ"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Bánh kẹo', 'cat3'),
('Đồ ăn nhẹ', 'cat3');

-- Danh mục con cho "Hóa mỹ phẩm"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Chăm sóc cá nhân', 'cat4'),
('Chăm sóc da', 'cat4'),
('Chăm sóc tóc', 'cat4'),
('Trang điểm', 'cat4');

-- Danh mục con cho "Gia dụng & Đồ dùng nhà bếp"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Đồ dùng nhà bếp', 'cat5'),
('Thiết bị điện gia dụng', 'cat5'),
('Đồ dùng dọn dẹp', 'cat5');

-- Danh mục con cho "Gia vị"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Dầu ăn', 'cat6'),
('Nước mắm & Nước chấm', 'cat6'),
('Đường', 'cat6'),
('Nước tương (xì dầu)', 'cat6'),
('Hạt nêm', 'cat6'),
('Tương các loại', 'cat6');

-- Danh mục con cho "Chăm sóc bé"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Sản phẩm cho bé', 'cat7'),
('Đồ chơi trẻ em', 'cat7');

-- Danh mục con cho "Sách và văn phòng phẩm"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Sách', 'cat8'),
('Văn phòng phẩm', 'cat8');

-- Danh mục con cho "Sản phẩm vệ sinh nhà cửa"
INSERT INTO Categories (category_name, parent_category_id) VALUES
('Chất tẩy rửa', 'cat9'),
('Dụng cụ vệ sinh', 'cat9');
