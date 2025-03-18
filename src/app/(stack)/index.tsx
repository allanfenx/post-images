import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Post } from "@/components/Post";
import { authContext } from "@/context/Authcontext";
import api from "@/service/api";
import colors from "@/styles/colors";
import fonts from "@/styles/fonts";
import { optionsList } from "@/utils/data";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

export default function Home() {

    const { logout } = useContext(authContext)

    const [select, setSelected] = useState("All")
    const [uploads, setUploads] = useState([] as UploadProps[])



    async function renderItems() {

        try {
            const { data } = await api.get("s3");

            setUploads(data)

            setUploads(state => state.filter(upload => {

                if (select === "All") {
                    return upload;
                }

                if (upload.category === select) {
                    return upload;
                }


            }));

        } catch (error: any) {

            console.log(error);
        }
    }

    function handleFilter(title: string) {

        switch (true) {
            case title === "All":
                setSelected("All")
                break;
            case title === "Viagem":
                setSelected("Viagem")
                break;
            case title === "Moda":
                setSelected("Moda")
                break;
            case title === "Mobile":
                setSelected("Mobile")
                break;
            case title === "Casamento":
                setSelected("Casamento")
                break;
            case title === "Beleza":
                setSelected("Beleza")
                break;
            case title === "Tatuagem":
                setSelected("Tatuagem")
                break;
            case title === "Animais":
                setSelected("Animais")
                break;
        }


    }


    function postsByColunm(column: "right" | "left") {

        const rest = column === "left" ? 0 : 1;

        return uploads.filter((_, index) => index % 2 === rest).map(post => <Post key={post.id} url={post.url} title={post.title} onPress={() => renderOneImage(post.id)} />)
    }

    function renderOneImage(id: number) {
        router.navigate({ pathname: "/Details", params: { id } })

    }

    useEffect(() => {
        renderItems()
    }, [select, uploads.length])

    return (
        <View style={styles.container}>

            <Header iconLeft="logout" buttonLeft={logout} iconRight="settings" buttonCenter={() => router.navigate("/Upload")}
                iconCenter="share-alternative" buttonRight={() => router.navigate("/Perfil")} />

            <View style={styles.header}>
                <FlatList data={optionsList} keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ columnGap: 14, paddingHorizontal: 10 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => handleFilter(item.title)} style={{ zIndex: 5 }} >
                                <Text style={[styles.text, select === item.title && {
                                    borderBottomWidth: 2,
                                    borderColor: colors.truegray
                                }]}>{item.title}</Text>
                            </Pressable>
                        )
                    }} />
            </View>


            {!uploads ? <Loading size={100} /> :
                <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} >
                    <View style={styles.wrap}>
                        <View style={styles.column} >{postsByColunm("left")}</View>
                        <View style={styles.column} >{postsByColunm("right")}</View>
                    </View>
                </ScrollView>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: colors.background
    },
    header: {
        marginTop: 25
    },
    text: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.muted,
    },
    list: {
        marginTop: 45,
        paddingBottom: 60
    },
    wrap: {
        flex: 1,
        flexDirection: "row",
        columnGap: 10
    },
    column: {
        flex: 1,
        rowGap: 10
    },
    spiner: {
        flex: 1,
    }
})