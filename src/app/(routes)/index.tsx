import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "@/styles/colors";
import Input from "@/components/Input";
import fonts from "@/styles/fonts";
import galeria from "@/assets/galeria.jpg";
import asyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { router } from "expo-router";
import api from "@/service/api";


export default function Login() {


    const [email, setEmail] = useState("allanfenx@hotmail.com");
    const [password, setPassword] = useState("Fen@417020");


    async function handleLogin() {


        try {
            const { data } = await api.post("auth", {
                email, password
            })

            await asyncStorage.setItem("token", data.token);

            router.replace("/(stack)")
        } catch (error: any) {

            console.error(error);
            console.log(error.response.data);
        }

    }


    return (
        <View style={styles.container} >

            <KeyboardAvoidingView behavior="position" >


                <View style={styles.header}>
                    <Text style={styles.title}>Login</Text>

                    <Image source={galeria} style={styles.image} />

                </View>


                <View style={styles.wrap}>
                    <Input text="Email" icon="email" value={email} onChangeText={setEmail} keyboardType="email-address" />

                    <Input text="Password" icon="key" secureTextEntry value={password} onChangeText={setPassword} />

                </View>


                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.textButton} >Entrar</Text>
                </Pressable>


            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: colors.background
    },
    header: {
        width: "100%",
        alignItems: "center",
        marginTop: 70
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 36,
        color: colors.white
    },
    image: {
        marginTop: 25,
        width: 200,
        height: 200,
        borderRadius: 50
    },
    wrap: {
        marginTop: 50,
        rowGap: 40,
    },
    button: {
        marginTop: 45,
        width: "100%",
        height: 70,
        backgroundColor: colors.green,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    textButton: {
        fontFamily: fonts.mediun,
        fontSize: 24,
        color: colors.truegray
    }
})