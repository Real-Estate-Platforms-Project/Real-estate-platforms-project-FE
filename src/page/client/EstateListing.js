import SearchBar from "../../component/search/SearchBar";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import * as realEstateService from "../../services/RealEstateService";
import ResultsList from "../../component/client/ResultList";
function EstateListing() {
    const location = useLocation();
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const handleSearch = async (filters, page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await realEstateService.searchRealEstate({ ...filters, page, size: 6 });
            setResults(response.content || []);
            setTotalPages(response.totalPages || 0);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };
    const activeTab = location.state?.activeTab || 'Bán';

    useEffect(() => {
        // Lấy filters từ location.state nếu có
        const filters = location.state?.filters || {};
        handleSearch(filters); // Gọi handleSearch với filters từ state
    }, [location.state]); // Chỉ chạy khi location.state thay đổi
    return(
        <>
            <div className="custom-search w-75 mt-3" style={{justifyContent:"center",margin:"auto"}}>
                <SearchBar onSearch={handleSearch} initialTab={activeTab} />
            </div>
            <ResultsList
                results={results}
                loading={loading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={(newPage) => handleSearch(location.state?.filters, newPage)}
            />
        </>
    )
}

export default EstateListing;