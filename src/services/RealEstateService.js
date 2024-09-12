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

async function getRealEstates() {
    let response = null
    await axios({
        url: `http://localhost:8080/api/real-estate`,
        headers: {
            Accept: 'application/json'
        },
        method: 'GET'
    })
        .then((res) => {
            response = res
        })
        .catch((e) => {
            response = e.response
        })

    return response.data
}
export default {
    saveRealEstate,
    findRealEstate,
    getRealEstates
}
