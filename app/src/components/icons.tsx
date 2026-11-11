import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {border, size} from '../theme';

type IconProps = {color: string; size?: number};

// Stroke icons: 24 grid, 2 stroke, round caps and joins, currentColor-style.
function Base({
  color,
  size: iconSize = size.icon,
  children,
}: IconProps & {children: React.ReactNode}) {
  return (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={border.thick}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </Svg>
  );
}

/** Explore: a magnifier. */
export function ExploreIcon(props: IconProps) {
  return (
    <Base {...props}>
      <Circle cx="11" cy="11" r="7" />
      <Path d="M20 20l-4-4" />
    </Base>
  );
}

/** My appointments: a ticket with a notch on each side. */
export function TicketIcon(props: IconProps) {
  return (
    <Base {...props}>
      <Path d="M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4V7z" />
      <Path d="M14 7v10" strokeDasharray="1 3" />
    </Base>
  );
}

/** Profile: head and shoulders. */
export function ProfileIcon(props: IconProps) {
  return (
    <Base {...props}>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <Path d="M5 12.5l4.5 4.5L19 7.5" />
    </Base>
  );
}
