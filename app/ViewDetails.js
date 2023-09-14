import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { fetchResults } from "./database/resultModels";

const ViewDetails = () => {
  const params = useLocalSearchParams();
  const [result, setResult] = useState(0);
  const [credits, setTotal] = useState(null);
  const [index, setIndex] = useState(null);

useEffect(() => {
  setResult(params.result);
  setTotal(params.credits);
  setIndex(params.index);
}, [params]);

  

  return (
    <View>
      <View className="mt-10 ">
        <Text className="text-lg font-bold ml-3">Detailed Result</Text>
      </View>
      <View>
        <Progress.Bar progress={result / 5} width={200} />
        <Text></Text>
        <Text></Text>
      </View>
      <Text>ViewDetails</Text>
    </View>
  );
};

export default ViewDetails;
