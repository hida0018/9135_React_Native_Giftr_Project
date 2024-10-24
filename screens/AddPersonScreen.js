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
