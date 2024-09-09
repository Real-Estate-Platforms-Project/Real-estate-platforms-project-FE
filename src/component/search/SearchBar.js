import React, { useState } from 'react';


const SearchBar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedPriceOption, setSelectedPriceOption] = useState('all');
    const [areaRange, setAreaRange] = useState({ min: '', max: '' });
    const [selectedAreaOption, setSelectedAreaOption] = useState('all');
    const [activeTab, setActiveTab] = useState('sell'); // State to manage active tab

    const handlePriceRangeChange = (e) => {
        const { name, value } = e.target;
        setPriceRange({ ...priceRange, [name]: value });
    };

    const handlePriceOptionChange = (e) => {
        setSelectedPriceOption(e.target.value);
    };

    const handleAreaRangeChange = (e) => {
        const { name, value } = e.target;
        setAreaRange({ ...areaRange, [name]: value });
    };

    const handleAreaOptionChange = (e) => {
        setSelectedAreaOption(e.target.value);
    };

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const closeDropdowns = () => {
        setActiveDropdown(null);
    };

    return (

            <div className="search-bar">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sell')}
                    >
                        Nhà đất bán
                    </button>
                    <button
                        className={`tab ${activeTab === 'rent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('rent')}
                    >
                        Nhà đất cho thuê
                    </button>
                </div>
                <div className="search-bar">
                    <input type="text" className="search-input" placeholder="🔍Trên toàn quốc"/>
                    <button className="search-button-inside">Tìm kiếm</button>
                </div>
                <div className="search-options">
                    <div
                        className={`option ${activeDropdown === 'type' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('type')}
                    >
                        <button className="arrow">
                            Loại nhà đất <span>{activeDropdown === 'type' ? '▲' : '▼'}</span>
                        </button>
                        {activeDropdown === 'type' && (
                            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                                <label><input type="checkbox"/> Căn hộ chung cư</label>
                                <label><input type="checkbox"/> Chung cư mini, căn hộ dịch vụ</label>
                                <label><input type="checkbox"/> Nhà riêng</label>
                                <label><input type="checkbox"/> Nhà biệt thự, liền kề</label>
                            </div>
                        )}
                    </div>

                    <div
                        className={`option ${activeDropdown === 'price' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('price')}
                    >
                        <button className="arrow">
                            Mức giá <span>{activeDropdown === 'price' ? '▲' : '▼'}</span>
                        </button>
                        {activeDropdown === 'price' && (
                            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                                <div className="filter-header">
                                    <h3>Mức giá</h3>
                                    <button className="filter-close-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        closeDropdowns();
                                    }}>✕
                                    </button>
                                </div>
                                <div className="filter-body">
                                    <div className="range-input">
                                        <label>Giá thấp nhất</label>
                                        <input
                                            type="number"
                                            name="min"
                                            placeholder="Từ"
                                            value={priceRange.min}
                                            onChange={handlePriceRangeChange}
                                        />
                                        <span>→</span>
                                        <label>Giá cao nhất</label>
                                        <input
                                            type="number"
                                            name="max"
                                            placeholder="Đến"
                                            value={priceRange.max}
                                            onChange={handlePriceRangeChange}
                                        />
                                    </div>
                                    <div className="range-slider">
                                        <input type="range" min="0" max="100" step="1"/>
                                    </div>
                                    <div className="price-options">
                                        <label><input type="radio" name="price" value="all"
                                                      checked={selectedPriceOption === 'all'}
                                                      onChange={handlePriceOptionChange}/> Tất cả mức giá</label>
                                        <label><input type="radio" name="price" value="500"
                                                      checked={selectedPriceOption === '500'}
                                                      onChange={handlePriceOptionChange}/> Dưới 500 triệu</label>
                                        <label><input type="radio" name="price" value="500-800"
                                                      checked={selectedPriceOption === '500-800'}
                                                      onChange={handlePriceOptionChange}/> 500 - 800 triệu</label>
                                        <label><input type="radio" name="price" value="800-1b"
                                                      checked={selectedPriceOption === '800-1b'}
                                                      onChange={handlePriceOptionChange}/> 800 triệu - 1 tỷ</label>
                                        <label><input type="radio" name="price" value="1-2b"
                                                      checked={selectedPriceOption === '1-2b'}
                                                      onChange={handlePriceOptionChange}/> 1 - 2 tỷ</label>
                                    </div>
                                    <div className="filter-footer">
                                        <button className="reset-btn"
                                                onClick={() => setPriceRange({min: '', max: ''})}>Đặt lại
                                        </button>
                                        <button className="apply-btn" onClick={closeDropdowns}>Áp dụng</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={`option ${activeDropdown === 'area' ? 'active' : ''}`}
                        onClick={() => toggleDropdown('area')}
                    >
                        <button className="arrow">
                            Diện tích <span>{activeDropdown === 'area' ? '▲' : '▼'}</span>
                        </button>
                        {activeDropdown === 'area' && (
                            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                                <div className="filter-header">
                                    <h3>Diện tích</h3>
                                    <button className="filter-close-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        closeDropdowns();
                                    }}>✕
                                    </button>
                                </div>
                                <div className="filter-body">
                                    <div className="range-input">
                                        <label>Diện tích nhỏ nhất</label>
                                        <input
                                            type="number"
                                            name="min"
                                            placeholder="Từ"
                                            value={areaRange.min}
                                            onChange={handleAreaRangeChange}
                                        />
                                        <span>→</span>
                                        <label>Diện tích lớn nhất</label>
                                        <input
                                            type="number"
                                            name="max"
                                            placeholder="Đến"
                                            value={areaRange.max}
                                            onChange={handleAreaRangeChange}
                                        />
                                    </div>
                                    <div className="range-slider ">
                                        <input type="range" min="0" max="100" step="1"/>
                                    </div>
                                    <div className="area-options">
                                        <label><input type="radio" name="area" value="all"
                                                      checked={selectedAreaOption === 'all'}
                                                      onChange={handleAreaOptionChange}/> Tất cả diện tích</label>
                                        <label><input type="radio" name="area" value="under30"
                                                      checked={selectedAreaOption === 'under30'}
                                                      onChange={handleAreaOptionChange}/> Dưới 30 m²</label>
                                        <label><input type="radio" name="area" value="30-50"
                                                      checked={selectedAreaOption === '30-50'}
                                                      onChange={handleAreaOptionChange}/> 30 - 50 m²</label>
                                        <label><input type="radio" name="area" value="50-80"
                                                      checked={selectedAreaOption === '50-80'}
                                                      onChange={handleAreaOptionChange}/> 50 - 80 m²</label>
                                        <label><input type="radio" name="area" value="80-100"
                                                      checked={selectedAreaOption === '80-100'}
                                                      onChange={handleAreaOptionChange}/> 80 - 100 m²</label>
                                    </div>
                                    <div className="filter-footer">
                                        <button className="reset-btn"
                                                onClick={() => setAreaRange({min: '', max: ''})}>Đặt lại
                                        </button>
                                        <button className="apply-btn" onClick={closeDropdowns}>Áp dụng</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default SearchBar;
