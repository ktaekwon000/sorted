import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, Button, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  categoryHeaderText: {
    marginHorizontal: 8,
    alignSelf: 'center',
  },
});

const helplines = {
  suicideHelplines: [
    {
      name: 'SOS (Samaritans of Singapore) (Phone)',
      contact: 'tel:18002214444',
      time: 'Daily, 24 Hours',
    },
  ],
  counsellingHotlines: [
    {
      name: 'Youth Line (Phone)',
      contact: 'tel:63363434',
      time: 'Monday – Friday, 8.30am to 6.00pm',
    },
    {
      name: 'Touch Line (Phone)',
      contact: 'tel:18003772252',
      time: 'Daily, 10.00am to 10.00pm',
    },
    {
      name: 'eCounselling Centre (eC2) (Fei Yue Project 180) (Web)',
      contact: 'https://www.fycs.org/contact-us/',
      time: 'Monday – Friday, 9.30am to 6.00pm',
    },
    {
      name: 'Metoyou Cyber Counselling (Phone)',
      contact: 'tel:64450100',
      time: 'Monday – Friday, 2.00pm to 6.00pm',
    },
    {
      name: 'Brahm Centre’s AssistLine (Phone)',
      contact: 'tel:66550000',
      time: 'Monday – Friday, 9.00am to 6.00pm',
    },
    {
      name: 'Brahm Centre’s AssistLine (Whatsapp/Phone)',
      contact: 'https://wa.me/6588230000',
      time: 'Daily, 24 hours',
    },
  ],
  mentalHealthHelplines: [
    {
      name: 'Singapore Association for Mental Health (SAMH) (Phone)',
      contact: 'tel:18002837019',
      time: 'Monday – Friday, 9.00am to 1.00pm and 2.00pm to 6.00pm',
    },
    {
      name: 'Emergency Helpline (IMH) (Phone)',
      contact: 'tel:63892222',
      time: 'Daily, 24 hours',
    },
  ],
};

const ContactsScreen = () => {
  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://www.healthhub.sg/a-z/support-groups-and-others/20/call-on-these-when-you-need-help'
          )
        }
      >
        <Text style={{ margin: 8 }}>
          The following list is a selection of organisations you can contact to
          discuss your mental health. Tap this text to visit healthhub.sg for a
          more extensive list.
        </Text>
      </TouchableOpacity>

      <Text h4 style={styles.categoryHeaderText}>
        Suicide Prevention and Crisis Helplines
      </Text>
      {helplines.suicideHelplines.map((entry) => (
        <ListItem
          key={entry.contact}
          title={entry.name}
          subtitle={entry.time}
          onPress={() => Linking.openURL(entry.contact)}
          bottomDivider
        />
      ))}
      <View style={{ marginVertical: 10 }} />

      <Text h4 style={styles.categoryHeaderText}>
        Counselling Hotlines
      </Text>
      {helplines.counsellingHotlines.map((entry) => (
        <ListItem
          key={entry.contact}
          title={entry.name}
          subtitle={entry.time}
          onPress={() => Linking.openURL(entry.contact)}
          bottomDivider
        />
      ))}
      <View style={{ marginVertical: 10 }} />

      <Text h4 style={styles.categoryHeaderText}>
        Mental Health Helplines
      </Text>
      {helplines.mentalHealthHelplines.map((entry) => (
        <ListItem
          key={entry.contact}
          title={entry.name}
          subtitle={entry.time}
          onPress={() => Linking.openURL(entry.contact)}
          bottomDivider
        />
      ))}
    </ScrollView>
  );
};

const ContactsNavigation = createStackNavigator(
  {
    Contacts: {
      screen: ContactsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Helplines',
        headerLeft: () => (
          <View style={{ flexDirection: 'row' }}>
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
    initialRouteName: 'Contacts',
  }
);

export default ContactsNavigation;
