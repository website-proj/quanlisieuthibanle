
// THANH TÌM KIẾM MỤC SẢN PHẨM BÁN CHẠY NHẤT
// Lấy các phần tử từ HTML
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const productTable = document.getElementById('product-table');
const rows = productTable.getElementsByTagName('tr');

// Lọc dữ liệu khi người dùng nhập tìm kiếm
searchInput.addEventListener('input', function () {
    filterTable();
});

// Lọc dữ liệu khi người dùng chọn danh mục
categorySelect.addEventListener('change', function () {
    filterTable();
});

function filterTable() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    // Duyệt qua các dòng trong bảng
    for (let i = 1; i < rows.length; i++) { // Bắt đầu từ 1 để bỏ qua tiêu đề
        const cells = rows[i].getElementsByTagName('td');
        const productName = cells[0].textContent.toLowerCase();
        const category = cells[1].textContent.toLowerCase();
        const subCategory = cells[2].textContent.toLowerCase();

        // Kiểm tra nếu tên sản phẩm hoặc danh mục khớp với từ khóa tìm kiếm
        const matchesSearchText = productName.includes(searchText) || category.includes(searchText) || subCategory.includes(searchText);

        // Kiểm tra nếu danh mục khớp với lựa chọn
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

        // Ẩn hoặc hiện dòng tùy thuộc vào kết quả tìm kiếm và lọc
        if (matchesSearchText && matchesCategory) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}



document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from the JSON file
    fetch('../JSON/best-selling-products.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('product-tbody');
            tableBody.innerHTML = ''; // Clear existing content

            // Loop through the products in the JSON data and create table rows
            data.forEach(product => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td><img src="${product.image}" alt="Best Seller" width="30"> ${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.subcategory}</td>
                    <td>${product.price}</td>
                    <td>${product.date}</td>

                    <td>
                        <span class="icon-view"><i class='bx bx-low-vision'></i></span>
                        <span class="icon-edit"><i class='bx bx-edit'></i></span>
                        <span class="icon-delete"><i class='bx bx-trash'></i></span>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching product data:", error));
});

// chọn danh mục hàng -> hiển thị mặt hàng tương ứng