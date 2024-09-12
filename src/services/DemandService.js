import axios from "axios";

const URL_DEMAND = "http://localhost:8080/api/demand"

export const getAllDemand = async (userRoles) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        let res = await axios.get(URL_DEMAND,{
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const searchDemand = async (filters) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        // Lọc các tham số không có giá trị (null, undefined, hoặc '')
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        // Tạo query string từ các tham số đã lọc
        const params = new URLSearchParams(filteredFilters).toString();
        const response = await axios.get(`${URL_DEMAND}/search?${params}`,{
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch real estate data', error);
        throw error;
    }
}

export  const deleteDemand = async (id) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        await axios.delete(URL_DEMAND + "/" + id,{
                headers: {
                    "Authorization": `Bearer ${token}`,// Thêm token vào header
                    "Content-Type": "application/json",
                }
            });
        return true;
    } catch (e) {
        return false;
    }
}

export  const verifyDemand = async  (demand) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
            await axios.put(URL_DEMAND+"/"+demand.id+"/verify",demand,{
                headers: {
                    "Authorization": `Bearer ${token}`,// Thêm token vào header
                    "Content-Type": "application/json",
                }
            });
            return true;
    } catch (e){
        return false;
    }
}

export const saveDemand = async (demand) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        console.log(token)
        await axios.post(URL_DEMAND, demand,{
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                    "Content-Type": "application/json",
            }
        })
        return true
    } catch (e) {
        return false
    }
}