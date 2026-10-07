import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconBadge, type IconName } from '@/components/icon-badge';
import { Palette } from '@/constants/smart-home';

export function SettingRow({
  label,
  hint,
  icon,
  active = true,
  last = false,
  children,
}: {
  label: string;
  hint?: string;
  icon: IconName;
  active?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <IconBadge name={icon} active={active} size={40} />
      <View style={styles.labels}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.divider,
  },
  labels: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.text,
  },
  hint: {
    fontSize: 13,
    color: Palette.muted,
  },
});
