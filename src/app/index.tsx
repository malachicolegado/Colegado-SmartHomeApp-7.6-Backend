import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DeviceTile } from '@/components/device-tile';
import { GatewayBanner } from '@/components/gateway-banner';
import { type IconName } from '@/components/icon-badge';
import { HomeRoom, Palette, Shadow } from '@/constants/smart-home';
import { formatTemperature, useIoT } from '@/context/IoTContext';

function HeroStat({ icon, value, label }: { icon: IconName; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <MaterialCommunityIcons name={icon} size={18} color={Palette.muted} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const {
    devices,
    devicesLoading,
    updatingDeviceIds,
    sensorData,
    sensorsLoading,
    gatewayConnected,
    temperatureUnit,
  } = useIoT();

  const tiles = devices.slice(0, 4);
  const activeCount = devices.filter((device) => device.status).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <View style={styles.titleText}>
          <Text style={styles.eyebrow}>Welcome home</Text>
          <Text style={styles.title}>Smart Home</Text>
        </View>
        <Link href="/settings" asChild>
          <Pressable hitSlop={12} style={styles.iconButton}>
            <MaterialCommunityIcons name="cog-outline" size={22} color={Palette.muted} />
          </Pressable>
        </Link>
      </View>

      <View style={styles.gatewayRow}>
        <View style={[styles.dot, { backgroundColor: gatewayConnected ? Palette.success : Palette.danger }]} />
        <Text style={styles.gatewayText}>
          Gateway {gatewayConnected ? 'connected' : 'disconnected'} · {activeCount} of {devices.length}{' '}
          devices on
        </Text>
      </View>

      <GatewayBanner />

      <Link href="/sensors" asChild>
        <Pressable style={styles.hero}>
          <View style={styles.heroTop}>
            <Text style={styles.room}>{HomeRoom}</Text>
            <MaterialCommunityIcons name="home-thermometer-outline" size={22} color={Palette.accent} />
          </View>

          <View style={styles.heroReading}>
            {sensorData ? (
              <Text style={styles.temperature}>
                {formatTemperature(sensorData.temperature, temperatureUnit)}
              </Text>
            ) : sensorsLoading ? (
              <ActivityIndicator size="large" color={Palette.accent} />
            ) : (
              <Text style={styles.temperature}>--</Text>
            )}
          </View>

          <View style={styles.heroStats}>
            <HeroStat
              icon="water-percent"
              value={sensorData ? `${sensorData.humidity} %` : '--'}
              label="Humidity"
            />
            <HeroStat
              icon="white-balance-sunny"
              value={sensorData ? `${sensorData.lightLevel} lux` : '--'}
              label="Light"
            />
          </View>
        </Pressable>
      </Link>

      <Text style={styles.sectionTitle}>Quick Controls</Text>

      {devicesLoading && devices.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Palette.accent} />
          <Text style={styles.loadingText}>Loading devices...</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            {tiles.slice(0, 2).map((device) => (
              <DeviceTile
                key={device.id}
                device={device}
                updating={updatingDeviceIds.includes(device.id)}
              />
            ))}
          </View>
          <View style={styles.gridRow}>
            {tiles.slice(2, 4).map((device) => (
              <DeviceTile
                key={device.id}
                device={device}
                updating={updatingDeviceIds.includes(device.id)}
              />
            ))}
          </View>
        </View>
      )}

      <Link href="/devices" asChild>
        <Pressable style={styles.viewAll}>
          <Text style={styles.viewAllText}>View all devices</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color={Palette.accent} />
        </Pressable>
      </Link>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    gap: 2,
  },
  eyebrow: {
    fontSize: 14,
    color: Palette.muted,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Palette.text,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.surface,
  },
  gatewayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  gatewayText: {
    fontSize: 13,
    color: Palette.muted,
  },
  hero: {
    gap: 8,
    padding: 22,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Palette.outline,
    backgroundColor: Palette.surfaceRaised,
    experimental_backgroundImage: 'linear-gradient(160deg, #1F2D44 0%, #162030 100%)',
    boxShadow: Shadow.card,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  room: {
    fontSize: 15,
    fontWeight: '500',
    color: Palette.muted,
  },
  heroReading: {
    minHeight: 80,
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 60,
    fontWeight: '200',
    color: Palette.text,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Palette.divider,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.text,
  },
  statLabel: {
    fontSize: 13,
    color: Palette.subtle,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '600',
    color: Palette.text,
  },
  loading: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 28,
  },
  loadingText: {
    fontSize: 15,
    color: Palette.muted,
  },
  grid: {
    gap: 14,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 14,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minHeight: 48,
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.accent,
  },
});
