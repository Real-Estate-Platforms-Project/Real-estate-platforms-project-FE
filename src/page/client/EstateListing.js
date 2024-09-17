import SearchBar from "../../component/search/SearchBar";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import * as realEstateService from "../../services/RealEstate";
import ResultsList from "../../component/client/ResultList";
import '../../css/Paging.css'
function EstateListing() {
    const location = useLocation();
    const [results, setResults] =useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] =useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState([]);
    const handleSearch = async (filters, page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await realEstateService.searchRealEstate({ ...filters, page, size: 8 });
            setResults(response.content|| []);
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
    const activeTab = location.state?.activeTab || 'Bán,Cho thuê';


    useEffect(() => {
        handleSearch(filters);
    }, [filters]);


    return(
        <>
            <div className="custom-search w-75 mt-3" style={{justifyContent:"center",margin:"auto"}}>
                <SearchBar onSearch={setFilters} initialTab={activeTab} />
            </div>
            <ResultsList
                results={results}
                loading={loading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={(newPage) => handleSearch(filters, newPage)}
            />
        </>
    )
}


export default EstateListing;
