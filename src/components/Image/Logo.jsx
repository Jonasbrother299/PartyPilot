import { StyleSheet, View, Image } from 'react-native'

export default function Logo({ src, dimension, }) {

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        image: {
            width: dimension,
            height: dimension,
        },
    })
    return (
        <View style={styles.container}>
            <Image source={src} style={styles.image} />
        </View>
    )
}