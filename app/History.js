import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { fetchResults, deleteResult } from "./database/resultModels";
import { Link, useLocalSearchParams, router } from "expo-router";
import { Modal, TouchableOpacity } from "react-native-web";

const HistoryScreen = () => {
  const [savedResults, setSavedResults] = useState([]);
  const params = useLocalSearchParams();


  useEffect(() => {
    const fetchDbResults = async () => {
      try {
        const results = await fetchResults();
        setSavedResults(results);
        console.log("fetched open");
      } catch (err) {
        console.error(err);
        alert("Error fetching results!");
      }
      // const results = await fetchResults();
      // console.log("Fetched Results:", results); // This will log the fetched results
      // setSavedResults(results);
    };

    fetchDbResults();
  }, []);

  const createTwoButtonAlert = (id) =>
    Alert.alert("Delete Result", "Are you sure you want to delete this result?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleDeleteResult(id)},
    ]);


  const handleDeleteResult = async (id) => {
    try {
      await deleteResult(id);
      const updatedResults = savedResults.filter((r) => r.id !== id);
      setSavedResults(updatedResults);
    } catch (err) {
      console.error(err);
      alert("Error deleting result!");
    }
  };

  // Render each item of the saved results list
  const renderItem = ({ item }) => (
    <Link
      href={`/Outcome?result=${item.result.toFixed(2)}&credits=${
        item.credits
      }&index=${item.index}`}
    >
      <View className="p-5 border-b-2 border-t-2 border-white">
        <View>
          <Text className="mt-1">{item.semester}</Text>
          <Text>{item.timestamp}</Text>
        </View>

        <View className="flex-row mt-4 space-x-20">
          {/* <Text className="text-lg">GPA: {item.result}</Text> */}

          <Pressable onPress={() => createTwoButtonAlert(item.id)} className="mt-1">
            <Text className="text-blue-500">Delete</Text>
          </Pressable>
        </View>
      </View>
    </Link>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Saved Results
      </Text>
      {/* <Text>{currentDateTime.toLocaleString()}</Text> */}
      {/* <Pressable onPress={handleView}> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={savedResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        className=""
      />
    </View>
  );
};

export default HistoryScreen;
