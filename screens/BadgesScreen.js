import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchBadges, fetchUserBadges } from "../store/actions/badges";
import Badge from "../components/Badge";
import { ActivityIndicator } from "react-native-paper";
import CenteredView from "../components/UI/AppCenteredView";
import { selectBadgesGroupedByType } from "../store/selectors/badge";
import AppModal from "../components/UI/AppModal";
import AppText from "../components/UI/AppText";
import * as Colors from "../constants/Colors";

const BadgesScreen = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

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

  const renderBadge = (badge, userBadge, showDescription = false) => {
    return (
      <View key={badge.shortname} style={styles.badgeItem}>
        <Badge
          style={{ margin: 10 }}
          badge={badge}
          userBadge={userBadge}
          showDescription={showDescription}
          onSelectBadge={handleSelectBadge}
        />
      </View>
    );
  };

  const renderBadgeGroup = (badgeGroup, i) => {
    return (
      <View key={i} style={styles.badgeGroup}>
        {Object.values(badgeGroup).map((badge) => {
          const userBadge = userBadges[badge.id] ?? null;
          return renderBadge(badge, userBadge);
        })}
      </View>
    );
  };

  const handleSelectBadge = (badge) => {
    setSelectedBadge(badge);
  };

  const handleHideModal = () => {
    setSelectedBadge(null);
  };

  return (
    <CenteredView grow onPress={handleHideModal}>
      {loaded ? (
        <Pressable onPress={handleHideModal}>
          <CenteredView>
            <CenteredView>
              {selectedBadge && (
                <AppModal onTouchAway={handleHideModal}>
                  <CenteredView>
                    {renderBadge(
                      selectedBadge,
                      userBadges[selectedBadge.id] ?? null,
                      true
                    )}
                    <AppText style={styles.description}>
                      {selectedBadge.description}
                    </AppText>
                  </CenteredView>
                </AppModal>
              )}
            </CenteredView>
            {Object.values(groupedBadges).map((badgeGroup, i) =>
              renderBadgeGroup(badgeGroup, i)
            )}
          </CenteredView>
        </Pressable>
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
  description: {
    fontSize: 16,
    marginTop: 5,
    color: Colors.primary,
    textAlign: "center",
    maxWidth: "90%",
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
