import colors from "@/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, useWindowDimensions, View } from "react-native";
import splash from "@/assets/splash-icon.png";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";;


export default function Index() {

    const [token, setToken] = useState<string | null>();

    const logoScale = useSharedValue(1);
    const logoPositionY = useSharedValue(0);

    const dimensions = useWindowDimensions();

    const logoAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }, { translateY: logoPositionY.value }]
    }))

    function logoAnimation() {
        logoScale.value = withSequence(
            withTiming(0.7),
            withTiming(1.3),
            withTiming(1, undefined, (finished) => {
                if (finished) {
                    logoPositionY.value = withSequence(withTiming(50), withTiming(-dimensions.height, { duration: 1000 }))
                }
            })
        )
    }

    async function getToken() {

        try {

            await new Promise(resolve => setTimeout(resolve, 2000))

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
        logoAnimation()
        getToken()
    }, [])


    if (token) {
        return <Redirect href="/(stack)" />
    }


    return <View style={styles.container} >
        <Animated.Image source={splash} style={[styles.image, logoAnimatedStyles]} />
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 250,
        height: 250,
    }
})