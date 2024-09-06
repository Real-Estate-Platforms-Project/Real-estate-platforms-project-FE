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