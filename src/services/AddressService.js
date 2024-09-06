import axios from "axios";

const URL_PROVINCE = "http://localhost:8080/api/province";
const URL_DISTRICT = "http://localhost:8080/api/district";
const URL_WARD = "http://localhost:8080/api/ward";

export const getAllProvinces = async () => {
    try {
        let res = await axios.get(URL_PROVINCE);
        return res.data;
    } catch (e) {
        return [];
    }
}

export const getAllDistricts = async (code) => {
    try {
        let res = await axios.get(URL_DISTRICT + `?code=${code}`);
        return res.data;
    } catch (e) {
        return [];
    }
}


export const getAllWards = async (code) => {
    try {
        let res = await axios.get(URL_WARD + `?code=${code}`);
        return res.data;
    } catch (e) {
        return [];
    }
}