import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import { BiMessage } from "react-icons/bi";
import { LuHeadphones } from "react-icons/lu";

const Navigation = () => {
  const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
  return (
    <nav>
      <div className="container">
        <div className="row navPart_pro">
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
                      <Button>
                        Thực phẩm <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Rau củ quả</Button>
                      </Link>
                      <Link to="/">
                        <Button>Thịt & Hải sản</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đồ đông lạnh</Button>
                      </Link>
                      <Link to="/">
                        <Button>Thực phẩm khô</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đồ hộp</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Đồ uống <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Nước giải khát</Button>
                      </Link>
                      <Link to="/">
                        <Button>Sữa & các sản phẩm từ sữa</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đồ uống có cồn</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Bánh kẹo & Đồ ăn nhẹ{" "}
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Bánh kẹo</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đồ ăn nhẹ</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Hóa mỹ phẩm <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Chăm sóc cá nhân</Button>
                      </Link>
                      <Link to="/">
                        <Button>Chăm sóc da</Button>
                      </Link>
                      <Link to="/">
                        <Button>Chăm sóc tóc</Button>
                      </Link>
                      <Link to="/">
                        <Button>Trang điểm</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Gia dụng & Đồ dùng nhà bếp{" "}
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Đồ dùng nhà bếp</Button>
                      </Link>
                      <Link to="/">
                        <Button>Thiết bị điện gia dụng</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đồ dùng dọn dẹp</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Gia vị <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Dầu ăn</Button>
                      </Link>
                      <Link to="/">
                        <Button>Nước chấm và nước mắm</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đường</Button>
                      </Link>
                      <Link to="/">
                        <Button>Nước tương (xì dầu)</Button>
                      </Link>
                      <Link to="/">
                        <Button>Hạt nêm</Button>
                      </Link>
                      <Link to="/">
                        <Button>Tương các loại</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Chăm sóc bé <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Sản phẩm cho bé</Button>
                      </Link>
                      <Link to="/">
                        <Button>Đồ chơi trẻ em</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Sách và văn phòng phẩm{" "}
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Sách</Button>
                      </Link>
                      <Link to="/">
                        <Button>Văn phòng phẩm</Button>
                      </Link>
                    </div>
                  </li>
                  <li>
                    <Link to="/">
                      <Button>
                        Sản phẩm vệ sinh nhà cửa{" "}
                        <FaAngleRight className="ml-auto" />
                      </Button>
                    </Link>
                    <div className="submenu">
                      <Link to="/">
                        <Button>Chất tẩy rửa</Button>
                      </Link>
                      <Link to="/">
                        <Button>Dụng cụ vệ sinh</Button>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="newsapaper">
            <ul>
              <li>
                <div className="newspaperItem">
                  <Link to="/">
                    <BiMessage />
                  </Link>
                  <span>Tin tức</span>
                </div>
              </li>
              <li>
                <div className="newspaperItem">
                  <Link to="#">
                    <LuHeadphones />
                  </Link>
                  <span>Chăm sóc khách hàng</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </nav>
  );
};

export default Navigation;
