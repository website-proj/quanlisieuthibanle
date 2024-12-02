import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Products from "./Pages/Products";
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// const MyContext = createContext();

function App() {
  // const [countryList, setCountryList] = useState([]);

  // useEffect(() => {
  //   getCountry("https://provinces.open-api.vn/ ");
  // }, []);

  // const getCountry = async (url) => {
  //   const responsive = await axios.get(url).then((res) => {
  //     setCountryList(res.data.data.country);
  //     console.log(res.data.data.country);
  //   });
  // };

  // const values = {
  //   countryList,
  // };

  return (
    <BrowserRouter>
      {/* <MyContext.Provider value={values}> */}
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/cat/:id" exact={true} element={<Products />} />
      </Routes>
      <Footer />
      {/* </MyContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;

// export { MyContext };
