import axios from "axios";

const URL_REAL_ESTATE = "http://localhost:8080/api/real-estate";

export const saveRealEstate = async (realEstate) => {
    try {
        await axios.post(URL_REAL_ESTATE, realEstate);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
export const findRealEstate = async () => {
    try{
       let res = await axios.get(URL_REAL_ESTATE+"/findAll");
        return res.data;
    }catch(e){
        return [];
    }
}
export const searchRealEstate = async (filters) => {
    try {
        // Lọc các tham số không có giá trị (null, undefined, hoặc '')
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        // Tạo query string từ các tham số đã lọc
        const params = new URLSearchParams(filteredFilters).toString();
        const response = await axios.get(`${URL_REAL_ESTATE}/search?${params}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch real estate data', error);
        throw error;
    }
};
