import { Audio } from "expo-av";

export const FEEDBACK_POSITIVE = require("../assets/sounds/success.wav");
export const FEEDBACK_NEGATIVE = require("../assets/sounds/error.wav");

export const playSound = (sound) => {
  Audio.Sound.createAsync(sound, { shouldPlay: true })
    .then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        res.sound.unloadAsync().catch(() => {});
      });
    })
    .catch((error) => {});
};
