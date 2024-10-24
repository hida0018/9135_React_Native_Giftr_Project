import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },

  personContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10, // Keep the radius for all corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Light shadow for the idea items
    shadowRadius: 5,

    elevation: 5,
    width: 300, // Fixed width to accommodate longer names
  },

  personName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  personDOB: {
    fontSize: 16,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
