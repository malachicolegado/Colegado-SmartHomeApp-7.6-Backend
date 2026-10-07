import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NeonSwitch } from '@/components/neon-switch';
import { SettingRow } from '@/components/setting-row';
import { StatusBanner } from '@/components/status-banner';
import { Palette, Shadow } from '@/constants/smart-home';
import { useIoT } from '@/context/IoTContext';

const TEMPERATURE_UNITS = ['°C', '°F'] as const;

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);
  const {
    gatewayConnected,
    gatewayConnecting,
    gatewayError,
    temperatureUnit,
    connectGateway,
    disconnectGateway,
    toggleTemperatureUnit,
  } = useIoT();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Connection and display preferences</Text>
      </View>

      <View style={styles.group}>
        <SettingRow
          label="IoT Gateway"
          icon="router-wireless"
          active={gatewayConnected}
          hint={gatewayConnecting ? 'Connecting...' : gatewayConnected ? 'Connected' : 'Disconnected'}>
          {gatewayConnecting ? (
            <ActivityIndicator color={Palette.accent} />
          ) : (
            <NeonSwitch
              value={gatewayConnected}
              onValueChange={(on) => (on ? connectGateway() : disconnectGateway())}
            />
          )}
        </SettingRow>

        <SettingRow
          label="Notifications"
          icon="bell-outline"
          active={notifications}
          hint={notifications ? 'Alerts on' : 'Alerts muted'}>
          <NeonSwitch value={notifications} onValueChange={setNotifications} />
        </SettingRow>

        <SettingRow label="Temperature Unit" icon="thermometer" last>
          <View style={styles.segment}>
            {TEMPERATURE_UNITS.map((unit) => {
              const selected = unit === temperatureUnit;
              return (
                <Pressable
                  key={unit}
                  hitSlop={6}
                  onPress={selected ? undefined : toggleTemperatureUnit}
                  style={[styles.segmentItem, selected && styles.segmentSelected]}>
                  <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>{unit}</Text>
                </Pressable>
              );
            })}
          </View>
        </SettingRow>
      </View>

      {gatewayError ? (
        <StatusBanner message={gatewayError} busy={gatewayConnecting} onAction={connectGateway} />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 20,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Palette.text,
  },
  subtitle: {
    fontSize: 14,
    color: Palette.muted,
  },
  group: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surface,
    boxShadow: Shadow.card,
    overflow: 'hidden',
  },
  segment: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 999,
    backgroundColor: Palette.background,
  },
  segmentItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  segmentSelected: {
    backgroundColor: Palette.surfaceRaised,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: Palette.subtle,
  },
  segmentTextSelected: {
    color: Palette.text,
  },
});
