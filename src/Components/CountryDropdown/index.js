import React from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import Dialog from "@mui/material/Dialog";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <>
      <Button className="countryDrop" onClick={() => setisOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="lable">Vị trí</span>
          <span className="name">Hà Nội</span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog
        open={isOpenModal}
        onClose={() => setisOpenModal(false)}
        className="locationModal"
        TransitionComponent={Transition}
      >
        <h4 className="mb-0">Nhập địa chỉ của bạn</h4>
        <p>Để chúng tôi cung cấp ưu đãi phù hợp với khu vực của bạn.</p>
        <Button className="close_" onClick={() => setisOpenModal(false)}>
          <MdClose />
        </Button>

        <div className="headerSearch w-100">
          <input type="text" placeholder="Nhập vị trí của bạn ..." />
          <Button>
            <IoSearch />
          </Button>
        </div>
        <ul className="countryList mt-3">
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hà Nội</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hải Dương</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hải Phòng</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hưng Yên</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Thái Bình</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Nam Định</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Ninh Bình</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bắc Giang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bắc Ninh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Phú Thọ</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Cao Bằng</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Lạng Sơn</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Quảng Ninh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hà Giang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Tuyên Quang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Lào Cai</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Yên Bái</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Điện Biên</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Sơn La</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Lai Châu</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Thái Nguyên</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Vĩnh Phúc</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Thanh Hóa</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Nghệ An</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hà Tĩnh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Quảng Bình</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Quảng Trị</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>
              Thừa Thiên Huế
            </Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Đà Nẵng</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Quảng Nam</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Quảng Ngãi</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bình Định</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Phú Yên</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Khánh Hòa</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Ninh Thuận</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bình Thuận</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Kon Tum</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Gia Lai</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Đắk Lắk</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Đắk Nông</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Lâm Đồng</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bình Dương</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bình Phước</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Tây Ninh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Đồng Nai</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>
              Bà Rịa - Vũng Tàu
            </Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hồ Chí Minh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Long An</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Tiền Giang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bến Tre</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Trà Vinh</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Vĩnh Long</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Đồng Tháp</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>An Giang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Kiên Giang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Cần Thơ</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Hậu Giang</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Sóc Trăng</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Bạc Liêu</Button>
          </li>
          <li>
            <Button onClick={() => setisOpenModal(false)}>Cà Mau</Button>
          </li>
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
