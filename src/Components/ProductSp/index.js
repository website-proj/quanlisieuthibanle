import { Button } from "bootstrap";

const ProductSp = () => {
  return (
    <>
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
    </>
  );
};

export default ProductSp;
