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
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await apiV1Client.get(`/xp/leaderboard/${props.type}`);
      setData(JSON.parse(res.data));
    } catch (err) {
      setData(false);
    }
    setLoaded(true);
  };

  useEffect(() => {
    if (refreshing || !loaded) {
      loadData();
    }
  }, [refreshing]);

  useEffect(() => {
    loadData();
    return () => {
      setLoaded(false);
    };
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(1000);
    setRefreshing(false);
  }, []);

  const renderItem = (item, index) => {
    return (
      <AppListItem key={index}>
        <View style={styles.entry}>
          <AppText style={styles.position}>#{index + 1}</AppText>
          <AppText style={styles.name}>{item.username}</AppText>
          <AppText style={styles.score}>{item.score}</AppText>
        </View>
      </AppListItem>
    );
  };

  return (
    <CenteredView grow>
      {loaded ? (
        <ScrollView
          contentContainerStyle={styles.screen}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {data ? (
            Object.values(data).map((item, index) => renderItem(item, index))
          ) : (
            <AppText>The leaderboard is currently unavailable.</AppText>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </CenteredView>
  );
};

const styles = StyleSheet.create({
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
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  score: {
    fontSize: 28,
    color: Colors.accent,
    marginLeft: "auto",
  },
});

export default Leaderboard;
