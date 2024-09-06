import "../../css/searchFilter.css"
import {useState} from "react";
function PriceFilter({ isVisible, onClose }) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const minRange = 0;
    const maxRange = 100000;

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };
    const handleChange = () => {

        setMinValue(0);
        setMaxValue(0);

    }
    if (!isVisible) return null;

    return (
        <>
            <div className="price-filter-overlay">
            <div className="price-filter-container">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="range-slider-container">
                <h3>Mức giá</h3>
                <div className="inputs-container">
                    <div>
                        <label>Từ:</label>
                        <input
                            type="number"
                            value={minValue}
                            onChange={handleMinChange}
                            min={minRange}
                            max={maxRange}
                        />
                    </div>
                    <div>
                        <label>Đến: </label>
                        <input
                            type="number"
                            value={maxValue}
                            onChange={handleMaxChange}
                            min={minRange}
                            max={maxRange}
                        />
                    </div>
                </div>
                <div className="slider">
                    <input
                        type="range"
                        min={minRange}
                        max={maxRange}
                        value={minValue}
                        onChange={handleMinChange}
                        className="thumb thumb-left"
                        style={{ zIndex: minValue > maxRange - 100 ? '5' : '' }}
                    />
                    <input
                        type="range"
                        min={minRange}
                        max={maxRange}
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="thumb thumb-right"
                    />
                    <div className="slider-track"></div>
                    <div className="slider-range" style={{ left: `${(minValue / maxRange) * 100}%`, right: `${100 - (maxValue / maxRange) * 100}%` }}></div>
                </div>
            </div>
                <ul className="price-options">
                    <li><input type="radio" name="price" /> Tất cả mức giá</li>
                    <li><input type="radio" name="price" /> Dưới 500 triệu</li>
                    <li><input type="radio" name="price" /> 500 - 800 triệu</li>
                    <li><input type="radio" name="price" /> 800 triệu - 1 tỷ</li>
                    <li><input type="radio" name="price" /> 1 - 2 tỷ</li>
                </ul>
                <button className="apply-button" onClick={handleChange} >Đặt lại</button>
                <button className="apply-button">Áp dụng</button>
            </div>
            </div>
</>
    );
}
export default PriceFilter;