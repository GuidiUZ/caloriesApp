import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModule from "../components/AddFoodModule";
import useFoodStorage from "../hooks/useFoodStorage";
import MealItem from "../components/MealItem";

const AddFood = () => {
  const [visible, setIsVisible] = useState(false);
  const [foods, setFoods] = useState([]);
  const { onGetFood } = useFoodStorage();
  const [search, setSearch] = useState("");

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = async () => {
    setIsVisible(false);
    loadFoods();
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFood();
      setFoods(result.filter((item) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
      
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={{ fontSize: 20 }}>Add Food</Text>
        </View>
        <View style={styles.buttonAddFoodContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="white" />}
            radius="sm"
            color="#4ecb71"
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchFoodContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, egg, chicken"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <Button
          title="Search"
          color="#ade8af"
          titleStyle={{ color: "#000", fontSize: 16 }}
          radius={"lg"}
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal) => (
          <MealItem key={meal.name} {...meal} isAbleToAdd={true} />
        ))}
      </ScrollView>
      <AddFoodModule visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonAddFoodContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  searchFoodContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
});

export default AddFood;
