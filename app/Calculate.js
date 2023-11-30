import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ResultsProvider } from "./resultContext/resultContext";

const Calculate = () => {
  const [fields, setFields] = useState([
    { module: "", grade: "", credits: "" },
  ]);

  const [result, setResult] = useState(0);
  const [credits, setCredits] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [pass, setPass] = useState("");
  const [index, setIndex] = useState(0);

  const router = useRouter();

  const addFields = () => {
    setFields([...fields, { module: "", grade: "", credits: "" }]);
  };

  const handleCourseChange = (index, key, value) => {
    const newCourses = [...fields];
    newCourses[index][key] = value;
    setFields(newCourses);
    setIndex(index + 1);
  };

  const handleDeleteCourse = () => {
    setFields(fields.slice(0, -1));
  };

  const onRefresh = useCallback(() => {
    setFields([{ module: "", grade: "", credits: "" }]);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const goToResult = () => {
    const hasMissingValues = fields.some(
      (field) => !field.credits || !field.grade
    );
    if (hasMissingValues) {
      Alert.alert("Please Select values");
      return;
    }
    calculateGPA();
  };

  useEffect(() => {
    if (result) {
      router.push({
        pathname: "/Outcome",
        params: { result, credits, index },
      });
    }
  }, [result]);

  


  // useEffect(() => {
  //   if (result) {
  //     router.push({
  //       pathname: "/Result",
  //       params: { result, credits, index },
  //     });
  //   }
  // }, [result]);

  // useEffect(() => {
  //   router.push({
  //     pathname: "/Result",
  //     params: { result, credits, index }
  //   })
  // }, [result]);

  const calculateGPA = () => {
    let total = 0;
    let credit = 0;

    fields.forEach((field) => {
      const grade = field.grade;
      const creditHours = parseInt(field.credits);

      if (grade === "A+" || grade === "A") {
        total += 15.0;
      } else if (grade === "A-") {
        total += 14.1;
      } else if (grade === "B+") {
        total += 12.9;
      } else if (grade === "B") {
        total += 12.0;
      } else if (grade === "B-") {
        total += 11.1;
      } else if (grade === "C+") {
        total += 9.9;
      } else if (grade === "C") {
        total += 9.0;
      } else if (grade === "C-") {
        total += 8.9;
      } else if (grade === "D") {
        total += 6.0;
      } else if (grade === "E") {
        total += 3.0;
      } else if (grade === "F") {
        total += 0.0;
      }

      credit += creditHours;
      setCredits(credit);
    });

    const cgpa = total / credit;
    setResult(cgpa.toFixed(2));
    if (cgpa >= 3.0) {
      setPass("You passed the semester");
    } else {
      setPass("You failed the semester");
    }
  };

  // useEffect(() => {
  //   console.log(result)
  // }
  // ,[result])
  if (Platform.OS === "web") {
    return (
      <View className="Flex-1 justify-center items-center ">
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="h-[100%] w-[100%]"
            showsVerticalScrollIndicator={false}
          >
            <View className="">
              {fields.map((fields, index) => (
                <View key={index} className="flex-row ml-8">
                  <View className="border mt-2 rounded-lg">
                    <TextInput
                      className="ml-2"
                      value={fields.module}
                      onChangeText={(text) =>
                        handleCourseChange(index, "module", text)
                      }
                      placeholder="Module name"
                    />
                    <View className="flex-row">
                      <View className="w-40 mt-2 border-t border-r  border-gray-400">
                        {/* <Text>Grade:</Text> */}

                        <Picker
                          enabled={true}
                          mode="dialog"
                          prompt=""
                          testID="examplePicker"
                          accessibilityLabel="Example Picker"
                          itemStyle={{ color: "blue", fontSize: 20 }}
                          selectedValue={fields.grade}
                          onValueChange={(value) =>
                            handleCourseChange(index, "grade", value)
                          }
                        >
                          <Picker.Item label="Grade" value="" />
                          <Picker.Item label="A+" value="A+" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="A-" value="A-" />
                          <Picker.Item label="B+" value="B+" />
                          <Picker.Item label="B" value="B" />
                          <Picker.Item label="B-" value="B-" />
                          <Picker.Item label="C+" value="C+" />
                          <Picker.Item label="C" value="C" />
                          <Picker.Item label="C-" value="C-" />
                          <Picker.Item label="D" value="D" />
                          <Picker.Item label="E" value="E" />
                          <Picker.Item label="F" value="F" />
                        </Picker>
                      </View>

                      <View className="w-32 mt-2 border-t h-8 border-gray-400">
                        {/* <Text>Credit Hours:</Text> */}
                        <Picker
                          enabled={true}
                          mode="dialog"
                          selectedValue={fields.credits.toString()}
                          onValueChange={(value) => {
                            const newCredits =
                              value !== "" ? parseInt(value) : 0;
                            handleCourseChange(index, "credits", newCredits);
                          }}
                        >
                          <Picker.Item label="Credit" value="" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                  <Pressable onPress={handleDeleteCourse}>
                    <View className="">
                      <View className="mt-12 ml-2">
                        <MaterialIcons name="delete" size={24} color="red" />
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))}
              <View>
                <Pressable onPress={addFields}>
                  <View className="items-center mt-5">
                    <View className="justify-center mb-5  w-72 h-7 border items-center border-dashed animate-bounce">
                      <Text className="font-semibold">Add Class</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View className="mb-24 mt-5">
          <Pressable onPress={goToResult}>
            <View className="items-center h-8 ">
              <View className="mb-5 bg-blue-500 rounded-lg h-8 items-center justify-center w-60">
                <Text className="text-white font-bold">Calculate</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ResultsProvider>
      <View className="flex-1 justify-center items-center">
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="mt-20 bg-white "
            showsVerticalScrollIndicator={false}
          >
            <View className="">
              {fields.map((fields, index) => (
                <View key={index} className="flex-row ml-8">
                  <View className="border border-gray-400 mt-2 rounded-lg">
                    <TextInput
                      className="ml-2"
                      value={fields.module}
                      onChangeText={(text) =>
                        handleCourseChange(index, "module", text)
                      }
                      placeholder="Module name"
                    />
                    <View className="flex-row">
                      <View className="w-40 mt-2 border-t border-r  border-gray-400">
                        {/* <Text>Grade:</Text> */}

                        <Picker
                          enabled={true}
                          mode="dialog"
                          prompt=""
                          testID="examplePicker"
                          accessibilityLabel="Example Picker"
                          itemStyle={{ color: "blue", fontSize: 20 }}
                          selectedValue={fields.grade}
                          onValueChange={(value) =>
                            handleCourseChange(index, "grade", value)
                          }
                        >
                          <Picker.Item label="Grade" value="" />
                          <Picker.Item label="A+" value="A+" />
                          <Picker.Item label="A" value="A" />
                          <Picker.Item label="A-" value="A-" />
                          <Picker.Item label="B+" value="B+" />
                          <Picker.Item label="B" value="B" />
                          <Picker.Item label="B-" value="B-" />
                          <Picker.Item label="C+" value="C+" />
                          <Picker.Item label="C" value="C" />
                          <Picker.Item label="C-" value="C-" />
                          <Picker.Item label="D" value="D" />
                          <Picker.Item label="E" value="E" />
                          <Picker.Item label="F" value="F" />
                        </Picker>
                      </View>

                      <View className="w-32 mt-2 border-t h-8 border-gray-400">
                        {/* <Text>Credit Hours:</Text> */}
                        <Picker
                          enabled={true}
                          mode="dialog"
                          selectedValue={fields.credits.toString()}
                          onValueChange={(value) => {
                            const newCredits =
                              value !== "" ? parseInt(value) : 0;
                            handleCourseChange(index, "credits", newCredits);
                          }}
                        >
                          <Picker.Item label="Credit" value="" />
                          <Picker.Item label="1" value="1" />
                          <Picker.Item label="2" value="2" />
                          <Picker.Item label="3" value="3" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                  <Pressable onPress={handleDeleteCourse}>
                    <View className="">
                      <View className="mt-12 ml-2">
                        <MaterialIcons name="delete" size={24} color="red" />
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))}
              <View>
                <Pressable onPress={addFields}>
                  <View className="items-center mt-5">
                    <View className="justify-center mb-5  w-72 h-7 border items-center border-dashed animate-bounce">
                      <Text className="font-semibold">Add Class</Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View className="mb-24 mt-5">
          <Pressable onPress={goToResult}>
            <View className="items-center h-8 ">
              <View className="mb-5 bg-blue-500 rounded-lg h-8 items-center justify-center w-60">
                <Text className="text-white font-bold">Calculate</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </ResultsProvider>
  );
};

export default Calculate;
