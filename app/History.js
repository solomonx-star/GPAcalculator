import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { fetchResults, deleteResult } from "./database/resultModels";
import { Link } from "expo-router";

const HistoryScreen = () => {
  
  const [savedResults, setSavedResults] = useState([]);

  
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
    <View className="flex-row justify-between p-10 border-b-2 border-white">
      <Text className="text-lg">GPA: {item.result}</Text>
      <Text>Module:{item.module}</Text>
      <Pressable onPress={() => handleDeleteResult(item.id)}>
        <Text className="text-blue-500">Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Saved Results
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={savedResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


export default HistoryScreen;
