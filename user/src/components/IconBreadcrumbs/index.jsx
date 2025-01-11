import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { TiHome } from "react-icons/ti";

import "./style.css";

export default function IconBreadcrumbs({ productName }) {
  return (
    <div className="breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <TiHome className="mr-1" />
          Trang chủ
        </Link>
        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          {productName} {/* Hiển thị tên sản phẩm */}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
