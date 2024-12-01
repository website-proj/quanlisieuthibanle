import Button from "@mui/material/Button";
import HomeBanner from "../../Components/HomeBanner";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Timer from "../../Components/Timer";
import banner2 from "../../assets/imgages/banner2.jpg";

const Home = () => {
  var productSliderOptions = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <HomeBanner />

      <Timer duration={2 * 24 * 60 * 60 * 1000} />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="banner">
                <img
                  src="https://res.cloudinary.com/dkgonwhvj/image/upload/v1731428345/1731428343183_New_Project_35.jpg"
                  className="cursor w-100"
                />
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Giảm giá</h3>
                  <p className="text-light text-sml mb-0">
                    Đừng bỏ lỡ ưu đãi cho đến cuối năm.
                  </p>
                </div>
              </div>

              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={15}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/07/blockwarp_probi_vq_65ml_0001-20240717072954.png"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/07/hu-sca-100g0024-20240717065924.png"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2022/162427267592210625162-g4-thung-48-hop-sua-tuoi-tiet-trung-vinamilk-cu-duong-180ml-og.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                        </div>
                        <Button className="add-item-card ">
                          <span>Thêm vào giỏ hàng</span>
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2023/02/tao-envy-new-tui-1kg.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="banner">
                <img src={banner2} className="cursor w-100" />
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Bán chạy nhất</h3>
                  <p className="text-light text-sml mb-0">
                    Đừng bỏ lỡ ưu đãi cho đến cuối năm.
                  </p>
                </div>
              </div>

              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={15}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/07/blockwarp_probi_vq_65ml_0001-20240717072954.png"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/07/hu-sca-100g0024-20240717065924.png"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2022/162427267592210625162-g4-thung-48-hop-sua-tuoi-tiet-trung-vinamilk-cu-duong-180ml-og.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                        </div>
                        <Button className="add-item-card ">
                          <span>Thêm vào giỏ hàng</span>
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2023/02/tao-envy-new-tui-1kg.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 productRow">
              <div className="product_row w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={15}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/07/blockwarp_probi_vq_65ml_0001-20240717072954.png"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/11/10005245-20241109105624.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2024/07/hu-sca-100g0024-20240717065924.png"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                          <Button className="add-item-card ">
                            <span>Thêm vào giỏ hàng</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="item productItem">
                      <div className="pro">
                        <div className="imgWrapper">
                          <img
                            src="https://hcm.fstorage.vn/images/2022/162427267592210625162-g4-thung-48-hop-sua-tuoi-tiet-trung-vinamilk-cu-duong-180ml-og.jpg"
                            className="w-100"
                          />
                        </div>
                        <div className="info">
                          <h4>Sữa chua nha đam Vinamilk hộp 100g * 4</h4>
                          <p>ĐVT: 4 hộp </p>

                          <div className="d-flex">
                            <span>28.000đ</span>
                          </div>
                        </div>
                        <Button className="add-item-card ">
                          <span>Thêm vào giỏ hàng</span>
                        </Button>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
