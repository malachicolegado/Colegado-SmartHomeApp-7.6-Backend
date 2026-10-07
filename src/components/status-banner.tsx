import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, withAlpha } from '@/constants/smart-home';

type Props = {
  message: string;
  tone?: 'error' | 'warning';
  actionLabel?: string;
  busyLabel?: string;
  busy?: boolean;
  onAction?: () => void;
};

export function StatusBanner({
  message,
  tone = 'error',
  actionLabel = 'Retry',
  busyLabel,
  busy = false,
  onAction,
}: Props) {
  const color = tone === 'warning' ? Palette.warning : Palette.danger;

  return (
    <View style={[styles.banner, { borderColor: withAlpha(color, 0.3), backgroundColor: withAlpha(color, 0.06) }]}>
      <MaterialCommunityIcons
        name={tone === 'warning' ? 'wifi-off' : 'alert-circle-outline'}
        size={20}
        color={color}
      />
      <Text style={styles.message}>{message}</Text>
      {onAction ? (
        <Pressable
          onPress={onAction}
          disabled={busy}
          hitSlop={8}
          style={({ pressed }) => [styles.action, (pressed || busy) && styles.dimmed]}>
          {busy ? <ActivityIndicator size="small" color={Palette.accent} /> : null}
          <Text style={styles.actionText}>{busy ? (busyLabel ?? actionLabel) : actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: Palette.text,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Palette.surfaceRaised,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.accent,
  },
  dimmed: {
    opacity: 0.6,
  },
});
