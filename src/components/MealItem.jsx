import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import useFoodStorage from "../hooks/useFoodStorage";

const MealItem = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  itemPosition,
  onCompleteAddRemove,
}) => {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, name, portion });
      } else {
        await onDeleteTodayFood(itemPosition);
      }

      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.nameFood}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />}
          type="clear"
          onPress={handleIconPress}
        />
        <Text style={styles.calories}>{calories} Cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ade8af",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  nameFood: {
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    fontSize: 13,
    color: "#808080",
    fontWeight: "500",
  },
  calories: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default MealItem;
