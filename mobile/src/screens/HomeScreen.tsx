import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Dimensions, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { CategoryPillBar } from '../components/common/CategoryPillBar';
import { LuxuryCard } from '../components/common/LuxuryCard';
import { BadgeVerified, LuxuryRating } from '../components/common/BadgeVerified';
import { BudgetPlannerWidget } from '../components/budget/BudgetPlannerWidget';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  onSelectService: (serviceId: number) => void;
  onOpenBudget: () => void;
  onOpen3D?: () => void;
  onOpenMap?: () => void;
  onOpenToyona?: () => void;
  onOpenSeating?: () => void;
  onOpenChecklist?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectService,
  onOpenBudget,
  onOpen3D,
  onOpenMap,
  onOpenToyona,
  onOpenSeating,
  onOpenChecklist,
}) => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStory, setActiveStory] = useState<any | null>(null);

  const categories = [
    { id: 'all', name: 'Barchasi', icon: '✨' },
    { id: 'venues', name: "To'yxonalar", icon: '🏰' },
    { id: 'music', name: "San'atkorlar", icon: '🎤' },
    { id: 'photo', name: 'Foto & Video', icon: '📸' },
    { id: 'decor', name: 'Dekoratsiya', icon: '💐' },
    { id: 'auto', name: 'Kortej', icon: '🚘' },
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Versal Grand Ballroom (500 kishi)',
      category: "To'yxona",
      price: 48000000,
      city: 'Toshkent, Yakkasaroy',
      rating: 4.96,
      reviewsCount: 210,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
      distanceKm: 2.4,
      has3D: true,
    },
    {
      id: 2,
      title: "Jonli Ijro Ansambli va Xonandalar Guruhi",
      category: "San'atkor",
      price: 15000000,
      city: 'Toshkent',
      rating: 4.90,
      reviewsCount: 92,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
      distanceKm: 4.1,
      has3D: false,
    },
    {
      id: 3,
      title: "Yakkasaroy Palace (800 kishi)",
      category: "To'yxona",
      price: 65000000,
      city: 'Toshkent, Mirzo Ulug\'bek',
      rating: 4.98,
      reviewsCount: 340,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
      distanceKm: 3.8,
      has3D: true,
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={require('../assets/logo.jpg')} 
            style={styles.logoImage} 
          />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.welcomeLabel}>TuyBox Platformasi</Text>
              <View style={styles.miniVipTag}>
                <Text style={styles.miniVipText}>PREMIUM</Text>
              </View>
            </View>
            <Text style={styles.appTitle}>Hashamatli To'ylar</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.citySelector}
          onPress={() => onOpenMap && onOpenMap()}
          activeOpacity={0.8}
        >
          <Ionicons name="map-outline" size={13} color={COLORS.gold[400]} style={{ marginRight: 4 }} />
          <Text style={styles.cityText}>Xaritada</Text>
          <Ionicons name="chevron-forward" size={11} color={COLORS.gold[400]} style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>

      {/* Modern Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="To'yxona, san'atkor yoki fotograf izlash..."
            placeholderTextColor="#64748B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* TuyBox 3D Brand Hero Showcase */}
      <View style={styles.heroBrandCard}>
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.22)', 'rgba(15, 22, 38, 0.95)', '#070B14']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBrandGradient}
        >
          <View style={styles.heroBrandLeft}>
            <View style={styles.exclusiveBadge}>
              <Ionicons name="sparkles" size={11} color="#070B14" style={{ marginRight: 4 }} />
              <Text style={styles.exclusiveText}>RASMIY PLATFORMA</Text>
            </View>
            <Text style={styles.heroBrandTitle}>TuyBox</Text>
            <Text style={styles.heroBrandSubtitle}>
              Orzuingizdagi Qirollik To'yi & Hashamatli Marosimlar
            </Text>
            <View style={styles.heroFeaturesRow}>
              <Text style={styles.heroFeatureItem}>✦ 3D Zallar</Text>
              <Text style={styles.heroFeatureItem}>✦ VIP Bron</Text>
              <Text style={styles.heroFeatureItem}>✦ Smart RSVP</Text>
            </View>
          </View>

          <View style={styles.heroLogoGlowContainer}>
            <View style={styles.heroLogoGlow} />
            <Image
              source={require('../assets/logo.jpg')}
              style={styles.hero3DLogoImage}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Featured 3D Venue Interactive Banner */}
      <TouchableOpacity
        style={styles.banner3DContainer}
        activeOpacity={0.9}
        onPress={() => onOpen3D && onOpen3D()}
      >
        <LinearGradient
          colors={['#172036', '#0E1526']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner3DGradient}
        >
          <View style={styles.banner3DContent}>
            <View style={styles.badge3DRow}>
              <View style={styles.badge3DPill}>
                <Ionicons name="cube" size={12} color="#070B14" style={{ marginRight: 4 }} />
                <Text style={styles.badge3DText}>YANGILIK • 3D GLB</Text>
              </View>
              <Text style={styles.bannerLive}>● 360° AYLANTIRISH</Text>
            </View>

            <Text style={styles.banner3DTitle}>To'yxona Zallarini 3D Ko'rish</Text>
            <Text style={styles.banner3DSubtitle}>
              Telefoningiz orqali zal ichiga kiring, sahna, lyustra va stol joylashuvlarini real vaqtda ko'ring!
            </Text>

            <View style={styles.banner3DBtn}>
              <Text style={styles.banner3DBtnText}>3D Zalga Kirish →</Text>
            </View>
          </View>
          <View style={styles.banner3DIconWrapper}>
            <MaterialCommunityIcons name="cube-scan" size={68} color="rgba(212, 175, 55, 0.35)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* 3-Column Luxury Features: Xarita, Stollar Rejasi, To'yona (Click/Payme) */}
      <View style={styles.quickFeaturesRow}>
        <TouchableOpacity
          style={styles.quickFeatureCard}
          activeOpacity={0.88}
          onPress={() => onOpenMap && onOpenMap()}
        >
          <LinearGradient
            colors={['#172238', '#0C1322']}
            style={styles.quickFeatureGradient}
          >
            <View style={[styles.quickFeatureIconBox, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
              <Ionicons name="map" size={17} color="#38BDF8" />
            </View>
            <View style={styles.quickFeatureTextCol}>
              <Text style={styles.quickFeatureTitle}>Xarita</Text>
              <Text style={styles.quickFeatureSubtitle}>Masofa & Yo'l</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickFeatureCard}
          activeOpacity={0.88}
          onPress={() => onOpenSeating && onOpenSeating()}
        >
          <LinearGradient
            colors={['#1F1D38', '#100E26']}
            style={styles.quickFeatureGradient}
          >
            <View style={[styles.quickFeatureIconBox, { backgroundColor: 'rgba(168, 85, 247, 0.15)' }]}>
              <MaterialCommunityIcons name="table-chair" size={17} color="#C084FC" />
            </View>
            <View style={styles.quickFeatureTextCol}>
              <Text style={styles.quickFeatureTitle}>Stollar</Text>
              <Text style={styles.quickFeatureSubtitle}>Mehmon rejasi</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickFeatureCard}
          activeOpacity={0.88}
          onPress={() => onOpenToyona && onOpenToyona()}
        >
          <LinearGradient
            colors={['#172238', '#0C1322']}
            style={styles.quickFeatureGradient}
          >
            <View style={[styles.quickFeatureIconBox, { backgroundColor: 'rgba(212, 175, 55, 0.15)' }]}>
              <Ionicons name="card" size={17} color={COLORS.gold[400]} />
            </View>
            <View style={styles.quickFeatureTextCol}>
              <Text style={styles.quickFeatureTitle}>To'yona</Text>
              <Text style={styles.quickFeatureSubtitle}>Click & Payme</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Stories / Real Wedding Reels (Horizontal Scroll) */}
      <View style={styles.storiesWrapper}>
        <View style={styles.storiesHeaderRow}>
          <Text style={styles.storiesSectionTitle}>TO'YLARDAN JONLI LAVHALAR (REELS)</Text>
          <Text style={styles.storiesLiveBadge}>● LIVE</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContainer}>
          {[
            {
              id: 1,
              title: 'Versal Grand',
              couple: 'Jasurbek & Madina',
              tag: 'Lyustra Shousi',
              image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
              description: "600 nafar mehmon bilan o'tgan ertaknamo qirollik to'yi. Kristal qandillar va og'ir tutun shousi.",
              serviceId: 1,
              likes: '1.4k',
            },
            {
              id: 2,
              title: 'Jonli Ijro Guruhi',
              couple: 'Sardor & Kamola',
              tag: 'Jonli Ansambl',
              image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
              description: "Xalq sevgan san'atkorlar va jonli musiqa sadolari ostida unutilmas shodiyona raqslar!",
              serviceId: 2,
              likes: '980',
            },
            {
              id: 3,
              title: 'Oftob Sharshara',
              couple: 'Bobur & Dildora',
              tag: 'Ochiq Osmon',
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
              description: "Ochiq osmon ostida, sharshara shovqini va 300 ta yulduz jilosida o'tgan nikoh oqshomi.",
              serviceId: 1,
              likes: '2.1k',
            },
            {
              id: 4,
              title: 'Qirollik Gulkori',
              couple: 'Javohir & Shahzoda',
              tag: 'VIP Prezidium',
              image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
              description: "10,000 dona tabiiy golland atirgullari bilan bezatilgan muhtasham prezidium va fotosessiya maydoni.",
              serviceId: 3,
              likes: '840',
            },
          ].map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              onPress={() => setActiveStory(story)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#FFDF73', '#D4AF37', '#996515']}
                style={styles.storyRing}
              >
                <Image source={{ uri: story.image }} style={styles.storyAvatarImage} />
                <View style={styles.storyPlayIconBadge}>
                  <Ionicons name="play" size={8} color="#070B14" />
                </View>
              </LinearGradient>
              <Text style={styles.storyTitleText} numberOfLines={1}>{story.title}</Text>
              <Text style={styles.storyCoupleText} numberOfLines={1}>{story.couple}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <CategoryPillBar
        categories={categories}
        selectedId={selectedCat}
        onSelect={setSelectedCat}
      />

      {/* AI Budget Widget Banner */}
      <View style={styles.widgetWrapper}>
        <BudgetPlannerWidget />
      </View>

      {/* Wedding Checklist Banner */}
      <TouchableOpacity
        style={styles.checklistBanner}
        activeOpacity={0.88}
        onPress={() => onOpenChecklist && onOpenChecklist()}
      >
        <LinearGradient
          colors={['#172238', '#0C1322']}
          style={styles.checklistBannerGradient}
        >
          <View style={styles.checklistLeftIconBox}>
            <Ionicons name="checkbox" size={20} color="#34D399" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.checklistBannerTitle}>To'y Rejasi & Cheklist</Text>
              <Text style={styles.checklistBannerPct}>59% tayyor</Text>
            </View>
            <Text style={styles.checklistBannerSub}>10 ta bajarildi • 7 ta muhim vazifa qoldi</Text>
            <View style={styles.checklistTrack}>
              <View style={[styles.checklistFill, { width: '59%' }]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gold[400]} style={{ marginLeft: 8 }} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Featured Luxury Services */}
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="diamond" size={16} color={COLORS.gold[400]} style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>VIP & Eng Sara Xizmatlar</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Barchasi →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsList}>
        {featuredServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => onSelectService(service.id)}
            activeOpacity={0.9}
          >
            <LuxuryCard style={styles.serviceCard}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: service.image }} style={styles.cardImage} />
                {service.has3D && (
                  <TouchableOpacity
                    style={styles.card3DBadge}
                    onPress={() => onOpen3D && onOpen3D()}
                  >
                    <Ionicons name="cube" size={13} color="#070B14" style={{ marginRight: 4 }} />
                    <Text style={styles.card3DText}>3D Ko'rish</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.cardContent}>
                <View style={styles.tagRow}>
                  <Text style={styles.categoryBadge}>{service.category}</Text>
                  <BadgeVerified />
                </View>

                <Text style={styles.serviceTitle}>{service.title}</Text>
                
                <View style={styles.metaRow}>
                  <LuxuryRating rating={service.rating} count={service.reviewsCount} />
                  <Text style={styles.distanceText}>• {service.distanceKm} km yaqin</Text>
                </View>

                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.priceLabel}>Boshlang'ich narxi:</Text>
                    <Text style={styles.priceValue}>{service.price.toLocaleString()} so'm</Text>
                  </View>
                  <View style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>Tafsilotlar</Text>
                  </View>
                </View>
              </View>
            </LuxuryCard>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>

      {/* Instagram/TikTok Style Luxury Wedding Story / Reel Modal */}
      <Modal visible={activeStory !== null} transparent animationType="fade">
        {activeStory && (
          <View style={styles.storyModalContainer}>
            <Image source={{ uri: activeStory.image }} style={styles.storyModalImage} resizeMode="cover" />
            <LinearGradient
              colors={['rgba(7, 11, 20, 0.75)', 'transparent', 'rgba(7, 11, 20, 0.95)']}
              style={styles.storyModalGradient}
            >
              {/* Progress Bar */}
              <View style={styles.storyProgressBar}>
                <View style={styles.storyProgressFill} />
              </View>

              {/* Story Top Bar */}
              <View style={styles.storyTopBar}>
                <View style={styles.storyUserRow}>
                  <Image source={{ uri: activeStory.image }} style={styles.storyAvatarSmall} />
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.storyUserTitle}>{activeStory.title}</Text>
                      <View style={styles.storyTagBadge}>
                        <Text style={styles.storyTagText}>{activeStory.tag}</Text>
                      </View>
                    </View>
                    <Text style={styles.storyUserSub}>{activeStory.couple}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.storyCloseBtn}
                  onPress={() => setActiveStory(null)}
                >
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Center Sound/Video badge */}
              <View style={styles.soundIndicatorBox}>
                <Ionicons name="volume-high" size={15} color={COLORS.gold[400]} style={{ marginRight: 6 }} />
                <Text style={styles.soundIndicatorText}>Jonli To'y Sadolari • 4K HD</Text>
              </View>

              {/* Bottom Card */}
              <View style={styles.storyBottomCard}>
                <Text style={styles.storyDescText}>{activeStory.description}</Text>

                <View style={styles.storyActionsRow}>
                  <TouchableOpacity
                    style={styles.storyActionPrimary}
                    onPress={() => {
                      const sId = activeStory.serviceId;
                      setActiveStory(null);
                      if (onOpen3D && activeStory.id === 1) {
                        onOpen3D();
                      } else {
                        onSelectService(sId);
                      }
                    }}
                  >
                    <Ionicons name="sparkles" size={16} color="#070B14" style={{ marginRight: 6 }} />
                    <Text style={styles.storyActionPrimaryText}>3D da Ko'rish & Bron</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.storyLikeBtn}
                    onPress={() => Alert.alert('Rahmat!', `${activeStory.couple} juftligiga qutlov yuborildi ❤️`)}
                  >
                    <Ionicons name="heart" size={20} color="#F43F5E" />
                    <Text style={styles.storyLikeText}>{activeStory.likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian.base,
  },
  scrollContent: {
    paddingBottom: 110, // Avoid bottom floating tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.gold[400],
    marginRight: 12,
  },
  welcomeLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  miniVipTag: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderWidth: 0.5,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    marginLeft: 6,
  },
  miniVipText: {
    color: COLORS.gold[400],
    fontSize: 8,
    fontWeight: '800',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 22, 38, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  cityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 22, 38, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
  },
  heroBrandCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  heroBrandGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  heroBrandLeft: {
    flex: 1,
    paddingRight: 10,
  },
  exclusiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 8,
  },
  exclusiveText: {
    color: '#070B14',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroBrandTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  heroBrandSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  heroFeaturesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroFeatureItem: {
    color: COLORS.gold[400],
    fontSize: 10,
    fontWeight: '700',
  },
  heroLogoGlowContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLogoGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    transform: [{ scale: 1.15 }],
  },
  hero3DLogoImage: {
    width: 86,
    height: 86,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.6)',
  },
  banner3DContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
  banner3DGradient: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  banner3DContent: {
    flex: 1,
    paddingRight: 10,
  },
  badge3DRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge3DPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
  },
  badge3DText: {
    color: '#070B14',
    fontSize: 9,
    fontWeight: '900',
  },
  bannerLive: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '700',
  },
  banner3DTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  banner3DSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  banner3DBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  banner3DBtnText: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '700',
  },
  banner3DIconWrapper: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetWrapper: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.gold[400],
    fontWeight: '700',
  },
  cardsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  serviceCard: {
    padding: 0,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  card3DBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  card3DText: {
    color: '#070B14',
    fontSize: 11,
    fontWeight: '800',
  },
  cardContent: {
    padding: 16,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    fontSize: 11,
    color: COLORS.gold[400],
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  distanceText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 10,
  },
  priceLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.gold[400],
  },
  viewBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewBtnText: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '700',
  },
  quickFeaturesRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  quickFeatureCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  quickFeatureGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  quickFeatureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  quickFeatureTextCol: {
    flex: 1,
  },
  quickFeatureTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  quickFeatureSubtitle: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  storiesWrapper: {
    marginBottom: 20,
  },
  storiesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  storiesSectionTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  storiesLiveBadge: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '800',
  },
  storiesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  storyItem: {
    alignItems: 'center',
    width: 76,
  },
  storyRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  storyAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 31,
  },
  storyPlayIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.gold[400],
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#070B14',
  },
  storyTitleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  storyCoupleText: {
    color: '#94A3B8',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 1,
  },
  storyModalContainer: {
    flex: 1,
    backgroundColor: '#070B14',
    position: 'relative',
  },
  storyModalImage: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  storyModalGradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 40,
  },
  storyProgressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  storyProgressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: COLORS.gold[400],
  },
  storyTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyAvatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: COLORS.gold[400],
    marginRight: 10,
  },
  storyUserTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  storyTagBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  storyTagText: {
    color: COLORS.gold[400],
    fontSize: 9,
    fontWeight: '700',
  },
  storyUserSub: {
    color: '#E2E8F0',
    fontSize: 11,
    marginTop: 1,
  },
  storyCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundIndicatorBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 11, 20, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  soundIndicatorText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  storyBottomCard: {
    backgroundColor: 'rgba(15, 22, 38, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    borderRadius: 20,
    padding: 16,
  },
  storyDescText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  storyActionsRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  storyActionPrimary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    borderRadius: 12,
    paddingVertical: 12,
  },
  storyActionPrimaryText: {
    color: '#070B14',
    fontSize: 13,
    fontWeight: '800',
  },
  storyLikeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 63, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.4)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  storyLikeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  checklistBanner: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  checklistBannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  checklistLeftIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checklistBannerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checklistBannerPct: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '800',
  },
  checklistBannerSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 6,
  },
  checklistTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  checklistFill: {
    height: '100%',
    backgroundColor: '#34D399',
    borderRadius: 2,
  },
});
