-- Thực phẩm: Rau củ quả
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Rau muống', 'Local Farm', 'Rau muống tươi, sạch và an toàn', 15000, 20000, 25, 'bó', 100, 'cat1', 'images/rau_muong.jpg', TRUE, FALSE),
('Táo đỏ', 'Imported', 'Táo đỏ nhập khẩu tươi ngon', 50000, 60000, 20, 'kg', 50, 'cat1', 'images/tao_do.jpg', TRUE, TRUE);

-- Thực phẩm: Thịt & Hải sản
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Thịt bò Úc', 'Premium Meat', 'Thịt bò Úc cao cấp', 300000, 350000, 14.29, 'kg', 30, 'cat2', 'images/thit_bo_uc.jpg', TRUE, TRUE),
('Cá hồi phi lê', 'Sea Fresh', 'Cá hồi phi lê tươi ngon, nhập khẩu', 450000, 500000, 10, 'kg', 20, 'cat2', 'images/ca_hoi_file.jpg', TRUE, FALSE);

-- Đồ uống: Nước giải khát
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Nước ngọt Coca-Cola', 'Coca-Cola', 'Nước ngọt Coca-Cola lon 330ml', 10000, 12000, 16.67, 'lon', 500, 'cat6', 'images/coca_cola.jpg', TRUE, FALSE),
('Nước khoáng Lavie', 'Lavie', 'Nước khoáng Lavie chai 1.5L', 8000, 10000, 20, 'chai', 300, 'cat6', 'images/lavie.jpg', TRUE, FALSE);

-- Bánh kẹo: Kẹo
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Kẹo sô-cô-la', 'ChocoDelight', 'Kẹo sô-cô-la thơm ngon', 20000, 25000, 20, 'hộp', 200, 'cat3', 'images/keo_chocolate.jpg', TRUE, FALSE),
('Bánh quy bơ', 'Danish Butter Cookies', 'Bánh quy bơ cao cấp', 75000, 85000, 11.76, 'hộp', 100, 'cat3', 'images/banh_quy_bo.jpg', TRUE, TRUE);

-- Gia vị: Dầu ăn
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Dầu ăn Simply', 'Simply', 'Dầu ăn thực vật cao cấp', 100000, 120000, 16.67, 'chai', 200, 'cat8', 'images/dau_an_simply.jpg', TRUE, TRUE);

-- Gia dụng: Đồ dùng nhà bếp
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Nồi chống dính', 'Sunhouse', 'Nồi chống dính cao cấp', 300000, 350000, 14.29, 'chiếc', 50, 'cat5', 'images/noi_chong_dinh.jpg', TRUE, FALSE);
-- Thực phẩm: Rau củ quả
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Cà rốt', 'Local Farm', 'Cà rốt tươi, sạch và an toàn', 12000, 15000, 20, 'kg', 150, 'cat1', 'images/ca_rot.jpg', TRUE, FALSE),
('Dưa leo', 'Fresh Veg', 'Dưa leo tươi ngon', 10000, 12000, 16.67, 'kg', 100, 'cat1', 'images/dua_leo.jpg', TRUE, FALSE);

-- Thực phẩm: Thịt & Hải sản
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Tôm sú', 'Sea Fresh', 'Tôm sú tươi ngon, nhập khẩu', 350000, 400000, 12.5, 'kg', 80, 'cat2', 'images/tom_su.jpg', TRUE, FALSE),
('Thịt gà ta', 'Organic Farm', 'Thịt gà ta, sạch và an toàn', 120000, 150000, 20, 'kg', 60, 'cat2', 'images/ga_ta.jpg', TRUE, TRUE);

-- Đồ uống: Nước giải khát
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Nước ép cam', 'Pure Juice', 'Nước ép cam tươi nguyên chất', 25000, 30000, 16.67, 'chai', 150, 'cat6', 'images/nuoc_ep_cam.jpg', TRUE, TRUE),
('Nước dừa Titi', 'Titi', 'Nước dừa Titi chai 1L', 20000, 25000, 20, 'chai', 120, 'cat6', 'images/nuoc_dua_titi.jpg', TRUE, FALSE);

