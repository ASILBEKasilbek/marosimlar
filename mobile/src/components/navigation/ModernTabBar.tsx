import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeContext';

export type TabType = 'home' | 'venue3d' | 'invites' | 'profile';

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
}

const TABS: TabConfig[] = [
  {
    id: 'home',
    label: 'Asosiy',
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    id: 'venue3d',
    label: '3D Zallar',
    iconActive: 'cube',
    iconInactive: 'cube-outline',
    badge: '3D',
  },
  {
    id: 'invites',
    label: 'Taklifnoma',
    iconActive: 'mail-open',
    iconInactive: 'mail-unread-outline',
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
                  size={isActive ? 22 : 21}
                  color={isActive ? colors.primaryLight : '#64748B'}
                />

                {/* Optional mini 3D Tag */}
                {tab.badge && (
                  <View style={[styles.badgeTag, isActive && { backgroundColor: colors.primaryLight, borderColor: colors.primaryLight }]}>
                    <Text style={[styles.badgeTagText, isActive && { color: isKelin ? '#FFFFFF' : '#070B14' }]}>
                      {tab.badge}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text style={[styles.tabLabel, isActive && { color: colors.primaryLight, fontWeight: '800' }]}>
                {tab.label}
              </Text>

              {/* Active Indicator Dot */}
              {isActive && <View style={[styles.activeDot, { backgroundColor: colors.primaryLight }]} />}
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
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 99,
  },
  dockGlass: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(10, 15, 26, 0.94)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 8,
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
    paddingVertical: 6,
    position: 'relative',
    borderRadius: 20,
  },
  activePillGlow: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 4,
    right: 4,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  iconWrapper: {
    position: 'relative',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTag: {
    position: 'absolute',
    top: -6,
    right: -14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeTagActive: {
    backgroundColor: COLORS.gold[400],
    borderColor: COLORS.gold[400],
  },
  badgeTagText: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '800',
  },
  badgeTagTextActive: {
    color: '#070B14',
    fontWeight: '900',
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: COLORS.gold[400],
    fontWeight: '800',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold[400],
    marginTop: 3,
  },
});
