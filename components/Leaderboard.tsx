import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import apiV1Client from "@api/apiv1client";
import * as Colors from "@constants/Colors";
import { UIListItem, UIText, UICenteredView } from "@components";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Leaderboard = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  let lastPosition = null;
  let lastScore = null;

  const loadData = async () => {
    try {
      const res = await apiV1Client.get(`/xp/leaderboard/${props.type}`, {
        handleException: false,
      });
      setData(Object.values(JSON.parse(res.data)));
      setError(false);
    } catch (err) {
      setError(true);
    }
    setLoaded(true);
  };

  useEffect(() => {
    if (refreshing || !loaded) {
      loadData();
    }
  }, [refreshing]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(1000);
    setRefreshing(false);
  }, []);

  const renderItem = (item, index) => {
    const position = index + 1;

    let positionText;
    if (lastPosition && item.score === lastScore) {
      positionText = `=${lastPosition}.`;
    } else {
      positionText = position <= 10 ? `${position}.` : ".....";
    }

    lastPosition = position;
    lastScore = item.score;

    return (
      <UIListItem key={index}>
        <View style={styles.entry}>
          <UIText style={styles.position}>{positionText}</UIText>
          <UIText style={styles.name}>{item.username}</UIText>
          <UIText style={styles.score}>{item.score}</UIText>
        </View>
      </UIListItem>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={data.length == 0 ? styles.scrollView : {}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <UICenteredView grow>
        {loaded ? (
          error ? (
            <UIText>The leaderboard is currently unavailable.</UIText>
          ) : data.length > 0 ? (
            <View style={styles.listItems}>
              {data.map((item, index) => renderItem(item, index))}
            </View>
          ) : (
            <UIText>There are no scores to display.</UIText>
          )
        ) : (
          <ActivityIndicator />
        )}
      </UICenteredView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  listItems: {
    flex: 1,
  },
  container: {
    width: "100%",
  },
  entry: {
    alignItems: "center",
    height: 40,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  position: {
    fontSize: 22,
    minWidth: 30,
    textAlign: "right",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
  },
  score: {
    fontSize: 28,
    color: Colors.accent,
    marginLeft: "auto",
  },
});

export default Leaderboard;
