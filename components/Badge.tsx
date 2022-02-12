import React from "react";
import { Image, StyleSheet, View, Pressable } from "react-native";

import { UIText, UICenteredView } from "@components";
import * as Colors from "@constants/Colors";

const Badge = (props) => {
  const { badge, userBadge } = props;

  let icon = badge.iconHidden;
  let containerStyle = [styles.iconContainer];
  if (userBadge) {
    icon = badge.icon;
    containerStyle.push(styles.iconObtainedContainer);
  }
  return (
    <Pressable onPress={() => props.onSelectBadge(badge)}>
      <UICenteredView>
        <View style={containerStyle}>
          <Image source={{ uri: icon }} style={styles.icon} />
        </View>
        <UIText style={styles.name}>{badge.name}</UIText>
      </UICenteredView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    textAlign: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  iconObtainedContainer: {
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default Badge;
