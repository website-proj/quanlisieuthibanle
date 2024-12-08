import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";
import "../Search/style.css";
const Search = () => {
  return (
    <div className="searchBox w-[100%] h-[2.5em] bg-[#FFFFFF] rounded-[1.25rem] relative p-2">
      <input
        type="text"
        placeholder="Nhập nội dung tìm kiếm"
        className="w-full h-[1.9em] focus:outline-none bg-inherit p-2 text-[0.9375em]"
      />
      <Button>
        <IoSearch />
      </Button>
    </div>
  );
};

export default Search;
