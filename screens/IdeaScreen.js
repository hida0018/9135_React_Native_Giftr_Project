import React, { useContext } from "react";
import { View, FlatList, Text, Button, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";

export default function IdeaScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { people } = useContext(PeopleContext);

  const person = people.find((p) => p.id === route.params.id); // get person by ID
  const ideas = person?.ideas || [];

  return (
    <View>
      <Text>Ideas for {person?.name}</Text>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            {item.img && <Image source={{ uri: item.img }} style={{ width: 100, height: 150 }} />}
            <Button
              title="Delete"
              onPress={() => {
                /* Add delete functionality later */
              }}
            />
          </View>
        )}
      />
      <Button title="Add Idea" onPress={() => navigation.navigate("AddIdea", { id: person.id })} />
    </View>
  );
}
