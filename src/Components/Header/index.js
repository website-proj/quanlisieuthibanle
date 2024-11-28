import Logo from "../../assets/imgages/Logo.jpg";
import { Link } from "react-router-dom";
import CountryDropdown from "../CountryDropdown";
import Button from "@mui/material/Button";
import { FiUser } from "react-icons/fi";
import { PiShoppingCart } from "react-icons/pi";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
// import { useContext } from "react";

const Header = () => {
  // const context = useContext(MyContex);

  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Tươi ngon mỗi ngày, an tâm mỗi phút
            </p>
          </div>
        </div>
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper align-items-center col-sm-2">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>

              <div className="col-sm-10 d-flex align-items-center part2">
                {/* {context.countryList.length !== 0 && <CountryDropdown />} */}

                <CountryDropdown />
                <SearchBox />

                <div className="part3 d-flex align-items-center ml-auto">
                  <Button className="circle mr-3">
                    <FiUser />
                  </Button>
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <div className="position-relative ml-2">
                      <Button className="circle ml-2">
                        <PiShoppingCart />
                      </Button>
                      <span className="count d-flex align-items-center justify-content-center">
                        1
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Navigation />
      </div>
    </>
  );
};

export default Header;
