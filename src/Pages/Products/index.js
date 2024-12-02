import Navigationsale from "../../Components/Navigation/Navigation_pro";
import "./style.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";

import Pro_Fillter from "../../Components/Pro_Fillter";
import ProductItem from "../../Components/ProductItem";
import { Navigation } from "swiper/modules";

const Products = () => {
  return (
    <>
      <Navigationsale />

      <section className="product_listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar />

            <div className="content_right ">
              <ul className="showBy mt-3 mb-3 d-flex align-center">
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
              </ul>

              <Pro_Fillter />
              <Pro_Fillter />
            </div>
          </div>

          <div className="bestSeller">
            <span className="best">Sản phẩm nổi bật</span>
          </div>
          <ProductItem />
        </div>
      </section>
    </>
  );
};

export default Products;
