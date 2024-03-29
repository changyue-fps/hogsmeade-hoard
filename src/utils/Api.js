import axios from "axios";

export default class Api {
    constructor() {
        //TODO: Put baseURl to .env
        console.log(process.env.REACT_APP_BASE_URL);
        this.baseUrl = `${process.env.REACT_APP_BASE_URL}/api/` || "http://localhost:8080/api/";
    }

    async getShops() {
        const url = `${this.baseUrl}shops`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    async getShop(id) {
        const url = `${this.baseUrl}shops/${id}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }


}