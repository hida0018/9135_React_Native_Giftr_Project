import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./AppNavigator";
import { PeopleProvider } from "./PeopleContext";

export default function App() {
  return (
    <View style={styles.container}>
      <PeopleProvider>
        {/* This was created in PeopleContext.js used as a wrapper to provide access to the data and functions to whatever its wrapped around */}
        <AppNavigator />
        {/* We can use <AppNavigator /> component now because of the Navigation Stack we set up in the AppNavigator.js */}
      </PeopleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
