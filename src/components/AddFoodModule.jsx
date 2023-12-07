import { Button, ButtonGroup, Icon } from "@rneui/themed";
import {React, useEffect, useState} from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import FormItem from "../components/FormItem.jsx";
import useFoodStorage from "../hooks/useFoodStorage.jsx";

const AddFoodModule = ({ onClose, visible }) => {

  const [calories, setCalories] = useState("");
  const [name, setName] = useState("");
  const [portion, setPortion] = useState("");
  const {onSaveFood} = useFoodStorage();

  const handleAddPressFood = async () => {
    
    try {
      await onSaveFood({
        calories,
        name,
        portion
      });

      onClose();
    } catch (error) {
      
    }
    
   
  }


  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible])

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={onClose}
              type="clear"
            />
          </View>
          <View>
            <FormItem legendName={"CAL"} value={calories} setProps={setCalories}/>
            <FormItem legendName={"Name"} value={name} setProps={setName} />
            <FormItem legendName={"Portion"} value={portion} setProps={setPortion}/>
          </View>
          <View style={styles.buttonAddContainer}>
            <Button
              onPress={handleAddPressFood}
              title={"Add"}
              icon={<Icon name="add" color="#fff" />}
              color="#4ecb71"
              radius="lg"
              disabled={calories.trim() === "" || name.trim() === "" || portion.trim() === ""}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  buttonAddContainer: {
    alignItems: "flex-end",
  },
});

export default AddFoodModule;
