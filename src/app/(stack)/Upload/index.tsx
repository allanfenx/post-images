import { Header } from "@/components/Header";
import Input from "@/components/Input";
import { authContext } from "@/context/Authcontext";
import colors from "@/styles/colors";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import fonts from "@/styles/fonts";
import api from "@/service/api";
import DropDownPicker from "react-native-dropdown-picker";
import { options } from "@/utils/data";


export default function Upload() {

    const { logout } = useContext(authContext);

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [disable, setDisable] = useState(false);
    const [items, setItems] = useState(options)
    const [open, setOpen] = useState(false)
    const [fileName, setFileName] = useState<null | string | undefined>(null);

    async function uploadImage() {

        const result = await launchImageLibraryAsync({ mediaTypes: ["images"] })

        if (!result.canceled) {
            setFileName(result.assets[0].fileName)
            setImage(result.assets[0].uri)
        }

    }

    async function handleSendImage() {

        const data = new FormData();

        if (image == undefined) {
            Alert.alert("Você precisa definir uma imagem")
        }

        if (category == undefined) {
            Alert.alert("Category não pode ser vazio!")
        }

        const [, mimetype] = fileName?.split(".") as string[];

        data.append("file", { name: `${title}.${mimetype}`, type: "image/jpg", uri: image } as any);
        data.append("category", category);
        data.append("title", title);

        try {
            setDisable(true)

            await api.post("s3", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            router.navigate("/(stack)")
        } catch (error: any) {
            console.log(error);
            setDisable(false)
        }

    }

    return (
        <View style={styles.container}>
            <Header iconLeft="logout" buttonLeft={logout} buttonCenter={() => router.navigate("/Upload")}
                iconRight="arrow-back-ios-new" buttonRight={() => router.back()} />

            <View style={styles.wrapImage}>
                {image ? <Image source={{ uri: image }} style={styles.image} /> :
                    <View style={styles.image}>
                        <Entypo name="share-alternative" size={64} color={colors.gray} />
                    </View>}
            </View>

            <KeyboardAvoidingView behavior="position" >


                <View style={styles.wrapInput}>
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        listMode="SCROLLVIEW"
                        placeholder="Category"
                        style={{ height: 70 }}
                        textStyle={styles.placeholderStyle} />

                    <Input text="title" icon="text-height" value={title} onChangeText={setTitle} />

                    <View>
                        <Pressable style={styles.upload} onPress={uploadImage}>
                            <Entypo name="share-alternative" size={24} color={colors.gray} />
                        </Pressable>
                    </View>
                </View>

            </KeyboardAvoidingView>

            <Pressable style={styles.button} disabled={disable} onPress={handleSendImage} >
                {disable ? <ActivityIndicator /> :
                    <Text style={styles.text}>Send image</Text>}
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    wrapHeader: {
        paddingHorizontal: 20
    },
    wrapImage: {
        marginTop: 20,
        width: "100%",
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: colors.muted,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    wrapInput: {
        marginTop: 45,
        rowGap: 25,
    },
    placeholderStyle: {
        fontFamily: fonts.regular,
        fontSize: 24,
        color: colors.gray,
    },
    upload: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    button: {
        marginTop: "auto",
        width: "100%",
        flexDirection: "row",
        height: 60,
        backgroundColor: colors.green,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: fonts.mediun,
        fontSize: 18,
        color: colors.white
    }
})