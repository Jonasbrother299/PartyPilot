import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient';

export default function Favourite() {

    return (
      <View style={styles.container}>
         <LinearGradient
        colors={[COLORS.heroColour, 'black']}
        style={styles.background}
       ></LinearGradient>
        <Text>Favourite</Text>
      </View>
    )
}

const styles = StyleSheet.create({
   container: {
    backgroundColor: COLORS.heroColour,
    width: "100%",
    height: "100%",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
})