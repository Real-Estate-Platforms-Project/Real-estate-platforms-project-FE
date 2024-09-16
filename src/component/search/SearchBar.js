import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
const SearchBar = ({onSearch,initialTab='Bán,Cho thuê'}) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: '', max:'' });
    const [selectedPriceOption, setSelectedPriceOption] = useState('all');
    const [areaRange, setAreaRange] = useState({ min: '', max: '' });
    const [selectedAreaOption, setSelectedAreaOption] = useState('all');
    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [displayText, setDisplayText] = useState('Vị trí');
    const [address, setAddress] = useState('');

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);
    const [totalPages, setTotalPages] = useState(0);
    const handlePriceRangeChange = (e) => {
        const { name, value } = e.target;
        setPriceRange({ ...priceRange, [name]: value });
    };
    const handleLocationChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {

            setSelectedLocations([...selectedLocations, value]);
        } else {
            setSelectedLocations(selectedLocations.filter(location => location !== value));
        }
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
    const applyLocationFilter = () => {

        if (selectedLocations.length > 0) {
            setDisplayText(selectedLocations.join(', '));
        } else {
            setDisplayText('Vị trí');
        }

        setActiveDropdown(null);
    };

    const handleSearch = async () => {
        const priceFilters = getPriceFilters();
        const areaFilters = getAreaFilters();


        const filters = {
                ...(priceRange.min && { minPrice: parseFloat(priceRange.min) }),
                ...(priceRange.max && { maxPrice: parseFloat(priceRange.max) }),
                ...(selectedLocations.length > 0 && { location: selectedLocations.join(', ') }),
            ...(priceFilters.minPrice !== null && { minPrice: priceFilters.minPrice }),
            ...(priceFilters.maxPrice !== null && { maxPrice: priceFilters.maxPrice }),
            ...(areaFilters.minArea !== null && { minArea: areaFilters.minArea }),
            ...(areaFilters.maxArea !== null && { maxArea: areaFilters.maxArea }),
                ...(areaRange.min && { minArea: parseInt(areaRange.min, 10) }),
                ...(areaRange.max && { maxArea: parseInt(areaRange.max, 10) }),
                ...(address && { address }),
                demandType: activeTab === 'Bán,Cho thuê' ? 'Bán,Cho thuê' : activeTab === 'Bán' ? 'Bán' : 'Cho thuê',


            };
        console.log(filters.demandType)
        if (window.location.pathname !== '/estate-list') {
            navigate('/estate-list', { state: { filters,activeTab } });
        } else {
            onSearch(filters);
        }


    };
    const getPriceFilters = () => {
        let minPrice = null;
        let maxPrice = null;

        switch (selectedPriceOption) {
            case '500':
                maxPrice = 500000000; // Dưới 500 triệu
                break;
            case '500-800':
                minPrice = 500000000;
                maxPrice = 800000000;
                break;
            case '800-1000':
                minPrice = 800000000;
                maxPrice = 1000000000;
                break;
            case '1-2b':
                minPrice = 1000000000;
                maxPrice = 2000000000;
                break;
            default:
                break;
        }

        return { minPrice, maxPrice };
    };

    // Hàm xử lý giá trị từ radio buttons cho diện tích
    const getAreaFilters = () => {
        let minArea = null;
        let maxArea = null;

        switch (selectedAreaOption) {
            case 'under30':
                maxArea = 30;
                break;
            case '30-50':
                minArea = 30;
                maxArea = 50;
                break;
            case '50-80':
                minArea = 50;
                maxArea = 80;
                break;
            case '80-100':
                minArea = 80;
                maxArea = 100;
                break;
            default:
                break;
        }

        return { minArea, maxArea };
    };
    useEffect(() => {
        if (window.location.pathname === '/estate-list') {
            handleSearch();  // Gọi lại tìm kiếm mỗi khi activeTab thay đổi
        }
    }, [activeTab]);
    const handleReloadPrice = () => {
        setSelectedPriceOption('all');
        setPriceRange({min: '', max: ''})    }
    const handleReloadArea = () => {
        setSelectedAreaOption('all');
        setAreaRange({min: '', max: ''})    }
    return (

        <div className="search-bar">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'Bán,Cho thuê' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Bán,Cho thuê')}
                >
                    Toàn bộ
                </button>
                <button
                    className={`tab ${activeTab === 'Bán' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Bán')}
                >
                    Nhà đất bán
                </button>
                <button
                    className={`tab ${activeTab === 'Cho thuê' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Cho thuê')}
                >
                    Nhà đất cho thuê
                </button>

            </div>
            <div className="search-bar d-flex my-2">
                <div className="w-25 search-input-icon">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        className="search-input "
                        placeholder="Nhập địa chỉ tìm kiếm"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className="search-button-inside btn btn-sm btn-black me-4" onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <div className="search-options">
                <div
                    className={`option ${activeDropdown === 'type' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('type')}
                >
                    <button className="arrow">
                        {displayText}<span>{activeDropdown === 'type' ? <i className="bi bi-caret-up"></i> :
                        <i className="bi bi-caret-down"></i>}</span>
                    </button>
                    {activeDropdown === 'type' && (
                        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                            <div className="filter-header">
                                <h3>Vị trí</h3>
                                <button className="filter-close-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    closeDropdowns();
                                }}><i className="bi bi-x-circle"></i>
                                </button>
                            </div>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Trung tâm"
                                    onChange={handleLocationChange}
                                    checked={selectedLocations.includes('Trung tâm')}
                                /> Trung tâm
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Ngoại ô"
                                    onChange={handleLocationChange}
                                    checked={selectedLocations.includes('Ngoại ô')}
                                /> Ngoại ô
                            </label>
                            <div className="filter-footer">
                                <button className="reset-btn"
                                        onClick={() => setDisplayText('Vị trí')&setSelectedLocations([])}>Đặt lại
                                </button>
                                <button className="apply-btn" onClick={applyLocationFilter}>Áp dụng</button>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className={`option ${activeDropdown === 'price' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('price')}
                >
                    <button className="arrow">
                        Mức giá <span>{activeDropdown === 'price' ? <i className="bi bi-caret-up"></i> :
                        <i className="bi bi-caret-down"></i>}</span>
                    </button>
                    {activeDropdown === 'price' && (
                        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                            <div className="filter-header">
                                <h3>Mức giá</h3>
                                <button className="filter-close-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    closeDropdowns();
                                }}><i className="bi bi-x-circle"></i>
                                </button>
                            </div>
                            <div className="filter-body">
                                <div className="range-input">
                                    <label>Giá : </label>
                                    <input className="col"
                                           type="number"
                                           name="min"
                                           placeholder="Từ"
                                           value={priceRange.min}
                                           onChange={handlePriceRangeChange}
                                    />
                                    <span>→</span>
                                    <input className="col"
                                           type="number"
                                           name="max"
                                           placeholder="Đến"
                                           value={priceRange.max}
                                           onChange={handlePriceRangeChange}
                                    />
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
                                    <label><input type="radio" name="price" value="800-1000"
                                                  checked={selectedPriceOption === '800-1000'}
                                                  onChange={handlePriceOptionChange}/> 800 triệu - 1 tỷ</label>
                                    <label><input type="radio" name="price" value="1-2b"
                                                  checked={selectedPriceOption === '1-2b'}
                                                  onChange={handlePriceOptionChange}/> 1 - 2 tỷ</label>
                                </div>
                                <div className="filter-footer">
                                    <button className="reset-btn"
                                            onClick={handleReloadPrice}>Đặt lại
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
                        Diện tích <span>{activeDropdown === 'area' ?
                        <i className="bi bi-caret-up"></i> : <i className="bi bi-caret-down"></i>}</span>
                    </button>
                    {activeDropdown === 'area' && (
                        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                            <div className="filter-header">
                                <h3>Diện tích</h3>
                                <button className="filter-close-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    closeDropdowns();
                                }}><i className="bi bi-x-circle"></i>
                                </button>
                            </div>
                            <div className="filter-body">
                                <div className="range-input">
                                    <label>Diện tích</label>
                                    <input className="col"
                                        type="number"
                                        name="min"
                                        placeholder="Từ"
                                        value={areaRange.min}
                                        onChange={handleAreaRangeChange}
                                    />
                                    <span>→</span>
                                    <input className="col"
                                        type="number"
                                        name="max"
                                        placeholder="Đến"
                                        value={areaRange.max}
                                        onChange={handleAreaRangeChange}
                                    />
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
                                            onClick={handleReloadArea}>Đặt lại
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
