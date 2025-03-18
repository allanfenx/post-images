import colors from "@/styles/colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type HeaderProps = {
    iconLeft: keyof typeof MaterialIcons.glyphMap;
    iconRight: keyof typeof MaterialIcons.glyphMap;
    iconCenter?: keyof typeof Entypo.glyphMap;
    buttonLeft: () => void;
    buttonRight: () => void;
    buttonCenter?: () => void;
}

export function Header({ iconLeft, iconRight, iconCenter, buttonLeft, buttonCenter, buttonRight }: HeaderProps) {

    return (
        <View style={styles.container}>
            <MaterialIcons name={iconLeft} size={24} color={colors.muted} onPress={buttonLeft} style={styles.zindex} />

            <Entypo name={iconCenter} size={24} color={colors.muted} onPress={buttonCenter} style={styles.zindex} />

            <MaterialIcons name={iconRight} size={24} color={colors.muted} onPress={buttonRight} style={styles.zindex} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    zindex: {
        zIndex: 5
    }
})