import "./App.css";
import React, { createContext, useState, useEffect } from "react";
import "./index.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./Context/CartContext";

// Import trực tiếp các trang
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Product_Details from "./Pages/Product_Details";
import Account from "./Pages/Account";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Verify from "./Pages/Verify";
import Success from "./Pages/Success";
import ForgotPassword from "./Pages/ForgotPassword";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";
import ResetPassword from "./Pages/ResetPassword";
import VerifyDK from "./Pages/VerifyDK";

const MyContext = createContext();

function App() {
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isRendered, setIsRendered] = useState(true); // Trạng thái render thực tế
  const [isLogin, setIsLogin] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  const values = {
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setIsLogin,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <HeaderFooterWrapper
            isHeaderFooterShow={isHeaderFooterShow}
            setisHeaderFooterShow={setisHeaderFooterShow}
            isRendered={isRendered}
            setIsRendered={setIsRendered}
          />
        </MyContext.Provider>
      </BrowserRouter>
    </CartProvider>
  );
}

function HeaderFooterWrapper({ setisHeaderFooterShow }) {
  const location = useLocation();

  // Xác định trạng thái ban đầu của header/footer
  const shouldHideHeader = (path) => {
    const hiddenPaths = [
      "/signIn",
      "/signUp",
      "/verify",
      "/forgotPassword",
      "/resetPassword",
      "/otp",
    ];
    return hiddenPaths.includes(path);
  };

  // Cập nhật trạng thái ban đầu
  useEffect(() => {
    const hideHeader = shouldHideHeader(location.pathname);
    setisHeaderFooterShow(!hideHeader);
  }, [location.pathname, setisHeaderFooterShow]);

  // Đảm bảo trạng thái ban đầu khớp với `location.pathname`
  const hideHeaderInitially = shouldHideHeader(location.pathname);

  return (
    <>
      {/* Header và Footer chỉ render nếu không bị ẩn */}
      {!hideHeaderInitially && <Header />}
      <Routes>
        <Route path={"/home"} exact={true} element={<Home />} />
        <Route path="/" element={<Navigate to="/signIn" replace />} />
        <Route
          path="/products/:categoryName"
          exact={true}
          element={<Product />}
        />
        <Route
          path="/products/:categoryName/:subCategory"
          exact={true}
          element={<Product />}
        />
        <Route path="/Account" exact={true} element={<Account />} />
        <Route
          path="/product_detials/:id"
          exact={true}
          element={<Product_Details />}
        />
        <Route path={"/cart"} exact={true} element={<Cart />} />
        <Route path={"/payment"} exact={true} element={<Payment />} />
        <Route path="/signIn" exact={true} element={<SignIn />} />
        <Route path="/signUp" exact={true} element={<SignUp />} />
        <Route path="/resetPassword" exact={true} element={<ResetPassword />} />
        <Route path="/verify" exact={true} element={<Verify />} />
        <Route path="/otp" exact={true} element={<VerifyDK />} />
        <Route path="/success" exact={true} element={<Success />} />
        <Route path="/order" exact={true} element={<Order />} />
        <Route
          path="/forgotPassword"
          exact={true}
          element={<ForgotPassword />}
        />
      </Routes>
      {!hideHeaderInitially && <Footer />}
    </>
  );
}

export default App;
export { MyContext };
