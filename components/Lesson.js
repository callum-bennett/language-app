import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Lesson = (props) => {
  const max = props.words.length;

  return <View>{props.words.map((word) => {})}</View>;
};

const styles = StyleSheet.create({});

export default Lesson;
