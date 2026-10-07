import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconBadge } from '@/components/icon-badge';
import { NeonSwitch } from '@/components/neon-switch';
import { Palette, Shadow, glow, withAlpha } from '@/constants/smart-home';
import type { Device } from '@/models/IoTModels';

type Props = {
  device: Device;
  updating: boolean;
  disabled: boolean;
  error?: string;
  onToggle: (status: boolean) => void;
};

export function DeviceRow({ device, updating, disabled, error, onToggle }: Props) {
  const on = device.status;

  return (
    <View
      style={[
        styles.card,
        on && {
          borderColor: withAlpha(Palette.accent, 0.3),
          boxShadow: `${Shadow.card}, ${glow(Palette.accent)}`,
        },
      ]}>
      <View style={styles.row}>
        <IconBadge name={device.icon} active={on} size={48} />
        <View style={styles.labels}>
          <Text style={styles.name}>{device.name}</Text>
          <Text style={styles.type}>
            {device.type} · {updating ? 'Updating...' : on ? 'On' : 'Off'}
          </Text>
        </View>
        <NeonSwitch value={on} onValueChange={onToggle} disabled={disabled || updating} />
      </View>

      {error ? (
        <View style={styles.errorRow}>
          <Text style={styles.errorText}>{error}</Text>
          {!disabled ? (
            <Pressable hitSlop={8} onPress={() => onToggle(!on)}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
    boxShadow: Shadow.card,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 56,
  },
  labels: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.text,
  },
  type: {
    fontSize: 13,
    color: Palette.muted,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.divider,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: Palette.danger,
  },
  retryText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.accent,
  },
});
