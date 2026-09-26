import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

export interface VenueMapItem {
  id: number;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  district: string;
  priceNum: number;
  price: string;
  capacityNum: number;
  capacity: string;
  rating: number;
  reviewsCount: number;
  image: string;
  distanceKm: number;
  has3D: boolean;
  phone: string;
  tag: string;
}

export const INITIAL_VENUES_MAP_DATA: VenueMapItem[] = [
  {
    id: 1,
    name: 'Versal Grand Ballroom',
    shortName: 'Versal',
    lat: 41.2825,
    lng: 69.2435,
    district: 'Yakkasaroy',
    priceNum: 48,
    price: "48,000,000 so'm",
    capacityNum: 600,
    capacity: '500 - 700 kishi',
    rating: 4.96,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
    distanceKm: 2.4,
    has3D: true,
    phone: '+998901234567',
    tag: 'Neoklassik Oltin Saroy',
  },
  {
    id: 3,
    name: 'Yakkasaroy Palace Luxury',
    shortName: 'Yakkasaroy',
    lat: 41.3110,
    lng: 69.2797,
    district: "Mirzo Ulug'bek",
    priceNum: 65,
    price: "65,000,000 so'm",
    capacityNum: 800,
    capacity: '600 - 850 kishi',
    rating: 4.98,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    distanceKm: 3.8,
    has3D: true,
    phone: '+998971112233',
    tag: 'Imperator Marmar Zina',
  },
  {
    id: 4,
    name: 'Mumtoz Shaxona Zal',
    shortName: 'Mumtoz',
    lat: 41.2750,
    lng: 69.2080,
    district: 'Chilonzor',
    priceNum: 38,
    price: "38,000,000 so'm",
    capacityNum: 500,
    capacity: '400 - 550 kishi',
    rating: 4.88,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    distanceKm: 5.1,
    has3D: true,
    phone: '+998935554433',
    tag: 'Sharqona Favvorali Ayvon',
  },
  {
    id: 5,
    name: 'Oftob Shaxona (Sharshara)',
    shortName: 'Oftob',
    lat: 41.3450,
    lng: 69.3120,
    district: 'Qibray',
    priceNum: 55,
    price: "55,000,000 so'm",
    capacityNum: 900,
    capacity: '700 - 1000 kishi',
    rating: 4.99,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    distanceKm: 7.2,
    has3D: true,
    phone: '+998909998877',
    tag: 'Ochiq Osmon & Sharshara',
  },
  {
    id: 6,
    name: 'Osiyo Grand Ballroom',
    shortName: 'Osiyo Grand',
    lat: 41.3520,
    lng: 69.2880,
    district: 'Yunusobod',
    priceNum: 52,
    price: "52,000,000 so'm",
    capacityNum: 750,
    capacity: '500 - 800 kishi',
    rating: 4.92,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=800',
    distanceKm: 6.5,
    has3D: true,
    phone: '+998912223344',
    tag: 'Panoramik Shisha Zali',
  },
  {
    id: 7,
    name: 'Zarafshon Concert & Wedding Hall',
    shortName: 'Zarafshon',
    lat: 41.3140,
    lng: 69.2620,
    district: 'Markaz',
    priceNum: 42,
    price: "42,000,000 so'm",
    capacityNum: 600,
    capacity: '450 - 650 kishi',
    rating: 4.85,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800',
    distanceKm: 1.8,
    has3D: true,
    phone: '+998983334455',
    tag: 'Katta Akustika & Shou',
  },
  {
    id: 8,
    name: 'Farovon Wedding Palace',
    shortName: 'Farovon',
    lat: 41.3380,
    lng: 69.2250,
    district: 'Olmazor',
    priceNum: 34,
    price: "34,000,000 so'm",
    capacityNum: 500,
    capacity: '350 - 500 kishi',
    rating: 4.82,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
    distanceKm: 4.7,
    has3D: false,
    phone: '+998944445566',
    tag: 'Hamyonbop & Qulay',
  },
  {
    id: 9,
    name: 'Sayram Palace Luxury',
    shortName: 'Sayram',
    lat: 41.2950,
    lng: 69.2980,
    district: 'Mirobod',
    priceNum: 46,
    price: "46,000,000 so'm",
    capacityNum: 600,
    capacity: '400 - 600 kishi',
    rating: 4.90,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800',
    distanceKm: 3.2,
    has3D: true,
    phone: '+998905556677',
    tag: 'Markaziy Joylashuv',
  }
];

