import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GatewayBanner } from '@/components/gateway-banner';
import { SensorCard } from '@/components/sensor-card';
import { StatusBanner } from '@/components/status-banner';
import { HomeRoom, Palette, Shadow } from '@/constants/smart-home';
import { formatTemperature, useIoT } from '@/context/IoTContext';

// Upper bounds used to fill each sensor's meter bar.
const MAX_TEMPERATURE_C = 45;
const MAX_HUMIDITY = 100;
const MAX_LIGHT_LUX = 1000;

export default function SensorsScreen() {
  const { sensorData, sensorsLoading, sensorsError, gatewayConnected, temperatureUnit, refreshSensors } =
    useIoT();

  const refreshDisabled = sensorsLoading || !gatewayConnected;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensors</Text>
        <Text style={styles.subtitle}>Live readings from the {HomeRoom}</Text>
      </View>

      <GatewayBanner />

      {sensorsError && gatewayConnected ? (
        <StatusBanner message={sensorsError} busy={sensorsLoading} onAction={refreshSensors} />
      ) : null}

      <View style={styles.cards}>
        <SensorCard
          label="Temperature"
          icon="thermometer"
          value={sensorData ? formatTemperature(sensorData.temperature, temperatureUnit) : '--'}
          progress={sensorData ? sensorData.temperature / MAX_TEMPERATURE_C : 0}
        />
        <SensorCard
          label="Humidity"
          icon="water-percent"
          value={sensorData ? `${sensorData.humidity} %` : '--'}
          progress={sensorData ? sensorData.humidity / MAX_HUMIDITY : 0}
        />
        <SensorCard
          label="Light Level"
          icon="white-balance-sunny"
          value={sensorData ? `${sensorData.lightLevel} lux` : '--'}
          progress={sensorData ? sensorData.lightLevel / MAX_LIGHT_LUX : 0}
        />
      </View>

      <Pressable
        onPress={refreshSensors}
        disabled={refreshDisabled}
        style={({ pressed }) => [styles.button, (pressed || refreshDisabled) && styles.dimmed]}>
        {sensorsLoading ? (
          <ActivityIndicator color={Palette.onAccent} />
        ) : (
          <MaterialCommunityIcons name="refresh" size={20} color={Palette.onAccent} />
        )}
        <Text style={styles.buttonText}>
          {sensorsLoading ? 'Refreshing Sensors...' : 'Refresh Sensors'}
        </Text>
      </Pressable>
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
    color: Palette.muted,
  },
  cards: {
    gap: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 52,
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: Palette.accent,
    boxShadow: Shadow.card,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.onAccent,
  },
  dimmed: {
    opacity: 0.55,
  },
});
