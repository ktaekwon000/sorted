import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const ContactsScreen = () => {
  return (
    <View>
      <Text>Contacts Screen...</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

const ContactsNavigation = createStackNavigator(
  {
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Helplines",
        headerLeft: () => (
          <View style={{ flexDirection: "row" }}>
            <Button
              icon={<Ionicons name="md-menu" size={24} color="black" />}
              type="clear"
              containerStyle={{ marginLeft: 6 }}
              titleStyle={{ fontSize: 14 }}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
      }),
    },
  },
  {
    initialRouteName: "Contacts",
  }
);

export default ContactsNavigation;
