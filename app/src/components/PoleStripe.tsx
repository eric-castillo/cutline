import React, {useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';
import {pattern, size} from '../theme';

/**
 * Barber-pole band: hard-stop diagonal stripes (red, card, blue, card).
 * Decorative only, so it is hidden from assistive technology.
 */
export function PoleStripe() {
  const [width, setWidth] = useState(0);
  const height = size.poleStripe;
  const stripe = pattern.poleStripe.stripeWidth;
  const stops = pattern.poleStripe.stops;

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  // 45° slant: each stripe leans by `height`, so draw one extra stripe off-screen.
  const count = width > 0 ? Math.ceil(width / stripe) + 2 : 0;
  const polygons = [];
  for (let i = 0; i < count; i++) {
    const x = (i - 1) * stripe;
    polygons.push(
      <Polygon
        key={i}
        points={`${x + height},0 ${x + height + stripe},0 ${
          x + stripe
        },${height} ${x},${height}`}
        fill={stops[i % stops.length]}
      />,
    );
  }

  return (
    <View
      style={[styles.band, {height}]}
      onLayout={onLayout}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
    >
      {width > 0 && (
        <Svg width={width} height={height}>
          {polygons}
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  band: {alignSelf: 'stretch', overflow: 'hidden'},
});
