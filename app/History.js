import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { fetchResults, deleteResult } from "./database/resultModels";
import { Link } from "expo-router";

const HistoryScreen = () => {
  const [savedResults, setSavedResults] = useState([]);
  // const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const fetchDbResults = async () => {
      try {
        const results = await fetchResults();
        setSavedResults(results);
      } catch (err) {
        console.error(err);
        alert("Error fetching results!");
      }
      const results = await fetchResults();
      console.log("Fetched Results:", results); // This will log the fetched results
      setSavedResults(results);
    };

    fetchDbResults();
  }, []);

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   // }, 1000);

  //   // return () => clearInterval(interval);
  // }, []);

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
    <View className="p-5 border-b-2 border-t-2 border-white">
      <View>
        <Text className="mt-1">{item.semester}</Text>
        <Text>{item.timestamp}</Text>
        <Text>{item.index}</Text>
      </View>
      <View className="flex-row mt-4 space-x-20">
        {/* <Text className="text-lg">GPA: {item.result}</Text> */}

        <Pressable onPress={() => handleDeleteResult(item.id)} className="mt-1">
          <Text className="text-blue-500">Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Saved Results
      </Text>
      {/* <Text>{currentDateTime.toLocaleString()}</Text> */}

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
