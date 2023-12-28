import React from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { useSelector } from "react-redux";

import Text from "@components/ui/Text";
import { playSound } from "@utils/sounds";

function VocabularyList(props) {
  const words = useSelector((state) => state.words.byId);

  const handleOnPress = (word) => {
    playSound({ uri: word.soundUrl });
  };

  const renderItem = ({ item }) => {
    const word = words[item.word];
    const totalGuesses = item.correct + item.wrong;

    let successRate = "-";
    if (totalGuesses > 0) {
      successRate = `${Math.round((item.correct / totalGuesses) * 100)}%`;
    }

    return (
      <Pressable onPress={() => handleOnPress(word)}>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.word}>
              {`${word.name[0].toUpperCase()}${word.name.slice(1)}`}
            </Text>
            <Text style={styles.translation}>{word.translation}</Text>
          </View>

          <View style={styles.contentRight}>
            <Text style={styles.textSmall}>
              Attempts:
              {totalGuesses}
            </Text>
            <Text style={styles.textSmall}>
              Success:
              {successRate}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={props.vocabulary}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

VocabularyList.defaultProps = {
  vocabulary: [],
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  list: {
    padding: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    marginVertical: 5,
    padding: 5,
  },
  word: {
    fontSize: 20,
  },
  translation: {
    fontSize: 12,
  },
  contentRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textSmall: {
    fontSize: 14,
  },
});

export default VocabularyList;
