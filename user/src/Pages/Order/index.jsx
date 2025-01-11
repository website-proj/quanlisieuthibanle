import { FaRegUser } from "react-icons/fa";
import { TbFileSpreadsheet } from "react-icons/tb";
import { Link } from "react-router-dom";
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
import Header from "../../components/Header";

const Order = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ thanh toán", value: "pending-payment" },
    { label: "Chờ giao", value: "shipping" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  // Hàm gọi API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/API/order.json"); // Thay bằng URL API thực tế
      const data = await response.json();
      setOrders(data); // Gán dữ liệu từ API
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
      case "pending-payment":
        return orders.filter((order) => order.status === "Chờ thanh toán");
      case "shipping":
        return orders.filter((order) => order.status === "Đang giao");
      case "completed":
        return orders.filter(
          (order) => order.status === "Giao hàng thành công"
        );
      case "cancelled":
        return orders.filter((order) => order.status === "Đã hủy");
      default:
        return [];
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex mt-36 mb-4">
        {/* Sidebar */}
        <aside className="w-1/5 setting">
          <ul className="space-y-4  bg-white p-4 rounded-2xl shadow">
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
              className=" border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent  border-gray-900 shadow-none rounded-none",
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
                    filterOrders(value).map((order, index) => (
                      <div
                        className="flex flex-col  mb-4 p-4 rounded-xl border- shadow bg-white"
                        key={index}
                      >
                        {/* Trạng thái giao hàng */}
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

                        {/* Thông tin sản phẩm và giá */}
                        <div className="flex items-center justify-between w-full mb-2">
                          {/* Hình ảnh và thông tin sản phẩm */}
                          <div className="flex items-center w-3/5">
                            <img
                              src={order.product.image_url}
                              alt={order.product.name}
                              className="w-24 h-24 object-cover mr-4"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900 text-[1.1rem]">
                                {order.product.name}
                              </h3>
                              <p className="text-gray-600 mt-2 text-left">
                                Số lượng: {order.product.quantity}
                              </p>
                            </div>
                          </div>

                          {/* Thông tin giá */}
                          <div className="flex flex-col items-end">
                            <div>
                              <span className="line-through text-gray-400 text-sm mr-5">
                                {order.product.price_original.toLocaleString()}đ
                              </span>
                              <span className="text-red-500 font-semibold text-[1rem]">
                                {order.product.price_discounted.toLocaleString()}
                                đ
                              </span>
                            </div>

                            {/* Nút hành động */}
                            <button className="mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                              Mua lại
                            </button>
                          </div>
                        </div>
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
