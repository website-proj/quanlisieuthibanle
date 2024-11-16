function previewImage(event) {
    const input = event.target;
    const preview = document.getElementById("image-preview");

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Ảnh sản phẩm">`;
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = "<span>Chưa có ảnh</span>";
    }
}
// Các tùy chọn cho danh mục con
const subcategories = {
    1: [
        { value: "meat", text: "Thịt" },
        { value: "fish", text: "Cá" },
    ],
    2: [
        { value: "kitchen", text: "Đồ bếp" },
        { value: "cleaning", text: "Đồ dọn dẹp" },
    ],
};

// Lấy các phần tử HTML
const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");

// Lắng nghe sự kiện thay đổi trên danh mục
categorySelect.addEventListener("change", function () {
    const selectedCategory = this.value;

    // Xóa các tùy chọn cũ
    subcategorySelect.innerHTML = '<option value="" disabled selected>Chọn danh mục con</option>';

    // Kiểm tra xem danh mục có giá trị trong subcategories hay không
    if (subcategories[selectedCategory]) {
        // Bật dropdown danh mục con
        subcategorySelect.disabled = false;

        // Thêm các tùy chọn mới vào danh mục con
        subcategories[selectedCategory].forEach((subcategory) => {
            const option = document.createElement("option");
            option.value = subcategory.value;
            option.textContent = subcategory.text;
            subcategorySelect.appendChild(option);
        });
    } else {
        // Nếu không có danh mục con, vô hiệu hóa dropdown
        subcategorySelect.disabled = true;
    }
});
