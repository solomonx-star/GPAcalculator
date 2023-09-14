import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import Svg, { Circle, Text } from "react-native-svg";

const size = 150;
const strokeWidth = 14;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgressBar = ({ progress = 0 }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const progressOffset = Animated.multiply(
    Animated.subtract(100, animatedProgress),
    circumference / 100
  );

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const circleColor = progress < 60 ? "red" : "#5196ce";

  return (
    <Svg width={size} height={size}>
      {/* Background Circle */}
      <Circle
        stroke="black"
        fill="#fff"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeWidth={strokeWidth}
      />
      {/* Progress Circle */}
      <AnimatedCircle
        stroke={circleColor}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={progressOffset}
      />
      <Text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        fill="black"
        fontSize="28"
        fontWeight="bold"
        alignmentBaseline="middle"
      >
        {`${progress}%`}
      </Text>
    </Svg>
  );
};

export default CircleProgressBar;
