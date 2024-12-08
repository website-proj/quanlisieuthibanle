import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product_Details from "./Pages/Product_Details";
import Account from "./Pages/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} exact={true} element={<Home />} />
          <Route path="/products" exact={true} element={<Product />} />
          <Route path="/Account" exact={true} element={<Account />} />
          <Route
            path="/product_detials/:id"
            exact={true}
            element={<Product_Details />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