// Haversine formula for exact distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

interface VenueMapScreenProps {
  onBack?: () => void;
  onOpen3D?: () => void;
  onSelectVenue?: (id: number) => void;
}

export const VenueMapScreen: React.FC<VenueMapScreenProps> = ({
  onBack,
  onOpen3D,
  onSelectVenue,
}) => {
  const { colors, isKelin } = useAppTheme();
  const [venues, setVenues] = useState<VenueMapItem[]>(INITIAL_VENUES_MAP_DATA);
  const [selectedVenue, setSelectedVenue] = useState<VenueMapItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDistrict, setActiveDistrict] = useState('Barchasi');
  const [activeCapacityFilter, setActiveCapacityFilter] = useState<'all' | '500+' | '700+'>('all');
  const [only3D, setOnly3D] = useState(false);
  const [mapLayer, setMapLayer] = useState<'dark' | 'satellite' | 'street'>('dark');
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const webViewRef = useRef<WebView>(null);

  // Districts list
  const districts = ['Barchasi', 'Yakkasaroy', "Mirzo Ulug'bek", 'Chilonzor', 'Qibray', 'Yunusobod', 'Markaz', 'Olmazor', 'Mirobod'];

  // Real GPS Location Detection using expo-location
  const handleGetLocation = async () => {
    try {
      setIsLocating(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Geolokatsiya ruxsati kerak',
          'Sizga eng yaqin to‘yxonalarni aniq ko‘rsatishimiz uchun ilovaga GPS joylashuv ruxsatini bering.',
          [{ text: 'Tushunarli' }]
        );
        setIsLocating(false);
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      setUserLocation({ lat: userLat, lng: userLng });

      // Calculate real distances to all venues and sort by nearest
      const updatedVenues = venues.map((v) => ({
        ...v,
        distanceKm: calculateDistanceKm(userLat, userLng, v.lat, v.lng),
      })).sort((a, b) => a.distanceKm - b.distanceKm);

      setVenues(updatedVenues);

      // Send to WebView
      const js = `window.showUserLocation && window.showUserLocation(${userLat}, ${userLng}); true;`;
      webViewRef.current?.injectJavaScript(js);
      setIsLocating(false);
    } catch (error) {
      setIsLocating(false);
      Alert.alert('GPS Xatosi', 'Joylashuvingizni aniqlab bo‘lmadi. Iltimos telefoningizda GPS yoqilganligini tekshiring.');
    }
  };

  // Filtered venues based on search & filters
  const filteredVenues = useMemo(() => {
    return venues.filter((v) => {
      const matchesSearch =
        !searchQuery.trim() ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        v.district.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesDistrict =
        activeDistrict === 'Barchasi' || v.district.toLowerCase() === activeDistrict.toLowerCase();

      const matchesCapacity =
        activeCapacityFilter === 'all' ||
        (activeCapacityFilter === '500+' && v.capacityNum >= 500) ||
        (activeCapacityFilter === '700+' && v.capacityNum >= 700);

      const matches3D = !only3D || v.has3D;

      return matchesSearch && matchesDistrict && matchesCapacity && matches3D;
    });
  }, [venues, searchQuery, activeDistrict, activeCapacityFilter, only3D]);

  // Push filtered venues update to Leaflet
  useEffect(() => {
    const js = `window.updateVenues && window.updateVenues(${JSON.stringify(filteredVenues)}); true;`;
    webViewRef.current?.injectJavaScript(js);
  }, [filteredVenues]);

  // Switch map layer (Dark / Satellite / Street)
  const switchMapLayer = (layer: 'dark' | 'satellite' | 'street') => {
    setMapLayer(layer);
    const js = `window.switchBaseLayer && window.switchBaseLayer('${layer}'); true;`;
    webViewRef.current?.injectJavaScript(js);
  };

  // Open external navigator (Yandex or Google)
  const openNavigator = (venue: VenueMapItem) => {
    const yandexUrl = `yandexnavi://build_route_on_map?lat_to=${venue.lat}&lon_to=${venue.lng}`;
    const yandexMapsUrl = `https://yandex.com/maps/?rtext=~${venue.lat},${venue.lng}&rtt=auto`;
    const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;

    Linking.canOpenURL(yandexUrl).then((supported) => {
      if (supported) {
        Linking.openURL(yandexUrl);
      } else {
        Linking.canOpenURL('yandexmaps://').then((hasYandex) => {
          if (hasYandex) {
            Linking.openURL(yandexMapsUrl);
          } else {
            Linking.openURL(googleUrl);
          }
        });
      }
    });
  };

  // Focus venue on Leaflet map
  const focusVenueOnMap = (venue: VenueMapItem) => {
    setSelectedVenue(venue);
    const js = `window.focusVenue && window.focusVenue(${venue.id}); true;`;
    webViewRef.current?.injectJavaScript(js);
  };

  // Dynamic theme colors for Leaflet pins
  const pinPrimaryColor = isKelin ? '#C084FC' : '#FFDF73';
  const pinDarkColor = isKelin ? '#9333EA' : '#D4AF37';
  const pinTextColor = isKelin ? '#0F051D' : '#070B14';

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html, #map { width: 100%; height: 100%; background: #0B0E14; overflow: hidden; }
          
          /* Razor-Sharp Custom Pins */
          .custom-pin {
            background: linear-gradient(135deg, ${pinPrimaryColor}, ${pinDarkColor});
            border: 2px solid #070B14;
            color: ${pinTextColor};
            font-size: 11px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-weight: 800;
            padding: 5px 10px;
            border-radius: 14px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.85);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            user-select: none;
          }
          .custom-pin:hover, .custom-pin.active {
            transform: scale(1.22);
            box-shadow: 0 0 16px ${pinPrimaryColor}, 0 6px 20px rgba(0,0,0,0.9);
            border-color: #FFFFFF;
            z-index: 9999 !important;
          }
          .custom-pin::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px 6px 0;
            border-style: solid;
            border-color: ${pinDarkColor} transparent transparent;
          }

          /* Radar User Location Pin */
          .user-radar-container {
            width: 44px;
            height: 44px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .user-radar-wave {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(56, 189, 248, 0.3);
            border: 1.5px solid #38BDF8;
            animation: radarPulse 1.8s infinite ease-out;
          }
          .user-radar-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #38BDF8;
            border: 2.5px solid #FFFFFF;
            box-shadow: 0 0 10px #38BDF8;
            z-index: 2;
          }
          @keyframes radarPulse {
            0% { transform: scale(0.3); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }
          }

          /* Native Leaflet Popup styling */
          .leaflet-popup-content-wrapper {
            background: rgba(15, 20, 30, 0.95);
            color: #FFFFFF;
            border: 1.5px solid ${pinPrimaryColor};
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.7);
            backdrop-filter: blur(10px);
            padding: 4px;
          }
          .leaflet-popup-tip {
            background: rgba(15, 20, 30, 0.95);
            border: 1px solid ${pinPrimaryColor};
          }
          .venue-popup-card {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            width: 180px;
          }
          .venue-popup-img {
            width: 100%;
            height: 85px;
            border-radius: 12px;
            object-fit: cover;
            margin-bottom: 6px;
          }
          .venue-popup-title {
            font-size: 13px;
            font-weight: 800;
            color: #FFFFFF;
            margin-bottom: 2px;
          }
          .venue-popup-price {
            font-size: 11.5px;
            font-weight: 800;
            color: ${pinPrimaryColor};
            margin-bottom: 4px;
          }
          .venue-popup-btn {
            display: block;
            width: 100%;
            text-align: center;
            background: linear-gradient(135deg, ${pinPrimaryColor}, ${pinDarkColor});
            color: ${pinTextColor};
            font-size: 11px;
            font-weight: 800;
            padding: 6px 0;
            border-radius: 8px;
            text-decoration: none;
            cursor: pointer;
            margin-top: 4px;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', { 
            zoomControl: false,
            attributionControl: false
          }).setView([41.3050, 69.2650], 12);

          // 1. Ultra-Clean CartoDB Dark Matter Retina Tile Layer (Default, zero blur, sharp labels)
          const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}@2x.png', {
            maxZoom: 19,
            subdomains: ['a', 'b', 'c', 'd']
          }).addTo(map);

          // 2. High-Res Satellite Layer (ESRI World Imagery)
          const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19
          });

          // 3. Crisp Daylight Street Layer (CartoDB Voyager Retina)
          const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png', {
            maxZoom: 19,
            subdomains: ['a', 'b', 'c', 'd']
          });

          let venues = ${JSON.stringify(filteredVenues)};
          let markers = {};
          let userMarker = null;

          function renderMarkers(items) {
            Object.values(markers).forEach(m => map.removeLayer(m));
            markers = {};

            items.forEach(v => {
              const icon = L.divIcon({
                className: 'custom-pin-wrapper',
                html: '<div class="custom-pin" id="pin-' + v.id + '">🏰 ' + v.shortName + ' • ' + v.priceNum + 'M</div>',
                iconSize: [110, 26],
                iconAnchor: [55, 26]
              });

              const marker = L.marker([v.lat, v.lng], { icon: icon }).addTo(map);
              markers[v.id] = marker;

              const popupHtml = \`
                <div class="venue-popup-card">
                  <img src="\${v.image}" class="venue-popup-img" />
                  <div class="venue-popup-title">\${v.name}</div>
                  <div class="venue-popup-price">\${v.price}</div>
                  <div style="font-size: 10px; color: #94A3B8; margin-bottom: 4px;">👥 \${v.capacity}</div>
                  <div class="venue-popup-btn" onclick="selectVenueFromPopup(\${v.id})">Tafsilotlar & Bron</div>
                </div>
              \`;
              marker.bindPopup(popupHtml, { offset: [0, -18], closeButton: false });

              marker.on('click', () => {
                highlightPin(v.id);
                if (window.ReactNativeWebView) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SELECT_VENUE', id: v.id }));
                }
              });
            });
          }

          function selectVenueFromPopup(id) {
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SELECT_VENUE', id: id }));
            }
          }

          function highlightPin(id) {
            document.querySelectorAll('.custom-pin').forEach(el => el.classList.remove('active'));
            const el = document.getElementById('pin-' + id);
            if (el) el.classList.add('active');
          }

          // Tap on map closes active selection
          map.on('click', (e) => {
            // Check if not clicking a pin
            if (!e.originalEvent.defaultPrevented) {
              document.querySelectorAll('.custom-pin').forEach(el => el.classList.remove('active'));
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'DESELECT_VENUE' }));
              }
            }
          });

          window.focusVenue = function(id) {
            const v = venues.find(item => item.id === id);
            if (v && markers[id]) {
              map.flyTo([v.lat, v.lng], 15, { duration: 0.9 });
              markers[id].openPopup();
              highlightPin(id);
            }
          };

          window.showUserLocation = function(lat, lng) {
            if (userMarker) {
              map.removeLayer(userMarker);
            }

            const userIcon = L.divIcon({
              className: 'user-pin-wrapper',
              html: '<div class="user-radar-container"><div class="user-radar-wave"></div><div class="user-radar-dot"></div></div>',
              iconSize: [44, 44],
              iconAnchor: [22, 22]
            });

            userMarker = L.marker([lat, lng], { icon: userIcon, zIndexOffset: 10000 }).addTo(map);
            userMarker.bindPopup('<div style="font-weight: 800; font-size: 12px; color: #38BDF8;">📍 Siz shu yerdasiz</div>', { offset: [0, -14] }).openPopup();

            map.flyTo([lat, lng], 15, { duration: 1.2 });
          };

          window.switchBaseLayer = function(layerName) {
            map.removeLayer(darkLayer);
            map.removeLayer(satelliteLayer);
            map.removeLayer(streetLayer);

            if (layerName === 'satellite') {
              satelliteLayer.addTo(map);
            } else if (layerName === 'street') {
              streetLayer.addTo(map);
            } else {
              darkLayer.addTo(map);
            }
          };

          window.updateVenues = function(newVenues) {
            venues = newVenues;
            renderMarkers(venues);
          };

          renderMarkers(venues);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      {/* Top Floating Controls */}
      <View style={styles.topControlContainer}>
        <View style={[styles.topHeader, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
          {onBack && (
            <TouchableOpacity style={[styles.backBtn, { borderColor: colors.borderLight }]} onPress={onBack}>
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {/* Real-Time Search Bar */}
          <View style={[styles.searchBox, { borderColor: colors.borderLight }]}>
            <Ionicons name="search" size={15} color={colors.textGoldOrPurple} style={{ marginRight: 6 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="To'yxona yoki tuman nomi..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={15} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* 3D Filter Quick Toggle */}
          <TouchableOpacity
            style={[
              styles.iconBtn,
              { borderColor: colors.borderColor },
              only3D && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
            onPress={() => setOnly3D(!only3D)}
          >
            <Ionicons name="cube" size={16} color={only3D ? (isKelin ? '#0F051D' : '#070B14') : colors.textGoldOrPurple} />
          </TouchableOpacity>

          {/* Real Native GPS Button */}
          <TouchableOpacity
            style={[styles.iconBtn, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
            onPress={handleGetLocation}
            disabled={isLocating}
          >
            {isLocating ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Ionicons name="navigate" size={17} color={userLocation ? '#38BDF8' : colors.textGoldOrPurple} />
            )}
          </TouchableOpacity>
        </View>

        {/* District Filter Pills Horizontal Scroll */}
        <View style={styles.filtersScrollWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.districtsScroll}>
            {districts.map((d) => {
              const isSelected = activeDistrict.toLowerCase() === d.toLowerCase();
              return (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.districtPill,
                    { borderColor: colors.borderLight, backgroundColor: colors.bgCard },
                    isSelected && [styles.districtPillActive, { borderColor: colors.primary, backgroundColor: colors.badgeBg }],
                  ]}
                  onPress={() => setActiveDistrict(d)}
                >
                  <Text
                    style={[
                      styles.districtPillText,
                      isSelected && [styles.districtPillTextActive, { color: colors.textGoldOrPurple }],
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Capacity Quick Pills */}
            <TouchableOpacity
              style={[
                styles.districtPill,
                { borderColor: colors.borderLight, backgroundColor: colors.bgCard },
                activeCapacityFilter === '500+' && [styles.districtPillActive, { borderColor: colors.primary, backgroundColor: colors.badgeBg }],
              ]}
              onPress={() => setActiveCapacityFilter(activeCapacityFilter === '500+' ? 'all' : '500+')}
            >
              <Text
                style={[
                  styles.districtPillText,
                  activeCapacityFilter === '500+' && [styles.districtPillTextActive, { color: colors.textGoldOrPurple }],
                ]}
              >
                👥 500+ Kishi
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.districtPill,
                { borderColor: colors.borderLight, backgroundColor: colors.bgCard },
                activeCapacityFilter === '700+' && [styles.districtPillActive, { borderColor: colors.primary, backgroundColor: colors.badgeBg }],
              ]}
              onPress={() => setActiveCapacityFilter(activeCapacityFilter === '700+' ? 'all' : '700+')}
            >
              <Text
                style={[
                  styles.districtPillText,
                  activeCapacityFilter === '700+' && [styles.districtPillTextActive, { color: colors.textGoldOrPurple }],
                ]}
              >
                👑 700+ Kishi
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Map Layer Switcher (Dark / Satellite / Street) */}
      <View style={styles.layerSwitcherFloating}>
        <TouchableOpacity
          style={[styles.layerBtn, mapLayer === 'dark' && [styles.layerBtnActive, { backgroundColor: colors.primary }]]}
          onPress={() => switchMapLayer('dark')}
        >
          <Text style={[styles.layerBtnText, mapLayer === 'dark' && { color: isKelin ? '#0F051D' : '#070B14', fontWeight: '800' }]}>
            🌙 Tungi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.layerBtn, mapLayer === 'satellite' && [styles.layerBtnActive, { backgroundColor: colors.primary }]]}
          onPress={() => switchMapLayer('satellite')}
        >
          <Text style={[styles.layerBtnText, mapLayer === 'satellite' && { color: isKelin ? '#0F051D' : '#070B14', fontWeight: '800' }]}>
            🛰️ Yo'ldosh
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.layerBtn, mapLayer === 'street' && [styles.layerBtnActive, { backgroundColor: colors.primary }]]}
          onPress={() => switchMapLayer('street')}
        >
          <Text style={[styles.layerBtnText, mapLayer === 'street' && { color: isKelin ? '#0F051D' : '#070B14', fontWeight: '800' }]}>
            ☀️ Kunduzgi
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map WebView */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          style={styles.mapWebView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          geolocationEnabled={true}
          mixedContentMode="always"
          startInLoadingState={true}
          renderLoading={() => (
            <View style={[styles.mapLoadingBox, { backgroundColor: colors.bgBase }]}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={{ color: colors.textGoldOrPurple, marginTop: 10, fontSize: 13, fontWeight: '700' }}>
                Ultra-aniq xarita ochilmoqda...
              </Text>
            </View>
          )}
          onMessage={(e) => {
            try {
              const data = JSON.parse(e.nativeEvent.data);
              if (data.type === 'SELECT_VENUE') {
                const found = venues.find((v) => v.id === data.id);
                if (found) setSelectedVenue(found);
              } else if (data.type === 'DESELECT_VENUE') {
                // User clicked outside any pin -> close card
                setSelectedVenue(null);
              }
            } catch (err) {}
          }}
        />
      </View>

      {/* Bottom Area: Carousel & Selected Venue Card */}
      <View style={styles.bottomAreaContainer}>
        {/* Horizontal Quick Carousel */}
        <View style={styles.venuesBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venuesScroll}>
            {filteredVenues.map((item) => {
              const isSelected = selectedVenue?.id === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.venuePill,
                    { borderColor: colors.borderLight, backgroundColor: colors.bgCard },
                    isSelected && [styles.venuePillActive, { borderColor: colors.primary, backgroundColor: colors.badgeBg }],
                  ]}
                  onPress={() => focusVenueOnMap(item)}
                >
                  <Text style={{ fontSize: 13, marginRight: 4 }}>🏰</Text>
                  <Text
                    style={[
                      styles.venuePillText,
                      isSelected && { color: colors.textGoldOrPurple, fontWeight: '800' },
                    ]}
                  >
                    {item.shortName} • {item.priceNum}M
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Selected Venue Bottom Floating Card (Bossam chiqsin, bosmasam yopilsin) */}
        {selectedVenue && (
          <View style={[styles.venueCard, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
            {/* Close Button ✕ */}
            <TouchableOpacity
              style={styles.closeCardBtn}
              onPress={() => setSelectedVenue(null)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={16} color="#94A3B8" />
            </TouchableOpacity>

            <Image source={{ uri: selectedVenue.image }} style={styles.venueImage} />

            <View style={styles.venueInfo}>
              <View style={styles.venueTitleRow}>
                <Text style={styles.venueName} numberOfLines={1}>{selectedVenue.name}</Text>
                <View style={[styles.ratingBadge, { backgroundColor: colors.badgeBg }]}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={[styles.ratingText, { color: colors.textGoldOrPurple }]}>{selectedVenue.rating}</Text>
                </View>
              </View>

              <Text style={styles.venueCity}>📍 {selectedVenue.district} tumani • {selectedVenue.distanceKm} km yaqin</Text>

              <View style={styles.priceRow}>
                <Text style={[styles.venuePrice, { color: colors.textGoldOrPurple }]}>{selectedVenue.price}</Text>
                <Text style={styles.venueCapacity}>👥 {selectedVenue.capacity}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={[styles.navBtn, { backgroundColor: colors.primary }]}
                  onPress={() => openNavigator(selectedVenue)}
                >
                  <Ionicons name="navigate-outline" size={14} color={isKelin ? '#0F051D' : '#070B14'} style={{ marginRight: 3 }} />
                  <Text style={[styles.navBtnText, { color: isKelin ? '#0F051D' : '#070B14' }]}>Marshrut</Text>
                </TouchableOpacity>

                {selectedVenue.has3D && onOpen3D && (
                  <TouchableOpacity
                    style={[styles.btn3D, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
                    onPress={onOpen3D}
                  >
                    <Ionicons name="cube" size={13} color={colors.textGoldOrPurple} style={{ marginRight: 3 }} />
                    <Text style={[styles.btn3DText, { color: colors.textGoldOrPurple }]}>3D Zal</Text>
                  </TouchableOpacity>
                )}

                {onSelectVenue && (
                  <TouchableOpacity
                    style={[styles.btnDetail, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
                    onPress={() => onSelectVenue(selectedVenue.id)}
                  >
                    <Text style={[styles.btnDetailText, { color: colors.textGoldOrPurple }]}>Batafsil</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.callCircleBtn, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
                  onPress={() => Linking.openURL('tel:' + selectedVenue.phone)}
                >
                  <Ionicons name="call" size={14} color={colors.textGoldOrPurple} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  topControlContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 8,
    left: 12,
    right: 12,
    zIndex: 10,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 36,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12.5,
    padding: 0,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  filtersScrollWrapper: {
    marginTop: 8,
  },
  districtsScroll: {
    gap: 6,
    paddingHorizontal: 2,
  },
  districtPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  districtPillActive: {},
  districtPillText: {
    color: '#94A3B8',
    fontSize: 11.5,
    fontWeight: '600',
  },
  districtPillTextActive: {
    fontWeight: '800',
  },
  layerSwitcherFloating: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 104 : 98,
    right: 14,
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 15, 26, 0.88)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    padding: 2,
    gap: 2,
  },
  layerBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  layerBtnActive: {},
  layerBtnText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  mapWebView: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  mapLoadingBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  bottomAreaContainer: {
    position: 'absolute',
    bottom: 95, // Leave room for floating bottom navigation dock
    left: 14,
    right: 14,
    zIndex: 10,
  },
  venuesBar: {
    marginBottom: 8,
  },
  venuesScroll: {
    gap: 8,
  },
  venuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  venuePillActive: {},
  venuePillText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  venueCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
    position: 'relative',
  },
  closeCardBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  venueImage: {
    width: 86,
    height: 86,
    borderRadius: 14,
    marginRight: 12,
  },
  venueInfo: {
    flex: 1,
  },
  venueTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingRight: 20, // space for close button
  },
  venueName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginRight: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
  },
  venueCity: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  venuePrice: {
    fontSize: 12.5,
    fontWeight: '800',
  },
  venueCapacity: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  navBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
  },
  btn3D: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  btn3DText: {
    fontSize: 11,
    fontWeight: '700',
  },
  btnDetail: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnDetailText: {
    fontSize: 11,
    fontWeight: '700',
  },
  callCircleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
