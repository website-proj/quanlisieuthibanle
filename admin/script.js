const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
	const li = item.parentElement;
	item.addEventListener('click', function () {
		allSideMenu.forEach(i => {
			i.parentElement.classList.remove('active');
		});
		li.classList.add('active');
	});
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
});

// Chuyển đổi chế độ sáng/tối
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', function (e) {
	e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
	document.body.classList.toggle('dark');

	// Đổi icon giữa mặt trời và mặt trăng
	if (document.body.classList.contains('dark')) {
		themeIcon.classList.replace('bxs-moon', 'bxs-sun');
	} else {
		themeIcon.classList.replace('bxs-sun', 'bxs-moon');
	}
});

const ctx = document.getElementById('order-chart').getContext('2d');
const orderChart = new Chart(ctx, {
  type: 'line', // or 'line' based on your preference
  data: {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [{
      label: 'Tổng người dùng',
      data: [40, 120, 180, 130, 160, 180, 110, 170, 160, 180, 200, 190],
      backgroundColor: 'rgba(60, 145, 230, 0.2)',
      borderColor: 'rgba(60, 145, 230, 1)',
      borderWidth: 2,
      fill: true,
    }, {
      label: 'Tổng số đơn hàng đã bán',
      data: [190, 210, 230, 240, 250, 270, 240, 260, 190, 270, 300, 280],
	  backgroundColor: 'rgba(255, 183, 77, 0.1)',  // Màu da cam nhạt cho nền
	  borderColor: 'rgba(255, 183, 77, 1)',        // Màu da cam nhạt cho viền
	  
      borderWidth: 2,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// // Pie chart for product categories
// const ctxProductCategory = document.getElementById('product-category-chart').getContext('2d');
// const productCategoryChart = new Chart(ctxProductCategory, {
//     type: 'pie', // Pie chart for product categories
//     data: {
//         labels: ['Đồ ăn', 'Thời trang', 'Điện tử', 'Sách', 'Phụ kiện'],
//         datasets: [{
//             label: 'Thống kê loại sản phẩm',
//             data: [35, 25, 20, 10, 10], // Data for each category
//             backgroundColor: [
// 				'rgba(255, 182, 193, 1)', // Pastel Pink
// 				'rgba(152, 251, 152, 1)', // Pastel Green
// 				'rgba(175, 238, 238, 1)', // Pastel Cyan
// 				'rgba(240, 230, 140, 1)', // Pastel Yellow
// 				'rgba(255, 228, 196, 1)', // Pastel Peach
// 				'rgba(221, 160, 221, 1)'  // Pastel Purple
// 			],         borderColor: '#fff',
//             borderWidth: 2
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function(tooltipItem) {
//                         return tooltipItem.label + ': ' + tooltipItem.raw + '%';
//                     }
//                 }
//             }
//         }
//     }
// });

// Pie chart for ratings (1 to 5 stars)
const ctxRating = document.getElementById('rating-chart').getContext('2d');
const ratingChart = new Chart(ctxRating, {
    type: 'pie', // Pie chart for ratings
    data: {
        labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
        datasets: [{
            label: 'Thống kê đánh giá',
            data: [5, 10, 20, 30, 35], // Data for each rating
			backgroundColor: [
				'rgba(255, 182, 193, 1)', // Pastel Pink
				'rgba(152, 251, 152, 1)', // Pastel Green
				'rgba(175, 238, 238, 1)', // Pastel Cyan
				'rgba(240, 230, 140, 1)', // Pastel Yellow
				'rgba(255, 228, 196, 1)', // Pastel Peach
				'rgba(221, 160, 221, 1)'  // Pastel Purple
			],         borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        }
    }
});

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
    for (let i = 1; i < rows.length; i++) { // bắt đầu từ 1 để bỏ qua dòng tiêu đề
        const cells = rows[i].getElementsByTagName('td');
        const productName = cells[0].textContent.toLowerCase();
        const category = cells[1].textContent.toLowerCase();

        // Kiểm tra điều kiện tìm kiếm và lọc danh mục
        if (
            (productName.includes(searchText) || searchText === "") && // Kiểm tra tên sản phẩm
            (selectedCategory === 'all' || category.includes(selectedCategory)) // Kiểm tra danh mục
        ) {
            rows[i].style.display = ''; // Hiển thị dòng
        } else {
            rows[i].style.display = 'none'; // Ẩn dòng
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from the JSON file
    fetch('best-selling-products.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('product-tbody');
            tableBody.innerHTML = ''; // Clear existing content

            // Loop through the products in the JSON data and create table rows
            data.forEach(product => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td><img src="${product.image}" alt="Best Seller" width="50"> ${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.subcategory}</td>
                    <td>${product.price}</td>
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