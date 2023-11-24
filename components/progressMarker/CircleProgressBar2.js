import React, { useEffect, useRef} from "react";
import { Text as RNText } from "react-native"; // Renamed for clarity
import Svg, { Circle, Text } from "react-native-svg";
import { Animated } from "react-native";// Imported SVG's Text

const size = 150; // or any size you want
const strokeWidth = 14;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgressBar = ({ progress = 0 }) => {
  // Convert the progress on a 0-5 scale to a 0-100 percentage scale for visualization
  const percentage = (progress / 5) * 100;
  // const progressOffset = ((100 - percentage) / 100) * circumference;

  const animatedProgress = useRef(new Animated.Value(0)).current;

  const progressOffset = Animated.multiply(
    Animated.subtract(5, animatedProgress),
    circumference / 5
  );

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const circleColor = progress < 3 ? "red" : "#5196ce";
  

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

      {/* Progress Text (Value based on 0-5 scale) inside SVG */}
      <Text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        fill="black"
        fontSize="28"
        fontWeight="bold"
        alignmentBaseline="middle"
      >
        {`${progress}`} {/* Display it to 2 decimal places */}
      </Text>
    </Svg>
  );
};

export default CircleProgressBar;
