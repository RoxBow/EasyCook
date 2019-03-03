import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    width: "60%",
    maxHeight: 200,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2,
  },

  wrapperTextIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginRight: 10,
  }
});

export default styles;