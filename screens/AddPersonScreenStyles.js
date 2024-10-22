import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items towards the top of the screen
    alignItems: "center", // Center items horizontally
    padding: 20,
    paddingTop: 60, // Add some padding at the top to push the content down
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    width: "100%", // Make the button take full width
  },
  buttonCancel: {
    marginTop: 10,
    backgroundColor: "#d9534f",
  },
});
