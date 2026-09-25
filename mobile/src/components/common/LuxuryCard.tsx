import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../theme/colors';

interface LuxuryCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'glass' | 'outlined';
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({ children, style, variant = 'elevated' }) => {
  return (
    <View style={[
      styles.card,
      variant === 'glass' && styles.glassCard,
      variant === 'outlined' && styles.outlinedCard,
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
    borderColor: 'rgba(212, 175, 55, 0.2)', // Oltin tusli nozik chegara
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  glassCard: {
    backgroundColor: 'rgba(15, 22, 38, 0.85)',
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
});
