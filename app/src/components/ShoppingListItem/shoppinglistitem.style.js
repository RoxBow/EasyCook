import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    width: "45%",
    maxHeight: 200,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },

  wrapperTextIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginRight: 10,
  }
});

export default styles;