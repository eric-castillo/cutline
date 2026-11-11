import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {TabBar} from '../components/TabBar';
import {ExploreScreen} from '../screens/client/ExploreScreen';
import {colors} from '../theme';

export type ClientTabsParamList = {
  Explore: undefined;
  MyAppointments: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<ClientTabsParamList>();

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

// Empty placeholder; replaced by the real screens in later slices.
function EmptyScreen() {
  return <View style={styles.empty} />;
}

export function ClientTabs() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
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

const styles = StyleSheet.create({
  empty: {flex: 1, backgroundColor: colors.paper},
});
