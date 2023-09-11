import { View, Text, ActivityIndicator, Image, Pressable } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [isReady, setReady] = useState(false);
  const myImage = require("../assets/pngwing.png");

  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View
      className="flex-1 justify-center items-center"
      onLayout={onLayoutRootView}
    >
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
        <Link href="/Calculate" asChild>
          <Pressable className="w-52 h-10 bg-blue-500 justify-center rounded-lg shadow-2xl">
            <Text className="text-white text-center">Calculate</Text>
          </Pressable>
        </Link>
        <Link href="/History" className="mt-5" asChild>
          <Pressable className="w-52 h-10 bg-blue-500 justify-center rounded-lg shadow-2xl">
            <Text className="text-center text-white">View History</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
