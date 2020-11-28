import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppText from "./UI/AppText";
import { useSelector } from "react-redux";

const VocabularyList = (props) => {
  const words = useSelector((state) => state.words.byId);

  const renderItem = ({ item }) => {
    const word = words[item.word];
    const totalGuesses = item.correct + item.wrong;

    let successRate = "-";
    if (totalGuesses > 0) {
      successRate = Math.round((item.correct / totalGuesses) * 100) + "%";
    }

    return (
      <View style={styles.listItem}>
        <AppText style={styles.word}>{word.name}</AppText>
        <View>
          <AppText style={styles.textSmall}>
            No. of guesses: {totalGuesses}
          </AppText>
          <AppText style={styles.textSmall}>
            Success rate: {successRate}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={props.vocabulary}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

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
    fontSize: 22,
  },
  textSmall: {
    fontSize: 14,
  },
});

export default VocabularyList;
