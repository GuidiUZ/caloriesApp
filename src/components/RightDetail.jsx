import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RightDetail = ({legend, value}) => {
  return (
    <View style={styles.rightItem}>
        <Text style={styles.rightItemLegend}>{legend}</Text>
        <Text style={styles.rightItemValue}>{value}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    rightItem: {
        flexDirection: "row",
        marginBottom: 8,
    },
    rightItemLegend: {
        flex: 1,
    },
    rightItemValue: {
        flex: 1,
        textAlign: "right"
    }
})

export default RightDetail;
