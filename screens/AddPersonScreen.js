// import React, { useContext, useState } from "react";
// import { View, TextInput, Button } from "react-native";
// import PeopleContext from "../PeopleContext.js";
// import { useNavigation } from "@react-navigation/native";

// export default function AddPersonScreen() {
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const { addPerson } = useContext(PeopleContext);
//   const navigation = useNavigation();

//   const savePerson = () => {
//     if (name && dob) {
//       addPerson(name, dob); // Call the context function to save the person
//       navigation.goBack();
//     }
//   };
//   return (
//     <View>
//       <TextInput placeholder="Name" value={name} onChangeText={setName} />
//       {/* TextInput for the person's name. 'name' state is passed as a value, and 'setName' is used to update it.
//           This input value will later be passed into the context and global state to store the new person's details. */}
//       <TextInput placeholder="2003-01-03" value={dob} onChangeText={setDob} />
//       {/* TextInput for the person's date of birth. 'dob' state is passed as a value, and 'setDob' updates it.
//           The date of birth will also be passed into the context/global state upon saving. */}
//       <Button title="Save" onPress={savePerson} />
//       {/* 'Save' button. Eventually, this will trigger a function that sends the 'name' and 'dob' values
//           to the global state (context) and AsyncStorage to add a new person. */}
//       <Button title="Cancel" onPress={() => navigation.goBack()} />
//       {/* 'Cancel' button. It will navigate back to the PeopleScreen, canceling the add operation. */}
//     </View>
//   );
// }

import React, { useContext, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./AddPersonScreenStyles"; // Import external stylesheet

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date()); // initialize with today's date
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setDob(currentDate);
  };

  const savePerson = () => {
    if (name && dob) {
      const dobString = dob.toISOString().substring(0, 10); // format date to YYYY-MM-DD
      addPerson(name, dobString); // Pass name and formatted dob to context
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input} // Apply external input style
      />
      <Text style={styles.dateText}>Date of Birth: {dob.toISOString().substring(0, 10)}</Text>
      <DateTimePicker testID="dateTimePicker" value={dob} mode={"date"} display="default" onChange={onChangeDate} />
      <Button title="Save" onPress={savePerson} style={styles.button} />
      <Button title="Cancel" onPress={() => navigation.goBack()} style={styles.buttonCancel} />
    </View>
  );
}
