import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Share,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';
import { WEDDING_SERVICES } from '../data/weddingServices';
import { BadgeVerified, LuxuryRating } from '../components/common/BadgeVerified';
import { InteractiveBookingCalendar } from '../components/calendar/InteractiveBookingCalendar';

interface ServiceDetailScreenProps {
  serviceId: number;
  onBack: () => void;
  onOpenMap?: () => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  serviceId,
  onBack,
  onOpenMap,
}) => {
  const { colors, isKelin } = useAppTheme();
  const service = WEDDING_SERVICES.find((s) => s.id === serviceId) || WEDDING_SERVICES[0];
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Offer form state
  const [offerPrice, setOfferPrice] = useState(String(Math.round(service.price * 0.9)));
  const [guestCount, setGuestCount] = useState('500');
  const [offerNote, setOfferNote] = useState('');

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${service.title} — TuyBox da ko'ring: https://tuybox.asilbek.tech`,
      });
    } catch (e) {}
  };

  const handleSendOffer = () => {
    setShowOfferModal(false);
    Alert.alert(
      "Taklif yuborildi! 🤝",
      `${service.title} ma'muriyatiga ${parseInt(offerPrice, 10).toLocaleString()} so'm narx taklifingiz yuborildi. Ular tez orada javob berishadi!`
    );
  };

  const handleSubmitReview = () => {
    setShowReviewModal(false);
    Alert.alert("Rahmat! ⭐", "Sizning samimiy fikringiz e'lon qilindi va xizmat reytingiga qo'shildi!");
  };

  const handleBookConfirm = (date: string, timeSlot: string) => {
    Alert.alert(
      "Muvaffaqiyatli!",
      `Bron so'rovingiz ${date} (${timeSlot === 'day_osh' ? 'Osh' : 'Bazm'}) kuni uchun yuborildi. Click/Payme orqali avans to'lash oynasi ochilmoqda...`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Hero Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: service.images[0] }} style={styles.heroImage} />
          
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favButton}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? "#F43F5E" : "#FFFFFF"} />
          </TouchableOpacity>


        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <Text style={[styles.categoryText, { color: colors.primaryLight, backgroundColor: colors.badgeBg, borderColor: colors.borderColor }]}>
              {service.category}
            </Text>
            <BadgeVerified />
          </View>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.address}>📍 {service.address}</Text>

          <View style={styles.ratingBar}>
            <LuxuryRating rating={service.rating} count={service.reviewsCount} />
            <Text style={[styles.ratingHighlight, { color: colors.primaryLight }]}>⭐ 99% ijobiy sharhlar</Text>
          </View>

          {/* Quick Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={() => {
                if (service.phone) {
                  Linking.openURL('tel:' + service.phone);
                } else {
                  Alert.alert("Qo'ng'iroq", "+998 71 200-00-00");
                }
              }}
            >
              <Ionicons name="call-outline" size={18} color={colors.primaryLight} />
              <Text style={[styles.actionText, { color: colors.primaryLight }]}>Qo'ng'iroq</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={() => setShowOfferModal(true)}
            >
              <Ionicons name="pricetag-outline" size={18} color={colors.primaryLight} />
              <Text style={[styles.actionText, { color: colors.primaryLight }]}>Narx Taklifi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={onOpenMap}
            >
              <Ionicons name="map-outline" size={18} color={colors.primaryLight} />
              <Text style={[styles.actionText, { color: colors.primaryLight }]}>Xarita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}
              onPress={handleShare}
            >
              <Ionicons name="share-social-outline" size={18} color={colors.primaryLight} />
              <Text style={[styles.actionText, { color: colors.primaryLight }]}>Ulashish</Text>
            </TouchableOpacity>
          </View>

          {/* Tavsif */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Xizmat haqida</Text>
            <Text style={styles.descriptionText}>{service.description}</Text>
          </View>

          {/* Xususiyatlar */}
          {service.features && service.features.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Qulayliklar va Imkoniyatlar</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {service.features.map((feat, i) => (
                  <View key={i} style={[styles.featurePill, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}>
                    <Text style={{ color: colors.primaryLight, fontSize: 12, fontWeight: '600' }}>✓ {feat}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Paketlar */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tariflar va Paketlar</Text>
            <View style={styles.packagesList}>
              {service.packages.map((pkg, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedPkg(idx)}
                  style={[
                    styles.pkgCard,
                    { borderColor: colors.borderColor },
                    selectedPkg === idx && [styles.pkgCardActive, { borderColor: colors.primaryLight, backgroundColor: colors.badgeBg }],
                  ]}
                >
                  <View style={styles.pkgHeader}>
                    <Text style={[styles.pkgName, selectedPkg === idx && { color: colors.primaryLight }]}>{pkg.name}</Text>
                    <Text style={[styles.pkgPrice, { color: colors.primaryLight }]}>{pkg.price.toLocaleString()} so'm</Text>
                  </View>
                  <Text style={styles.pkgDesc}>{pkg.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sharhlar Bloki & Baho Berish */}
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.sectionTitle}>Mijozlar Sharhlari ({service.reviews ? service.reviews.length : 0})</Text>
              <TouchableOpacity onPress={() => setShowReviewModal(true)}>
                <Text style={[styles.addReviewText, { color: colors.primaryLight }]}>+ Fikr bildirish</Text>
              </TouchableOpacity>
            </View>

            {service.reviews && service.reviews.length > 0 ? (
              service.reviews.map((rev) => (
                <View key={rev.id} style={[styles.reviewCard, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>{rev.author}</Text>
                    <Text style={[styles.reviewRating, { color: colors.primaryLight }]}>
                      {'★'.repeat(rev.rating)} {rev.rating}.0 • {rev.date}
                    </Text>
                  </View>
                  <Text style={styles.reviewComment}>"{rev.comment}"</Text>
                </View>
              ))
            ) : (
              <View style={[styles.reviewCard, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
                <Text style={styles.reviewComment}>Hozircha birinchi bo'lib fikr qoldiring!</Text>
              </View>
            )}
          </View>

          {/* Jonli Kalendar va Bronlash */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Jonli Kalendar & Bronlash</Text>
            <Text style={styles.sectionSubtitle}>Bo'sh kunni tanlang va bir zumda bron qiling</Text>
            <InteractiveBookingCalendar
              serviceTitle={service.title}
              basePrice={service.packages[selectedPkg].price}
              onBookConfirm={handleBookConfirm}
            />
          </View>
        </View>
      </ScrollView>

      {/* Offer Negotiation Modal */}
      <Modal visible={showOfferModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🤝 Narx Taklif Qilish (Offer)</Text>
              <TouchableOpacity onPress={() => setShowOfferModal(false)}>
                <Ionicons name="close" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDesc}>
              {service.title} uchun o'z byudjetingizga mos narxni taklif qiling:
            </Text>

            <Text style={styles.inputLabel}>Taklif qilayotgan narxingiz (so'mda):</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={offerPrice}
              onChangeText={setOfferPrice}
            />

            <Text style={styles.inputLabel}>Taxminiy mehmonlar soni:</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={guestCount}
              onChangeText={setGuestCount}
            />

            <Text style={styles.inputLabel}>Qo'shimcha izoh yoki iltimos:</Text>
            <TextInput
              style={[styles.modalInput, { height: 60, textAlignVertical: 'top' }]}
              placeholder="Masalan: To'liq menyu olinganda..."
              placeholderTextColor="#64748B"
              multiline
              value={offerNote}
              onChangeText={setOfferNote}
            />

            <TouchableOpacity style={styles.modalBtn} onPress={handleSendOffer}>
              <LinearGradient
                colors={['#FFDF73', '#D4AF37', '#997519']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.modalBtnGradient}
              >
                <Text style={styles.modalBtnText}>Taklifni Yuborish</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal visible={showReviewModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>⭐ Fikr Bildirish</Text>
              <TouchableOpacity onPress={() => setShowReviewModal(false)}>
                <Ionicons name="close" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Bahoingizni tanlang:</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setReviewRating(s)}>
                  <Ionicons
                    name={s <= reviewRating ? "star" : "star-outline"}
                    size={30}
                    color="#FFD700"
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Fikringiz va taassurotingiz:</Text>
            <TextInput
              style={[styles.modalInput, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Zal, xizmat va dekoratsiya qanday bo'ldi?..."
              placeholderTextColor="#64748B"
              multiline
              value={reviewComment}
              onChangeText={setReviewComment}
            />

            <TouchableOpacity style={styles.modalBtn} onPress={handleSubmitReview}>
              <LinearGradient
                colors={['#FFDF73', '#D4AF37', '#997519']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.modalBtnGradient}
              >
                <Text style={styles.modalBtnText}>Sharhni Saqlash</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian.base,
  },
  imageWrapper: {
    position: 'relative',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(7, 11, 20, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  favButton: {
    position: 'absolute',
    top: 44,
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(7, 11, 20, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  btnHero3D: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnHero3DText: {
    color: '#070B14',
    fontSize: 11,
    fontWeight: '900',
  },
  content: {
    padding: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryText: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  address: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 10,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  ratingHighlight: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 22, 38, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 16,
    padding: 10,
    marginBottom: 18,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 12,
  },
  descriptionText: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 19,
  },
  packagesList: {
    gap: 10,
  },
  pkgCard: {
    backgroundColor: 'rgba(15, 22, 38, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 14,
  },
  pkgCardActive: {
    borderColor: COLORS.gold[400],
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  pkgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pkgName: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '700',
  },
  pkgNameActive: {
    color: COLORS.gold[400],
  },
  pkgPrice: {
    color: COLORS.gold[400],
    fontSize: 14,
    fontWeight: '800',
  },
  pkgDesc: {
    color: '#94A3B8',
    fontSize: 12,
  },
  addReviewText: {
    color: COLORS.gold[400],
    fontSize: 13,
    fontWeight: '700',
  },
  reviewCard: {
    backgroundColor: 'rgba(15, 22, 38, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    padding: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  reviewRating: {
    color: '#FFD700',
    fontSize: 12,
  },
  reviewComment: {
    color: '#94A3B8',
    fontSize: 12,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#0F1626',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  modalDesc: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 14,
  },
  inputLabel: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: 'rgba(7, 11, 20, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 14,
  },
  modalBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 20,
  },
  modalBtnGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#070B14',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  featurePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
});
