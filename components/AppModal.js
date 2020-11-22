import React from "react";
import { StyleSheet, Modal, Pressable } from "react-native";
import AppCenteredView from "./AppCenteredView";
import AppCard from "./AppCard";
import * as Colors from "../constants/Colors";

const AppModal = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <AppCenteredView grow>
        <Pressable onPress={props.onTouchAway}>
          <AppCard style={styles.card}>
            <AppCenteredView>{props.children}</AppCenteredView>
          </AppCard>
        </Pressable>
      </AppCenteredView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: Colors.primary,
    padding: 30,
  },
});

export default AppModal;
