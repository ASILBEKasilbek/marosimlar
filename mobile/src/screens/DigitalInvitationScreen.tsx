import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';
import { RSVPTrackerCard } from '../components/invitation/RSVPTrackerCard';
import { LuxuryCard } from '../components/common/LuxuryCard';
import { GoldButton } from '../components/common/GoldButton';

export const DigitalInvitationScreen: React.FC = () => {
  const { colors, isKelin } = useAppTheme();
  const inviteLink = "https://tuybox.asilbek.tech/invite/jasurbek-madina-2026";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Assalomu alaykum! Sizni to'yimizga taklif qilamiz! Manzil va tafsilotlar: ${inviteLink}`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgBase }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.pageTitle}>💌 Raqamli Taklifnoma & QR</Text>
        <Text style={styles.pageSubtitle}>
          Qog'oz taklifnoma o'rniga zamonaviy shaxsiy veb-sahifa va Telegram RSVP
        </Text>
      </View>

      {/* RSVP Tracker */}
      <RSVPTrackerCard
        title="To'y Taklifnomasi"
        groomAndBride="Jasurbek & Madina"
        daysRemaining={19}
        attendingCount={240}
        declinedCount={15}
      />

      {/* Havola va Ulashish */}
      <LuxuryCard style={styles.linkCard} variant="glass">
        <Text style={styles.linkCardTitle}>Shaxsiy to'y taklifnomasi havolasi:</Text>
        <View style={[styles.linkBox, { borderColor: colors.borderColor }]}>
          <Text style={[styles.linkText, { color: colors.textGoldOrPurple }]} numberOfLines={1}>{inviteLink}</Text>
        </View>
        <GoldButton
          title="Telegram orqali mehmonlarga yuborish ✈️"
          onPress={handleShare}
          style={{ marginTop: 12 }}
        />
      </LuxuryCard>

      {/* So'nggi kelgan tabriklar va javoblar */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Oxirgi kelgan tabriklar:</Text>
        {[
          { name: "Sardorbek va oilasi", status: "Albatta boramiz (+3 kishi)", text: "Baxtli bo'linglar, to'yda ko'rishguncha!" },
          { name: "Dilshod Akramov", status: "Boraman (+1 kishi)", text: "Qo'sha qaringlar, umringlar uzoq bo'lsin!" },
          { name: "Jamshid Qodirov", status: "Bora olmayman", text: "Afsuski xizmat safaridaman, chin dildan tabriklayman!" },
        ].map((item, idx) => (
          <LuxuryCard key={idx} style={styles.rsvpItem} variant="glass">
            <View style={styles.rsvpItemHeader}>
              <Text style={styles.guestName}>{item.name}</Text>
              <Text style={[styles.guestStatus, item.status.includes('Boramiz') || item.status.includes('Boraman') ? styles.statusGreen : styles.statusRed]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.guestMessage}>"{item.text}"</Text>
          </LuxuryCard>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian.base,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 110, // Avoid bottom floating tab bar
  },
  header: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  linkCard: {
    marginVertical: 10,
  },
  linkCardTitle: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 8,
  },
  linkBox: {
    backgroundColor: 'rgba(7, 11, 20, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    padding: 12,
    borderRadius: 12,
  },
  linkText: {
    color: COLORS.gold[400],
    fontSize: 13,
    fontWeight: '700',
  },
  recentSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  rsvpItem: {
    marginVertical: 6,
    padding: 14,
  },
  rsvpItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  guestName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  guestStatus: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusGreen: {
    color: '#10B981',
  },
  statusRed: {
    color: '#EF4444',
  },
  guestMessage: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
  }
});
