import React from "react";
import {
  StyleSheet,
  Modal as RnModal,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import Card from "./Card";
import CenteredView from "./CenteredView";

const Modal = (props) => {
  return (
    <RnModal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      closeOnClick={true}
      onRequestClose={props.onTouchAway}
    >
      <TouchableWithoutFeedback onPress={props.onTouchAway}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <CenteredView grow>
        <Card style={[styles.card, props.style.card]}>
          <CenteredView>{props.children}</CenteredView>
        </Card>
      </CenteredView>
    </RnModal>
  );
};

Modal.defaultProps = {
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

export default Modal;
