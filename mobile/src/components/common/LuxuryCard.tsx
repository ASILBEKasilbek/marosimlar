import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeContext';

interface LuxuryCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'glass' | 'outlined';
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({ children, style, variant = 'elevated' }) => {
  const { colors, isKelin } = useAppTheme();

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: colors.bgCard,
        borderColor: colors.borderColor,
        shadowColor: isKelin ? colors.primary : COLORS.gold[500],
      },
      variant === 'glass' && {
        backgroundColor: isKelin ? 'rgba(26, 14, 46, 0.85)' : 'rgba(15, 22, 38, 0.85)',
        borderColor: isKelin ? 'rgba(192, 132, 252, 0.35)' : 'rgba(212, 175, 55, 0.35)',
      },
      variant === 'outlined' && {
        backgroundColor: 'transparent',
        borderColor: colors.borderColor,
      },
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.obsidian.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
});
