import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import * as Progress from "react-native-progress";
import { Circle } from "react-native-svg";
import CircleProgressBar from "./CircleProgressBar";
import CircleProgressBar2 from "./CircleProgressBar2";
import { Link } from "expo-router";
import { useRouter } from "expo-router";




const Result = () => {
  const params = useLocalSearchParams();
  const [result, setResult] = useState(null);
  const [credits, setTotal] = useState(null);
  const [index, setIndex] = useState(null)

  const percentage = ((result / 5) * 100).toFixed(1); 
  // const Gpa = (result / 5);

  useEffect(() => {
    setResult(params.result);
    setTotal(params.credits);
    setIndex(params.index)
  }, [params]);

  // const router = useRouter();

  // useEffect(() => {
  //   router.push({
  //     pathname: "/ViewDetails",
  //     params: { result },
  //   });
  // }, [result]);

  return (
    <View className="">
      <View className="mt-4 ml-3">
        <Text className="text-lg font-bold">Result Details:</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="ml-3 mt-5 font-bold text-gray-500">
          Your calculated GPA of {index} Modules
        </Text>
        <Text className="mr-3 mt-5 text-sm text-gray-500 font-bold">
          {result}
        </Text>
      </View>
      <View className="mt-10 justify-center items-center">
        <CircleProgressBar2 progress={result} />
      </View>
      {/* <Text>Result Details</Text>
      <Text>Your Calculated GPA of {index} modules</Text>
      <Text>Your total credit hours is {credits}</Text> */}
      <View className="flex-row justify-between mt-10">
        <Text className="ml-3 font-bold text-gray-500">Percentage</Text>
        <Text className="mr-3 font-bold text-gray-500">{percentage}%</Text>
      </View>

      <View className="mt-10 items-center">
        {/* <Text className="text-center">Your Result is: {result}</Text> */}

        {/* <Text>Your grade percentage is {((result / 5) * 100).toFixed(1)}%</Text> */}
        <CircleProgressBar progress={percentage} />
      </View>
      {/* <View>
        <Progress.Bar
          progress={result / 5}
          width={200}
          height={20}
          color="#5196ce"
        />
      </View> */}
    </View>
  );
};

export default Result;
