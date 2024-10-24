import React, { useState, useEffect, useContext } from "react";
import { View, Button, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"; // Correct imports from 'expo-camera'
import * as FileSystem from "expo-file-system"; // For saving image permanently
import PeopleContext from "../PeopleContext";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddIdeaScreen() {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  // const [facing, setFacing] = useState(CameraType.back); // Set the camera type to 'back'
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions(); // Handle camera permissions
  const { addIdea } = useContext(PeopleContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [text, setText] = useState("");

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.takePictureAsync();
        const fileUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
        await FileSystem.moveAsync({ from: data.uri, to: fileUri });
        setPhoto(fileUri);
      } catch (error) {
        console.error("Error taking picture", error);
      }
    }
  };

  const saveIdea = () => {
    if (text && photo) {
      const idea = {
        id: new Date().getTime().toString(),
        text,
        img: photo,
      };
      addIdea(route.params.id, idea);
      navigation.goBack();
    } else {
      console.warn("Text or photo missing");
    }
  };

  if (!permission) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to use the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Idea Description"
        value={text}
        onChangeText={setText}
        style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}
      />

      {!photo ? (
        <CameraView style={{ flex: 1 }} ref={(ref) => setCameraRef(ref)}>
          <TouchableOpacity
            onPress={takePicture}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <Text style={{ color: "#fff" }}>Take Picture</Text>
          </TouchableOpacity>
        </CameraView>
      ) : (
        <Image source={{ uri: photo }} style={{ width: 200, height: 300, marginBottom: 20 }} />
      )}

      <Button title="Save Idea" onPress={saveIdea} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}
