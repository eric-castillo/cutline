import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type ClientTabsParamList = {
  Explore: undefined;
  MyAppointments: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<ClientTabsParamList>();

// Empty placeholder; replaced by real screens in later steps/slices.
function EmptyScreen() {
  return <View style={styles.fill} />;
}

const styles = StyleSheet.create({fill: {flex: 1}});

export function ClientTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={EmptyScreen} />
      <Tab.Screen name="MyAppointments" component={EmptyScreen} />
      <Tab.Screen name="Profile" component={EmptyScreen} />
    </Tab.Navigator>
  );
}
