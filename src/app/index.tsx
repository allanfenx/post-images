import colors from "@/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";



export default function Index() {

    const [token, setToken] = useState<string | null>();


    async function getToken() {

        try {

            const result = await AsyncStorage.getItem("token");

            if (!result) {
                return router.replace("/(routes)")
            }

            setToken(result);
        } catch (error: any) {
            Alert.alert(error.response.status)
        }

    }


    useEffect(() => {


        getToken()
    }, [token])


    if (token) {
        return <Redirect href="/(stack)" />
    }


    return <View style={{ flex: 1, backgroundColor: colors.green }} />


}