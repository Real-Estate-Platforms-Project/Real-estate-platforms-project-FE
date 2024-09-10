import axios from "axios";

const URL_DEMAND = "http://localhost:8080/api/demand"

export const getAllDemand = async (roles) => {
    try {
        if(roles.contains("ROLE_ADMIN")){
            let res = await axios.get(URL_DEMAND+"?_sort=isVerify,createdAt&_order=asc,desc");
            return res.data;
        } else {
            let res = await axios.get(URL_DEMAND+"?isVerify=1&_sort=createdAt&_order=desc");
            return res.data;
        }
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

export const saveDemand = async (demand) => {
    try {
        await axios.post(URL_DEMAND, demand)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}