import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, Icon } from "@rneui/themed";

const staticInfo = {
  name: "Guido Aranda",
  uri: "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const Header = () => {
  const { canGoBack, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}

      <View style={styles.leftContainer}>
        <Text style={styles.titleName}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.subTitle}>Welcome back</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  titleName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subTitle: {
    fontSize: 16,
    color: "#808080",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});

export default Header;
