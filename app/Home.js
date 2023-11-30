import { View, Text, Image, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import Choice from "../components/Choice";

const Home = () => {
  // const [showModal, setshowModal] = useState(false);
  const myImage = require("../assets/uni.png");
  return (
    <View className="flex-1 justify-center items-center">
      <View className="mb-14">
        <Image source={myImage} style={{ width: 300, height: 300 }} />
        <Text className="text-center mt-3 text-lg font-bold text-blue-500">
          UNIMAK GPA Calculator
        </Text>
        <Text className="text-center mt-3">
          Calculate your semester GPA and cumulative {"\n"} GPA. Check your
          grades and understand how {"\n"} the GPA scale works
        </Text>
      </View>
      <View>
        {/* <Link href="/Calculate" asChild> */}
        <Pressable
          onPress={() => router.push('Calculate')}
          className="w-52 h-10 bg-blue-500 justify-center rounded-lg shadow-lg"
        >
          <Text className="text-white text-center">Calculate</Text>
        </Pressable>
        <Link href="/History" className="mt-5" asChild>
          <Pressable className="w-52 h-10 bg-blue-500 justify-center rounded-lg shadow-lg">
            <Text className="text-center text-white">View History</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Home;
