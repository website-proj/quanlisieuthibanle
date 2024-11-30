import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/header/Header';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductsList from './pages/Products/ProductsList';
import AddProducts from './pages/Products/AddProducts';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList'; 
import AddCategories from './pages/Categories/AddCategories/AddCategories';
import SubcategoriesList from './pages/Categories/SubcategoriesList/SubcategoriesList';
import AddSubcategories from './pages/Categories/AddSubcategories/AddSubcategories';



function App() {
  return (
    <Router> 
      <div className="App">
        <Header />
        <Sidebar />
        {/* <div className="content-wrapper"> */}
          <Routes> 
            <Route path="/" element={<Navigate to="/dashboard" />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/categories-list" element={<CategoriesList />} />
            <Route path="/add-categories" element={<AddCategories />} />
            <Route path="/subcategories-list" element={<SubcategoriesList/>} />
            <Route path="/add-subcategories" element={<AddSubcategories/>} />

          </Routes>
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
