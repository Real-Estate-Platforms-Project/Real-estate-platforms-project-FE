import '../../css/SearchBar.css'
import PriceFilter from "./PriceFilter";
import {useState} from "react";
import AcreageFilter from "./AcreageFilter";

function SearchBar(){
    const [isPriceFilterVisible, setPriceFilterVisible] = useState(false);
    const [isAcreageFilterVisible, setAcreageFilterVisible] = useState(false);
    const togglePriceFilter = () => {
        setPriceFilterVisible(false)
        setPriceFilterVisible(!isPriceFilterVisible);
    };
    const toggleAcreageFilter = () => {
        setAcreageFilterVisible(false);
        setAcreageFilterVisible(!isAcreageFilterVisible);
    };

    return (
        <div className="container w-75">
            <div className="search-bar-container">
                <div className="search-bar-tabs">
                    <button className="tab">Nhà đất bán</button>
                    <button className="tab">Nhà đất cho thuê</button>
                    <button className="tab">Dự án</button>
                </div>
                <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Trên toàn quốc" />
                    <button className="search-button">Tìm kiếm</button>
                </div>
                <div className="filters">
                    <select className="filter-select">
                        <option>Loại nhà đất</option>
                    </select>
                    <button className="filter-select" onClick={togglePriceFilter}>
                        Mức giá
                    </button>
                    <button className="filter-select" onClick={toggleAcreageFilter}>
                      Diện tích
                    </button>
                </div>
                <AcreageFilter isVisible={isAcreageFilterVisible} onClose={toggleAcreageFilter}/>
                <PriceFilter isVisible={isPriceFilterVisible} onClose={togglePriceFilter}/>
            </div>
        </div>
    );
}
export default SearchBar;