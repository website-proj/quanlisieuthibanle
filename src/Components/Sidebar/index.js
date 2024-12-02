import "./style.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";
const Silebar = () => {
  const [value, setValue] = useState([20000, 60000000]);
  const [value2, setValue2] = useState(0);

  return (
    <>
      <div className="sidebar">
        <div className="filterBox">
          <h6>SỮA CÁC LOẠI</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>

              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa bột"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa đặc"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa chua"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="filterBox">
          <h6>LỌC THEO GIÁ</h6>

          <RangeSlider
            value={value}
            onInput={setValue}
            min={20000}
            max={6000000}
            step={10000}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              Từ: <strong className="text-dark"> {value[0]}</strong>
            </span>
            <span className="ml-auto">
              Đến: <strong className="text-dark"> {value[1]}</strong>
            </span>
          </div>
        </div>

        <div className="filterBox">
          <h6>THƯƠNG HIỆU</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa tươi"
                />
              </li>

              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa bột"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa đặc"
                />
              </li>
              <li>
                <FormControlLabel
                  className="w-100"
                  control={<Checkbox />}
                  label="Sữa chua"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Silebar;
