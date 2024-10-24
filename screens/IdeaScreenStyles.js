import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
  },
  ideaItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10, // Rounded corners for all
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Light shadow for the idea items
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center", // Center content
  },
  ideaText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  ideaImage: {
    width: 150,
    height: 200,
    marginBottom: 10,
    borderRadius: 5, // Rounded corners for images
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
