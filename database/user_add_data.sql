-- insert dữ liệu
INSERT INTO Users (user_id, username, password, email, phone_number, address, account_type, membership_status, created_at, updated_at) VALUES
('userb3c7ddfe', 'huhu', '$2b$12$I5AxirGrp7XSjJ2nZptNEu7HGM5eA2vBxyb3w5Iasli4B/O3UKUWq', 'huhu0@gmail.com', NULL, NULL, 'Customer', 'Silver', '2024-12-04 08:26:15.08752', '2024-12-04 08:26:15.08752'),
('user4c8814a7', 'string', '$2b$12$a8sHl4/gLlWNcZYvZLssVuo04uBMa6j26nYzDNF6.XMG5F.b9J3v.', 'string', NULL, NULL, 'Customer', 'Silver', '2024-12-04 10:55:09.818575', '2024-12-04 10:55:09.818575'),
('admin1', 'manh2304', '$2b$12$fJwCoVRgWCmTwXBfqgAqdef1xmui4rKdy/gVGYiOY4Sidf/OPKk5e', 'manh20102004@gmail.com', '0373478651', 'nghean', 'Admin', 'Silver', '2024-12-04 15:15:11.180954', '2024-12-07 11:27:15.112855'),
('user1afa0f58', 'manhcu', '$2b$12$fJwCoVRgWCmTwXBfqgAqdef1xmui4rKdy/gVGYiOY4Sidf/OPKk5e', 'manh2004@gmail.com', '039399302', 'hà nội', 'Customer', 'Gold', '2024-12-04 07:28:23.734351', '2024-12-07 15:02:11.343068');

-- INSERT INTO Users (username, password, email, phone_number, address, account_type, membership_status, created_at, updated_at)
-- VALUES
-- ('Nguyen Ba Thong', 'hashed_password_1', 'nguyenba.thong@example.com', '0901234567', 'Hà Nội, Quận Hoàn Kiếm', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Tran Minh Tu', 'hashed_password_2', 'tranminhtu@example.com', '0902345678', 'Hồ Chí Minh, Quận 1', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Le Thi Mai', 'hashed_password_3', 'lethimai@example.com', '0903456789', 'Đà Nẵng, Quận Hải Châu', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Pham Quang Hieu', 'hashed_password_4', 'phamquanghieu@example.com', '0904567890', 'Hà Nội, Quận Cầu Giấy', 'Admin', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Minh Quang', 'hashed_password_5', 'nguyenminhquang@example.com', '0905678901', 'Hồ Chí Minh, Quận 3', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Vu Hoang Anh', 'hashed_password_6', 'vuohoanganh@example.com', '0906789012', 'Cần Thơ, Quận Ninh Kiều', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Mai Anh Thu', 'hashed_password_7', 'maianhthu@example.com', '0907890123', 'Hà Nội, Quận Thanh Xuân', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Hoang Minh Tu', 'hashed_password_8', 'hoangminhtu@example.com', '0908901234', 'Hồ Chí Minh, Quận 10', 'Admin', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Thi Lan', 'hashed_password_9', 'nguyenthilan@example.com', '0909012345', 'Hà Nội, Quận Ba Đình', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Do Thi Mai', 'hashed_password_10', 'dothimai@example.com', '0900123456', 'Huế, Thành phố Huế', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Tran Quoc Duy', 'hashed_password_11', 'tranquocduy@example.com', '0901230987', 'Đà Nẵng, Quận Liên Chiểu', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Le Thi Mai Lan', 'hashed_password_12', 'lethimailan@example.com', '0902340987', 'Hồ Chí Minh, Quận Bình Thạnh', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Thi Lan Anh', 'hashed_password_13', 'nguyenthilananh@example.com', '0903450987', 'Cần Thơ, Quận Cái Răng', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Phan Thanh Trung', 'hashed_password_14', 'phanthanhtrung@example.com', '0904560987', 'Vũng Tàu, Thành phố Vũng Tàu', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Bui Thi Hoa', 'hashed_password_15', 'buithihoa@example.com', '0905670987', 'Hà Nội, Quận Hoàng Mai', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Quang Vinh', 'hashed_password_16', 'nguyenquangvinh@example.com', '0906780987', 'Hồ Chí Minh, Quận 11', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Tran Thi Thanh Thao', 'hashed_password_17', 'tranthithanhthao@example.com', '0907890987', 'Nha Trang, Thành phố Nha Trang', 'Admin', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Ngo Thi Lan Anh', 'hashed_password_18', 'ngothilananh@example.com', '0908900987', 'Đà Nẵng, Quận Ngũ Hành Sơn', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Pham Hoang Nam', 'hashed_password_19', 'phamhoangnam@example.com', '0909010987', 'Quảng Ninh, Thành phố Hạ Long', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Luu Thi Lan Anh', 'hashed_password_20', 'luuthilananh@example.com', '0900120987', 'Hồ Chí Minh, Quận Gò Vấp', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Hoang Minh', 'hashed_password_21', 'nguyenhoangminh@example.com', '0901239876', 'Bình Dương, Thành phố Thủ Dầu Một', 'Admin', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Truong Thi Lan', 'hashed_password_22', 'truongthilan@example.com', '0902349876', 'Hà Nội, Quận Long Biên', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Thi Thu', 'hashed_password_23', 'nguyenthithu@example.com', '0903459876', 'Hải Phòng, Quận Lê Chân', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Trần Quang Hieu', 'hashed_password_24', 'tranquanghieu@example.com', '0904569876', 'Hồ Chí Minh, Quận Tân Bình', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Ho Thi Lan', 'hashed_password_25', 'hothilan@example.com', '0905679876', 'Vinh, Thành phố Vinh', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Pham Thi Hoa', 'hashed_password_26', 'phamthihoa@example.com', '0906789876', 'Đà Nẵng, Quận Thanh Khê', 'Customer', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Nguyen Thi Lan Anh', 'hashed_password_27', 'nguyenthilananh@example.com', '0907899876', 'Huế, Thành phố Huế', 'Admin', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Bui Thi Mai', 'hashed_password_28', 'buithimai@example.com', '0908909876', 'Cần Thơ, Quận Cái Răng', 'Customer', 'Silver', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Trương Hoàng Hải', 'hashed_password_29', 'truonghoanghai@example.com', '0909019876', 'Nha Trang, Thành phố Nha Trang', 'Customer', 'Gold', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('Lê Quang Duy', 'hashed_password_30', 'lequangduy@example.com', '0900129876', 'Hà Nội, Quận Ba Đình', 'Admin', 'Diamond', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
