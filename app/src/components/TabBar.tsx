import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {border, colors, size, space} from '../theme';
import {AppText} from './AppText';
import {ExploreIcon, ProfileIcon, TicketIcon} from './icons';

const ICONS = {
  Explore: ExploreIcon,
  MyAppointments: TicketIcon,
  Profile: ProfileIcon,
} as const;

/** Client tab bar: card surface, 2 px ink top border, active tab in red with a bar. */
export function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.bar, {paddingBottom: insets.bottom}]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const {options} = descriptors[route.key];
        const label = options.title ?? route.name;
        const color = focused ? colors.red : colors.muted;
        const Icon = ICONS[route.name as keyof typeof ICONS];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{selected: focused}}
            onPress={onPress}
            style={styles.tab}
          >
            <View
              style={[
                styles.indicator,
                focused ? styles.indicatorActive : undefined,
              ]}
            />
            {Icon && <Icon color={color} />}
            {/* Labels wrap, never truncate: Spanish runs longer than English. */}
            <AppText variant="tab" color={color} style={styles.label}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderTopWidth: border.thick,
    borderTopColor: colors.ink,
  },
  tab: {
    flex: 1,
    minHeight: size.tabBar,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[1],
    paddingHorizontal: space[1],
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: space[1],
  },
  indicatorActive: {backgroundColor: colors.red},
  label: {textAlign: 'center'},
});
