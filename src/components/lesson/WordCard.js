import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign as Icon } from "@expo/vector-icons";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

import Text from "@components/ui/Text";
import * as Colors from "@constants/Colors";
import { playSound } from "@utils/sounds";

const WordCard = (props) => {
  const AnimationRef = useRef(null);
  const [listened, setListened] = useState(false);

  const { word } = props;

  const handleAudioPress = () => {
    playSound({ uri: props.word.soundUrl });
    AnimationRef.current.pulse();
    props.onWordComplete(word.id);
    setListened(true);
  };

  const handleSwipe = (dir) => {
    if (!listened && dir === swipeDirections.SWIPE_LEFT) {
      AnimationRef.current.bounce();
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => handleSwipe(direction, state)}
      style={styles.card}
    >
      <View>
        <Image source={{ uri: word.imageUrl }} style={styles.image} />
      </View>

      <Text style={styles.word}>{word.name}</Text>
      <Animatable.View ref={AnimationRef} direction="alternate">
        <TouchableWithoutFeedback
          hitSlop={{ left: 30, right: 30, top: 30, bottom: 30 }}
          onPress={handleAudioPress}
        >
          <View>
            <Icon style={styles.audio} name="sound" size={24} />
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  card: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  word: {
    fontSize: 24,
  },
  audio: {
    color: Colors.primary,
    marginTop: 15,
  },
});

export default WordCard;
