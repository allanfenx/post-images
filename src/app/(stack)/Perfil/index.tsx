import { Header } from "@/components/Header";
import Input from "@/components/Input";
import { authContext } from "@/context/Authcontext";
import colors from "@/styles/colors";
import fonts from "@/styles/fonts";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Perfil() {

    const { logout } = useContext(authContext);

    return (
        <View style={styles.container} >
            <View style={styles.wrapHeader}>
                <Header iconLeft="logout" buttonLeft={logout} buttonCenter={() => router.navigate("/Upload")} iconRight="arrow-back-ios-new" buttonRight={() => router.back()} />
            </View>
            <View style={styles.secondContainer}>

                <View style={styles.wrapImage}>
                    <Image source={{ uri: "https://github.com/allanfenx.png" }} style={styles.image} />
                </View>

                <View style={styles.content}>
                    <Input icon="email" text="Email" keyboardType="email-address" />
                    <Input icons="user" text="Name" />
                    <Input icon="key" text="Password" secureTextEntry />

                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.5} >
                    <Text style={styles.text}>Atualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    wrapHeader: {
        paddingHorizontal: 20
    },
    secondContainer: {
        flex: 1,
        marginTop: 100,
        backgroundColor: colors.truegray,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    wrapImage: {
        width: "100%",
        alignItems: "center",
        marginTop: -80
    },
    image: {
        width: 139,
        height: 139,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: colors.green
    },
    content: {
        marginTop: 50,
        rowGap: 40,
    },
    button: {
        marginTop: "auto",
        width: "100%",
        height: 70,
        backgroundColor: colors.background,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: fonts.mediun,
        fontSize: 24,
        color: colors.truegray
    }
})