import colors from "@/styles/colors";
import fonts from "@/styles/fonts";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

type UploadProps = PressableProps & {
    id?: number;
    originalName?: string;
    title: string;
    category?: string;
    mimetype?: string;
    created_at?: string;
    filesize?: number;
    keyName?: string;
    url: string;
}


export function Post({ url, id, title, ...rest }: UploadProps) {

    const [aspectRatio, setAspectRatio] = useState(1)


    useEffect(() => {

        if (url) {
            Image.getSize(url, (width, height) => {
                setAspectRatio(width / height)
            })
        }
    }, [])

    return (
        <Pressable key={id} style={styles.container} {...rest} >
            <Image source={{ uri: url }} style={[styles.image, { aspectRatio }]} />
            <View style={styles.wrap} >
                <Text style={styles.title}> {title.substring(0, 13)}</Text>
                <AntDesign name="hearto" size={24} color={colors.white} />
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column-reverse",
    },
    image: {
        borderRadius: 10,
    },
    wrap: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        paddingHorizontal: 5,
        alignItems: "center"
    },
    title: {
        fontFamily: fonts.mediun,
        fontSize: 24,
        color: colors.truegray,
        paddingBottom: 5,
    }
})