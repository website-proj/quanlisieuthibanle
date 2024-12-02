import "./style.css";
import Mienphi from "../../assets/footer/Mienphigiaohang.jpg";
import Giaonhanh from "../../assets/footer/giaonhanh2h.png";
import bestseller from "../../assets/footer/bestseller.png";
import Docquyen from "../../assets/footer/Docquyen.png";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="topInfo row">
            <div className="col d-flex align-items-center footer-item">
              <img src={Mienphi} />
              <span>Miễn phí giao hàng từ 300.000đ</span>
            </div>
            <div className="col d-flex align-items-center footer-item">
              <img src={Giaonhanh} />
              <span>Giao hàng nhanh 2h</span>
            </div>
            <div className="col d-flex align-items-center footer-item">
              <img src={bestseller} />
              <span>Giá tốt nhất</span>
            </div>
            <div className="col d-flex align-items-center footer-item">
              <img src={Docquyen} />
              <span>Giá độc quyền hội viên</span>
            </div>
          </div>
          <div className="row mt-4 info">
            <div className="col d-flex align-items-center footer-item">
              <img src={Docquyen} />
              <span>Siêu thị bán lẻ</span>

              <p>
                <IoLocationOutline />
                Số 334 Nguyễn Trãi, Thanh Xuân, Hà Nội
              </p>
            </div>
            <div className="col  footer-info">
              <h5>Về chúng tôi</h5>
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

            <div className="col  footer-info">
              <h5>Hỗ trợ khách hàng</h5>
              <ul>
                <li>
                  <Link to="#">Trung tâm hỗ trợ khách hàng</Link>
                </li>
                <li>
                  <Link to="#">Chính sách giao hàng</Link>
                </li>
                <li>
                  <Link to="#">CHính sách thanh toán</Link>
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
            <div className="col  footer-info">
              <h5>Chăm sóc khác hàng</h5>
              <ul>
                <li>
                  <Link to="#">
                    <MdLocalPhone />: 0123456789
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <MdOutlineMailOutline />: cskh@sieuthi.com
                  </Link>
                </li>
              </ul>
              <h5>Kết nối với chúng tôi</h5>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
