import { Audio } from "expo-av";

export const FEEDBACK_POSITIVE = require("../assets/sounds/success.wav");
export const FEEDBACK_NEGATIVE = require("../assets/sounds/error.wav");

export const WORDS = {
  yo: require("../assets/sounds/words/yo.mp3"),
  madre: require("../assets/sounds/words/madre.mp3"),
  padre: require("../assets/sounds/words/padre.mp3"),
  bebe: require("../assets/sounds/words/bebe.mp3"),
  hijo: require("../assets/sounds/words/hijo.mp3"),
  hija: require("../assets/sounds/words/hija.mp3"),
  niño: require("../assets/sounds/words/nino.mp3"),
  niña: require("../assets/sounds/words/nina.mp3"),
  hermana: require("../assets/sounds/words/hermana.mp3"),
  hermano: require("../assets/sounds/words/hermano.mp3"),
};

export const playSound = async (sound) => {
  try {
    const res = await Audio.Sound.createAsync(sound, { shouldPlay: true });
    res.sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.didJustFinish) return;
      res.sound.unloadAsync();
    });
  } catch (err) {}
};
