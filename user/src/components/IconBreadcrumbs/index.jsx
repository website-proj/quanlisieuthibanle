// import * as React from "react";
// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import { TiHome } from "react-icons/ti";
// import { MdOutlineGrain } from "react-icons/md";
// import "./style.css";

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

// export default function IconBreadcrumbs({ productName }) {
//   return (
//     <div className="breadcrumbs" role="presentation" onClick={handleClick}>
//       <Breadcrumbs aria-label="breadcrumb">
//         <Link
//           underline="hover"
//           sx={{ display: "flex", alignItems: "center" }}
//           color="inherit"
//           href="/"
//         >
//           <TiHome sx={{ mr: 0.5 }} fontSize="inherit" />
//           Trang chủ
//         </Link>
//         <Typography
//           sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
//         >
//           {/* <MdOutlineGrain sx={{ mr: 0.5 }} fontSize="inherit" /> */}
//           {/* {productName} */} Sữa chua nha đam Vinamilk hộp 100g * 4
//         </Typography>
//       </Breadcrumbs>
//     </div>
//   );
// }

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
          <TiHome sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </Link>
        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          {/* <MdOutlineGrain sx={{ mr: 0.5 }} fontSize="inherit" /> */}
          {/* {productName} */} Sữa chua nha đam Vinamilk hộp 100g * 4
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
