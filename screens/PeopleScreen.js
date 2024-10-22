// import { useNavigation } from "@react-navigation/native";
// import { useContext } from "react";
// import { Button, FlatList, View, Text, SafeAreaView } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import PeopleContext from "../PeopleContext";

// export default function PeopleScreen() {
//   const navigation = useNavigation();
//   const { people } = useContext(PeopleContext);

//   return (
//     <SafeAreaProvider>
//       {/* SafeAreaProvider ensures the UI is rendered within the visible area of the screen */}
//       <SafeAreaView>
//         {/* SafeAreaView ensures components are rendered within the safe areas of the screen (avoiding notches, status bars, etc.) */}
//         <FlatList
//           data={people} // Passing the array 'people' to FlatList. This array contains the list of people to display.
//           keyExtractor={(item) => item.id} // The 'keyExtractor' function tells FlatList which key to use as a unique identifier for each item, here it’s using the id of each person.
//           renderItem={({ item }) => (
//             // 'item' is each object (person) in the 'people' array
//             //  The 'people' array is hardcoded and contains person objects with 'name' and 'dob'
//             <View>
//               <Text>{item.name}</Text>
//               {/* Renders the 'name' of the person inside a Text component */}
//               {/* 'item.name' comes from the 'name' property of the person object in the 'people' array */}
//               <Text>{item.dob}</Text>
//               {/* Renders the 'dob' (date of birth) of the person inside a Text component */}
//               {/* 'item.dob' comes from the 'dob' property of the person object in the 'people' array */}
//             </View>
//           )}
//         />
//         <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }

import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, FlatList, View, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import styles from "./PeopleScreenStyles";

export default function PeopleScreen() {
  const { people } = useContext(PeopleContext);
  const navigation = useNavigation();

  // Debugging log to see if 'people' is getting data
  console.log("People data:", people);

  if (!people || people.length === 0) {
    // Display a message if the list is empty
    return (
      <View style={styles.container}>
        <Text>No people available. Add your first person!</Text>
        <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
      </View>
    );
  }

  const renderPerson = ({ item }) => (
    <View style={styles.personContainer}>
      <Text style={styles.personName}>{item.name}</Text>
      <Text style={styles.personDOB}>DOB: {item.dob}</Text>
      <Button
        title="View Ideas"
        onPress={() => navigation.navigate("Idea", { id: item.id })} // Navigate to the ideas screen
      />
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={people} // Passing the array 'people' to FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderPerson} // Render each person in the list
        />
        <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
