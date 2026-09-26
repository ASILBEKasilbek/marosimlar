import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeContext';

export type TabType = 'home' | 'map' | 'create' | 'budget' | 'profile';

interface ModernTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface TabConfig {
  id: TabType;
  label: string;
  iconActive: keyof typeof Ionicons.glyphMap;
  iconInactive: keyof typeof Ionicons.glyphMap;
  badge?: string;
  isCenter?: boolean;
}

const TABS: TabConfig[] = [
  {
    id: 'home',
    label: 'Asosiy',
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    id: 'map',
    label: 'Xarita',
    iconActive: 'map',
    iconInactive: 'map-outline',
    badge: 'GPS',
  },
  {
    id: 'create',
    label: 'Joylash',
    iconActive: 'add-circle',
    iconInactive: 'add-circle-outline',
    isCenter: true,
  },
  {
    id: 'budget',
    label: 'Byudjet',
    iconActive: 'wallet',
    iconInactive: 'wallet-outline',
  },
  {
    id: 'profile',
    label: 'Profil',
    iconActive: 'person',
    iconInactive: 'person-outline',
  },
];

export const ModernTabBar: React.FC<ModernTabBarProps> = ({ activeTab, onTabChange }) => {
  const { colors, isKelin } = useAppTheme();

  return (
    <View style={styles.dockContainer}>
      <View style={[styles.dockGlass, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          // 3rd / Center Prominent "Joylash" Button
          if (tab.isCenter) {
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.85}
                style={styles.centerTabWrapper}
                onPress={() => onTabChange(tab.id)}
              >
                <View style={[styles.centerGlowRing, { borderColor: colors.primaryLight }]}>
                  <LinearGradient
                    colors={colors.primaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.centerBtnGradient}
                  >
                    <Ionicons
                      name="add"
                      size={28}
                      color={isKelin ? '#FFFFFF' : '#070B14'}
                    />
                  </LinearGradient>
                </View>
                <Text
                  style={[
                    styles.centerLabel,
                    { color: isActive ? colors.primaryLight : '#94A3B8' },
                    isActive && { fontWeight: '900' },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              style={styles.tabButton}
              onPress={() => onTabChange(tab.id)}
            >
              {/* Active Glow Background */}
              {isActive && (
                <LinearGradient
                  colors={colors.primaryGradientSubtle}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={[styles.activePillGlow, { borderColor: colors.primaryLight }]}
                />
              )}

              {/* Icon Container with Badge */}
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={isActive ? tab.iconActive : tab.iconInactive}
                  size={isActive ? 21 : 20}
                  color={isActive ? colors.primaryLight : '#64748B'}
                />

                {/* Optional mini GPS Tag */}
                {tab.badge && (
                  <View
                    style={[
                      styles.badgeTag,
                      isActive && {
                        backgroundColor: colors.primaryLight,
                        borderColor: colors.primaryLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeTagText,
                        isActive && { color: isKelin ? '#FFFFFF' : '#070B14' },
                      ]}
                    >
                      {tab.badge}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text
                style={[
                  styles.tabLabel,
                  isActive && { color: colors.primaryLight, fontWeight: '800' },
                ]}
              >
                {tab.label}
              </Text>

              {/* Active Indicator Dot */}
              {isActive && (
                <View
                  style={[
                    styles.activeDot,
                    { backgroundColor: colors.primaryLight },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 14,
    left: 14,
    right: 14,
    alignItems: 'center',
    zIndex: 99,
  },
  dockGlass: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(10, 15, 26, 0.95)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    position: 'relative',
    borderRadius: 18,
  },
  activePillGlow: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
    borderRadius: 16,
    borderWidth: 0.5,
  },
  iconWrapper: {
    position: 'relative',
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTag: {
    position: 'absolute',
    top: -5,
    right: -13,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    paddingHorizontal: 3,
    paddingVertical: 0.5,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeTagText: {
    color: '#94A3B8',
    fontSize: 7,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  // Center Raised Joylash Button Styles
  centerTabWrapper: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
  centerGlowRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    padding: 2,
    backgroundColor: '#070B14',
    shadowColor: COLORS.gold[400],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  centerBtnGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    fontSize: 9.5,
    marginTop: 2,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
