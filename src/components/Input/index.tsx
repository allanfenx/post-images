import colors from "@/styles/colors";
import fonts from "@/styles/fonts";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
    text: string,
    icon?: keyof typeof Fontisto.glyphMap;
    icons?: keyof typeof AntDesign.glyphMap;
}


export default function Input({ text, icon, icons, ...rest }: InputProps) {
    return (
        <View style={styles.wrap} >
            <TextInput placeholder={text} style={styles.text} {...rest} />
            <Fontisto name={icon} size={24} color={colors.gray} />
            <AntDesign name={icons} size={24} color={colors.gray} style={{ marginLeft: -15 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.white,
        boxShadow: "rgba(0,0,0,0.5) 0 1px 10px"
    },
    text: {
        fontFamily: fonts.regular,
        fontSize: 24,
        color: colors.gray,
        width: "90%",
        height: 60,
    }
})