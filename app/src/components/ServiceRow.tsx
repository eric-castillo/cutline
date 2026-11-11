import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {border, colors, pattern, size, space} from '../theme';
import {AppText} from './AppText';

type Props = {
  name: string;
  price: string;
  duration: string;
  onPress?: () => void;
};

/** Dotted leader between the name and the price: the signature of the price board. */
function PriceLeader() {
  const width = pattern.priceLeader.width;
  return (
    <View style={styles.leader} accessible={false}>
      <Svg width="100%" height={width}>
        <Line
          x1={width / 2}
          y1={width / 2}
          x2="100%"
          y2={width / 2}
          stroke={pattern.priceLeader.color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={[0, width * 2]}
        />
      </Svg>
    </View>
  );
}

export function ServiceRow({name, price, duration, onPress}: Props) {
  const content = (
    <View style={styles.row}>
      <View style={styles.line}>
        <AppText variant="title" style={styles.name}>
          {name}
        </AppText>
        <PriceLeader />
        <AppText variant="price">{price}</AppText>
      </View>
      <AppText variant="small" color={colors.muted}>
        {duration}
      </AppText>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={`${name}, ${price}, ${duration}`}>
        {content}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${price}, ${duration}`}
      onPress={onPress}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: size.row,
    justifyContent: 'center',
    paddingVertical: space[3],
    borderBottomWidth: border.thin,
    borderBottomColor: colors.line,
  },
  line: {flexDirection: 'row', alignItems: 'baseline', gap: space[2]},
  name: {flexShrink: 1},
  leader: {flex: 1, justifyContent: 'flex-end'},
});
