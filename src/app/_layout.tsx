import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DarkTheme, ThemeProvider } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { type ColorValue } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Palette, withAlpha } from '@/constants/smart-home';
import { IoTProvider } from '@/context/IoTContext';

const NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Palette.accent,
    background: Palette.background,
    card: Palette.header,
    text: Palette.text,
    border: Palette.divider,
  },
};

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

function drawerIcon(active: IconName, inactive: IconName) {
  return function DrawerIcon({
    color,
    size,
    focused,
  }: {
    color: ColorValue;
    size: number;
    focused: boolean;
  }) {
    return <MaterialCommunityIcons name={focused ? active : inactive} size={size} color={color} />;
  };
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Palette.background }}>
      <ThemeProvider value={NavigationTheme}>
        <IoTProvider>
          <Drawer
            screenOptions={{
              headerStyle: { backgroundColor: Palette.header },
              headerTintColor: Palette.text,
              headerTitleAlign: 'left',
              headerTitleStyle: { fontSize: 18, fontWeight: '700', color: Palette.text },
              headerShadowVisible: false,
              sceneStyle: { backgroundColor: Palette.background },
              drawerStyle: {
                backgroundColor: Palette.drawer,
                borderRightWidth: 1,
                borderRightColor: Palette.divider,
              },
              drawerContentStyle: { paddingTop: 12 },
              drawerItemStyle: { borderRadius: 16, marginVertical: 3 },
              drawerActiveTintColor: Palette.accent,
              drawerActiveBackgroundColor: withAlpha(Palette.accent, 0.1),
              drawerInactiveTintColor: Palette.muted,
              drawerLabelStyle: { fontSize: 15, fontWeight: '600' },
            }}>
            <Drawer.Screen
              name="index"
              options={{
                title: 'Smart Home',
                drawerLabel: 'Dashboard',
                drawerIcon: drawerIcon('view-dashboard', 'view-dashboard-outline'),
              }}
            />
            <Drawer.Screen
              name="devices"
              options={{
                title: 'Devices',
                drawerIcon: drawerIcon('toggle-switch', 'toggle-switch-outline'),
              }}
            />
            <Drawer.Screen
              name="sensors"
              options={{
                title: 'Sensors',
                drawerIcon: drawerIcon('gauge', 'gauge'),
              }}
            />
            <Drawer.Screen
              name="settings"
              options={{
                title: 'Settings',
                drawerIcon: drawerIcon('cog', 'cog-outline'),
              }}
            />
          </Drawer>
        </IoTProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
