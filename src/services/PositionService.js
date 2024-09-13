import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees/position';

export const getPosition = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const res = await axios.get(API_URL, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return res.data;
    } catch (e) {
        console.error("Error fetching position data:", e);
        throw e;
    }
};