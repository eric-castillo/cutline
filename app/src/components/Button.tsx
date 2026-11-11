import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {border, colors, radius, size, space} from '../theme';
import {AppText} from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive';

type Props = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  /** The tall call-to-action height used in sticky bars. */
  cta?: boolean;
  disabled?: boolean;
  loading?: boolean;
  accessibilityHint?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  cta = false,
  disabled = false,
  loading = false,
  accessibilityHint,
}: Props) {
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{disabled: inactive, busy: loading}}
      disabled={inactive}
      onPress={onPress}
      style={({pressed}) => [
        styles.base,
        {minHeight: cta ? size.cta : size.control},
        variantStyle(variant, pressed, disabled),
      ]}
    >
      {() => {
        const textColor = labelColor(variant, disabled);
        return (
          <View style={styles.content}>
            {/* The label stays in the layout while loading so the width does not jump. */}
            <AppText
              variant="button"
              color={textColor}
              style={loading ? styles.hidden : undefined}
            >
              {label}
            </AppText>
            {loading && (
              <View style={styles.spinner}>
                <ActivityIndicator color={textColor} />
              </View>
            )}
          </View>
        );
      }}
    </Pressable>
  );
}

function variantStyle(
  variant: ButtonVariant,
  pressed: boolean,
  disabled: boolean,
) {
  if (variant === 'primary') {
    return {
      backgroundColor: disabled
        ? colors.line
        : pressed
        ? colors.redPressed
        : colors.red,
      borderColor: 'transparent',
    };
  }
  const outline = variant === 'destructive' ? colors.red : colors.ink;
  return {
    backgroundColor: pressed ? colors.line : 'transparent',
    borderColor: disabled ? colors.lineStrong : outline,
  };
}

function labelColor(variant: ButtonVariant, disabled: boolean) {
  if (disabled) {
    return colors.disabledText;
  }
  if (variant === 'primary') {
    return colors.white;
  }
  return variant === 'destructive' ? colors.red : colors.ink;
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space[5],
    paddingVertical: space[2],
    borderRadius: radius.sm,
    borderWidth: border.thick,
  },
  content: {alignItems: 'center', justifyContent: 'center'},
  hidden: {opacity: 0},
  spinner: {...StyleSheet.absoluteFill, justifyContent: 'center'},
});
