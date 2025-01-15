import { FaRegUser } from "react-icons/fa";
import { TbFileSpreadsheet } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import "./style.css";
import { Button } from "@mui/material";
import SummaryApi, { baseURL } from "../../common/SummaryApi";

const Order = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: "Tất cả", value: "all" },
    { label: "Đang giao", value: "Processing" },
    { label: "Hoàn thành", value: "Delivered" },
    { label: "Đã hủy", value: "Canceled" },
  ];

  // Hàm gọi API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")?.split(" ")[1];
      if (!token) {
        setSnackbarMessage("Vui lòng đăng nhập để tiếp tục.");
        setSnackbarSeverity("warning");
        navigate("/signIn"); // Chuyển hướng đến trang đăng nhập
        return;
      }
      const response = await fetch(`${baseURL}${SummaryApi.order.url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Nếu cần token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Chuyển đổi dữ liệu API về cấu trúc cần thiết
      const formattedOrders = Object.entries(result.data).map(
        ([orderId, orderData]) => ({
          id: orderId,
          status: orderData.order_status,
          products: orderData.product.map((product) => ({
            name: product.name,
            image_url: product.image,
            quantity: product.stock_quantity,
            price_original: product.old_price,
            price_discounted: product.price,
          })),
        })
      );

      setOrders(formattedOrders); // Gán dữ liệu đã định dạng
      setFilteredOrders(formattedOrders); // Gán đơn hàng đã lọc ban đầu
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Lọc đơn hàng theo trạng thái
  const filterOrders = (statusKey) => {
    switch (statusKey) {
      case "all":
        return orders;

      case "Processing":
        return orders.filter((order) =>
          ["Đang giao", "Processing"].includes(order.status)
        );

      case "Delivered":
        return orders.filter(
          (order) => order.status === "Giao hàng thành công"
        );

      case "Canceled":
        return orders.filter((order) => order.status === "Đã hủy");
      default:
        return [];
    }
  };

  // Cập nhật bộ lọc khi chuyển tab
  useEffect(() => {
    setFilteredOrders(filterOrders(activeTab));
  }, [activeTab, orders]); // Khi activeTab thay đổi hoặc orders thay đổi
  const navigate = useNavigate();

  const handleBuyAgain = (productId) => {
    navigate(`/product_detials/${productId}`);
  };

  return (
    <>
      <div className="min-h-screen flex mt-36 mb-4">
        {/* Sidebar */}
        <aside className="w-1/5 setting">
          <ul className="space-y-4 bg-white p-4 rounded-2xl shadow">
            <li>
              <Link
                to="/Account"
                className="flex items-center text-black-800 font-[1.5em]"
              >
                <FaRegUser className="mr-2 text-white bg-blue-500 rounded-full p-2 text-[2em]" />
                Tài khoản
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center text-black-800 font-[1.5em]"
              >
                <TbFileSpreadsheet className="mr-2 text-white bg-blue-500 rounded-full p-2 text-[2em]" />
                <span className="text-blue-500">Quản lý đơn hàng</span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="w-4/5 mr-[5%]">
          <Tabs value={activeTab} className="tabs_">
            <TabsHeader
              className="border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-gray-900 shadow-none rounded-none",
              }}
            >
              {tabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={`${
                    activeTab === value
                      ? "text-white font-[600] border-b-2 border-gray-900"
                      : "text-gray-900"
                  } cursor-pointer transition-all duration-300 ease-in-out hover:border-b-2 hover:border-gray-900`}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabs.map(({ value }) => (
                <TabPanel key={value} value={value}>
                  {loading ? (
                    <p>Đang tải...</p>
                  ) : (
                    filteredOrders.map((order, index) => (
                      <div
                        className="flex flex-col mb-4 p-4 rounded-xl border- shadow bg-white"
                        key={index}
                      >
                        <div className="mb-2 border-b border-gray-300 pb-2 flex justify-between items-center">
                          <span className="text-blue-500 font-medium text-sm">
                            {order.status}
                          </span>
                          <span
                            className={`${
                              order.status === "Giao hàng thành công"
                                ? "text-green-600"
                                : order.status === "Đang giao"
                                ? "text-yellow-500"
                                : order.status === "Đã hủy"
                                ? "text-red-500"
                                : "text-gray-600"
                            } font-medium text-sm italic`}
                          >
                            {order.status === "Giao hàng thành công"
                              ? "Hoàn thành"
                              : order.status === "Đang giao"
                              ? "Chờ giao"
                              : order.status === "Đã hủy"
                              ? "Đã hủy"
                              : "Chưa hoàn thành"}
                          </span>
                        </div>
                        {order.products.map((product, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between w-full mb-2"
                          >
                            <div className="flex items-center w-3/5">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-24 h-24 object-cover mr-4"
                              />
                              <div>
                                <h3 className="font-medium text-gray-900 text-[1.1rem]">
                                  {product.name}
                                </h3>
                                {/* <p className="text-gray-600 mt-2 text-left">
                                  Số lượng: {product.quantity}
                                </p> */}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div>
                                {/* <span className="line-through text-gray-400 text-sm mr-5">
                                  {product.price_original.toLocaleString()}đ
                                </span> */}
                                <span className="text-red-500 font-semibold text-[1rem]">
                                  {product.price_discounted.toLocaleString()}đ
                                </span>
                              </div>
                              <button
                                onClick={() => handleBuyAgain(product.id)}
                                className="btn-buy-again"
                              >
                                Mua lại
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Order;
