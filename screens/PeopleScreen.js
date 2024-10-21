import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, FlatList, View, Text, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen() {
  const { people } = useContext(PeopleContext);
  const navigation = useNavigation();

  if (!people.length) {
    return <Text>No people available. Add your first person!</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <FlatList
            data={people} // Ensure people is not null or undefined
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                {/* Ensure name and dob are properly rendered inside <Text> */}
                <Text>{item.name}</Text>
                <Text>{item.dob}</Text>
                <Button
                  title="View Ideas"
                  onPress={() => navigation.navigate("Idea", { id: item.id })} // pass item.id correctly
                />
              </View>
            )}
          />
          <Button title="Add Person" onPress={() => navigation.navigate("AddPerson")} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
