import { Stack } from "expo-router";
// import { Drawer } from "expo-router/drawer";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5196ce",
        },
        headerTintColor: "#fff", // sets the color of the header title and back button
        headerTitleStyle: {
          fontWeight: "bold", // sets font weight of header title
        },
        headerBackTitleVisible: false, // hides the title string used by the back button on iOS
        gestureEnabled: true, // allows the use of gestures to navigate back
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="Calculate"
        options={{
          title: "Calculate GPA",
        }}
      />
      <Stack.Screen
        name="History"
        options={{
          title: "History",
        }}
      />
      <Stack.Screen
        name="Outcome"
        options={{}}
        />
    </Stack>
  );
}
