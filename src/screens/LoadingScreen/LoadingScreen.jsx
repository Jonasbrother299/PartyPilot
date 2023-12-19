import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { images } from '../../constants';
export default function LoadingScreen({size}) {

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  circle: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: size / 10,
    borderColor: "#fff",
    backgroundColor: 'black',
  },
});
  
  return (
    <View style={styles.container}>
      <Image
        source={images.Logo}
      />
    </View>
  );
};
