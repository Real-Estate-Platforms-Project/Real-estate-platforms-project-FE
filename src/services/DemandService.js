import axios from "axios";

const URL_DEMAND = "http://localhost:8080/api/demand"

export const getAllDemand = async (userRoles) => {
    try {
        if(userRoles.includes("ROLE_ADMIN") || userRoles.includes("ROLE_EMPLOYEE")){
            let res = await axios.get(URL_DEMAND+"?_sort=isVerify,createdAt&_order=asc,desc");
            return res.data;
        } else {
            let res = await axios.get(URL_DEMAND+"?isVerify=1&_sort=createdAt&_order=desc");
            console.log(res.data)
            return res.data;
        }
    } catch (e) {
        console.log(e)
    }
}

export const searchDemand = async (filters) => {
    try {
        // Lọc các tham số không có giá trị (null, undefined, hoặc '')
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        // Tạo query string từ các tham số đã lọc
        const params = new URLSearchParams(filteredFilters).toString();
        const response = await axios.get(`${URL_DEMAND}/search?${params}`);
        console.log(params)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch real estate data', error);
        throw error;
    }
}

export  const deleteDemand = async (id) => {
    try {
        await axios.delete(URL_DEMAND + "/" + id);
        return true;
    } catch (e) {
        return false;
    }
}

export  const verifyDemand = async  (demand) => {
    try {
        if (!demand.isVerify){
            demand.setIsVerify = true;
            await axios.put(URL_DEMAND+"/"+demand.id+"/verify",demand);
            return true;
        }
        return false;
    } catch (e){
        return false;
    }
}

export const saveDemand = async (demand) => {
    try {
        await axios.post(URL_DEMAND, demand)
        return true
    } catch (e) {
        return false
    }
}