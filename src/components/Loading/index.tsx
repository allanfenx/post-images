import colors from "@/styles/colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoadingProps = {
    size: number;
}


export function Loading({ size }: LoadingProps) {

    return (
        <View style={styles.container} >
            <ActivityIndicator size={size} color={colors.green} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})