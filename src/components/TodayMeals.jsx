import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MealtItem from "../components/MealItem";

const TodayMeals = ({ foods, onCompleteAddRemove }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foods</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal, index) => (
          <MealtItem
            key={`today-meal-item${meal.name}-${index}`}
            {...meal}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginVertical: 16,
  },
});
export default TodayMeals;
