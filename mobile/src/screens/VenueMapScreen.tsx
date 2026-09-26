import React, { useState, useRef } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';
import { WEDDING_SERVICES, WeddingService } from '../data/weddingServices';

const { width } = Dimensions.get('window');

interface VenueMapItem {
  id: number;
  name: string;
  lat: number;
  lng: number;
  city: string;
  price: string;
  capacity: string;
  rating: number;
  image: string;
  distanceKm: number;
  has3D: boolean;
  phone: string;
}

const VENUES_MAP_DATA: VenueMapItem[] = [
  {
    id: 1,
    name: 'Versal Grand Ballroom',
    lat: 41.2825,
    lng: 69.2435,
    city: 'Yakkasaroy tumani',
    price: "48,000,000 so'm",
    capacity: '500 - 700 kishi',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800',
    distanceKm: 2.4,
    has3D: true,
    phone: '+998901234567',
  },
  {
    id: 3,
    name: 'Yakkasaroy Palace Luxury',
    lat: 41.3110,
    lng: 69.2797,
    city: "Mirzo Ulug'bek tumani",
    price: "65,000,000 so'm",
    capacity: '600 - 850 kishi',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    distanceKm: 3.8,
    has3D: true,
    phone: '+998971112233',
  },
  {
    id: 4,
    name: 'Mumtoz Shaxona Zal',
    lat: 41.2750,
    lng: 69.2080,
    city: 'Chilonzor tumani',
    price: "38,000,000 so'm",
    capacity: '400 - 550 kishi',
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    distanceKm: 5.1,
    has3D: true,
    phone: '+998935554433',
  },
  {
    id: 5,
    name: 'Oftob Shaxona (Sharshara)',
    lat: 41.3450,
    lng: 69.3120,
    city: 'Qibray / Ochiq tabiat',
    price: "55,000,000 so'm",
    capacity: '700 - 1000 kishi',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    distanceKm: 7.2,
    has3D: true,
    phone: '+998909998877',
  }
];

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
  const [selectedVenue, setSelectedVenue] = useState<VenueMapItem>(VENUES_MAP_DATA[0]);
  const webViewRef = useRef<WebView>(null);

  const openNavigator = (venue: VenueMapItem) => {
    const yandexUrl = `yandexnavi://build_route_on_map?lat_to=${venue.lat}&lon_to=${venue.lng}`;
    const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
    
    Linking.canOpenURL(yandexUrl).then((supported) => {
      if (supported) {
        Linking.openURL(yandexUrl);
      } else {
        Linking.openURL(googleUrl);
      }
    });
  };

  const focusVenueOnMap = (venue: VenueMapItem) => {
    setSelectedVenue(venue);
    const js = `window.focusVenue && window.focusVenue(${venue.id}); true;`;
    webViewRef.current?.injectJavaScript(js);
  };

  const recenterTashkent = () => {
    const js = `window.recenterMap && window.recenterMap(); true;`;
    webViewRef.current?.injectJavaScript(js);
  };

  const pinPrimaryColor = isKelin ? '#C084FC' : '#FFDF73';
  const pinDarkColor = isKelin ? '#9333EA' : '#D4AF37';

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
          body, html, #map { width: 100%; height: 100%; background: #070B14; }
          .custom-pin {
            background: linear-gradient(135deg, ${pinPrimaryColor}, ${pinDarkColor});
            border: 2px solid #070B14;
            color: #070B14;
            font-size: 11px;
            font-weight: 800;
            padding: 5px 9px;
            border-radius: 14px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.6);
            white-space: nowrap;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          .custom-pin:hover, .custom-pin.active {
            transform: scale(1.15);
            box-shadow: 0 6px 18px ${pinPrimaryColor};
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
          .dark-tiles {
            filter: brightness(0.65) invert(1) contrast(2.2) hue-rotate(200deg) saturate(0.2) brightness(0.85);
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', { zoomControl: false }).setView([41.3000, 69.2600], 12);

          // Fast & Universal OpenStreetMap with Dark Theme Filter
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            className: 'dark-tiles'
          }).addTo(map);

          const venues = ${JSON.stringify(VENUES_MAP_DATA)};
          const markers = {};

          venues.forEach(v => {
            const icon = L.divIcon({
              className: 'custom-pin-wrapper',
              html: '<div class="custom-pin" id="pin-' + v.id + '">🏰 ' + v.name.split(' ')[0] + '</div>',
              iconSize: [85, 26],
              iconAnchor: [42, 26]
            });

            const marker = L.marker([v.lat, v.lng], { icon: icon }).addTo(map);
            markers[v.id] = marker;

            marker.on('click', () => {
              highlightPin(v.id);
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SELECT_VENUE', id: v.id }));
              }
            });
          });

          function highlightPin(id) {
            document.querySelectorAll('.custom-pin').forEach(el => el.classList.remove('active'));
            const el = document.getElementById('pin-' + id);
            if (el) el.classList.add('active');
          }

          window.focusVenue = function(id) {
            const v = venues.find(item => item.id === id);
            if (v && markers[id]) {
              map.flyTo([v.lat, v.lng], 14, { duration: 0.8 });
              highlightPin(id);
            }
          };

          window.recenterMap = function() {
            map.flyTo([41.3000, 69.2600], 12, { duration: 0.8 });
          };

          // Auto-highlight first venue
          setTimeout(() => highlightPin(1), 300);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      {/* Top Floating Controls */}
      <View style={styles.topHeader}>
        {onBack && (
          <TouchableOpacity style={[styles.backBtn, { borderColor: colors.borderColor }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View style={styles.titleBox}>
          <Text style={[styles.headerTitle, { color: colors.primaryLight }]}>Xaritadagi To'yxonalar</Text>
          <Text style={styles.headerSubtitle}>Toshkent shahar va viloyat zallari (GPS)</Text>
        </View>
        <TouchableOpacity style={[styles.gpsBtn, { borderColor: colors.borderColor }]} onPress={recenterTashkent}>
          <Ionicons name="locate" size={20} color={colors.primaryLight} />
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
          mixedContentMode="always"
          startInLoadingState={true}
          renderLoading={() => (
            <View style={[styles.mapLoadingBox, { backgroundColor: colors.bgBase }]}>
              <ActivityIndicator size="large" color={colors.primaryLight} />
              <Text style={{ color: colors.primaryLight, marginTop: 10, fontSize: 13, fontWeight: '700' }}>
                Xarita ochilmoqda...
              </Text>
            </View>
          )}
          onMessage={(e) => {
            try {
              const data = JSON.parse(e.nativeEvent.data);
              if (data.type === 'SELECT_VENUE') {
                const found = VENUES_MAP_DATA.find((v) => v.id === data.id);
                if (found) setSelectedVenue(found);
              }
            } catch (err) {}
          }}
        />
      </View>

      {/* Venues Horizontal Picker Carousel */}
      <View style={styles.venuesBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venuesScroll}>
          {VENUES_MAP_DATA.map((item) => {
            const isSelected = item.id === selectedVenue.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.venuePill,
                  { borderColor: colors.borderColor, backgroundColor: colors.bgCard },
                  isSelected && [styles.venuePillActive, { borderColor: colors.primaryLight, backgroundColor: colors.badgeBg }],
                ]}
                onPress={() => focusVenueOnMap(item)}
              >
                <Text style={{ fontSize: 13, marginRight: 4 }}>🏰</Text>
                <Text
                  style={[
                    styles.venuePillText,
                    isSelected && { color: colors.primaryLight, fontWeight: '800' },
                  ]}
                >
                  {item.name.split(' (')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Selected Venue Bottom Floating Card */}
      <View style={styles.bottomCardContainer}>
        <View style={[styles.venueCard, { borderColor: colors.borderColor, backgroundColor: colors.bgCard }]}>
          <Image source={{ uri: selectedVenue.image }} style={styles.venueImage} />
          
          <View style={styles.venueInfo}>
            <View style={styles.venueTitleRow}>
              <Text style={styles.venueName} numberOfLines={1}>{selectedVenue.name}</Text>
              <View style={[styles.ratingBadge, { backgroundColor: colors.badgeBg }]}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={[styles.ratingText, { color: colors.primaryLight }]}>{selectedVenue.rating}</Text>
              </View>
            </View>

            <Text style={styles.venueCity}>📍 {selectedVenue.city} • {selectedVenue.distanceKm} km yaqin</Text>
            
            <View style={styles.priceRow}>
              <Text style={[styles.venuePrice, { color: colors.primaryLight }]}>{selectedVenue.price}</Text>
              <Text style={styles.venueCapacity}>👥 {selectedVenue.capacity}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: colors.primaryLight }]}
                onPress={() => openNavigator(selectedVenue)}
              >
                <Ionicons name="navigate-outline" size={16} color={isKelin ? '#FFFFFF' : '#070B14'} style={{ marginRight: 4 }} />
                <Text style={[styles.navBtnText, { color: isKelin ? '#FFFFFF' : '#070B14' }]}>Marshrut</Text>
              </TouchableOpacity>

              {selectedVenue.has3D && onOpen3D && (
                <TouchableOpacity
                  style={[styles.btn3D, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
                  onPress={onOpen3D}
                >
                  <Ionicons name="cube" size={15} color={colors.primaryLight} style={{ marginRight: 4 }} />
                  <Text style={[styles.btn3DText, { color: colors.primaryLight }]}>3D Zal</Text>
                </TouchableOpacity>
              )}

              {onSelectVenue && (
                <TouchableOpacity
                  style={[styles.btnDetail, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
                  onPress={() => onSelectVenue(selectedVenue.id)}
                >
                  <Text style={[styles.btnDetailText, { color: colors.primaryLight }]}>Ko'rish</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.callCircleBtn, { borderColor: colors.borderColor, backgroundColor: colors.badgeBg }]}
                onPress={() => Linking.openURL('tel:' + selectedVenue.phone)}
              >
                <Ionicons name="call" size={15} color={colors.primaryLight} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  topHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 12 : 10,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 11, 20, 0.88)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  titleBox: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 1,
  },
  gpsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
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
  venuesBar: {
    position: 'absolute',
    bottom: 215,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  venuesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  venuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  venuePillActive: {
    borderWidth: 1.5,
  },
  venuePillText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  venueCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  venueImage: {
    width: '100%',
    height: 100,
  },
  venueInfo: {
    padding: 12,
  },
  venueTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venueName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 3,
  },
  venueCity: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  venuePrice: {
    fontSize: 13,
    fontWeight: '800',
  },
  venueCapacity: {
    color: '#94A3B8',
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  navBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  btn3D: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  btn3DText: {
    fontSize: 12,
    fontWeight: '700',
  },
  btnDetail: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  btnDetailText: {
    fontSize: 12,
    fontWeight: '700',
  },
  callCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
