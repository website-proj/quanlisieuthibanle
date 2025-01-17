import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Search/style.css";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Hàm tìm kiếm sản phẩm theo thời gian thực
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchText.trim()) {
        setResults([]);
        return;
      }
      try {
        const response = await axios.get(`${baseURL}${SummaryApi.search.url}`, {
          params: { search: searchText },
        });
        setResults(response.data.data);
      } catch (error) {
        console.error(error);
        setResults([]);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); // Thời gian chờ trước khi gửi yêu cầu
    return () => clearTimeout(delayDebounce); // Hủy bỏ yêu cầu trước đó nếu input thay đổi
  }, [searchText]);

  return (
    <div className="searchBox w-[80%] h-[2.5em] bg-[#FFFFFF] rounded-[1.25rem] relative p-2">
      <input
        type="text"
        placeholder="Nhập nội dung tìm kiếm"
        className="w-full h-[1.9em] focus:outline-none bg-inherit p-2 text-[0.9375em]"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Trì hoãn đóng dropdown để xử lý click
      />
      <button className="absolute right-4 top-[0.4em]">
        <IoSearch />
      </button>

      {/* Hiển thị kết quả gợi ý */}
      {showDropdown && results.length > 0 && (
        <ul
          className="absolute top-[2.5em] max-h-56 overflow-y-auto  left-0 w-full bg-white border border-gray-300 rounded-2xl shadow-lg z-10 custom-scrollbar  "
          sx={{ scrollbarColor: "#ccc transparent" }}
        >
          {results.map((product) => (
            <li
              key={product.product_id}
              className="p-2 rounded-2xl hover:bg-gray-100 "
            >
              <Link
                to={`/product_detials/${product.product_id}`}
                state={product}
                className="flex items-center justify-start gap-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="text-sm font-medium">{product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
