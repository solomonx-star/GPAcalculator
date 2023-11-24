import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// import * as Progress from "react-native-progress";
// import { Circle } from "react-native-svg";
import CircleProgressBar from "./progressMarker/CircleProgressBar";
import CircleProgressBar2 from "./progressMarker/CircleProgressBar2";
// import { Link } from "expo-router";
// import { useRouter } from "expo-router";
import { insertResult } from "./database/resultModels";






const Result = () => {
  const params = useLocalSearchParams();
  const [result, setResult] = useState(0);
  const [credits, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [savedResults, setSavedResults] = useState();
  // const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [semester, setSemester] = useState('')

  const percentage = ((result / 5) * 100).toFixed(1);
  // const Gpa = result / 5;

  useEffect(() => {
    setResult(params.result);
    setTotal(params.credits);
    setIndex(params.index);
    setSemester(params.semester);
  }, [params]);

  const saveResultToDB = async () => {
    setIsVisible(false);
   try {
     await insertResult(result, semester);
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
      <View className="items-center justify-center mt-24">
        <Pressable
          className="bg-blue-500 w-1/2 h-10 justify-center rounded-lg"
          onPress={() => setIsVisible(!isVisible)}
        >
          <Text className="text-center text-white">Save Result</Text>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        // presentationStyle="formSheet"
        visible={isVisible}
        onRequestClose={() => {
          setModalVisible(!isVisible);
        }}
      >
        <View
          style={{ backgroundColor: "rgba(52,52,52,0.8)" }}
          className="flex-1 justify-center items-center "
        >
          <View className="bg-white  w-[350px] h-[200px] items-center justify-center space-y-[21px]">
            <Text>Enter Semester below</Text>
            <View className="border w-[200px] h-[30px] justify-center">
              <TextInput
                onChangeText={setSemester}
                value={semester}
                placeholder="Semester"
                className="ml-3"
              />
            </View>
            <View>
              <TouchableOpacity onPress={saveResultToDB}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Result;
