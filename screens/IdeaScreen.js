import React, { useContext } from "react";
import { View, FlatList, Text, Button, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";
import styles from "./IdeaScreenStyles"; // Import external stylesheet

export default function IdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { people, deleteIdea } = useContext(PeopleContext);

  const person = people.find((p) => p.id === route.params.id);
  const ideas = person?.ideas || [];

  if (!person) {
    return (
      <View style={styles.container}>
        <Text>No person found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Ideas for {person?.name}</Text>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ideaItem}>
            {/* Wrap text in Text component */}
            <Text style={styles.ideaText}>{item.text}</Text>

            {/* Ensure image is handled correctly */}
            {item.img && <Image source={{ uri: item.img }} style={styles.ideaImage} />}

            {/* Wrap button title inside Text */}
            <TouchableOpacity onPress={() => deleteIdea(person.id, item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Add Idea" onPress={() => navigation.navigate("AddIdea", { id: person.id })} />
    </View>
  );
}
