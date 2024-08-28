import axios from "axios";
import { apiUrl } from "./config";

export const getProduct = async (id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //when can't get API response, web will return error message
        if(response.statusText !== 'OK'){ 
            throw new Error(response.data.message); 
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};