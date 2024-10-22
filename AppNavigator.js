// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import PeopleScreen from "./screens/PeopleScreen";
// import AddPersonScreen from "./screens/AddPersonScreen";

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       {/* NavigationContainer: Manages all the navigation logic, wrapping the screens and keeping track of transitions. */}
//       <Stack.Navigator>
//         {/* Stack.Navigator: A stack-based navigation that pushes screens in a "stack" (like a history, so you can go back and forth). */}
//         <Stack.Screen name="People" component={PeopleScreen} />
//         <Stack.Screen name="AddPerson" component={AddPersonScreen} />
//         {/*These are just names for the screens in the navigation stack. This helps the navigation system know which screen you're navigating to.
//         These aren’t props. This is telling the navigator which component to display when this route (screen) is accessed.
//         In other words, when you navigate to the screen named "People", it shows the PeopleScreen component, and when you navigate to "AddPerson",
//         it shows the AddPersonScreen component. This also isn’t passing props to those components. */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen"; // import new screens

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="AddPerson" component={AddPersonScreen} />
        <Stack.Screen name="Idea" component={IdeaScreen} />
        <Stack.Screen name="AddIdea" component={AddIdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
