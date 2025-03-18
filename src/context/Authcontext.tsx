import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type ChildrenProps = {
    children: ReactNode
}



type AuthContextProps = {
    logout: () => void;
}




export const authContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: ChildrenProps) {


    async function logout() {

        try {
            await AsyncStorage.removeItem("token")

            return router.replace("/(routes)")
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <authContext.Provider value={{ logout }}>
            {children}
        </authContext.Provider>
    )
}