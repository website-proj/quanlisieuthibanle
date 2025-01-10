import React, { useEffect, useState } from "react";
import IconBreadcrumbs from "../../components/IconBreadcrumbs";
import ProductCard from "../../components/ProdcutCard";
import Reviews from "../../components/Reviews";
import axios from "axios";
import { BsCart4 } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";
import { useLocation } from "react-router-dom";

// import required modules
import { Navigation } from "swiper/modules";
import ScrollToTopButton from "../../components/ScrollTop";
import { Button } from "@mui/material";

const Product_Details = () => {
  const location = useLocation();
  const product = location.state; // Lấy thông tin sản phẩm từ state

  const [relatedProducts, setRelatedProducts] = useState([]);

  // Gọi API để lấy danh sách sản phẩm liên quan
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get("/API/products.json");
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
      }
    };

    fetchRelatedProducts();
  }, []);
  if (!product) {
    // Nếu không có thông tin sản phẩm, có thể chuyển hướng hoặc thông báo lỗi
    return <div>Thông tin sản phẩm không tồn tại!</div>;
  }

  const description = `Sữa chua không đường Vinamilk hộp 100g.

Sữa chua không đường Vinamilk là sản phẩm luôn đồng hành cùng bạn nếu bạn đang ăn kiêng và quan tâm giữ gìn vóc dáng. Với các chất dinh dưỡng thiết yếu, Sữa chua không đường Vinamilk đảm bảo nguồn năng lượng cho bạn mà không phải lo dư lượng đường trong cơ thể. Sản phẩm được sản xuất theo quy trình công nghệ tiên tiến theo quy chuẩn thế giới của Công ty CP Sữa Việt Nam Vinamilk nên luôn nhận được sự tin tưởng và yêu thích của người tiêu dùng.

Sữa chua không đường Vinamilk được đóng hộp nhỏ gọn, tiện dụng cho bạn sử dụng cũng như bảo quản lâu dài trong ngăn tủ lạnh gia đình. Sản phẩm do VinMart phân phối luôn mang đến chất lượng tốt nhất cho người tiêu dùng.
`;

  const sentences = description
    .split(".")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);

  return (
    <>
      {" "}
      <div className="mt-36">
        <IconBreadcrumbs />
        <div className="container mx-auto p-4">
          <ProductCard className="mr-[6%]" />

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5  ml-[3%] mr-[3%]">
            <div className="mota ">
              {" "}
              {/* Thêm margin vào div chứa mô tả */}
              <div className="flex flex-col mt-5 mb-5">
                <h3 className="text-lg font-bold text-black text-left text-shadow text_describe ml-[1em] shadow-text">
                  Mô tả sản phẩm
                </h3>
              </div>
              <div className=" border bg-[#ffffff] rounded-lg p-4 shadow-lg ml-[1%] h-[90.5%]">
                <div className="text-left text-black">
                  {sentences.map((sentence, index) => (
                    <p key={index} className="mb-2">
                      {sentence}.
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Reviews />
            </div>
          </div>

          <div className="flex flex-col ml-[4%] mr-[5%] mt-5 mb-5">
            <h3 className="text-lg font-bold text-black text-left text-shadow text_describe shadow-text">
              Sản phẩm liên quan
            </h3>
          </div>

          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper relatedPro "
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="relatedPro_item border rounded-lg p-4 shadow w-full transition-transform duration-300  hover:border-blue-500 hover:shadow-xl">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-t-lg w-full"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded">
                        {product.discount}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 text-left">
                    <h4 className="text-base font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-500">ĐVT: {product.unit}</p>

                    {/* Hiển thị giá sản phẩm và giá cũ */}
                    <div className="flex items-center justify-between mt-2 space-x-2">
                      <span className="text-red-500 text-base font-bold">
                        {product.price.toLocaleString()}đ
                      </span>
                      {product.old_price && (
                        <span className="line-through text-sm text-gray-400 mr-6">
                          {product.old_price.toLocaleString()}đ
                        </span>
                      )}
                    </div>

                    <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center">
                      <BsCart4 className="text-2xl mr-4" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Product_Details;
