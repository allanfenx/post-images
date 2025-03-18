import { Slot } from "expo-router";
import { StyleSheet } from "react-native";

import { Oswald_500Medium, Oswald_600SemiBold, useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";
import { useEffect } from "react";
import { hideAsync } from "expo-router/build/utils/splash";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/Authcontext";



export default function Layout() {



    const [fontsLoaded] = useFonts({ Oswald_500Medium, Oswald_600SemiBold, Oswald_400Regular });


    useEffect(() => {
        if (fontsLoaded) {
            hideAsync()
        }

    }, [])

    if (!fontsLoaded) {
        return null;
    }


    return (
        <AuthProvider>
            <StatusBar style="inverted" />
            <Slot />
        </AuthProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})