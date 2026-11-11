import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {border, colors, radius, size, space} from '../theme';
import {AppText} from './AppText';
import {CheckIcon} from './icons';

type Props = {
  label: string;
  selected?: boolean;
  /** When set the chip is interactive and gets the 44 touch target. */
  onPress?: () => void;
};

const CHECK_SIZE = size.icon - space[2];

export function Chip({label, selected = false, onPress}: Props) {
  const textColor = selected ? colors.paper : colors.ink;
  const body = (
    <View
      style={[
        styles.chip,
        onPress ? styles.interactive : undefined,
        selected ? styles.selected : undefined,
      ]}
    >
      {/* Selection is shown by fill AND a check mark, never by color alone. */}
      {selected && <CheckIcon color={textColor} size={CHECK_SIZE} />}
      <AppText variant="small" color={textColor}>
        {label}
      </AppText>
    </View>
  );

  if (!onPress) {
    return body;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{selected}}
      onPress={onPress}
    >
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space[1],
    paddingHorizontal: space[3],
    paddingVertical: space[1],
    borderRadius: radius.sm,
    borderWidth: border.thin,
    borderColor: colors.line,
    backgroundColor: colors.card,
  },
  selected: {backgroundColor: colors.ink},
  interactive: {minHeight: size.touch, justifyContent: 'center'},
});
