import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import AppCenteredView from "./AppCenteredView";
import AppCard from "./AppCard";

const AppModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      closeOnClick={true}
      onRequestClose={props.onTouchAway}
    >
      <TouchableWithoutFeedback onPress={props.onTouchAway}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <AppCenteredView grow>
        <AppCard style={[styles.card, props.style.card]}>
          <AppCenteredView>{props.children}</AppCenteredView>
        </AppCard>
      </AppCenteredView>
    </Modal>
  );
};

AppModal.defaultProps = {
  style: {
    card: {},
  },
};

const styles = StyleSheet.create({
  card: {
    padding: 30,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.15)",
  },
});

export default AppModal;
