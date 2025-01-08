import "./style.css";
import Mienphi from "../../assets/footer/Mienphigiaohang.png";
import Giaonhanh from "../../assets/footer/giaonhanh2h.png";
import bestseller from "../../assets/footer/bestseller.png";
import Docquyen from "../../assets/footer/Docquyen.png";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import Logo from "../../assets/footer/Logo.png";
import { TbBrandFacebook } from "react-icons/tb";
import { FiYoutube } from "react-icons/fi";

import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import CartPanel from "../CartPanel";

import { SiZalo } from "react-icons/si";
import { useContext } from "react";
import { MyContext } from "../../App";

const Footer = () => {
  const context = useContext(MyContext);

  return (
    <>
      <footer>
        <div className="container">
          <div className="topInfo row">
            <div className="col1 d-flex align-items-center footer-item">
              <img src={Mienphi} />
              <span>Miễn phí giao hàng từ 300.000đ</span>
            </div>
            <div className="col2 d-flex align-items-center footer-item">
              <img src={Giaonhanh} />
              <span>Giao hàng nhanh 2h</span>
            </div>
            <div className="col3 d-flex align-items-center footer-item">
              <img src={bestseller} />
              <span>Giá tốt nhất</span>
            </div>
            <div className="col4 d-flex align-items-center footer-item">
              <img src={Docquyen} />
              <span>Giá độc quyền hội viên</span>
            </div>
          </div>
          <div className="row mt-4 info">
            <div className="col d-flex align-items-center footer-info">
              <img src={Logo} />

              <span>
                <FaLocationDot className="text-sm text-red-500 mr-2" />
                Số 334 Nguyễn Trãi, Thanh Xuân, Hà Nội
              </span>
            </div>
            <div className="info-bot">
              <div className="col  footer-info">
                <h4>Về chúng tôi</h4>
                <ul>
                  <li>
                    <Link to="#">Giới thiệu về siêu thị</Link>
                  </li>
                  <li>
                    <Link to="#">Danh sách các cửa hàng</Link>
                  </li>
                  <li>
                    <Link to="#">Quản lý chất lượng</Link>
                  </li>
                  <li>
                    <Link to="#">Chính sách bảo mật</Link>
                  </li>
                  <li>
                    <Link to="#">Điều khoản và điều kiện giao dịch</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="info-bot">
              <div className="col  footer-info">
                <h4>Hỗ trợ khách hàng</h4>
                <ul>
                  <li>
                    <Link to="#">Trung tâm hỗ trợ khách hàng</Link>
                  </li>
                  <li>
                    <Link to="#">Chính sách giao hàng</Link>
                  </li>
                  <li>
                    <Link to="#">Chính sách thanh toán</Link>
                  </li>
                  <li>
                    <Link to="#">Chính sách đổi trả</Link>
                  </li>
                  <li>
                    <Link to="#">Đánh giá góp ý</Link>
                  </li>
                  <li>
                    <Link to="#">Danh sách trúng thưởng</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="info-bot">
              <div className="col  footer-info">
                <h4>Chăm sóc khác hàng</h4>
                <ul>
                  <li>
                    <a
                      href="tel:0123456789"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <MdLocalPhone
                        style={{ width: "1.25em", height: "1.25em" }}
                      />
                      : 0123456789
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:cskh@sieuthi.com"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <MdOutlineMailOutline
                        style={{ width: "1.25em", height: "1.25em" }}
                      />
                      : cskh@sieuthi.com
                    </a>
                  </li>
                </ul>
                <h4>Kết nối với chúng tôi</h4>
                <div className="social">
                  <Link to={"https://www.facebook.com/nguyen.ba.thonq"}>
                    <TbBrandFacebook className="bg-blue-500 text-white p-2 rounded-full text-2xl" />
                  </Link>
                  <Link to={"/"}>
                    <FiYoutube className="bg-red-500 text-white p-2 rounded-full text-2xl" />
                  </Link>
                  <Link to={"/"}>
                    <SiZalo className="bg-blue-500 text-white p-2 rounded-full text-2xl" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Panel */}

      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        anchor="right"
        className="w-[30em] cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b overflow-hidden">
          <h4 className="font-[600] text-lg uppercase">Giỏ hàng (1)</h4>
          <IoCloseSharp
            className="text-[1.5em] cursor-pointer"
            onClick={context.toggleCartPanel(false)}
          />
        </div>

        <CartPanel />
      </Drawer>
    </>
  );
};

export default Footer;
