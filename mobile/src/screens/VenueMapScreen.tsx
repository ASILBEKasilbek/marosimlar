import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';

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
  },
  {
    id: 2,
    name: 'Yakkasaroy Palace Luxury',
    lat: 41.3110,
    lng: 69.2797,
    city: 'Mirzo Ulug\'bek tumani',
    price: "65,000,000 so'm",
    capacity: '600 - 850 kishi',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    distanceKm: 3.8,
    has3D: true,
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    name: 'Oftob Shaxona (Sharshara & Bog\')',
    lat: 41.3450,
    lng: 69.3120,
    city: 'Qibray / Ochiq tabiat',
    price: "55,000,000 so'm",
    capacity: '700 - 1000 kishi',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800',
    distanceKm: 7.2,
    has3D: true,
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
  const [selectedVenue, setSelectedVenue] = useState<VenueMapItem>(VENUES_MAP_DATA[0]);

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

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html, #map { width: 100%; height: 100%; background: #070B14; }
          .custom-pin {
            background: linear-gradient(135deg, #FFDF73, #D4AF37);
            border: 2px solid #070B14;
            color: #070B14;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 8px;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.5);
            white-space: nowrap;
            display: flex;
            align-items: center;
          }
          .custom-pin::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px 6px 0;
            border-style: solid;
            border-color: #D4AF37 transparent transparent;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map', { zoomControl: false }).setView([41.3000, 69.2600], 12);

          // Dark Mode Map Tiles (CartoDB Dark Matter)
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            subdomains: 'abcd',
          }).addTo(map);

          const venues = ${JSON.stringify(VENUES_MAP_DATA)};

          venues.forEach(v => {
            const icon = L.divIcon({
              className: 'custom-pin-wrapper',
              html: '<div class="custom-pin">🏰 ' + v.name.split(' ')[0] + '</div>',
              iconSize: [80, 24],
              iconAnchor: [40, 24]
            });

            const marker = L.marker([v.lat, v.lng], { icon: icon }).addTo(map);
            marker.on('click', () => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SELECT_VENUE', id: v.id }));
            });
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Top Floating Controls */}
      <View style={styles.topHeader}>
        {onBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View style={styles.titleBox}>
          <Text style={styles.headerTitle}>Xaritadagi To'yxonalar</Text>
          <Text style={styles.headerSubtitle}>Toshkent shahar va viloyat zallari</Text>
        </View>
        <TouchableOpacity style={styles.gpsBtn}>
          <Ionicons name="locate" size={20} color={COLORS.gold[400]} />
        </TouchableOpacity>
      </View>

      {/* Map WebView */}
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.mapWebView}
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

      {/* Selected Venue Bottom Floating Card */}
      <View style={styles.bottomCardContainer}>
        <View style={styles.venueCard}>
          <Image source={{ uri: selectedVenue.image }} style={styles.venueImage} />
          
          <View style={styles.venueInfo}>
            <View style={styles.venueTitleRow}>
              <Text style={styles.venueName} numberOfLines={1}>{selectedVenue.name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{selectedVenue.rating}</Text>
              </View>
            </View>

            <Text style={styles.venueCity}>📍 {selectedVenue.city} • {selectedVenue.distanceKm} km yaqin</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.venuePrice}>{selectedVenue.price}</Text>
              <Text style={styles.venueCapacity}>👥 {selectedVenue.capacity}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => openNavigator(selectedVenue)}
              >
                <Ionicons name="navigate-outline" size={16} color="#070B14" style={{ marginRight: 4 }} />
                <Text style={styles.navBtnText}>Marshrut</Text>
              </TouchableOpacity>

              {selectedVenue.has3D && (
                <TouchableOpacity
                  style={styles.btn3D}
                  onPress={() => onOpen3D && onOpen3D()}
                >
                  <Ionicons name="cube" size={16} color={COLORS.gold[400]} style={{ marginRight: 4 }} />
                  <Text style={styles.btn3DText}>3D Zal</Text>
                </TouchableOpacity>
              )}
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
    backgroundColor: COLORS.obsidian.base,
    position: 'relative',
  },
  topHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 20,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(10, 15, 26, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
  },
  gpsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapWebView: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  venueCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 22, 38, 0.94)',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: 20,
    padding: 12,
    shadowColor: COLORS.gold[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  venueImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
    marginRight: 12,
  },
  venueInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  venueTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFD700',
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
    marginVertical: 4,
  },
  venuePrice: {
    color: COLORS.gold[400],
    fontSize: 13,
    fontWeight: '800',
  },
  venueCapacity: {
    color: '#94A3B8',
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gold[400],
    paddingVertical: 7,
    borderRadius: 10,
  },
  navBtnText: {
    color: '#070B14',
    fontSize: 12,
    fontWeight: '800',
  },
  btn3D: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  btn3DText: {
    color: COLORS.gold[400],
    fontSize: 12,
    fontWeight: '800',
  },
});
