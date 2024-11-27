import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navPart1">
            <Button className="allCatTab align-items-center">
              <span className="icon1 mr-2">
                <IoIosMenu />
              </span>
              <span className="text">Danh mục sản phẩm</span>
              <span className="icon2 ml-2">
                <FaAngleDown />
              </span>
            </Button>
          </div>

          <div className="col-sm-9  navPart2 d-flex align-items-center">
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
