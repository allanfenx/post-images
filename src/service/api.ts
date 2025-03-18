import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

const api = axios.create({ baseURL: "http://192.168.0.102:8080" })

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
        const decode = jwtDecode(token);

        if (new Date(Number(decode.exp) * 1000) < new Date()) {
            await AsyncStorage.removeItem("token")
            router.replace("/(routes)")
        }
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
})


export default api;