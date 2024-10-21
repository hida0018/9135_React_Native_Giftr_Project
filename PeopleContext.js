import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();
{
  /* This line creates a context object, which will be used to pass the "people" array and "addPerson function" to the rest of your app.*/
}

export const PeopleProvider = ({ children }) => {
  // This creates a component (PeopleProvider) which wraps around the rest of your app (in App.js) and provides access to the "people" array and related functions (like addPerson) to all child components.
  const [people, setPeople] = useState([]);
  // 'people' holds the list of people in state. Initially, it's an empty array.

  const STORAGE_KEY = "people";
  // Key for accessing AsyncStorage. All saved people will be tied to this key.

  useEffect(() => {
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
      // Retrieves people data from AsyncStorage if available.
      if (savedPeople) setPeople(JSON.parse(savedPeople));
      // If there's data in AsyncStorage, it's parsed from a JSON string into an array and set to the 'people' state.
    };
    loadPeople();
    // When the app starts, it loads any saved people from AsyncStorage.
    console.log(people);
    // Logs the current state of 'people'
  }, []); // useEffect runs only once, when the component is first rendered.

  //When you add a person from the AddPersonScreen, it calls the addPerson function in PeopleContext.js, which updates the state and saves the new data to AsyncStorage.
  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [], // Initialize with an empty array for ideas
    };
    const updatedPeople = [...people, newPerson]; // Adds the new person to the current list of people.
    console.log(updatedPeople); // Logs the updated list of people
    setPeople(updatedPeople); // Updates the 'people' state with the new person included.
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    // Saves the updated list to AsyncStorage, ensuring the data persists after app closure.
  };

  const addIdea = async (personId, idea) => {
    //addIdea adds a new idea for the selected person and updates the people array in the context and AsyncStorage.
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        return { ...person, ideas: [...person.ideas, idea] };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  return <PeopleContext.Provider value={{ people, addPerson, addIdea }}>{children}</PeopleContext.Provider>;
  // This line makes the people state and the addPerson function & the addIdea function available to all the components wrapped in PeopleProvider.
  // The value prop in the PeopleContext.Provider contains the data and functions that will be shared across the app (people array and addPerson function & other one).
  // {children} is a special prop that represents all the components wrapped by PeopleProvider (e.g., screens like PeopleScreen, AddPersonScreen, etc.).
};

export default PeopleContext;
