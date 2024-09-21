import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const SearchBar = ({onSearch}) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [areaRange, setAreaRange] = useState({min: '', max: ''});
    const [selectedAreaOption, setSelectedAreaOption] = useState('all');
    const [activeTab, setActiveTab] = useState('Mua'); // State to manage active tab
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedRealEstateType, setSelectedRealEstateType] = useState([]);
    const [displayRegionText, setDisplayRegionText] = useState('Vị trí');
    const [displayRealEstateTypeText, setdisplayRealEstateTypeText] = useState('Loại Bất Động Sản');
    const [contend, setContend] = useState('');

    const [totalPages, setTotalPages] = useState(0);

    const handleLocationChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {

            setSelectedRegion([...selectedRegion, value]);
        } else {
            setSelectedRegion(selectedRegion.filter(location => location !== value));
        }
    };

    const handleRealEstateDemandChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {

            setSelectedRealEstateType([...selectedRealEstateType, value]);
        } else {
            setSelectedRealEstateType(selectedRealEstateType.filter(realDemandType => realDemandType !== value));
        }
    };

    const handleAreaRangeChange = (e) => {
        const {name, value} = e.target;
        const numericValue = value.replace(/\D/g, '');

        if (numericValue === '' || checkLimit(numericValue, 10000)) {
            setAreaRange({...areaRange, [name]: numericValue});
            setSelectedAreaOption('custom');
        } else {
            toast.error('Diện tích không được vượt quá 10.000 m²');
        }
        const displayValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Định dạng với dấu chấm
        e.target.value = numericValue === '' ? '' : `${displayValue} m²`;
    };

    const handleAreaOptionChange = (e) => {
        const option = e.target.value;
        setSelectedAreaOption(option);
        switch (option) {
            case 'all':
                setAreaRange({min: '', max: ''});
                break;
            case 'under50':
                setAreaRange({min: '', max: '50'});
                break;
            case '50-100':
                setAreaRange({min: '50', max: '100'});
                break;
            case '100-200':
                setAreaRange({min: '100', max: '200'});
                break;
            case '200-500':
                setAreaRange({min: '200', max: '500'});
                break;
            default:
                setAreaRange({min: '', max: ''});
        }
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

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    const closeDropdowns = () => {
        setActiveDropdown(null);
    };
    const applyLocationFilter = () => {

        if (selectedRegion.length > 0) {
            setDisplayRegionText(selectedRegion.join(', '));
        } else {
            setDisplayRegionText('Khu vực');
        }

        setActiveDropdown(null);
    };

    const applyRealEstateTypeFilter = () => {

        if (selectedRealEstateType.length > 0) {
            setdisplayRealEstateTypeText(selectedRealEstateType.join(', '));
        } else {
            setdisplayRealEstateTypeText('Loại Bất Động Sản');
        }

        setActiveDropdown(null);
    };


    const handleSearch = async () => {


        const filters = {

            ...(selectedRegion.length > 0 && {region: selectedRegion.join(', ')}),
            ...(activeTab && {type: activeTab}),
            ...(selectedRealEstateType.length > 0 && {realEstateType: selectedRealEstateType.join(', ')}),
            ...(selectedAreaOption !== 'all' && {areaOption: selectedAreaOption}),
            ...(areaRange.min && {minArea: parseInt(areaRange.min, 10)}),
            ...(areaRange.max && {maxArea: parseInt(areaRange.max, 10)}),
            ...(contend && {notes: contend}),
        };
        console.log('Filters:', filters);

        if (!(window.location.pathname).includes('/danh-sach-nhu-cau')) {
            // Chuyển hướng chỉ khi không ở trang EstateListing
            navigate('/estate-list', {state: {filters}});
        } else {
            // Nếu đang ở trang EstateListing thì gọi onSearch
            onSearch({...filters});
        }


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
                    className={`tab ${activeTab === 'Mua' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Mua')}
                >
                    Nhu cầu mua
                </button>
                <button
                    className={`tab ${activeTab === 'Thue' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Thue')}
                >
                    Nhu cầu cho thuê
                </button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Nhập thông tin tìm kiếm"
                    value={contend}
                    onChange={(e) => setContend(e.target.value)}
                />
                <button className="search-button-inside" onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <div className="search-options">
                <div
                    className={`option ${activeDropdown === 'type' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('type')}
                >
                    <button className="arrow">
                        {displayRegionText}<span>{activeDropdown === 'type' ? <i className="bi bi-caret-up"></i> :
                        <i className="bi bi-caret-down"></i>}</span>
                    </button>
                    {activeDropdown === 'type' && (
                        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Trung tam"
                                    onChange={handleLocationChange}
                                    checked={selectedRegion.includes('Trung tam')}
                                /> Trung tâm
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Ngoai o"
                                    onChange={handleLocationChange}
                                    checked={selectedRegion.includes('Ngoai o')}
                                /> Ngoại ô
                            </label>
                            <div className="filter-footer">
                                <button className="apply-btn" onClick={applyLocationFilter}>Áp dụng</button>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className={`option ${activeDropdown === 'realEstateType' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('realEstateType')}
                >
                    <button className="arrow">
                        {displayRealEstateTypeText}<span>{activeDropdown === 'realEstateType' ? <i className="bi bi-caret-up"></i> :
                        <i className="bi bi-caret-down"></i>}</span>
                    </button>
                    {activeDropdown === 'realEstateType' && (
                        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Dat"
                                    onChange={handleRealEstateDemandChange}
                                    checked={selectedRealEstateType.includes('Dat')}
                                /> Đất
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Nha o"
                                    onChange={handleRealEstateDemandChange}
                                    checked={selectedRealEstateType.includes('Nha o')}
                                /> Nhà ở
                            </label>
                            <div className="filter-footer">
                                <button className="apply-btn" onClick={applyRealEstateTypeFilter}>Áp dụng</button>
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
                                    />
                                    <span>→</span>
                                    <input className="col-2"
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
                                    <label><input type="radio" name="area" value="under50"
                                                  checked={selectedAreaOption === 'under50'}
                                                  onChange={handleAreaOptionChange}/> Dưới 50 m²</label>
                                    <label><input type="radio" name="area" value="50-100"
                                                  checked={selectedAreaOption === '50-100'}
                                                  onChange={handleAreaOptionChange}/> 50 - 100 m²</label>
                                    <label><input type="radio" name="area" value="100-200"
                                                  checked={selectedAreaOption === '100-200'}
                                                  onChange={handleAreaOptionChange}/> 100 - 200 m²</label>
                                    <label><input type="radio" name="area" value="200-500"
                                                  checked={selectedAreaOption === '200-500'}
                                                  onChange={handleAreaOptionChange}/> 200 - 500 m²</label>
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
