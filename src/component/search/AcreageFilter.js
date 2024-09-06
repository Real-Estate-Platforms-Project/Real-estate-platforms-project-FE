import "../../css/searchFilter.css"
import {useState} from "react";
function AcreageFilter({ isVisible, onClose }) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const minRange = 0;
    const maxRange = 100000;

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), max - 1);
        setMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), min + 1);
        setMax(value);
    };
    const handleChange = () => {

        setMin(0);
        setMax(0);

    }
    if (!isVisible) return null;

    return (
        <>
            <div className="price-filter-overlay">
                <div className="price-filter-container">
                    <button className="close-button" onClick={onClose}>X</button>
                    <div className="range-slider-container">
                        <h3>Diện tích </h3>
                        <div className="inputs-container">
                            <div>
                                <label>Từ:</label>
                                <input
                                    type="number"
                                    value={min}
                                    onChange={handleMinChange}
                                    min={minRange}
                                    max={maxRange}
                                />
                            </div>
                            <div>
                                <label>Đến: </label>
                                <input
                                    type="number"
                                    value={max}
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
                                value={min}
                                onChange={handleMinChange}
                                className="thumb thumb-left"
                                style={{ zIndex: min > maxRange - 100 ? '5' : '' }}
                            />
                            <input
                                type="range"
                                min={minRange}
                                max={maxRange}
                                value={max}
                                onChange={handleMaxChange}
                                className="thumb thumb-right"
                            />
                            <div className="slider-track"></div>
                            <div className="slider-range" style={{ left: `${(min / maxRange) * 100}%`, right: `${100 - (max/ maxRange) * 100}%` }}></div>
                        </div>
                    </div>
                    <ul className="price-options">
                        <li><input type="radio" name="price" />Tất cả diện tích  </li>
                        <li><input type="radio" name="price" /> Dưới 30m2</li>
                        <li><input type="radio" name="price" /> 30 - 50 m2</li>
                        <li><input type="radio" name="price" /> 50 - 80 m2</li>
                        <li><input type="radio" name="price" /> 80 - 100 m2 </li>
                    </ul>
                    <button className="apply-button" onClick={handleChange} >Đặt lại</button>
                    <button className="apply-button">Áp dụng</button>
                </div>
            </div>
        </>
    );
}
export default AcreageFilter;