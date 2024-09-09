import axios from "axios";

const URL_STATISTICS = "http://localhost:8080/api/admin/statistics";

export const getStatisticDemandByYear = async (year) => {
    try {
        let res = await axios.get(`${URL_STATISTICS}/demands/year`, {
            params: { year }
        });
        return res.data;
    } catch (e) {
        return [];
    }
}