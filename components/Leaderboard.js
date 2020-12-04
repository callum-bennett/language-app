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
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      const res = await apiV1Client.get(`/xp/leaderboard/${props.type}`, {
        handleException: false,
      });
      setData(JSON.parse(res.data));
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
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <CenteredView grow>
        {loaded ? (
          error ? (
            <AppText>The leaderboard is currently unavailable.</AppText>
          ) : (
            <View style={styles.listItems}>
              {Object.values(data).map((item, index) =>
                renderItem(item, index)
              )}
            </View>
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
