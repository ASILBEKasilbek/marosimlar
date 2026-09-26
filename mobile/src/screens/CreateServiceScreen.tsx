import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface ServiceCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap | string;
  isMaterial?: boolean;
  desc: string;
  color: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'venues',
    name: "To'yxonalar & Saroylar",
    icon: 'business',
    desc: 'Katta zallar, restoranlar, ochiq maydonlar',
    color: '#D4AF37',
  },
  {
    id: 'singers',
    name: "San'atkorlar & Guruhlar",
    icon: 'mic',
    desc: 'Xonandalar, boshlovchilar, jonli ansambllar',
    color: '#10B981',
  },
  {
    id: 'photo',
    name: 'Foto & Video Studiya',
    icon: 'camera',
    desc: 'Love story, to\'y videofilmi, dron syomka',
    color: '#38BDF8',
  },
  {
    id: 'decor',
    name: 'Bezak & Floristika',
    icon: 'flower',
    desc: 'Prezidium bezagi, gullar, to\'y arkalari',
    color: '#EC4899',
  },
  {
    id: 'cars',
    name: "To'y Korteji & Avto",
    icon: 'car-sport',
    desc: 'Mercedes, Rolls-Royce, limuzin, retro mashinalar',
    color: '#F59E0B',
  },
  {
    id: 'dresses',
    name: 'Kelin Ko\'ylak & Sarpo',
    icon: 'sparkles',
    desc: 'Hashamatli liboslar, milliy sarpolar',
    color: '#A855F7',
  },
  {
    id: 'cakes',
    name: 'To\'y Tortlari & Shirinlik',
    icon: 'cafe',
    desc: 'Ko\'p qavatli shohona to\'y tortlari',
    color: '#F43F5E',
  },
  {
    id: 'dancers',
    name: 'Raqs Guruhlari & Shou',
    icon: 'musical-notes',
    desc: 'Shou-balet, karnay-surnay, otashin raqslar',
    color: '#6366F1',
  },
];

const REGIONS = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand',
  'Buxoro',
  'Farg\'ona',
  'Andijon',
  'Namangan',
  'Xorazm',
  'Qashqadaryo',
  'Surxondaryo',
  'Navoiy',
  'Jizzax',
  'Sirdaryo',
  'Qoraqalpog\'iston',
];

interface CreateServiceScreenProps {
  onSuccess?: () => void;
}

