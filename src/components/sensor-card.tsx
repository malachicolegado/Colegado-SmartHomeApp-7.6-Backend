import { StyleSheet, Text, View } from 'react-native';

import { IconBadge, type IconName } from '@/components/icon-badge';
import { Palette, Shadow } from '@/constants/smart-home';

type Props = {
  label: string;
  value: string;
  icon: IconName;
  /** 0–1 fill of the meter bar; omit to hide the meter. */
  progress?: number;
};

export function SensorCard({ label, value, icon, progress }: Props) {
  const fill = progress === undefined ? undefined : Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <IconBadge name={icon} size={40} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      {fill !== undefined ? (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${fill * 100}%` }]} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
    boxShadow: Shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: Palette.muted,
  },
  value: {
    fontSize: 36,
    fontWeight: '300',
    color: Palette.text,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.track,
  },
  fill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Palette.accent,
  },
});
