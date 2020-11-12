import { Audio } from "expo-av";

export const FEEDBACK_POSITIVE = require("../assets/sounds/success.wav");
export const FEEDBACK_NEGATIVE = require("../assets/sounds/error.wav");

export const playSound = async (sound) => {
  try {
    const res = await Audio.Sound.createAsync(sound, { shouldPlay: true });
    res.sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.didJustFinish) return;
      res.sound.unloadAsync();
    });
  } catch (err) {}
};
