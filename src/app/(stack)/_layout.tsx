import { Stack } from "expo-router";


export default function StackLayout() {


    return (
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
            <Stack.Screen name="Perfil/index" />
            <Stack.Screen name="Upload/index" />
            <Stack.Screen name="Details/index" />
        </Stack>
    )
}