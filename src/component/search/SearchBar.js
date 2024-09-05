import '../../css/SearchBar.css'
function SearchBar(){
    return (
        <div className="search-bar-container">
            <div className="search-bar-tabs">
                <button className="tab">Nhà đất bán</button>
                <button className="tab">Nhà đất cần bán</button>
                <button className="tab">Dự án</button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Trên toàn quốc"
                />
                <button className="search-button">Tìm kiếm</button>
            </div>
            <div className="filters">
                <select className="filter-select">
                    <option>Loại nhà đất</option>
                </select>
                <select className="filter-select">
                    <option>Mức giá</option>
                </select>
                <select className="filter-select">
                    <option>Diện tích</option>
                </select>
            </div>
        </div>
    );
}
export default SearchBar;