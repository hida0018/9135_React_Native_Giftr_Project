import React, { useContext } from "react";
import { FlatList, View, Text, Button, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import PeopleContext from "../PeopleContext";
import styles from "./PeopleScreenStyles";
import { useNavigation } from "@react-navigation/native";

export default function PeopleScreen() {
  const { people, deletePerson } = useContext(PeopleContext);
  // Using the useContext hook to extract the list of people (people) and the deletePerson function from PeopleContext. This gives access to the state and allows us to modify it.
  const navigation = useNavigation();

  // If there are no people in the list, display a message and a button to add a new person.
  if (!people || people.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No people available. Add your first person!</Text>
        <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
        {/* Button to navigate to the AddPerson screen when clicked */}
      </View>
    );
  }

  // Function to render the right swipe action
  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deletePerson(id)} // Call the deletePerson function from the context to delete the person by their id when the button is pressed
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );
  // renderPerson function renders each individual person in the FlatList.
  // This function will be called for each person item in the people array.
  const renderPerson = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.personContainer}>
        <Text style={styles.personName}>{item.name}</Text>
        <Text style={styles.personDOB}>DOB: {item.dob}</Text>
        <Button
          title="View Ideas"
          onPress={() => navigation.navigate("Idea", { id: item.id })}
          // Navigating to the Idea screen for the selected person when the "View Ideas" button is pressed. The person's id is passed as a parameter.
        />
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FlatList data={people} keyExtractor={(item) => item.id} renderItem={renderPerson} />
          {/* FlatList takes the people array from context and displays each item in the list. */}
          {/* keyExtractor provides a unique key for each item in the list. The person's id is used as the key. */}
          {/* renderItem defines how each item in the list should be rendered, using the renderPerson function to define the layout and behavior of each person. */}
          <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

{
  /* 
  RECAP:
Main Return Block (Top-Level Rendering): Defines the overall structure of the screen, including the FlatList (for displaying people) and a Button (for navigating to the "Add Person" screen).
renderPerson (Rendering Individual Person Items): Defines how each person in the people array is displayed. It also includes swipe functionality through Swipeable.
renderRightActions (Rendering Swipe-to-Delete Action): Defines the action that appears when a person item is swiped, which in this case is a delete button.

These three "render areas" work together:

1. Main render block: Handles the layout of the overall screen.
2. renderPerson: Handles how each item in the list is displayed.
3. renderRightActions: Handles the swipe-to-delete functionality for each item. */
}
