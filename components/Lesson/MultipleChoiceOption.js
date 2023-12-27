import React, { memo, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import UICard from "@components/UI/UICard";
import UIText from "@components/UI/UIText";

import * as Colors from "@constants/Colors";

const MultipleChoiceOption = (props) => {
  const [selected, setSelected] = useState(false);
  const { image, isCorrect, locked, onChoose, value } = props;
  const handlePress = () => {
    if (!locked) {
      setSelected(true);
      onChoose(isCorrect, value);
    }
  };

  let containerStyle = [styles.container];
  if (selected) {
    containerStyle.push({
      backgroundColor: isCorrect ? Colors.correctBg : Colors.wrongBg,
    });
  }

  const TouchableComponent = props.locked
    ? TouchableWithoutFeedback
    : TouchableNativeFeedback;

  return (
    <UICard style={containerStyle}>
      <TouchableComponent onPress={handlePress}>
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: image }} />
          <UIText style={{ fontSize: 20 }}>{value}</UIText>
        </View>
      </TouchableComponent>
    </UICard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  image: {
    display: "flex",
    borderRadius: 4,
    marginBottom: 10,
    height: "100%",
    flex: 1,
    width: "100%",
  },
});

export default memo((props) => <MultipleChoiceOption {...props} />);
