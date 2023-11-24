import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import React from "react";
// import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
// import { ResultsProvider } from "../components/resultContext/resultContext";
import RNPickerSelect from "react-native-picker-select-updated";

const Calculate = () => {
  const [fields, setFields] = useState([
    { module: "", grade: "", credits: "" },
  ]);

  const [result, setResult] = useState(0);
  const [credits, setCredits] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [pass, setPass] = useState("");
  const [index, setIndex] = useState(0);
  const [moduleType, setModuleType] = useState("")
  const [Departmental, setDepartmental] = useState(false)
  const [foundation, setFoundation]= useState(false)

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
        pathname: "/Calculate",
        params: { goToResult },
      });
    }
  }, [result]);

  const calculateGPA = (callback) => {
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
    setResult(cgpa.toFixed(2), callback);
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
  return (
    <View className="flex-1 justify-center items-center">
      <View className="mt-">
        <View className="">
          <Text className="text-center">Sol</Text>
        </View>
      </View>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className=" bg-white w-[90%] "
          showsVerticalScrollIndicator={false}
        >
          <View className="">
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => {
                  setDepartmental(false);
                  setFoundation(true);
                }}
              >
                <Text>Foundation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDepartmental(true);
                  setFoundation(false);
                }}
              >
                <Text>Departmental</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDepartmental(true);
                  setFoundation(true);
                }}
              >
                <Text>Both</Text>
              </TouchableOpacity>
            </View>

            {(foundation === false) & (Departmental === true) ? (
              <View>
                {fields.map((fields, index) => (
                  <View key={index} className="flex-row ml-8">
                    <View className="border items-center border-gray-400 mt-2 rounded-lg">
                      <View className="flex-1 items-center justify-center">
                        <TextInput
                          className="ml-2"
                          value={fields.module}
                          onChangeText={(text) =>
                            handleCourseChange(index, "module", text)
                          }
                          placeholder="Module name"
                        />
                      </View>
                      <View className="flex-row">
                        <View className="w-40 mt-2 border-t border-r  border-gray-400">
                          {/* <Text>Grade:</Text> */}
                          <View className="flex-1 justify-center ml-5">
                            <RNPickerSelect
                              onValueChange={(value) => {
                                handleCourseChange(index, "grade", value);
                              }}
                              placeholder={{
                                label: "Select Grade",
                                value: "select Grade",
                              }}
                              items={[
                                { label: "A+", value: "A+" },
                                { label: "A", value: "A" },
                                { label: "A-", value: "A-" },
                                { label: "B+", value: "B+" },
                                { label: "B", value: "B" },
                                { label: "B-", value: "B-" },
                                { label: "C+", value: "C+" },
                                { label: "C", value: "C" },
                                { label: "C-", value: "C-" },
                                { label: "D", value: "D" },
                                { label: "E", value: "E" },
                                { label: "F", value: "F" },
                              ]}
                            />
                          </View>
                        </View>

                        <View className="w-32 mt-2 border-t h-8 border-gray-400">
                          {/* <Text>Credit Hours:</Text> */}
                          <View className="flex-1 justify-center items-center ml-5">
                            <RNPickerSelect
                              onValueChange={(value) => {
                                handleCourseChange(index, "credits", value);
                              }}
                              placeholder={{
                                label: "Select Credit",
                                value: "Select Credit",
                              }}
                              items={[
                                { label: "1", value: "1" },
                                { label: "2", value: "2" },
                                { label: "3", value: "3" },
                              ]}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <Pressable onPress={handleDeleteCourse}>
                      <View className="">
                        <View className="mt-12 mr-1 ml-1  bottom-6">
                          <MaterialIcons name="delete" size={24} color="red" />
                        </View>
                      </View>
                    </Pressable>
                  </View>
                ))}
                <View>
                  <Pressable onPress={addFields}>
                    <View className="items-center mt-5  w-[100%]">
                      <View className="justify-center mb-5  w-72 h-7 border items-center border-dashed">
                        <Text className="font-semibold">Add Class</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            ) : (foundation === true) & (Departmental === false) ? (
              <Text>This is Foundation</Text>
            ) : (foundation === true) & (Departmental === true) ? (
              <View>
                {/**departmental */}
                {fields.map((fields, index) => (
                  <View key={index} className="flex-row ml-8">
                    <View className="border items-center border-gray-400 mt-2 rounded-lg">
                      <View className="flex-1 items-center justify-center">
                        <TextInput
                          className="ml-2"
                          value={fields.module}
                          onChangeText={(text) =>
                            handleCourseChange(index, "module", text)
                          }
                          placeholder="Module name"
                        />
                      </View>
                      <View className="flex-row">
                        <View className="w-40 mt-2 border-t border-r  border-gray-400">
                          {/* <Text>Grade:</Text> */}
                          <View className="flex-1 justify-center ml-5">
                            <RNPickerSelect
                              onValueChange={(value) => {
                                handleCourseChange(index, "grade", value);
                              }}
                              placeholder={{
                                label: "Select Grade",
                                value: "select Grade",
                              }}
                              items={[
                                { label: "A+", value: "A+" },
                                { label: "A", value: "A" },
                                { label: "A-", value: "A-" },
                                { label: "B+", value: "B+" },
                                { label: "B", value: "B" },
                                { label: "B-", value: "B-" },
                                { label: "C+", value: "C+" },
                                { label: "C", value: "C" },
                                { label: "C-", value: "C-" },
                                { label: "D", value: "D" },
                                { label: "E", value: "E" },
                                { label: "F", value: "F" },
                              ]}
                            />
                          </View>
                        </View>

                        <View className="w-32 mt-2 border-t h-8 border-gray-400">
                          {/* <Text>Credit Hours:</Text> */}
                          <View className="flex-1 justify-center items-center ml-5">
                            <RNPickerSelect
                              onValueChange={(value) => {
                                handleCourseChange(index, "credits", value);
                              }}
                              placeholder={{
                                label: "Select Credit",
                                value: "Select Credit",
                              }}
                              items={[
                                { label: "1", value: "1" },
                                { label: "2", value: "2" },
                                { label: "3", value: "3" },
                              ]}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <Pressable onPress={handleDeleteCourse}>
                      <View className="">
                        <View className="mt-12 mr-1 ml-1  bottom-6">
                          <MaterialIcons name="delete" size={24} color="red" />
                        </View>
                      </View>
                    </Pressable>
                  </View>
                ))}
                <View>
                  <Pressable onPress={addFields}>
                    <View className="items-center mt-5  w-[100%]">
                      <View className="justify-center mb-5  w-72 h-7 border items-center border-dashed">
                        <Text className="font-semibold">Add Class</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <View className="mb-24 mt-5">
          <Pressable onPress={goToResult}>
            <View className="items-center h-8 ">
              <View className="mb-5 bg-blue-500 rounded-lg h-8 items-center justify-center w-60">
                <Text className="text-white font-bold">Calculate</Text>
              </View>
            </View>
          </Pressable>
        </View> */}
    </View>
  );
};

export default Calculate;
