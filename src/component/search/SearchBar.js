import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const SearchBar = ({onSearch, initialTab = 'Bán,Cho thuê'}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [priceRange, setPriceRange] = useState({min: '', max: ''});
    const [selectedPriceOption, setSelectedPriceOption] = useState('all');
    const [areaRange, setAreaRange] = useState({min: '', max: ''});
    const [selectedAreaOption, setSelectedAreaOption] = useState('all');
    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [displayText, setDisplayText] = useState('Vị trí');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const firstRender = useRef(true);


    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('searchFilters'));
        if (savedFilters && location.pathname === '/estate-list') {
            console.log('Khôi phục giá trị từ localStorage:', savedFilters.priceRange);
            setPriceRange(savedFilters.priceRange || {min: '', max: ''});
            setSelectedPriceOption(savedFilters.selectedPriceOption || 'all');
            setAreaRange(savedFilters.areaRange || {min: '', max: ''});
            setSelectedAreaOption(savedFilters.selectedAreaOption || 'all');
            setSelectedLocations(savedFilters.selectedLocations || []);
            setDisplayText(savedFilters.displayText || 'Vị trí');
            setAddress(savedFilters.address || '');
        }


    }, [location.pathname]);


    useEffect(() => {
        const completeFilters = {
            priceRange,
            selectedPriceOption,
            areaRange,
            selectedAreaOption,
            selectedLocations,
            displayText,
            address,
        };
        localStorage.setItem('searchFilters', JSON.stringify(completeFilters));
    }, [priceRange, selectedPriceOption, areaRange, selectedAreaOption, selectedLocations, displayText, address]);


    useEffect(() => {
        if (!firstRender.current && window.location.pathname === '/estate-list') {
            handleSearch();
        } else {
            firstRender.current = false;
        }
    }, [activeTab]);




    const handlePriceRangeChange = (e) => {
        const {name, value} = e.target;
        const numericValue = value.replace(/\D/g, '');
        if (numericValue === '' || checkLimit(numericValue, 10000000000000)) {
            setPriceRange({...priceRange, [name]: numericValue});
            setSelectedPriceOption('custom');
            setErrorMessage('');
        } else {
            setErrorMessage("ok")
            toast.error('Giá trị không được vượt quá 10.000 tỷ VND');
        }
        const displayValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        e.target.value = numericValue === '' ? '' : `${displayValue} VND`;
    };


    const handleLocationChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setSelectedLocations([...selectedLocations, value]);
        } else {
            setSelectedLocations(selectedLocations.filter(location => location !== value));
        }
    };


    const handlePriceRangeBlur = () => {
        const min = parseFloat(priceRange.min);
        const max = parseFloat(priceRange.max);


        if (!isNaN(min) && !isNaN(max) && min > max) {
            setErrorMessage("ok")
            toast.error('Giá trị tối thiểu không được lớn hơn giá trị tối đa.');
        } else {
            setErrorMessage('');
        }
    };


    const handleAreaRangeChange = (e) => {
        const {name, value} = e.target;
        const numericValue = value.replace(/\D/g, '');

        if (numericValue === '' || checkLimit(numericValue, 10000)) {
            setAreaRange({...areaRange, [name]: numericValue});
            setSelectedAreaOption('custom');
            setErrorMessage('');
        } else {
            setErrorMessage("ok")
            toast.error('Diện tích không được vượt quá 10.000 m²');
        }
        const displayValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Định dạng với dấu chấm
        e.target.value = numericValue === '' ? '' : `${displayValue} m²`;
    };


    const handleAreaRangeBlur = () => {
        const min = parseFloat(areaRange.min);
        const max = parseFloat(areaRange.max);


        if (!isNaN(min) && !isNaN(max) && min > max) {
            setErrorMessage("ok")
            toast.error('Diện tích tối thiểu không được lớn hơn diện tích tối đa.');
        } else {
            setErrorMessage('');
        }
    };


    const handlePriceOptionChange = (e) => {
        const option = e.target.value;
        setSelectedPriceOption(option);
        switch (option) {
            case 'all':
                setPriceRange({min: '', max: ''});
                break;
            case '500':
                setPriceRange({min: '', max: '500000000'});
                break;
            case '500-800':
                setPriceRange({min: '500000000', max: '800000000'});
                break;
            case '800-1000':
                setPriceRange({min: '800000000', max: '1000000000'});
                break;
            case '1-2b':
                setPriceRange({min: '1000000000', max: '2000000000'});
                break;
            default:
                setPriceRange({min: '', max: ''});
        }
    };


    const handleAreaOptionChange = (e) => {
        const option = e.target.value;
        setSelectedAreaOption(option);
        switch (option) {
            case 'all':
                setAreaRange({min: '', max: ''});
                break;
            case 'under30':
                setAreaRange({min: '', max: '30'});
                break;
            case '30-50':
                setAreaRange({min: '30', max: '50'});
                break;
            case '50-80':
                setAreaRange({min: '50', max: '80'});
                break;
            case '80-100':
                setAreaRange({min: '80', max: '100'});
                break;
            default:
                setAreaRange({min: '', max: ''});
        }
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
        if (errorMessage) return;
        const priceFilters = getPriceFilters();
        const areaFilters = getAreaFilters();


        const filters = {
            ...(priceRange.min && {minPrice: parseFloat(priceRange.min)}),
            ...(priceRange.max && {maxPrice: parseFloat(priceRange.max)}),
            ...(selectedLocations.length > 0 && {location: selectedLocations.join(', ')}),
            ...(priceFilters.minPrice !== null && {minPrice: priceFilters.minPrice}),
            ...(priceFilters.maxPrice !== null && {maxPrice: priceFilters.maxPrice}),
            ...(areaFilters.minArea !== null && {minArea: areaFilters.minArea}),
            ...(areaFilters.maxArea !== null && {maxArea: areaFilters.maxArea}),
            ...(areaRange.min && {minArea: parseInt(areaRange.min, 10)}),
            ...(areaRange.max && {maxArea: parseInt(areaRange.max, 10)}),
            ...(address && {address}),
            demandType: activeTab === 'Bán,Cho thuê' ? 'Bán,Cho thuê' : activeTab === 'Bán' ? 'Bán' : 'Cho thuê',
        };
        if (window.location.pathname !== '/estate-list') {
            navigate('/estate-list', {state: {filters, activeTab}});
        } else {
            onSearch({...filters});
        }
    };


    const getPriceFilters = () => {
        let minPrice = null;
        let maxPrice = null;


        switch (selectedPriceOption) {
            case '500':
                maxPrice = 500000000;
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
        return {minPrice, maxPrice};
    };


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
        return {minArea, maxArea};
    };


    const formatPrice = (value) => {
        if (value >= 1000000000) {
            return `${(value / 1000000000).toFixed(1)} tỷ`;
        } else if (value >= 1000000) {
            return `${(value / 1000000).toFixed(0)} triệu`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)} ngàn`;
        }
        return value;
    };


    const getPriceButtonLabel = () => {
        if (priceRange.min && priceRange.max) {
            return `Từ ${formatPrice(parseInt(priceRange.min))} đến ${formatPrice(parseInt(priceRange.max))}`;
        } else if (priceRange.min) {
            return `Từ ${formatPrice(parseInt(priceRange.min))}`;
        } else if (priceRange.max) {
            return `Đến ${formatPrice(parseInt(priceRange.max))}`;
        }
        return 'Mức giá';
    };


    const getAreaButtonLabel = () => {
        if (areaRange.min && areaRange.max) {
            return `Từ ${parseInt(areaRange.min).toLocaleString()} đến ${parseInt(areaRange.max).toLocaleString()} m²`;
        } else if (areaRange.min) {
            return `Từ ${parseInt(areaRange.min).toLocaleString()} m²`;
        } else if (areaRange.max) {
            return `Đến ${parseInt(areaRange.max).toLocaleString()} m²`;
        }
        return 'Diện tích';
    };


    const handleReloadPrice = () => {
        setSelectedPriceOption('all');
        setPriceRange({min: '', max: ''})
    }


    const handleReloadArea = () => {
        setSelectedAreaOption('all');
        setAreaRange({min: '', max: ''})
    }


    const applyPriceFilter = () => {
        const min = parseFloat(priceRange.min);
        const max = parseFloat(priceRange.max);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            closeDropdowns();
            setErrorMessage("ok")
            toast.error('Giá trị tối thiểu không được lớn hơn giá trị tối đa.');
            return;
        }
        setErrorMessage('');
        closeDropdowns();
    };


    const applyAreaFilter = () => {
        const min = parseFloat(areaRange.min);
        const max = parseFloat(areaRange.max);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            closeDropdowns();
            setErrorMessage("ok")
            toast.error('Diện tích tối thiểu không được lớn hơn diện tích tối đa.');
            return;
        }
        setErrorMessage('');
        closeDropdowns();
    };

    const checkLimit = (value, maxValue) => {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue) || numericValue > maxValue) {
            return false;
        }
        return true;
    };

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
                <div className="w-auto search-input-icon">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        className="search-input w-100"
                        placeholder="Nhập địa chỉ tìm kiếm"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className="search-button-inside btn btn-sm btn-black me-4"
                        onClick={handleSearch}
                        disabled={Boolean(errorMessage)}>Tìm kiếm
                </button>
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
                                        onClick={() => setDisplayText('Vị trí') & setSelectedLocations([])}>Đặt lại
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
                        {getPriceButtonLabel()} <span>{activeDropdown === 'price' ? <i className="bi bi-caret-up"></i> :
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
                                           onBlur={handlePriceRangeBlur}
                                    />
                                    <span>→</span>
                                    <input className="col"
                                           type="number"
                                           name="max"
                                           placeholder="Đến"
                                           value={priceRange.max}
                                           onChange={handlePriceRangeChange}
                                           onBlur={handlePriceRangeBlur}
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
                                    <button className="apply-btn" onClick={applyPriceFilter}>Áp dụng</button>
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
                        {getAreaButtonLabel()} <span>{activeDropdown === 'area' ?
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
                                           onBlur={handleAreaRangeBlur}
                                    />
                                    <span>→</span>
                                    <input className="col"
                                           type="number"
                                           name="max"
                                           placeholder="Đến"
                                           value={areaRange.max}
                                           onChange={handleAreaRangeChange}
                                           onBlur={handleAreaRangeBlur}
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
                                    <button className="apply-btn" onClick={applyAreaFilter}>Áp dụng</button>
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
