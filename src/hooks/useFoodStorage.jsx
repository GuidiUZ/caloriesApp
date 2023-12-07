import AsyncStorage from "@react-native-async-storage/async-storage";
import { isToday } from "date-fns";

const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey, meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(storageKey);

      if (currentSaveFood !== null) {
        const currentSaveFoodParse = JSON.parse(currentSaveFood);
        currentSaveFoodParse.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSaveFoodParse)
        );

        return Promise.resolve();
      }

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleSaveFood = async ({ calories, name, portion }) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foods !== null) {
        const parseFood = JSON.parse(foods);
        return Promise.resolve(parseFood);
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({ calories, name, portion }) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const parseFood = JSON.parse(foods);
        return Promise.resolve(
          parseFood.filter((meal) => meal.date && isToday(new Date(meal.date)))
        );
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleRemoveTodayFood = async (index) => {
    try {
      const todayFood = await handleGetTodayFood();
      const filterItems = todayFood.filter((item, itemIndex) => {
        return itemIndex != index;
      });
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filterItems)
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFood,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
};

export default useFoodStorage;
