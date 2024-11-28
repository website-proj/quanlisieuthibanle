import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <div className="catWrapper">
              <Button
                className="allCatTab align-items-center"
                onClick={() => setisopenSidebarVal(!isopenSidebarVal)}
              >
                <span className="icon1 mr-2">
                  <IoIosMenu />
                </span>
                <span className="text">Danh mục sản phẩm</span>
                <span className="icon2 ml-2">
                  <FaAngleDown />
                </span>
              </Button>
              <div
                className={`sidebarNav ${
                  isopenSidebarVal === true ? "open" : ""
                }`}
              >
                <ul>
                  <li>
                    <Link to="/">
                      <Button>Thực phẩm</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Đồ uống</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Bánh kẹo & Đồ ăn nhẹ</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Hóa mỹ phẩm</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Gia dụng & Đồ dùng nhà bếp</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Gia vị</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Chăm sóc bé</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Sách và văn phòng phẩm</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>Sản phẩm vệ sinh nhà cửa</Button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-10  navPart2 d-flex align-items-center">
            <ul className="list list-inline ml-auBto">
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Khuyến mại</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Bán chạy nhất</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Giá siêu tốt</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Mới nhất</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
