// Đường dẫn tới file JSON
const jsonPath = "../JSON/subcategories.json";

// Lấy các phần tử HTML
const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");

// Tải dữ liệu từ file JSON
fetch(jsonPath)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to load JSON: ${response.statusText}`);
        }
        return response.json(); // Chuyển đổi dữ liệu JSON
    })
    .then((subcategories) => {
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
    })
    .catch((error) => {
        console.error("Error loading subcategories:", error); // Ghi log lỗi nếu có vấn đề
    });
