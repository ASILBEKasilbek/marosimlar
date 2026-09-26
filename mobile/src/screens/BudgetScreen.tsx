import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

const PRESET_BUDGETS = [40, 60, 80, 100, 150, 200];

export const BudgetScreen: React.FC = () => {
  const { colors, isKelin } = useAppTheme();

  const [budgetMillions, setBudgetMillions] = useState<number>(80);
  const [guestsCount, setGuestsCount] = useState<number>(350);

  const totalBudget = budgetMillions * 1000000;
  const costPerGuest = Math.round(totalBudget / guestsCount);

  const categories = [
    {
      id: 'venue',
      name: "To'yxona & Dasturxon",
      pct: 45,
      icon: 'business',
      color: '#D4AF37',
      desc: 'Zal ijarasi, taomlar, salatlar va ichimliklar',
    },
    {
      id: 'singers',
      name: "San'atkor & Boshlovchi",
      pct: 20,
      icon: 'mic',
      color: '#10B981',
      desc: 'Xizmatdagi xonanda, jonli guruh va so\'z ustasi',
    },
    {
      id: 'photo',
      name: 'Foto & Video Studiya',
      pct: 12,
      icon: 'camera',
      color: '#38BDF8',
      desc: 'Love story, to\'y filmi, dron, fotosessiya',
    },
    {
      id: 'dress',
      name: 'Kelin Libosi & Sarpo',
      pct: 10,
      icon: 'sparkles',
      color: '#A855F7',
      desc: 'To\'y libosi, pardoz, fota, kelin-kuyov sarpolari',
    },
    {
      id: 'decor',
      name: 'Bezak & Gullar',
      pct: 8,
      icon: 'flower',
      color: '#F43F5E',
      desc: 'Prezidium bezagi, stol kompozitsiyalari, to\'y arkasi',
    },
    {
      id: 'cars',
      name: "To'y Korteji & Avto",
      pct: 5,
      icon: 'car-sport',
      color: '#F59E0B',
      desc: 'Bosh mashina, kortej avtomobillari va bezaklari',
    },
  ];

  const formatMoney = (val: number) => {
    return val.toLocaleString('uz-UZ') + " so'm";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Ionicons name="wallet" size={13} color={colors.primaryLight} style={{ marginRight: 6 }} />
            <Text style={[styles.badgeText, { color: colors.primaryLight }]}>
              SMART TO'Y BYUDJETI
            </Text>
          </View>
          <Text style={[styles.headerTitle, { color: colors.primaryLight }]}>
            To'y Xarajatlari Rejasi
          </Text>
          <Text style={styles.headerSubtitle}>
            Mavjud byudjetingizga qarab barcha xarajatlarni hisoblang va oqilona taqsimlang
          </Text>
        </View>

        {/* Total Budget Card */}
        <LinearGradient
          colors={colors.primaryGradientSubtle}
          style={[styles.budgetHeroCard, { borderColor: colors.primaryLight }]}
        >
          <Text style={styles.budgetHeroLabel}>JAMI TO'Y BYUDJETI</Text>

          <View style={styles.budgetStepperRow}>
            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={() => setBudgetMillions(Math.max(20, budgetMillions - 10))}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={22} color={colors.primaryLight} />
            </TouchableOpacity>

            <View style={styles.amountBox}>
              <Text style={styles.amountNumber}>{budgetMillions}</Text>
              <Text style={styles.amountMillion}>million so'm</Text>
              <Text style={[styles.amountFull, { color: colors.primaryLight }]}>
                ({formatMoney(totalBudget)})
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.stepBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={() => setBudgetMillions(Math.min(500, budgetMillions + 10))}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={22} color={colors.primaryLight} />
            </TouchableOpacity>
          </View>

          {/* Preset Chips */}
          <View style={styles.presetsRow}>
            {PRESET_BUDGETS.map((preset) => {
              const isActive = budgetMillions === preset;
              return (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetChip,
                    {
                      backgroundColor: isActive ? colors.primaryLight : 'rgba(255, 255, 255, 0.06)',
                      borderColor: isActive ? colors.primaryLight : colors.borderColor,
                    },
                  ]}
                  onPress={() => setBudgetMillions(preset)}
                >
                  <Text
                    style={[
                      styles.presetText,
                      isActive && { color: isKelin ? '#FFFFFF' : '#070B14', fontWeight: '900' },
                    ]}
                  >
                    {preset}M
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Mehmonlar soni & 1 mehmon narxi */}
          <View style={[styles.guestStatsBox, { borderColor: colors.borderColor, backgroundColor: 'rgba(7, 11, 20, 0.85)' }]}>
            <View style={styles.guestCol}>
              <Text style={styles.guestLabel}>Mehmonlar soni</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <TouchableOpacity
                  onPress={() => setGuestsCount(Math.max(50, guestsCount - 50))}
                  style={styles.guestMiniBtn}
                >
                  <Text style={styles.guestMiniBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.guestCountVal}>{guestsCount} kishi</Text>
                <TouchableOpacity
                  onPress={() => setGuestsCount(Math.min(1000, guestsCount + 50))}
                  style={styles.guestMiniBtn}
                >
                  <Text style={styles.guestMiniBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.guestDivider} />

            <View style={styles.guestCol}>
              <Text style={styles.guestLabel}>1 mehmon xarajati</Text>
              <Text style={[styles.guestCostVal, { color: colors.primaryLight }]}>
                ~{costPerGuest.toLocaleString('uz-UZ')} so'm
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Segmented Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>XARAJATLARNING FOIZ TAQSIMOTI</Text>
          <View style={styles.progressBarWrapper}>
            {categories.map((c) => (
              <View
                key={c.id}
                style={[
                  styles.progressSegment,
                  { flex: c.pct, backgroundColor: c.color },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Detailed Breakdown List */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>XARAJAT TURLARI BO'YICHA TAQSIMOT</Text>
        <View style={styles.breakdownList}>
          {categories.map((item) => {
            const itemAmount = Math.round((totalBudget * item.pct) / 100);
            return (
              <View
                key={item.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: colors.bgCard, borderColor: colors.borderColor },
                ]}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.categoryIconWrap, { backgroundColor: `${item.color}22` }]}>
                      <Ionicons name={item.icon as any} size={20} color={item.color} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.categoryName}>{item.name}</Text>
                      <Text style={styles.categoryDesc}>{item.desc}</Text>
                    </View>
                  </View>

                  <View style={styles.amountCol}>
                    <Text style={[styles.categoryAmount, { color: colors.primaryLight }]}>
                      {Math.round(itemAmount / 1000000)} mln
                    </Text>
                    <Text style={styles.categoryPct}>{item.pct}% ulush</Text>
                  </View>
                </View>

                <View style={styles.cardBottomRow}>
                  <Text style={styles.exactAmountText}>
                    Aniq summa: <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{formatMoney(itemAmount)}</Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Savings and Tips Card */}
        <View style={[styles.tipsCard, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="bulb" size={20} color={COLORS.gold[400]} style={{ marginRight: 8 }} />
            <Text style={[styles.tipsTitle, { color: colors.primaryLight }]}>
              💡 Qanday qilib 15-20% tejash mumkin?
            </Text>
          </View>

          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>✦</Text>
            <Text style={styles.tipText}>
              <Text style={{ fontWeight: '700', color: '#FFFFFF' }}>Mavsumiy chegirmalar:</Text> Qish va bahor boshlarida to'yxonalarni 15-25% arzonga band qilish imkoni mavjud.
            </Text>
          </View>

          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>✦</Text>
            <Text style={styles.tipText}>
              <Text style={{ fontWeight: '700', color: '#FFFFFF' }}>To'plam (Paket) xizmatlari:</Text> Foto va videoni bitta studiyadan "Hammasi ichida" qilib olish 3-5 million so'mgacha tejaydi.
            </Text>
          </View>

          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>✦</Text>
            <Text style={styles.tipText}>
              <Text style={{ fontWeight: '700', color: '#FFFFFF' }}>Escrow Kafolati:</Text> TuyBox orqali shartnoma qilinganda barcha to'lovlar himoyalanadi va qo'shimcha kutilmagan xarajatlar bo'lmaydi.
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
  },
  header: {
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
    lineHeight: 18,
  },
  budgetHeroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  budgetHeroLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  budgetStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 14,
  },
  stepBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountBox: {
    alignItems: 'center',
  },
  amountNumber: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 48,
  },
  amountMillion: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
    marginTop: -2,
  },
  amountFull: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    width: '100%',
    marginVertical: 6,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
  },
  presetText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '700',
  },
  guestStatsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginTop: 14,
  },
  guestCol: {
    flex: 1,
    alignItems: 'center',
  },
  guestDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  guestLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  guestCountVal: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '800',
    marginHorizontal: 8,
  },
  guestMiniBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestMiniBtnText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -2,
  },
  guestCostVal: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  progressSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 10,
  },
  progressBarWrapper: {
    height: 12,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressSegment: {
    height: '100%',
  },
  breakdownList: {
    gap: 10,
  },
  categoryCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoryDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    maxWidth: width * 0.46,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: '900',
  },
  categoryPct: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  cardBottomRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  exactAmountText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  tipsCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  tipItem: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 12,
    color: COLORS.gold[400],
    marginRight: 6,
    marginTop: 2,
  },
  tipText: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    flex: 1,
  },
});
