import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { ServiceDetailScreen } from './src/screens/ServiceDetailScreen';
import { CreateServiceScreen } from './src/screens/CreateServiceScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { VenueMapScreen } from './src/screens/VenueMapScreen';
import { ToyonaPaymentScreen } from './src/screens/ToyonaPaymentScreen';
import { TablePlannerScreen } from './src/screens/TablePlannerScreen';
import { WeddingChecklistScreen } from './src/screens/WeddingChecklistScreen';
import { ModernTabBar, TabType } from './src/components/navigation/ModernTabBar';

function MainApp() {
  const { colors, isKelin } = useAppTheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'map' | 'toyona' | 'seating' | 'checklist'>('none');

  const renderScreen = () => {
    // 1. Overlay screens (Map / To'yona / Seating / Checklist)
    if (activeOverlay === 'map') {
      return (
        <VenueMapScreen
          onBack={() => setActiveOverlay('none')}
          onSelectVenue={(id) => {
            setActiveOverlay('none');
            setSelectedServiceId(id);
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
        />
      );
    }

    if (activeOverlay === 'checklist') {
      return (
        <WeddingChecklistScreen
          onBack={() => setActiveOverlay('none')}
          onOpenBudget={() => {
            setActiveOverlay('none');
            setActiveTab('budget');
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
          onOpenMap={() => {
            setSelectedServiceId(null);
            setActiveOverlay('map');
          }}
        />
      );
    }

    // 3. Tab Screens (5 Main Tabs: Home, Map, Create/Joylash, Budget, Profile)
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onSelectService={(id) => setSelectedServiceId(id)}
            onOpenBudget={() => setActiveTab('budget')}
            onOpenMap={() => setActiveTab('map')}
            onOpenToyona={() => setActiveOverlay('toyona')}
            onOpenSeating={() => setActiveOverlay('seating')}
            onOpenChecklist={() => setActiveOverlay('checklist')}
          />
        );
      case 'map':
        return (
          <VenueMapScreen
            onSelectVenue={(id) => setSelectedServiceId(id)}
          />
        );
      case 'create':
        return (
          <CreateServiceScreen
            onSuccess={() => setActiveTab('home')}
          />
        );
      case 'budget':
        return <BudgetScreen />;
      case 'profile':
        return (
          <ProfileScreen
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenMap={() => setActiveTab('map')}
            onOpenToyona={() => setActiveOverlay('toyona')}
            onOpenSeating={() => setActiveOverlay('seating')}
            onOpenChecklist={() => setActiveOverlay('checklist')}
          />
        );
      default:
        return null;
    }
  };

  const isFullscreenView = selectedServiceId !== null || activeOverlay !== 'none';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBase }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={isKelin ? '#100720' : '#070B14'}
      />
      
      {/* Screen Body */}
      <View style={styles.body}>
        {renderScreen()}
      </View>

      {/* Luxury Floating Bottom Navigation Bar (5 Buttons) */}
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

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
  body: {
    flex: 1,
  },
});
