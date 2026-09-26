import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

interface ToyonaPaymentScreenProps {
  onBack?: () => void;
}

export const ToyonaPaymentScreen: React.FC<ToyonaPaymentScreenProps> = ({ onBack }) => {
  const { colors, isKelin } = useAppTheme();
  const [selectedAmount, setSelectedAmount] = useState<number>(200000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [message, setMessage] = useState<string>('Baxtli bo\'linglar, qo\'sha qaringlar!');
  const [paymentProvider, setPaymentProvider] = useState<'click' | 'payme'>('click');

  const targetAmount = 30000000;
  const currentAmount = 18500000;
  const percent = Math.round((currentAmount / targetAmount) * 100);

  const quickAmounts = [100000, 200000, 500000, 1000000, 2000000];

  const handlePay = () => {
    const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (!finalAmount || finalAmount < 5000) {
      Alert.alert("Xato", "Iltimos, to'g'ri summa kiriting (kamida 5 000 so'm)");
      return;
    }

    const clickUrl = `https://my.click.uz/services/pay?service_id=75682&merchant_id=41325&amount=${finalAmount}`;
    const paymeUrl = `https://checkout.paycom.uz/toyona?amount=${finalAmount * 100}`;

    Alert.alert(
      "To'lovni tasdiqlash",
      `${paymentProvider.toUpperCase()} orqali ${finalAmount.toLocaleString()} so'm to'yona o'tkazasizmi?`,
      [
        { text: "Bekor qilish", style: "cancel" },
        {
          text: "To'lash",
          onPress: () => {
            Linking.openURL(paymentProvider === 'click' ? clickUrl : paymeUrl);
          }
        }
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgBase }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <Text style={[styles.badge, { color: colors.accentBadge }]}>✦ ONLAYN TO'YONA & TO'LOV</Text>
          <Text style={styles.headerTitle}>To'yona Sovg'a Fondi</Text>
        </View>
      </View>

      {/* Couple Fund Progress Card */}
      <View style={[styles.fundCard, { borderColor: colors.borderColor }]}>
        <LinearGradient
          colors={[
            isKelin ? 'rgba(192, 132, 252, 0.25)' : 'rgba(212, 175, 55, 0.25)',
            isKelin ? 'rgba(30, 16, 50, 0.95)' : 'rgba(15, 22, 38, 0.95)',
            colors.bgBase,
          ]}
          style={styles.fundGradient}
        >
          <View style={styles.fundHeader}>
            <Text style={styles.fundCouple}>Jasurbek & Madina 💍</Text>
            <View style={[styles.percentBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.percentText, isKelin && { color: '#0F051D' }]}>{percent}% To'plandi</Text>
            </View>
          </View>

          <Text style={styles.fundDesc}>
            Yosh oila va asal oyi sayohati uchun to'yona fondi. Barcha ezgu tilaklaringiz uchun minnatdormiz!
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={colors.primaryGradient as [string, string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${percent}%` }]}
            />
          </View>

          <View style={styles.amountsRow}>
            <Text style={[styles.currentAmountText, { color: colors.textGoldOrPurple }]}>{currentAmount.toLocaleString()} so'm</Text>
            <Text style={styles.targetAmountText}>Maqsad: {targetAmount.toLocaleString()} so'm</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Select Amount */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>To'yona miqdorini tanlang:</Text>
        <View style={styles.quickGrid}>
          {quickAmounts.map((amt) => {
            const isSelected = selectedAmount === amt && !customAmount;
            return (
              <TouchableOpacity
                key={amt}
                style={[
                  styles.quickPill,
                  isSelected && [
                    styles.quickPillActive,
                    { borderColor: colors.primary, backgroundColor: colors.badgeBg }
                  ],
                ]}
                onPress={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
              >
                <Text
                  style={[
                    styles.quickPillText,
                    isSelected && [styles.quickPillTextActive, { color: colors.textGoldOrPurple }],
                  ]}
                >
                  {amt.toLocaleString()} so'm
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Custom Amount */}
        <TextInput
          style={[styles.input, { borderColor: colors.borderLight }]}
          placeholder="Boshqa summa kiritish (so'mda)"
          placeholderTextColor="#64748B"
          keyboardType="numeric"
          value={customAmount}
          onChangeText={(val) => setCustomAmount(val)}
        />
      </View>

      {/* Donor Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kimdan (Ismingiz):</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.borderLight }]}
          placeholder="Masalan: Sardorbek va oilasi"
          placeholderTextColor="#64748B"
          value={donorName}
          onChangeText={setDonorName}
        />

        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Tabrik va tilagingiz:</Text>
        <TextInput
          style={[styles.input, { height: 70, textAlignVertical: 'top', borderColor: colors.borderLight }]}
          placeholder="Baxtli bo'linglar!..."
          placeholderTextColor="#64748B"
          multiline
          value={message}
          onChangeText={setMessage}
        />
      </View>

      {/* Payment Method Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>To'lov tizimini tanlang:</Text>
        <View style={styles.providersRow}>
          <TouchableOpacity
            style={[
              styles.providerBtn,
              paymentProvider === 'click' && [
                styles.providerBtnActive,
                { borderColor: colors.primary, backgroundColor: colors.badgeBg }
              ],
            ]}
            onPress={() => setPaymentProvider('click')}
          >
            <Text
              style={[
                styles.providerText,
                paymentProvider === 'click' && [styles.providerTextActive, { color: colors.textGoldOrPurple }],
              ]}
            >
              CLICK (0% komissiya)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.providerBtn,
              paymentProvider === 'payme' && [
                styles.providerBtnActive,
                { borderColor: colors.primary, backgroundColor: colors.badgeBg }
              ],
            ]}
            onPress={() => setPaymentProvider('payme')}
          >
            <Text
              style={[
                styles.providerText,
                paymentProvider === 'payme' && [styles.providerTextActive, { color: colors.textGoldOrPurple }],
              ]}
            >
              PAYME
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pay Action Button */}
      <TouchableOpacity
        style={[styles.payBtn, { shadowColor: isKelin ? '#C084FC' : COLORS.gold[500] }]}
        onPress={handlePay}
      >
        <LinearGradient
          colors={colors.primaryGradient as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.payGradient}
        >
          <Ionicons name="card" size={20} color={isKelin ? '#0F051D' : '#070B14'} style={{ marginRight: 8 }} />
          <Text style={[styles.payBtnText, isKelin && { color: '#0F051D' }]}>
            {(customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount).toLocaleString()} SO'M TO'LASH
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian.base,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badge: {
    color: COLORS.gold[400],
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  fundCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    marginBottom: 20,
  },
  fundGradient: {
    padding: 16,
  },
  fundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fundCouple: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  percentBadge: {
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  percentText: {
    color: '#070B14',
    fontSize: 10,
    fontWeight: '900',
  },
  fundDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentAmountText: {
    color: COLORS.gold[400],
    fontSize: 14,
    fontWeight: '800',
  },
  targetAmountText: {
    color: '#64748B',
    fontSize: 12,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  quickPill: {
    backgroundColor: 'rgba(15, 22, 38, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
  },
  quickPillActive: {
    backgroundColor: COLORS.gold[400],
    borderColor: COLORS.gold[400],
  },
  quickPillText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  quickPillTextActive: {
    color: '#070B14',
    fontWeight: '800',
  },
  input: {
    backgroundColor: 'rgba(15, 22, 38, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 13,
  },
  providersRow: {
    flexDirection: 'row',
    gap: 10,
  },
  providerBtn: {
    flex: 1,
    backgroundColor: 'rgba(15, 22, 38, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  providerBtnActive: {
    borderColor: COLORS.gold[400],
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
  },
  providerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  providerTextActive: {
    color: COLORS.gold[400],
    fontWeight: '800',
  },
  payBtn: {
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  payGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  payBtnText: {
    color: '#070B14',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
