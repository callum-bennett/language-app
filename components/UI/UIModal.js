import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import { UICard, UICenteredView } from "./";

const UIModal = (props) => {
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

      <UICenteredView grow>
        <UICard style={[styles.card, props.style.card]}>
          <UICenteredView>{props.children}</UICenteredView>
        </UICard>
      </UICenteredView>
    </Modal>
  );
};

UIModal.defaultProps = {
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

export default UIModal;
