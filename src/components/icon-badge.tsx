import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

import { Palette, withAlpha } from '@/constants/smart-home';

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

type Props = {
  name: IconName;
  color?: string;
  size?: number;
  active?: boolean;
};

/** A softly tinted, rounded icon container; muted when inactive. */
export function IconBadge({ name, color = Palette.accent, size = 46, active = true }: Props) {
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size * 0.32,
          backgroundColor: active ? withAlpha(color, 0.14) : Palette.surfaceRaised,
        },
      ]}>
      <MaterialCommunityIcons
        name={name}
        size={Math.round(size * 0.5)}
        color={active ? color : Palette.subtle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
