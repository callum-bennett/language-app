import React from "react";
import { Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import Leaderboard from "@components/Leaderboard";
import * as Colors from "@constants/Colors";

const initialLayout = { width: Dimensions.get("window").width };

function DailyRoute() {
  return <Leaderboard type="daily" />;
}
function WeeklyRoute() {
  return <Leaderboard type="weekly" />;
}
function MonthlyRoute() {
  return <Leaderboard type="monthly" />;
}

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: Colors.accent }}
  />
);

function LeaderboardScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "daily", title: "Daily" },
    { key: "weekly", title: "Weekly" },
    { key: "monthly", title: "Monthly" },
  ]);

  return (
    <TabView
      lazy
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={SceneMap({
        daily: DailyRoute,
        weekly: WeeklyRoute,
        monthly: MonthlyRoute,
      })}
      initialLayout={initialLayout}
    />
  );
}

export default LeaderboardScreen;
