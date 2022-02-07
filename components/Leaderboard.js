import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import AppText from "./UI/AppText";
import AppListItem from "./UI/AppListItem";
import * as Colors from "../constants/Colors";
import apiV1Client from "../api/apiv1client";
import { ActivityIndicator } from "react-native-paper";
import CenteredView from "./UI/AppCenteredView";

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
      <AppListItem key={index}>
        <View style={styles.entry}>
          <AppText style={styles.position}>{positionText}</AppText>
          <AppText style={styles.name}>{item.username}</AppText>
          <AppText style={styles.score}>{item.score}</AppText>
        </View>
      </AppListItem>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={data.length == 0 ? styles.scrollView : {}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <CenteredView grow>
        {loaded ? (
          error ? (
            <AppText>The leaderboard is currently unavailable.</AppText>
          ) : data.length > 0 ? (
            <View style={styles.listItems}>
              {data.map((item, index) => renderItem(item, index))}
            </View>
          ) : (
            <AppText>There are no scores to display.</AppText>
          )
        ) : (
          <ActivityIndicator />
        )}
      </CenteredView>
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
