import React from 'react';
import {Text, TextProps} from 'react-native';
import {colors, typography} from '../theme';

export type TextVariant = keyof typeof typography;

type Props = TextProps & {
  variant?: TextVariant;
  color?: string;
};

/** The only way screens render text: every style comes from the tokens. */
export function AppText({
  variant = 'body',
  color = colors.ink,
  style,
  ...rest
}: Props) {
  return <Text {...rest} style={[typography[variant], {color}, style]} />;
}
