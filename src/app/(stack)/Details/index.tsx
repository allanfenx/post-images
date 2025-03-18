import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { authContext } from "@/context/Authcontext";
import api from "@/service/api";
import colors from "@/styles/colors";
import fonts from "@/styles/fonts";
import { AntDesign, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type UploadProps = {
    id: number;
    originalName: string;
    title: string;
    category: string;
    mimetype: string;
    created_at: string;
    filesize: number;
    keyName?: string;
    url: string;
}

export default function Details() {

    const { logout } = useContext(authContext);

    const [aspectRatio, setAspectRatio] = useState(1)
    const [upload, setUpload] = useState({} as UploadProps)
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)

    const { id } = useLocalSearchParams();


    async function findOneImage() {

        try {
            const { data } = await api.get(`s3/${id}`);

            setUpload(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRemoveimage(id: number) {

        try {
            setLoading(true)
            await api.delete(`s3/${id}`);

            await new Promise(resolve => setTimeout(resolve, 2000))

            router.replace("/(stack)")
        } catch (error: any) {
            Alert.alert("Não foi possivel remover imagem")
            setLoading(false)
            console.log(error.response);
            return console.log(error);
        }
    }

    useEffect(() => {

        findOneImage();

        if (upload.url) {
            Image.getSize(upload.url, (width, height) => {
                setAspectRatio(width / height)
            })
        }
    }, [upload.url])

    const size = upload.filesize / 1000 / 1000

    return (
        <ScrollView style={styles.container}>

            <Header iconLeft="logout" buttonLeft={logout} iconRight="arrow-back-ios-new" buttonCenter={() => router.navigate("/Upload")}
                iconCenter="share-alternative" buttonRight={() => router.back()} />

            <View style={styles.wrapimage}>
                <Image source={{ uri: upload.url }} style={{ aspectRatio, borderRadius: 10 }} />
            </View>

            <View style={styles.wrap} >
                <AntDesign name="hearto" color={colors.muted} size={24} />
                <Text style={styles.text}>66</Text>

                <Ionicons name="chatbubble-outline" size={24} color={colors.muted} style={{ marginLeft: 30 }} />
                <Text style={styles.text}>3</Text>

                <Octicons name="share-android" size={24} color={colors.muted} style={{ marginLeft: 30 }} />
                <MaterialCommunityIcons name="dots-horizontal" size={24} color={colors.muted} style={{ marginLeft: 30 }} />

                <TouchableOpacity activeOpacity={0.5} style={styles.buttonSave} onPress={() => setVisible(true)} >
                    <Text style={styles.textSave}>excluir</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapSecondText}>
                <Text style={[styles.title, { paddingBottom: 5 }]}>{upload.title}</Text>
                <Text style={styles.title}>{size.toString().substring(0, 4)} Mb</Text>
            </View>

            <Modal visible={visible} transparent={true} animationType="slide" >
                <View style={styles.modalExcluir}>

                    {loading ? <View style={styles.box}>
                        <Loading size={50} />
                    </View> :
                        <View style={styles.box}>
                            <Text style={styles.alert}>Tem certeza que deseja {"\n"} excluir essa imagem?</Text>

                            <View style={styles.footer}>
                                <Pressable style={styles.buttonExcluir} onPress={() => handleRemoveimage(upload.id)} >
                                    <Text style={styles.textButton}>Excluir</Text>
                                </Pressable>

                                <Pressable style={styles.buttonCancelar} onPress={() => setVisible(false)} >
                                    <Text style={styles.textButton}>Cancelar</Text>
                                </Pressable>
                            </View>

                        </View>
                    }

                </View>
            </Modal>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 15
    },
    wrapimage: {
        marginTop: 25
    },
    wrap: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },
    text: {
        marginLeft: 10,
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.white
    },
    buttonSave: {
        width: 80,
        height: 30,
        backgroundColor: colors.red,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto"
    },
    textSave: {
        fontFamily: fonts.mediun,
        fontSize: 14,
        color: colors.white
    },
    wrapSecondText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        marginTop: 10,
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.white,
        paddingHorizontal: 10
    },
    modalExcluir: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        width: 250,
        height: 250,
        backgroundColor: colors.white,
        alignItems: "center",
        borderRadius: 10
    },
    alert: {
        marginTop: 25,
        fontFamily: fonts.mediun,
        fontSize: 18,
        color: colors.red
    },
    footer: {
        width: "100%",
        marginTop: "auto",
        flexDirection: "row",
        paddingBottom: 25,
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    buttonExcluir: {
        width: 100,
        height: 50,
        backgroundColor: colors.red,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonCancelar: {
        width: 100,
        height: 50,
        backgroundColor: colors.gray,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    textButton: {
        fontFamily: fonts.mediun,
        fontSize: 14,
        color: colors.white
    }
})