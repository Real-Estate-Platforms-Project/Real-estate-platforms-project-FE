import axios from "axios";

const URL_DEMAND = "http://localhost:8080/api/demand"

export const getAllDemand = async () => {
    try {
        let res = await axios.get(URL_DEMAND);
        console.log(res.data)
        return res.data;
    } catch (e) {
        return [];
    }
}

export  const deleteDemand = async (id) => {
    try {
        await axios.delete(URL_DEMAND + "/" + id);
        return true;
    } catch (e) {
        console.log(e)
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