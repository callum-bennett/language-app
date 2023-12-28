import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

import apiV1Client from "@api/apiv1client";
import Badge from "@components/Badge";
import Modal from "@components/ui/Modal";
import Text from "@components/ui/Text";
import CenteredView from "@components/ui/CenteredView";
import {
  clearNotifications,
  fetchBadges,
  fetchUserBadges,
} from "@store/actions";
import {
  selectBadgesGroupedByType,
  selectNotificationsByType,
} from "@store/selectors";

const BadgesScreen = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const isFocused = useIsFocused();

  const [groupedBadges, notifications] = useSelector((state) => [
    selectBadgesGroupedByType(state),
    selectNotificationsByType(state, "badge"),
  ]);

  const userBadges = useSelector((state) => state.badges.userBadges.byBadgeId);

  const loadData = async () => {
    if (notifications) {
      dispatch(clearNotifications("badge", apiV1Client));
    }
    await Promise.all([dispatch(fetchBadges()), dispatch(fetchUserBadges())]);
    setLoaded(true);
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
      return () => {
        setLoaded(false);
      };
    } else {
      setLoaded(false);
    }
  }, [isFocused]);

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
    <CenteredView grow>
      {loaded ? (
        Object.values(groupedBadges).map((badgeGroup, i) =>
          renderBadgeGroup(badgeGroup, i)
        )
      ) : (
        <ActivityIndicator />
      )}
      {selectedBadge && (
        <Modal onTouchAway={handleHideModal}>
          <CenteredView>
            {renderBadge(
              selectedBadge,
              userBadges[selectedBadge.id] ?? null,
              true
            )}
            <Text style={styles.description}>{selectedBadge.description}</Text>
          </CenteredView>
        </Modal>
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
