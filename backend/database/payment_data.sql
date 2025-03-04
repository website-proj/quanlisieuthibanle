INSERT INTO Payments (user_id, order_id, voucher_id, amount, payment_method, payment_date, status)
VALUES
(1, 1, 1, 250000.00, 'Credit Card', '2024-11-01 11:00:00', 'successful'),
(2, 2, 2, 150000.00, 'Cash', '2024-11-01 12:00:00', 'successful'),
(3, 3, NULL, 50000.00, 'Credit Card', '2024-11-02 09:00:00', 'failed'),
(4, 4, 3, 75000.00, 'Bank Transfer', '2024-11-02 14:30:00', 'pending'),
(5, 5, NULL, 300000.00, 'Cash', '2024-11-03 10:30:00', 'pending'),
(6, 6, 4, 200000.00, 'Credit Card', '2024-11-03 11:00:00', 'successful'),
(7, 7, NULL, 100000.00, 'Bank Transfer', '2024-11-04 10:45:00', 'successful'),
(8, 8, 5, 120000.00, 'Cash', '2024-11-04 12:30:00', 'successful'),
(9, 9, NULL, 180000.00, 'Credit Card', '2024-11-05 13:00:00', 'pending'),
(10, 10, 6, 220000.00, 'Bank Transfer', '2024-11-05 14:00:00', 'successful'),
(11, 11, NULL, 50000.00, 'Cash', '2024-11-06 09:30:00', 'successful'),
(12, 12, 7, 130000.00, 'Credit Card', '2024-11-06 12:00:00', 'pending'),
(13, 13, 8, 170000.00, 'Cash', '2024-11-07 10:30:00', 'successful'),
(14, 14, NULL, 100000.00, 'Bank Transfer', '2024-11-07 13:30:00', 'failed'),
(15, 15, 9, 400000.00, 'Cash', '2024-11-08 09:00:00', 'successful'),
(16, 16, NULL, 300000.00, 'Credit Card', '2024-11-08 12:00:00', 'pending'),
(17, 17, 10, 150000.00, 'Bank Transfer', '2024-11-09 10:00:00', 'successful'),
(18, 18, NULL, 220000.00, 'Cash', '2024-11-09 11:30:00', 'successful'),
(19, 19, 11, 250000.00, 'Credit Card', '2024-11-10 10:00:00', 'pending'),
(20, 20, NULL, 50000.00, 'Cash', '2024-11-10 12:30:00', 'successful'),
(21, 21, 12, 90000.00, 'Bank Transfer', '2024-11-11 10:00:00', 'failed'),
(22, 22, NULL, 200000.00, 'Credit Card', '2024-11-11 11:00:00', 'successful'),
(23, 23, 13, 170000.00, 'Cash', '2024-11-12 09:30:00', 'pending'),
(24, 24, NULL, 300000.00, 'Bank Transfer', '2024-11-12 13:00:00', 'successful'),
(25, 25, 14, 270000.00, 'Cash', '2024-11-13 10:30:00', 'pending'),
(26, 26, NULL, 220000.00, 'Credit Card', '2024-11-13 14:00:00', 'successful'),
(27, 27, 15, 150000.00, 'Bank Transfer', '2024-11-14 09:00:00', 'successful'),
(28, 28, NULL, 250000.00, 'Cash', '2024-11-14 12:30:00', 'pending'),
(29, 29, 16, 80000.00, 'Credit Card', '2024-11-15 10:00:00', 'successful'),
(30, 30, NULL, 120000.00, 'Bank Transfer', '2024-11-15 14:00:00', 'successful');
