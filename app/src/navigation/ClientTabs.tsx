import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Explore"
        component={EmptyScreen}
        options={{title: t('tabs.explore')}}
      />
      <Tab.Screen
        name="MyAppointments"
        component={EmptyScreen}
        options={{title: t('tabs.appointments')}}
      />
      <Tab.Screen
        name="Profile"
        component={EmptyScreen}
        options={{title: t('tabs.profile')}}
      />
    </Tab.Navigator>
  );
}
