import axios from "axios";

const URL_STUDENT = "http://localhost:8080/students"

export const getAllDemand = async () => {
    try {
        let res = await axios.get(URL_STUDENT + "?_sort=created_at&_order=desc"
        );
        return res.data;
    } catch (e) {
        return []
    }
}