import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import RightDetail from "./RightDetail";

const TodayCalories = ({total = 2000, consumed, remaining, percentage = 0}) => {
    return(
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={percentage} valueSuffix="%"/>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.today}>Today</Text>
                <RightDetail  legend={"Total"} value={total}/>
                <RightDetail legend={"Consumed"} value={consumed}/>
                <RightDetail legend={"Remaining"} value={remaining}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        justifyContent: "center",
    },
    today: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 14,
    }
})

export default TodayCalories;