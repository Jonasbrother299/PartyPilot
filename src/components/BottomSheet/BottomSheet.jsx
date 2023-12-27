import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, icons } from "../../constants";
import Icons from "../Basics/Image/icons";
import Spacer from "../Basics/Spacer/spacer";

export default function BottomSheet() {
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const goToCreateEvent = () => {
    setModalVisible(false);
    navigation.navigate("CreateEvent");
  };

  const goToCreateCocktail = () => {
    setModalVisible(false);
    navigation.navigate("CreateCocktail");
  };

  const openModal = () => {
    resetPan();
    setModalVisible(true);
  };

  const closeModal = () => {
    resetPan();
    setModalVisible(false);
  };

  const resetPan = () => {
    Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
  };

  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // If the user has dragged the modal down by more than 50 units, close the modal
          closeModal();
        } else {
          // If not, animate the modal back to the top
          Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  const translateY = panY.interpolate({
    inputRange: [0, 300], // Adjusting the range based on your modal height
    outputRange: [0, 300],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackgroundDarkener} />
      </Modal>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            width: "100%",
            transform: [{ translateY }],
          }}
        >
          <View style={styles.containerContent}>
            <View style={styles.dragIndicatorContainer}>
              <View style={styles.dragIndicator} />
            </View>
            <Spacer horizontal={20} vertical={20}>
              <View style={styles.headerContainer}>
                <Text style={styles.contentHeadline}>Create</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Icons src={icons.close} dimension={30} />
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 10 }}>
                <TouchableOpacity
                  onPress={goToCreateEvent}
                  style={styles.createContainer}
                >
                  <Icons
                    src={icons.event}
                    dimension={25}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.contentText}>New event</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={goToCreateCocktail}
                  style={styles.createContainer}
                >
                  <Icons
                    src={icons.cocktail}
                    dimension={25}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.contentText}>New recipe</Text>
                </TouchableOpacity>
              </View>
            </Spacer>
          </View>
        </Animated.View>
      </Modal>

      <TouchableOpacity
        onPress={openModal}
        activeOpacity={1}
        style={styles.containerButton}
      >
        <View style={styles.containerButton__wrapper}>
          <Text style={styles.containerButton__text}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackgroundDarkener: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  // Style for DragIndicator
  dragIndicatorContainer: {
    alignItems: "center",
  },
  dragIndicator: {
    backgroundColor: COLORS.primaryColour2,
    width: 70,
    height: 4,
    borderRadius: 2,
  },
  // Inside the Modal
  createContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  containerContent: {
    height: 300,
    backgroundColor: COLORS.primaryColour1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },

  contentText: { fontSize: SIZES.medium, color: COLORS.fontColour },
  contentHeadline: { fontSize: SIZES.xxLarge, color: COLORS.fontColour },

  // Button to open Modal
  containerButton: {
    position: "absolute",
    bottom: 20,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  containerButton__wrapper: {
    backgroundColor: COLORS.primaryColour1,
    padding: 10,
    borderRadius: 30,
    width: 50,
    borderColor: COLORS.primaryColour2,
    borderWidth: 2,
  },
  containerButton__text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 25,
  },
});
