import { StyleSheet, Text, View } from 'react-native';

import { IconBadge } from '@/components/icon-badge';
import { Palette, Shadow, glow, withAlpha } from '@/constants/smart-home';
import type { Device } from '@/models/IoTModels';

export function DeviceTile({ device, updating }: { device: Device; updating: boolean }) {
  const on = device.status;

  return (
    <View
      style={[
        styles.tile,
        on && {
          borderColor: withAlpha(Palette.accent, 0.3),
          boxShadow: `${Shadow.card}, ${glow(Palette.accent)}`,
        },
      ]}>
      <View style={styles.top}>
        <IconBadge name={device.icon} active={on} size={44} />
        <View
          style={[
            styles.led,
            on ? { backgroundColor: Palette.accent, boxShadow: glow(Palette.accent, 6, 0.6) } : null,
          ]}
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.name} numberOfLines={1}>
          {device.name}
        </Text>
        <Text style={[styles.status, on && !updating && styles.statusOn]}>
          {updating ? 'Updating...' : on ? 'On' : 'Off'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: 132,
    justifyContent: 'space-between',
    gap: 14,
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
    boxShadow: Shadow.card,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  led: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: Palette.track,
  },
  labels: {
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.text,
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    color: Palette.subtle,
  },
  statusOn: {
    color: Palette.accent,
  },
});
