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
export const getStatisticDemandByMonth = async (year, month) => {
    try {
        let res = await axios.get(`${URL_STATISTICS}/demands/month`, {
            params: { year, month }
        });
        return res.data;
    } catch (e) {
        return [];
    }
}

export const getStatisticDemandByDay = async (startDate, endDate) => {
    try {
        let res = await axios.get(`${URL_STATISTICS}/demands/day`, {
            params: { startDate, endDate }
        });
        return res.data;
    } catch (e) {
        return [];
    }
}

export const getStatisticTransactionByYear = async (year) => {
    try {
        let res = await axios.get(`${URL_STATISTICS}/transactions/year`, {
            params: { year }
        });
        return res.data;
    } catch (e) {
        return [];
    }
}
export const getStatisticTransactionByMonth = async (year, month) => {
    try {
        let res = await axios.get(`${URL_STATISTICS}/transactions/month`, {
            params: { year, month }
        });
        return res.data;
    } catch (e) {
        return [];
    }
}