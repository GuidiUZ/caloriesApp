import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../hooks/useFoodStorage";
import TodayCalories from "../components/TodayCalories";
import TodayMeals from "../components/TodayMeals";


const totalCaloriesPerDay = 2000;

const Home = () => {
  const [todayFood, setTodayFood] = useState([]);
  const [Todaystatics, setTodayStatics] = useState({});
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } = useNavigation();

  const calculateTodayStatics = (meals) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0
      );

      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;
      setTodayStatics({
        consumed: caloriesConsumed,
        percentage: percentage,
        remaining: remainingCalories
      })
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      calculateTodayStatics(todayFoodResponse);
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood])
  );

  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.textCalories}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="white" />}
            radius="sm"
            color="#4ecb71"
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...Todaystatics}/>
      <TodayMeals foods={todayFood} onCompleteAddRemove={() => loadTodayFood()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  textCalories: {
    fontSize: 20,
  },
  caloriesContainer: {
    alignItems: "center",
    marginVertical: 50,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default Home;
