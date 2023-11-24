import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const Choice = ({ type }) => {
  const [showModal, setshowModal] = useState(true);
  const Img = require("../assets/Rectangle1.png");
  const params = useLocalSearchParams();

  

  

  return (
    <View className="flex-1 justify-center items-center bg-blue-300">
      <View className="h-[8px] w-[60px] bg-black absolute top-0 mt-1 rounded"></View>
      <View>
        <Image source={Img} style={{ height: 300, width: 300 }} />
      </View>
      <Pressable className="bg-blue-500 h-[50px] w-[200px] rounded-lg mt-5 justify-center">
        <View>
          <Text className="text-white text-center ">
            Calculating with foundation and Departmental modules
          </Text>
        </View>
      </Pressable>
      <Pressable
        className="bg-blue-500 h-[50px] w-[200px] rounded-lg mt-5 justify-center"
        onPress={type}
      >
        <View>
          <Text className="text-white text-center ">
            Calculate with Departmental modules only
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Choice;
