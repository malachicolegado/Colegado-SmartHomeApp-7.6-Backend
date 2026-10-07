import { Platform, Switch } from 'react-native';

import { Palette } from '@/constants/smart-home';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

// react-native-web colors the "on" thumb with its own `activeThumbColor` prop (teal by default).
const webThumb: object = Platform.OS === 'web' ? { activeThumbColor: Palette.text } : {};

/** A switch whose "on" track fills with the soft accent blue. */
export function NeonSwitch({ value, onValueChange, disabled }: Props) {
  return (
    <Switch
      {...webThumb}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: Palette.track, true: Palette.accent }}
      thumbColor={value ? Palette.text : Palette.muted}
      ios_backgroundColor={Palette.track}
    />
  );
}
