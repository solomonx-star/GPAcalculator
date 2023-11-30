import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import * as Progress from "react-native-progress";
import { Circle } from "react-native-svg";
import CircleProgressBar from "../components/progressMarker/CircleProgressBar";
import CircleProgressBar2 from "../components/progressMarker/CircleProgressBar2";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { insertResult } from "../components/database/resultModels";

const Result = () => {
  const params = useLocalSearchParams();
  const [result, setResult] = useState(0);
  const [credits, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  // const [savedResults, setSavedResults] = useState();

  const percentage = ((result / 5) * 100).toFixed(1);
  // const Gpa = result / 5;

  useEffect(() => {
    setResult(params.result);
    setTotal(params.credits);
    setIndex(params.index);
  }, [params]);

  const saveResultToDB = async () => {
    try {
      await insertResult(result);
      alert("Result saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving result!");
    }
  };

  // const saveResult = () => {
  //   const newResult = {
  //     id: Date.now(), // using timestamp as a unique identifier
  //     result: result,
  //   };

  //   setSavedResults((prev) => [...prev, newResult]);
  //   saveResultToDB();
  // };

  // const saveResult = () => {
  //   const newResult = {
  //     id: Math.random().toString(),
  //     result: result,
  //   };

  //   setSavedResults((prev) => [...prev, newResult]);
  //   alert("Result saved!");
  // };

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
      {/* <View className="items-center justify-center mt-24">
        <Pressable
          className="bg-blue-500 w-1/2 h-10 justify-center rounded-lg"
          onPress={saveResultToDB}
        >
          <Text className="text-center text-white">Save Result</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default Result;
