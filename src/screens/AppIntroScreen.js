import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useDispatch } from "react-redux";

import { setOnboarded } from "@store/actions/app";
import apiV1Client from "@api/apiv1client";

const imageHeight = Dimensions.get("window").height * 0.6;
const imageWidth = imageHeight * 0.54;

function AppIntroScreen(props) {
  const dispatch = useDispatch();

  const onComplete = () => {
    dispatch(setOnboarded(apiV1Client));
  };

  const pages = [
    {
      backgroundColor: "#FCACB4",
      title: "Learn",
      subtitle: "Choose a category from the home screen",
      image: (
        <Image
          source={require("../../assets/images/ob1.jpg")}
          style={styles.image}
        />
      ),
    },
    {
      backgroundColor: "#FFFD82",
      title: "Earn XP",
      subtitle: "Points are awarded for each correct answer",
      image: (
        <Image
          source={require("../../assets/images/ob2.jpg")}
          style={styles.image}
        />
      ),
    },
    {
      backgroundColor: "#5Eb3E8",
      title: "Compete with other users",
      subtitle: "Daily, weekly, and monthly leaderboards are available",
      image: (
        <Image
          source={require("../../assets/images/ob3.jpg")}
          style={styles.image}
        />
      ),
    },
    {
      backgroundColor: "#BDF2F2",
      title: "Unlock badges",
      subtitle: "Badges are awarded for various achievements",
      image: (
        <Image
          source={require("../../assets/images/ob4.jpg")}
          style={styles.image}
        />
      ),
    },
  ];

  return (
    <Onboarding
      imageContainerStyles={styles.container}
      pages={pages}
      onDone={onComplete}
      onSkip={onComplete}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -100,
    paddingBottom: 20,
  },
  image: { width: imageWidth, height: imageHeight },
});

export default AppIntroScreen;
