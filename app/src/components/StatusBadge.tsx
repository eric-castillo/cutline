import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, radius, space} from '../theme';
import {AppText} from './AppText';

export type AppointmentStatus = keyof typeof colors.status;

/** Status is always text plus color; cancelled is also struck through. */
export function StatusBadge({status}: {status: AppointmentStatus}) {
  const {t} = useTranslation();
  const {fg, bg} = colors.status[status];
  return (
    <View style={[styles.badge, {backgroundColor: bg}]}>
      <AppText
        variant="caption"
        color={fg}
        style={status === 'cancelled' ? styles.struck : undefined}
      >
        {t(`status.${status}`)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: space[2],
    paddingVertical: space[1],
    borderRadius: radius.sm,
  },
  struck: {textDecorationLine: 'line-through'},
});
