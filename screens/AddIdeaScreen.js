// import React, { useState, useContext, useEffect } from "react";
// import { View, Button, TextInput, Text, Image, TouchableOpacity } from "react-native";
// import { Camera } from "expo-camera";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import PeopleContext from "../PeopleContext";
// import * as FileSystem from "expo-file-system"; // For saving image permanently

// export default function AddIdeaScreen() {
//   const [text, setText] = useState("");
//   const [cameraRef, setCameraRef] = useState(null);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const { addIdea } = useContext(PeopleContext); // You don't need 'people', only addIdea
//   const navigation = useNavigation();
//   const route = useRoute();

//   // Request camera permissions
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync(); // Notice the correct permissions method
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   // Take photo
//   const takePicture = async () => {
//     if (cameraRef) {
//       const data = await cameraRef.takePictureAsync();
//       const fileUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
//       await FileSystem.moveAsync({ from: data.uri, to: fileUri });
//       setPhoto(fileUri); // store the permanent URI
//     }
//   };

//   const saveIdea = () => {
//     if (text && photo) {
//       const idea = {
//         id: new Date().getTime().toString(), // Generate a unique ID for each idea
//         text, // Text describing the idea
//         img: photo, // Image URI
//       };
//       addIdea(route.params.id, idea); // Calls addIdea function from PeopleContext.js
//       navigation.goBack(); // Return to previous screen
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera, please enable permissions in settings.</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <TextInput placeholder="Idea Description" value={text} onChangeText={setText} style={{ padding: 10, borderWidth: 1 }} />
//       {!photo ? (
//         <Camera style={{ flex: 1 }} ref={setCameraRef}>
//           <TouchableOpacity onPress={takePicture} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//             <Text style={{ color: "#fff" }}>Take Picture</Text>
//           </TouchableOpacity>
//         </Camera>
//       ) : (
//         <Image source={{ uri: photo }} style={{ width: 200, height: 300, margin: 20 }} />
//       )}
//       <Button title="Save Idea" onPress={saveIdea} />
//       <Button title="Cancel" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, Image } from "react-native";
import * as FileSystem from "expo-file-system";

export default function AddIdeaScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [text, setText] = useState("");

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      const fileUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
      await FileSystem.moveAsync({ from: data.uri, to: fileUri });
      setPhoto(fileUri); // Set the photo to be the file URI
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please enable permissions in settings.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput placeholder="Idea Description" value={text} onChangeText={setText} style={{ padding: 10, borderWidth: 1 }} />
      {!photo ? (
        <Camera style={{ flex: 1 }} ref={(ref) => setCameraRef(ref)}>
          <TouchableOpacity onPress={takePicture}>
            <Text>Take Picture</Text>
          </TouchableOpacity>
        </Camera>
      ) : (
        <Image source={{ uri: photo }} style={{ width: 200, height: 300 }} />
      )}
      <Button
        title="Save Idea"
        onPress={() => {
          /* Add save logic here */
        }}
      />
    </View>
  );
}
