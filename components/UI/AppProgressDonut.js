import React from "react";
import AnimatedProgressWheel from "react-native-progress-wheel";
import * as Colors from "../../constants/Colors";

const AppProgressDonut = (props) => {
  return (
    <AnimatedProgressWheel
      size={props.size}
      width={props.width}
      progress={props.progress}
      animateFromValue={props.animateFromValue}
      color={props.color}
      backgroundColor={props.backgroundColor}
    />
  );
};

AppProgressDonut.defaultProps = {
  size: 40,
  width: 8,
  progress: 0,
  animateFromValue: 0,
  color: Colors.accent,
  backgroundColor: "#DDD",
};

export default AppProgressDonut;
