import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";

const FormItem = ({legendName, value, setProps}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputFormContainer}>
        <Input value={value} onChangeText={(text) => setProps(text)}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLegend}>{legendName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputFormContainer: {
    flex: 2,
  },
  textContainer: {
    flex: 1,
  },
  textLegend: {
    fontWeight: "500",
  },
});

export default FormItem;
