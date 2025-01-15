import React, { useEffect, useState } from "react";
import "./style.css";
import InvoiceForm from "../../components/InvoiceForm";
import PaymentMethod from "../../components/PaymentMethod";
import { Link } from "react-router-dom";
import axios from "axios";
import SummaryApi, { baseURL } from "../../common/SummaryApi";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Payment = () => {
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("COD");
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    state: "",
    district: "",
    ward: "",
    street: "",
    house_number: "",
    payment_method: selectedMethod,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    formData.username &&
    formData.phone_number &&
    selectedCity &&
    selectedDistrict &&
    formData.ward &&
    formData.house_number;

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts);
          setWards([]);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((response) => {
          setWards(response.data.wards);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
        });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      payment_method: selectedMethod,
    }));
  }, [selectedMethod]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      if (!token) {
        setSnackbarMessage("Vui lòng đăng nhập để tiếp tục.");
        setSnackbarSeverity("warning");
        navigate("/signIn"); // Chuyển hướng đến trang đăng nhập
        return;
      }

      const paymentData = {
        username: formData.username,
        phone_number: formData.phone_number,
        state: formData.state,
        district: formData.district,
        ward: formData.ward,
        street: formData.street,
        house_number: formData.house_number,
        payment_method: selectedMethod,
      };

      const paymentUrl = `${baseURL}${SummaryApi.payment.url}`;
      console.log("Payment URL:", paymentUrl);

      const response = await axios.post(paymentUrl, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.message === "successful") {
        setSnackbarMessage("Thanh toán thành công!");
        setSnackbarSeverity("success");

        // Xử lý dữ liệu từ API
        const orderData = response.data.data;
        const [orderKey] = Object.keys(orderData);
        const orderDetails = orderData[orderKey];

        const successState = {
          products: orderDetails.product,
          paymentMethod: orderDetails.payment_method,
          totalAmount: orderDetails.amount,
          date: orderDetails.date,
        };

        // Chuyển hướng với state
        navigate("/success", { state: successState });
      } else {
        setSnackbarMessage("Thanh toán không thành công. Vui lòng thử lại.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response?.data || error.message
      );
      setSnackbarMessage(
        "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
      );
      setSnackbarSeverity("error");
    }
  };

  const [billData, setBillData] = useState(null);

  useEffect(() => {
    // Gọi API lấy thông tin hóa đơn
    const fetchBillData = async () => {
      try {
        const token = localStorage.getItem("token")?.split(" ")[1];
        if (!token) {
          alert("Vui lòng đăng nhập để tiếp tục.");
          return;
        }

        const response = await axios.get(
          `${baseURL}${SummaryApi.get_bill.url}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBillData(response.data);
      } catch (error) {
        console.error("Error fetching bill data:", error);
      }
    };

    fetchBillData();
  }, []);

  // Tính tổng số tiền, phí vận chuyển, khuyến mại
  const calculateTotal = () => {
    if (!billData) return { total: 0, shipping: 0, discount: 0, finalTotal: 0 };

    let total = 0;
    let discount = 0;
    let actuallyPaid = 0;

    for (const cartId in billData) {
      const cart = billData[cartId];
      total += cart.total || 0; // Nếu `cart.total` là undefined, dùng 0
      discount += cart.discount || 0;
      actuallyPaid += cart["actually paid"] || 0;
    }

    return {
      total,
      shipping: 0, // Giả sử phí vận chuyển là 0
      discount,
      finalTotal: actuallyPaid, // Tổng thanh toán thực tế
    };
  };

  const { total, shipping, discount, finalTotal } = calculateTotal();
  const formatCurrency = (value) =>
    typeof value === "number" ? value.toLocaleString("vi-VN") + "đ" : "0đ";

  return (
    <>
      {snackbarMessage && (
        <Alert
          onClose={() => setSnackbarMessage("")}
          severity={snackbarSeverity}
          sx={{
            width: "auto",
            borderRadius: "20px",
            position: "fixed", // Đặt vị trí cố định
            top: "20px", // Khoảng cách từ trên xuống
            right: "20px", // Khoảng cách từ bên phải sang
            zIndex: 9999, // Đảm bảo Alert luôn hiển thị trên các phần tử khác
          }}
        >
          {snackbarMessage}
        </Alert>
      )}

      <section className="mt-36 mb-2">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-[600] text-center mb-6 shadow-text">
            Thanh toán
          </h1>
          <div className="flex items-center justify-between w-full max-w-4xl">
            <div className="flex items-center w-full">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-red-300 text-white font-bold">
                  ✓
                </div>
              </div>
              <div className="flex-grow border-t-4 border-red-300 mx-2"></div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-grow border-t-4 border-blue-500 mx-2"></div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-400 text-white font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-lg p-6 rounded-lg ml-[5%] mr-[5%] mx-auto mt-5 mb-5 bg-white">
          <h2 className="text-lg font-[600] mb-6 text-left">
            Thông tin đặt hàng
          </h2>
          <form className="space-y-4">
            {/* Họ tên người nhận */}
            <div className="flex items-center">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-left w-1/4"
              >
                Họ tên người nhận <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập họ tên người nhận"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            {/* Số điện thoại */}
            <div className="flex items-center">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-left w-1/4"
              >
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập số điện thoại"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            {/* Tỉnh / Thành phố */}
            <div className="flex items-center">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-left w-1/4"
              >
                Tỉnh / Thành phố <span className="text-red-500">*</span>
              </label>
              <select
                id="city"
                name="state"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value="">Chọn Tỉnh / Thành phố</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Quận / Huyện */}
            <div className="flex items-center">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-left w-1/4"
              >
                Quận / Huyện <span className="text-red-500">*</span>
              </label>
              <select
                id="district"
                name="district"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
                disabled={!selectedCity}
              >
                <option value="">Chọn Quận / Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Phường / Xã */}
            <div className="flex items-center">
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-left w-1/4"
              >
                Phường / Xã <span className="text-red-500">*</span>
              </label>
              <select
                id="ward"
                name="ward"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                value={formData.ward}
                onChange={handleChange}
                required
                disabled={!selectedDistrict}
              >
                <option value="">Chọn Phường / Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Đường */}
            <div className="flex items-center">
              <label
                htmlFor="Streeet"
                className="block text-sm font-medium text-left w-1/4"
              >
                Đường <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                id="street"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập đường"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            {/* Số nhà */}
            <div className="flex items-center">
              <label
                htmlFor="house_number"
                className="block text-sm font-medium text-left w-1/4"
              >
                Số nhà <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="house_number"
                id="house_number"
                className="w-3/4 border border-gray-300 rounded-md p-2"
                placeholder="Nhập số nhà"
                value={formData.house_number}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <InvoiceForm />

          {/* Form thanh toán */}
          <PaymentMethod
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />

          {/* Tổng tiền và nút Đặt hàng */}
          <div className="mt-8 p-6 rounded-lg bg-white flex flex-col items-end">
            <div className="w-full">
              <table className="w-full text-right mb-6 border-separate border-spacing-y-2">
                <tbody>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-base text-black text-left w-[20%]">
                      Tổng tiền hàng
                    </td>
                    <td className="text-base font-semibold w-[20%]">
                      {formatCurrency(total)}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-base text-black text-left w-[20%]">
                      Phí vận chuyển
                    </td>
                    <td className="text-base font-semibold w-[20%]">
                      {formatCurrency(shipping)}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-base text-black text-left w-[20%]">
                      Khuyến mại
                    </td>
                    <td className="text-base text-red-600 font-semibold w-[20%]">
                      {formatCurrency(discount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[60%]"></td>
                    <td className="text-lg font-semibold text-left w-[20%]">
                      Tổng thanh toán
                    </td>
                    <td className="text-lg text-red-600 font-semibold w-[20%]">
                      {formatCurrency(finalTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={handlePayment}
              disabled={!isFormValid}
              className={`w-full py-2 px-4 ${
                isFormValid
                  ? "bg-red-400 hover:bg-red-500"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white rounded-md transition duration-200`}
            >
              Đặt hàng
            </button>
            <p className="text-gray-500 text-sm mt-4 text-left">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân thủ theo điều
              khoản của chúng tôi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
