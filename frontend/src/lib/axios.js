import axios from "axios";

const BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api"

const api = axios.create({
    baseURL: "http://localhost:3001/api"
})

export default api;