import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Leaderboard from "../components/Leaderboard";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import * as Colors from "../constants/Colors";
const initialLayout = { width: Dimensions.get("window").width };

const DailyRoute = () => <Leaderboard type="daily" />;
const WeeklyRoute = () => <Leaderboard type="weekly" />;
const MonthlyRoute = () => <Leaderboard type="monthly" />;

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: Colors.accent }}
  />
);

const LeaderboardScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "daily", title: "Daily" },
    { key: "weekly", title: "Weekly" },
    { key: "monthly", title: "Monthly" },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={SceneMap({
        daily: DailyRoute,
        weekly: WeeklyRoute,
        monthly: MonthlyRoute,
      })}
      style={styles.container}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
});

export default LeaderboardScreen;