-- Bánh kẹo: Kẹo
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Kẹo dẻo', 'Sugar Bliss', 'Kẹo dẻo ngọt ngào', 15000, 20000, 25, 'hộp', 180, 'cat3', 'images/keo_deo.jpg', TRUE, FALSE),
('Bánh su kem', 'Pastry Delight', 'Bánh su kem ngon miệng', 25000, 30000, 16.67, 'hộp', 120, 'cat3', 'images/banh_su_kem.jpg', TRUE, TRUE);

-- Gia vị: Dầu ăn
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Dầu ăn Olive', 'Oliva', 'Dầu ăn Olive nguyên chất', 120000, 150000, 20, 'chai', 200, 'cat8', 'images/dau_an_olive.jpg', TRUE, TRUE),
('Dầu ăn đậu nành', 'Soybean', 'Dầu ăn đậu nành nguyên chất', 90000, 110000, 18.18, 'chai', 250, 'cat8', 'images/dau_an_dau_nanh.jpg', TRUE, FALSE);

-- Gia dụng: Đồ dùng nhà bếp
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Bộ nồi inox', 'Inox Master', 'Bộ nồi inox cao cấp', 500000, 600000, 16.67, 'bộ', 40, 'cat5', 'images/bo_noi_inox.jpg', TRUE, TRUE),
('Máy xay sinh tố', 'BlenderPro', 'Máy xay sinh tố mạnh mẽ', 350000, 400000, 12.5, 'chiếc', 70, 'cat5', 'images/may_xay_sinh_to.jpg', TRUE, FALSE);

-- Sản phẩm vệ sinh nhà cửa: Chất tẩy rửa
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Nước tẩy rửa đa năng', 'CleanMaster', 'Nước tẩy rửa đa năng', 30000, 35000, 14.29, 'chai', 150, 'cat10', 'images/nuoc_tay_ra.jpg', TRUE, FALSE),
('Nước lau kính', 'Crystal Shine', 'Nước lau kính trong suốt', 25000, 30000, 16.67, 'chai', 100, 'cat10', 'images/nuoc_lau_kinh.jpg', TRUE, TRUE);

-- Chăm sóc bé: Sản phẩm cho bé
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Bỉm tã cho bé', 'BabyCare', 'Bỉm tã siêu mềm', 150000, 180000, 16.67, 'gói', 200, 'cat17', 'images/bim_ta.jpg', TRUE, TRUE),
('Sữa bột cho bé', 'Nestle', 'Sữa bột cho bé Nestle', 250000, 300000, 16.67, 'hộp', 150, 'cat17', 'images/sua_bot_be.jpg', TRUE, FALSE);

-- Sách và văn phòng phẩm: Sách
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Sách học lập trình', 'CodeMaster', 'Sách học lập trình cơ bản', 100000, 120000, 16.67, 'cuốn', 50, 'cat19', 'images/sach_lap_trinh.jpg', TRUE, FALSE),
('Sách kỹ năng mềm', 'SkillUp', 'Sách kỹ năng mềm cho cuộc sống', 80000, 100000, 20, 'cuốn', 200, 'cat19', 'images/sach_ky_nang_mem.jpg', TRUE, TRUE);

-- Đồ uống: Đồ uống có cồn
INSERT INTO Products (name, name_brand, description, price, old_price, discount, unit, stock_quantity, category_id, image, is_active, star_product)
VALUES
('Rượu vang đỏ', 'Vino', 'Rượu vang đỏ nhập khẩu', 400000, 500000, 20, 'chai', 80, 'cat12', 'images/ruou_vang_do.jpg', TRUE, TRUE),
('Bia Heineken', 'Heineken', 'Bia Heineken lon 500ml', 15000, 20000, 25, 'lon', 300, 'cat12', 'images/bia_heineken.jpg', TRUE, FALSE);
