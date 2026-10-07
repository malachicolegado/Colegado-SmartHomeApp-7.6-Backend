import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceRow } from '@/components/device-row';
import { GatewayBanner } from '@/components/gateway-banner';
import { StatusBanner } from '@/components/status-banner';
import { Palette } from '@/constants/smart-home';
import { useIoT } from '@/context/IoTContext';

export default function DevicesScreen() {
  const {
    devices,
    devicesLoading,
    devicesError,
    updatingDeviceIds,
    deviceErrors,
    gatewayConnected,
    loadDevices,
    setDeviceStatus,
  } = useIoT();

  const activeCount = devices.filter((device) => device.status).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>My Devices</Text>
        <Text style={styles.subtitle}>
          {activeCount} of {devices.length} devices are on
        </Text>
      </View>

      <GatewayBanner />

      {devicesError ? (
        <StatusBanner
          message={devicesError}
          busy={devicesLoading}
          busyLabel="Loading..."
          onAction={loadDevices}
        />
      ) : null}

      {devicesLoading && devices.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Palette.accent} />
          <Text style={styles.loadingText}>Loading devices...</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {devices.map((device) => (
            <DeviceRow
              key={device.id}
              device={device}
              updating={updatingDeviceIds.includes(device.id)}
              disabled={!gatewayConnected}
              error={deviceErrors[device.id]}
              onToggle={(status) => setDeviceStatus(device.id, status)}
            />
          ))}
        </View>
      )}
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
    gap: 16,
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
    fontWeight: '600',
    color: Palette.muted,
  },
  list: {
    gap: 14,
  },
  loading: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.muted,
  },
});
