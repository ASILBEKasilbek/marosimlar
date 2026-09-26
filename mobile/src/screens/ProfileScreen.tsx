import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Share,
  Vibration,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

interface ProfileScreenProps {
  onNavigateTab?: (tab: 'home' | 'venue3d' | 'invites') => void;
  onOpenMap?: () => void;
  onOpenToyona?: () => void;
  onOpenSeating?: () => void;
  onOpenChecklist?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateTab,
  onOpenMap,
  onOpenToyona,
  onOpenSeating,
  onOpenChecklist,
}) => {
  const { isKelin, setMode, colors } = useAppTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: "TuyBox — O'zbekistondagi eng hashamatli to'y va marosimlar platformasi! Yuklab oling: https://tuybox.asilbek.tech",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Hisobdan chiqish",
      "Rostdan ham profilingizdan chiqmoqchimisiz?",
      [
        { text: "Bekor qilish", style: "cancel" },
        { text: "Chiqish", style: "destructive", onPress: () => console.log('Logged out') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Mening Profilim</Text>
        <TouchableOpacity style={styles.settingsIconBtn} onPress={() => Alert.alert("Sozlamalar", "Profil sozlamalari yangilanmoqda")}>
          <Ionicons name="settings-outline" size={20} color={COLORS.gold[400]} />
        </TouchableOpacity>
      </View>

      {/* User Hero Card */}
      <View style={styles.userHeroCard}>
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.15)', 'rgba(15, 22, 38, 0.95)']}
          style={styles.heroGradient}
        >
          <View style={styles.avatarRow}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../assets/logo.jpg')}
                style={styles.avatarImage}
              />
              <View style={styles.verifiedCheck}>
                <Ionicons name="checkmark-sharp" size={12} color="#070B14" />
              </View>
            </View>

            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>Jasurbek & Madina</Text>
              </View>
              <Text style={styles.userPhone}>+998 (90) 123-45-67</Text>
              
              <View style={[styles.vipBadge, isKelin && { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}>
                <Ionicons name="diamond" size={12} color={isKelin ? colors.primaryLight : COLORS.gold[400]} style={{ marginRight: 4 }} />
                <Text style={[styles.vipBadgeText, isKelin && { color: colors.primaryLight }]}>
                  {isKelin ? 'TuyBox Kelin VIP Member' : 'TuyBox VIP Gold Member'}
                </Text>
              </View>
            </View>
          </View>

          {/* Dual Luxury Mode Switcher: Kuyov vs Kelin */}
          <View style={styles.themeModeToggleRow}>
            <TouchableOpacity
              style={[styles.themeModeBtn, !isKelin && styles.themeModeBtnActive]}
              onPress={() => {
                setMode('kuyov');
                if (Platform.OS !== 'web') Vibration.vibrate(15);
              }}
            >
              <Text style={styles.themeModeEmoji}>👑</Text>
              <Text style={[styles.themeModeBtnText, !isKelin && styles.themeModeBtnTextActive]}>
                Kuyov Rejimi (Gold)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.themeModeBtn, isKelin && styles.themeModeBrideActive]}
              onPress={() => {
                setMode('kelin');
                if (Platform.OS !== 'web') Vibration.vibrate(15);
              }}
            >
              <Text style={styles.themeModeEmoji}>🌸</Text>
              <Text style={[styles.themeModeBtnText, isKelin && { color: '#C084FC', fontWeight: '800' }]}>
                Kelin Rejimi (Binafsha)
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Wedding Countdown Card */}
      <View style={styles.countdownCard}>
        <LinearGradient
          colors={['#172036', '#0F1626']}
          style={styles.countdownGradient}
        >
          <View style={styles.countdownHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ringEmoji}>💍</Text>
              <View>
                <Text style={styles.countdownSubtitle}>Muqaddas Nikoh To'yi</Text>
                <Text style={styles.weddingDate}>15-Noyabr, 2026 • Versal Grand</Text>
              </View>
            </View>
            <View style={styles.daysBadge}>
              <Text style={styles.daysNumber}>48</Text>
              <Text style={styles.daysText}>kun qoldi</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>To'y tayyorgarligi</Text>
              <Text style={styles.progressPercent}>75% bajarildi</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <LinearGradient
                colors={['#FFDF73', '#D4AF37']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: '75%' }]}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Wedding Day Timeline (Kun Tartibi) */}
      <View style={styles.timelineSection}>
        <View style={styles.timelineHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time-outline" size={16} color={COLORS.gold[400]} style={{ marginRight: 6 }} />
            <Text style={styles.timelineTitle}>TO'Y KUNI TAYM-LAYNI • 15-NOYABR</Text>
          </View>
          <View style={styles.timelineBadge}>
            <Text style={styles.timelineBadgeText}>5 BOSQICH</Text>
          </View>
        </View>

        <View style={styles.timelineCard}>
          {[
            { time: '06:00', title: 'Nahor Oshi', place: "Versal Oshi Zali (600 kishi)", status: 'done' },
            { time: '10:00', title: 'Kuyov Navkar / Kelin Salom', place: "Kelin xonadoni & Sarpolar", status: 'done' },
            { time: '13:00', title: 'FHDYo (ZAGS) & Fotosessiya', place: "City Park & Markaziy ZAGS", status: 'current' },
            { time: '18:00', title: 'Hashamatli To\'yxona Bazmi', place: "Versal Grand Ballroom (VIP)", status: 'upcoming' },
            { time: '23:00', title: 'Mushakbozlik & To\'y Yakuni', place: "Sharqona Olov Shousi", status: 'upcoming' },
          ].map((item, idx) => (
            <View key={idx} style={styles.timelineRow}>
              <View style={styles.timelineTimeBox}>
                <Text style={styles.timelineTimeText}>{item.time}</Text>
              </View>
              <View style={styles.timelineDotLine}>
                <View style={[
                  styles.timelineDot,
                  item.status === 'done' ? styles.timelineDotDone :
                  item.status === 'current' ? styles.timelineDotCurrent : styles.timelineDotUpcoming
                ]} />
                {idx < 4 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <Text style={[
                  styles.timelineItemTitle,
                  item.status === 'current' && { color: COLORS.gold[400] }
                ]}>
                  {item.title}
                </Text>
                <Text style={styles.timelineItemPlace}>{item.place}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats Grid */}
      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard} onPress={() => onNavigateTab && onNavigateTab('home')}>
          <View style={[styles.statIconBox, { backgroundColor: 'rgba(212, 175, 55, 0.15)' }]}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.gold[400]} />
          </View>
          <Text style={styles.statCount}>3 ta</Text>
          <Text style={styles.statLabel}>Bronlarim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard} onPress={() => onNavigateTab && onNavigateTab('invites')}>
          <View style={[styles.statIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
            <Ionicons name="mail-unread-outline" size={20} color="#38BDF8" />
          </View>
          <Text style={styles.statCount}>240 ta</Text>
          <Text style={styles.statLabel}>Mehmonlar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statCard} onPress={() => onNavigateTab && onNavigateTab('venue3d')}>
          <View style={[styles.statIconBox, { backgroundColor: 'rgba(168, 85, 247, 0.15)' }]}>
            <Ionicons name="cube-outline" size={20} color="#C084FC" />
          </View>
          <Text style={styles.statCount}>3D Zal</Text>
          <Text style={styles.statLabel}>Zal Ko'rish</Text>
        </TouchableOpacity>

        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: 'rgba(244, 63, 94, 0.15)' }]}>
            <Ionicons name="heart-outline" size={20} color="#F43F5E" />
          </View>
          <Text style={styles.statCount}>8 ta</Text>
          <Text style={styles.statLabel}>Sevimlilar</Text>
        </View>
      </View>

      {/* Menu List Options */}
      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>ASOSIY BO'LIMLAR</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => onNavigateTab && onNavigateTab('home')}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="receipt-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>Mening Buyurtmalarim & Shartnomalar</Text>
              <Text style={styles.menuItemSubtitle}>Tasdiqlangan to'yxona va xizmatlar</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => onNavigateTab && onNavigateTab('invites')}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="mail-open-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>Raqamli Taklifnomalar Boshqaruvi</Text>
              <Text style={styles.menuItemSubtitle}>Mehmonlar RSVP javoblari va ro'yxat</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => onOpenChecklist && onOpenChecklist()}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.menuIconContainer, { borderColor: 'rgba(52, 211, 153, 0.3)' }]}>
              <Ionicons name="checkbox-outline" size={18} color="#34D399" />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>To'y Rejasi & Sarpolar Cheklisti</Text>
              <Text style={styles.menuItemSubtitle}>50 ta asosiy vazifa, muddatlar va xarajatlar</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => onOpenSeating && onOpenSeating()}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <MaterialCommunityIcons name="table-chair" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>Stollar & Mehmonlar Joylashuvi</Text>
              <Text style={styles.menuItemSubtitle}>Smart Seating Chart • Stollarga taqsimlash</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => onOpenToyona && onOpenToyona()}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="card-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>To'yona Jamg'armasi & Avans To'lovi</Text>
              <Text style={styles.menuItemSubtitle}>Click va Payme orqali to'lovlar & hisobot</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => onOpenMap && onOpenMap()}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="map-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>Interaktiv To'yxonalar Xaritasi</Text>
              <Text style={styles.menuItemSubtitle}>GPS masofa, manzil va marshrut</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => onNavigateTab && onNavigateTab('venue3d')}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="sparkles-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>3D To'yxona Zallarini Ko'rish</Text>
              <Text style={styles.menuItemSubtitle}>360° interaktiv zallar va stol tanlash</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleShareApp}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="share-social-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>TuyBox Ilovasini Do'stlarga Ulashish</Text>
              <Text style={styles.menuItemSubtitle}>Kelin-kuyovlar uchun bonus ballar</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>SOZLAMALAR VA XAVFSIZLIK</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="notifications-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>Bildirishnomalar & Eslatmalar</Text>
              <Text style={styles.menuItemSubtitle}>To'y jadvali va muhim sanalar</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#1E293B', true: COLORS.gold[500] }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#94A3B8'}
          />
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Telegram Bot", "@tuyboxbot orqali 24/7 yordam olishingiz mumkin!")}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="chatbubbles-outline" size={18} color={COLORS.gold[400]} />
            </View>
            <View>
              <Text style={styles.menuItemTitle}>24/7 Qo'llab-quvvatlash (Telegram)</Text>
              <Text style={styles.menuItemSubtitle}>@tuyboxbot bilan tezkor bog'lanish</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            </View>
            <View>
              <Text style={[styles.menuItemTitle, { color: '#EF4444' }]}>Hisobdan Chiqish</Text>
              <Text style={styles.menuItemSubtitle}>Ilovadan xavfsiz chiqish</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.footerVersion}>
        <Text style={styles.footerText}>TuyBox Premium Edition • Versiya 2.4.0</Text>
        <Text style={styles.footerSubText}>O'zbekiston bo'yicha №1 To'y Platformasi</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian.base,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  settingsIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userHeroCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  heroGradient: {
    padding: 18,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: COLORS.gold[400],
  },
  verifiedCheck: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gold[400],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#070B14',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  userPhone: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 8,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  vipBadgeText: {
    color: COLORS.gold[400],
    fontSize: 11,
    fontWeight: '700',
  },
  countdownCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  countdownGradient: {
    padding: 16,
  },
  countdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  ringEmoji: {
    fontSize: 26,
    marginRight: 10,
  },
  countdownSubtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  weddingDate: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  daysBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: 'center',
  },
  daysNumber: {
    color: COLORS.gold[400],
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 20,
  },
  daysText: {
    color: COLORS.gold[300],
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  progressContainer: {},
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  progressPercent: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 22, 38, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(15, 22, 38, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuSectionTitle: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    color: '#64748B',
    fontSize: 11,
  },
  footerVersion: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 35,
  },
  footerText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  footerSubText: {
    color: 'rgba(212, 175, 55, 0.5)',
    fontSize: 11,
    marginTop: 2,
  },
  timelineSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timelineTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  timelineBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  timelineBadgeText: {
    color: COLORS.gold[400],
    fontSize: 9,
    fontWeight: '800',
  },
  timelineCard: {
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 52,
  },
  timelineTimeBox: {
    width: 48,
    alignItems: 'flex-start',
  },
  timelineTimeText: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '700',
  },
  timelineDotLine: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 3,
  },
  timelineDotDone: {
    backgroundColor: '#34D399',
  },
  timelineDotCurrent: {
    backgroundColor: COLORS.gold[400],
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  timelineDotUpcoming: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 14,
  },
  timelineItemTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  timelineItemPlace: {
    color: '#94A3B8',
    fontSize: 11,
  },
  themeModeToggleRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12,
  },
  themeModeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  themeModeBtnActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderColor: COLORS.gold[400],
  },
  themeModeBrideActive: {
    backgroundColor: 'rgba(192, 132, 252, 0.22)',
    borderColor: '#C084FC',
  },
  themeModeEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  themeModeBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  themeModeBtnTextActive: {
    color: COLORS.gold[400],
    fontWeight: '800',
  },
});
