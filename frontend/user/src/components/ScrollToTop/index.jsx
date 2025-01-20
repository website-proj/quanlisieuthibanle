import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [pathname]);

  return null; // Thành phần này không cần render gì
}

export default ScrollToTop;
