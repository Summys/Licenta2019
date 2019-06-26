import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listItem: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "#e1e1e1",
    padding: "2%",
    flexDirection: "row"
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  firstColumn: {
    width: "80%"
  },
  secondColumn: {
    padding: "2.5%"
  },
  edit: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "orange",
    marginBottom: 5
  },
  remove: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "red"
  }
});
