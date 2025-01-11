import "./App.css";
import "./index.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Product_Details from "./Pages/Product_Details";
import Account from "./Pages/Account";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import { createContext, useState, useEffect } from "react";
import SignUp from "./Pages/SignUp";
import Verify from "./Pages/Verify";
import Success from "./Pages/Success";
import ForgotPassword from "./Pages/ForgotPassword";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";
import { CartProvider } from "./Context/CartContext";

const MyContext = createContext();

function App() {
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
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
          />
        </MyContext.Provider>
      </BrowserRouter>
    </CartProvider>
  );
}

function HeaderFooterWrapper({ isHeaderFooterShow, setisHeaderFooterShow }) {
  const location = useLocation(); // Chuyển useLocation vào đúng Router context

  useEffect(() => {
    const hiddenPaths = [
      "/signIn",
      "/signUp",
      "/verify",
      "/success",
      "/forgotPassword",
    ];
    if (hiddenPaths.includes(location.pathname)) {
      setisHeaderFooterShow(false); // Ẩn header và footer
    } else {
      setisHeaderFooterShow(true); // Hiển thị header và footer
    }
  }, [location.pathname]);

  return (
    <>
      {isHeaderFooterShow && <Header />}
      <Routes>
        <Route path={"/"} exact={true} element={<Home />} />
        <Route
          path="/products/:categoryName"
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
        <Route path="/verify" exact={true} element={<Verify />} />
        <Route path="/success" exact={true} element={<Success />} />
        <Route path="/order" exact={true} element={<Order />} />
        <Route
          path="/forgotPassword"
          exact={true}
          element={<ForgotPassword />}
        />
      </Routes>
      {isHeaderFooterShow && <Footer />}
    </>
  );
}

export default App;

export { MyContext };
