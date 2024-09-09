import axios from "axios";

const URL_DEMAND = "http://localhost:8080/api/demand"

export const getAllDemand = async () => {
    try {
        let res = await axios.get(URL_DEMAND + "?&_sort=created_at&_order=desc"
        );
        return res.data;
    } catch (e) {
        return []
    }
}