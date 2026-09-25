import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { COLORS } from './src/theme/colors';
import { HomeScreen } from './src/screens/HomeScreen';
import { ServiceDetailScreen } from './src/screens/ServiceDetailScreen';
import { Venue3DScreen } from './src/screens/Venue3DScreen';
import { DigitalInvitationScreen } from './src/screens/DigitalInvitationScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { VenueMapScreen } from './src/screens/VenueMapScreen';
import { ToyonaPaymentScreen } from './src/screens/ToyonaPaymentScreen';
import { TablePlannerScreen } from './src/screens/TablePlannerScreen';
import { ModernTabBar, TabType } from './src/components/navigation/ModernTabBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'map' | 'toyona' | 'seating'>('none');

  const renderScreen = () => {
    // 1. Overlay screens (Map / To'yona / Seating)
    if (activeOverlay === 'map') {
      return (
        <VenueMapScreen
          onBack={() => setActiveOverlay('none')}
          onSelectVenue={(id) => {
            setActiveOverlay('none');
            setSelectedServiceId(id);
          }}
          onOpen3D={() => {
            setActiveOverlay('none');
            setActiveTab('venue3d');
          }}
        />
      );
    }

    if (activeOverlay === 'toyona') {
      return (
        <ToyonaPaymentScreen
          onBack={() => setActiveOverlay('none')}
        />
      );
    }

    if (activeOverlay === 'seating') {
      return (
        <TablePlannerScreen
          onBack={() => setActiveOverlay('none')}
          onOpen3D={() => {
            setActiveOverlay('none');
            setActiveTab('venue3d');
          }}
        />
      );
    }

    // 2. Service Detail Screen
    if (selectedServiceId !== null) {
      return (
        <ServiceDetailScreen
          serviceId={selectedServiceId}
          onBack={() => setSelectedServiceId(null)}
          onOpen3D={() => {
            setSelectedServiceId(null);
            setActiveTab('venue3d');
          }}
          onOpenMap={() => {
            setSelectedServiceId(null);
            setActiveOverlay('map');
          }}
        />
      );
    }

    // 3. Tab Screens (4 Main Tabs)
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onSelectService={(id) => setSelectedServiceId(id)}
            onOpenBudget={() => setActiveTab('invites')}
            onOpen3D={() => setActiveTab('venue3d')}
            onOpenMap={() => setActiveOverlay('map')}
            onOpenToyona={() => setActiveOverlay('toyona')}
            onOpenSeating={() => setActiveOverlay('seating')}
          />
        );
      case 'venue3d':
        return <Venue3DScreen />;
      case 'invites':
        return <DigitalInvitationScreen />;
      case 'profile':
        return (
          <ProfileScreen
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenMap={() => setActiveOverlay('map')}
            onOpenToyona={() => setActiveOverlay('toyona')}
            onOpenSeating={() => setActiveOverlay('seating')}
          />
        );
      default:
        return null;
    }
  };

  const isFullscreenView = selectedServiceId !== null || activeOverlay !== 'none';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />
      
      {/* Screen Body */}
      <View style={styles.body}>
        {renderScreen()}
      </View>

      {/* Luxury Floating Bottom Navigation Bar (4 Buttons) */}
      {!isFullscreenView && (
        <ModernTabBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedServiceId(null);
            setActiveOverlay('none');
            setActiveTab(tab);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian.base,
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
  body: {
    flex: 1,
  },
});
