import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBadges, fetchUserBadges } from "../store/actions/badges";
import Badge from "../components/Badge";
import { ActivityIndicator } from "react-native-paper";
import CenteredView from "../components/AppCenteredView";
import { selectBadgesGroupedByType } from "../store/selectors/badge";

const BadgesScreen = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const groupedBadges = useSelector((state) =>
    selectBadgesGroupedByType(state)
  );
  const userBadges = useSelector((state) => state.badges.userBadges.byBadgeId);

  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(fetchBadges()), dispatch(fetchUserBadges())]);
      setLoaded(true);
    })();
  }, []);

  const renderBadge = (badge) => {
    return (
      <View style={styles.badgeItem}>
        <Badge
          style={{ margin: 10 }}
          key={badge.shortname}
          badge={badge}
          userBadge={userBadges[badge.id] ?? null}
        />
      </View>
    );
  };

  const renderBadgeGroup = (badgeGroup, i) => {
    return (
      <View key={i} style={styles.badgeGroup}>
        {Object.values(badgeGroup).map((badge) => renderBadge(badge))}
      </View>
    );
  };

  return (
    <CenteredView>
      {loaded ? (
        <View style={styles.container}>
          {Object.values(groupedBadges).map((badgeGroup, i) =>
            renderBadgeGroup(badgeGroup, i)
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </CenteredView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeGroup: {
    flexDirection: "row",
  },
  badgeItem: {
    margin: 10,
    width: 100,
    height: 100,
  },
});

export default BadgesScreen;
