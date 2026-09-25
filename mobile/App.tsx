import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { COLORS } from './src/theme/colors';
import { HomeScreen } from './src/screens/HomeScreen';
import { ServiceDetailScreen } from './src/screens/ServiceDetailScreen';
import { Venue3DScreen } from './src/screens/Venue3DScreen';
import { DigitalInvitationScreen } from './src/screens/DigitalInvitationScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ModernTabBar, TabType } from './src/components/navigation/ModernTabBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const renderScreen = () => {
    if (selectedServiceId !== null) {
      return (
        <ServiceDetailScreen
          serviceId={selectedServiceId}
          onBack={() => setSelectedServiceId(null)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onSelectService={(id) => setSelectedServiceId(id)}
            onOpenBudget={() => setActiveTab('invites')}
            onOpen3D={() => setActiveTab('venue3d')}
          />
        );
      case 'venue3d':
        return <Venue3DScreen />;
      case 'invites':
        return <DigitalInvitationScreen />;
      case 'profile':
        return <ProfileScreen onNavigateTab={(tab) => setActiveTab(tab)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070B14" />
      
      {/* Screen Body */}
      <View style={styles.body}>
        {renderScreen()}
      </View>

      {/* Luxury Floating Bottom Navigation Bar (4 Buttons) */}
      {selectedServiceId === null && (
        <ModernTabBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedServiceId(null);
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
