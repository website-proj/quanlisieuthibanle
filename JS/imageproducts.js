function previewImage(event) {
    const input = event.target; // Lấy input file
    const preview = document.getElementById("image-preview"); // Vùng preview

    // Kiểm tra nếu có file được chọn
    if (input.files && input.files[0]) {
        const reader = new FileReader(); // Tạo FileReader để đọc file

        reader.onload = function (e) {
            // Khi file được đọc xong, hiển thị ảnh
            preview.innerHTML = `<img src="${e.target.result}" alt="Ảnh sản phẩm" style="max-width: 100%; height: auto; border: 1px solid #ccc; padding: 5px;">`;
        };

        reader.readAsDataURL(input.files[0]); // Đọc file dưới dạng Data URL
    } else {
        // Nếu không có file nào, hiển thị thông báo mặc định
        preview.innerHTML = "<span>Chưa có ảnh</span>";
    }
    
}