export const CreateServiceScreen: React.FC<CreateServiceScreenProps> = ({ onSuccess }) => {
  const { colors, isKelin } = useAppTheme();

  const [selectedCat, setSelectedCat] = useState<string>('venues');
  const [title, setTitle] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Toshkent shahri');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [telegram, setTelegram] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'VIP Xizmat ko\'rsatish',
    'Rasmiy shartnoma',
  ]);
  const [submitted, setSubmitted] = useState(false);

  const availableFeatures = [
    'VIP Xizmat ko\'rsatish',
    'Rasmiy shartnoma',
    'Bepul konsultatsiya',
    'Bo\'lib to\'lash imkoni',
    'Shahar bo\'ylab yetkazib berish',
    'Maxsus to\'y sovg\'asi',
  ];

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !businessName.trim() || !price.trim() || phone.trim().length < 9) {
      Alert.alert(
        "Ma'lumotlar to'liq emas",
        "Iltimos, xizmat nomi, brend nomi, narxi va telefon raqamini to'ldiring."
      );
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setBusinessName('');
    setPrice('');
    setPhone('+998 ');
    setTelegram('');
    setDescription('');
    setSubmitted(false);
    if (onSuccess) onSuccess();
  };

  const currentCatObj = CATEGORIES.find((c) => c.id === selectedCat) || CATEGORIES[0];

  if (submitted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
        <ScrollView contentContainerStyle={styles.successWrapper}>
          <LinearGradient
            colors={colors.primaryGradientSubtle}
            style={[styles.successCard, { borderColor: colors.primaryLight }]}
          >
            <View style={[styles.successIconCircle, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="checkmark-done" size={44} color={isKelin ? '#FFFFFF' : '#070B14'} />
            </View>

            <Text style={[styles.successTitle, { color: colors.primaryLight }]}>
              Xizmat Qabul Qilindi! ✨
            </Text>

            <Text style={styles.successDesc}>
              Sizning <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>"{title}"</Text> nomli xizmatingiz muvaffaqiyatli saqlandi. Moderator ko'rib chiqqach, platformada barcha kelin-kuyovlarga ko'rinadi!
            </Text>

            <View style={[styles.previewMiniBox, { borderColor: colors.borderColor }]}>
              <Text style={styles.previewCatText}>Kategoriya: {currentCatObj.name}</Text>
              <Text style={styles.previewPriceText}>Boshlang'ich narx: {price} so'm</Text>
              <Text style={styles.previewRegionText}>Hudud: {selectedRegion}</Text>
              <Text style={styles.previewPhoneText}>Aloqa: {phone}</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: colors.primaryLight }]}
              onPress={handleReset}
              activeOpacity={0.85}
            >
              <Text style={[styles.submitBtnText, { color: isKelin ? '#FFFFFF' : '#070B14' }]}>
                Yana yangi xizmat qo'shish ➔
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Ionicons name="sparkles" size={13} color={colors.primaryLight} style={{ marginRight: 6 }} />
            <Text style={[styles.headerBadgeText, { color: colors.primaryLight }]}>
              HAMKORLAR VA IJODKORLAR UCHUN
            </Text>
          </View>
          <Text style={[styles.headerTitle, { color: colors.primaryLight }]}>
            Xizmat Joylashtirish
          </Text>
          <Text style={styles.headerSubtitle}>
            To'yxona, san'atkor, foto-video yoki to'y xizmatingizni TuyBox orqali minglab kelin-kuyovlarga taqdim eting
          </Text>
        </View>

        {/* 1. Kategoriya Tanlash (Grid) */}
        <Text style={styles.sectionTitle}>1. XIZMAT YO'NALISHINI TANLANG</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.12)' : colors.bgCard,
                    borderColor: isSelected ? colors.primaryLight : colors.borderColor,
                  },
                ]}
                onPress={() => setSelectedCat(cat.id)}
                activeOpacity={0.8}
              >
                {isSelected && (
                  <View style={[styles.catCheckBadge, { backgroundColor: colors.primaryLight }]}>
                    <Ionicons name="checkmark" size={11} color={isKelin ? '#FFFFFF' : '#070B14'} />
                  </View>
                )}
                <View style={[styles.catIconWrap, { backgroundColor: `${cat.color}20` }]}>
                  <Ionicons name={cat.icon as any} size={22} color={cat.color} />
                </View>
                <Text
                  style={[
                    styles.catName,
                    isSelected && { color: colors.primaryLight, fontWeight: '800' },
                  ]}
                  numberOfLines={1}
                >
                  {cat.name}
                </Text>
                <Text style={styles.catDesc} numberOfLines={2}>
                  {cat.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 2. Asosiy Ma'lumotlar Formasi */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>2. XIZMAT MA'LUMOTLARI</Text>
        <View style={[styles.formCard, { backgroundColor: colors.bgCard, borderColor: colors.borderColor }]}>
          {/* Xizmat nomi */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Xizmat yoki Taklif Nomi *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="Masalan: Versal Grand Shohona To'ylar Zali"
              placeholderTextColor="#64748B"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Brend yoki F.I.Sh */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Brend yoki Jamoa Nomi *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="Masalan: Versal Group yoki Rayhon Wedding"
              placeholderTextColor="#64748B"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          {/* Narx */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Boshlang'ich Narxi (so'mda) *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="Masalan: 15,000,000 so'mdan"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          {/* Hudud tanlash */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Xizmat Ko'rsatiladigan Hudud</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionScroll}>
              {REGIONS.map((region) => {
                const isRegSelected = selectedRegion === region;
                return (
                  <TouchableOpacity
                    key={region}
                    style={[
                      styles.regionChip,
                      {
                        backgroundColor: isRegSelected ? colors.primaryLight : 'rgba(255, 255, 255, 0.05)',
                        borderColor: isRegSelected ? colors.primaryLight : colors.borderColor,
                      },
                    ]}
                    onPress={() => setSelectedRegion(region)}
                  >
                    <Text
                      style={[
                        styles.regionChipText,
                        isRegSelected && { color: isKelin ? '#FFFFFF' : '#070B14', fontWeight: '800' },
                      ]}
                    >
                      {region}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Telefon raqami */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telefon Raqami (Mijozlar bilan aloqa) *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="+998 90 123 45 67"
              placeholderTextColor="#64748B"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Telegram / Instagram */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telegram yoki Instagram (@profil, ixtiyoriy)</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.borderColor }]}
              placeholder="@TuyboxOfficial"
              placeholderTextColor="#64748B"
              value={telegram}
              onChangeText={setTelegram}
            />
          </View>

          {/* Tavsif */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Xizmat Haqida Batafsil Tavsif</Text>
            <TextInput
              style={[styles.textArea, { borderColor: colors.borderColor }]}
              placeholder="Xizmatingiz afzalliklari, nimalar o'z ichiga olinishi va shartlar haqida yozing..."
              placeholderTextColor="#64748B"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* 3. Afzalliklar & Imkoniyatlar */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>3. XIZMAT IMKONIYATLARI VA AFZALLIKLARI</Text>
        <View style={styles.featuresList}>
          {availableFeatures.map((feat) => {
            const hasFeat = selectedFeatures.includes(feat);
            return (
              <TouchableOpacity
                key={feat}
                style={[
                  styles.featureItem,
                  {
                    backgroundColor: hasFeat ? 'rgba(212, 175, 55, 0.12)' : colors.bgCard,
                    borderColor: hasFeat ? colors.primaryLight : colors.borderColor,
                  },
                ]}
                onPress={() => toggleFeature(feat)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={hasFeat ? 'checkbox' : 'square-outline'}
                  size={20}
                  color={hasFeat ? colors.primaryLight : '#64748B'}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.featureText, hasFeat && { color: '#FFFFFF', fontWeight: '700' }]}>
                  {feat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. Rasm Yuklash Maydoni (Vizual Luxury Mock) */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>4. FOTOLAVHALAR VA PORTFOLIO</Text>
        <View style={[styles.uploadBox, { borderColor: colors.primaryLight }]}>
          <Ionicons name="cloud-upload" size={36} color={colors.primaryLight} />
          <Text style={[styles.uploadTitle, { color: colors.primaryLight }]}>
            Rasmlarni tanlang (Ko'pi bilan 6 ta)
          </Text>
          <Text style={styles.uploadSubtitle}>
            Zal, dekoratsiya yoki ishlaringizning sifatli fotosuratlari mijozlar e'tiborini 3 barobar oshiradi
          </Text>
          <View style={styles.uploadBadge}>
            <Text style={styles.uploadBadgeText}>📸 Portfolio Biriktirilgan (Avtomatik)</Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: colors.primaryLight, marginTop: 28 }]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            <Ionicons name="sparkles" size={18} color={isKelin ? '#FFFFFF' : '#070B14'} style={{ marginRight: 8 }} />
            <Text style={[styles.submitBtnText, { color: isKelin ? '#FFFFFF' : '#070B14' }]}>
              Xizmatni Joylashtirish ✨
            </Text>
          </LinearGradient>
        </TouchableOpacity>

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
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerBadgeText: {
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
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 42) / 2,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    position: 'relative',
  },
  catCheckBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  catName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 2,
  },
  catDesc: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 14,
  },
  formCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(7, 11, 20, 0.7)',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  textArea: {
    backgroundColor: 'rgba(7, 11, 20, 0.7)',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
    minHeight: 80,
  },
  regionScroll: {
    flexDirection: 'row',
    marginTop: 4,
  },
  regionChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  regionChipText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  featureText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.04)',
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  uploadBadge: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  uploadBadgeText: {
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  submitBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  successWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successCard: {
    width: '100%',
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  successDesc: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  previewMiniBox: {
    width: '100%',
    backgroundColor: 'rgba(7, 11, 20, 0.8)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 4,
  },
  previewCatText: {
    fontSize: 12,
    color: '#CBD5E1',
  },
  previewPriceText: {
    fontSize: 13,
    color: COLORS.gold[400],
    fontWeight: '700',
  },
  previewRegionText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  previewPhoneText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
