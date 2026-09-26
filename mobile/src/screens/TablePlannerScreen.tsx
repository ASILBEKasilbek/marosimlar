import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

interface TableItem {
  id: number;
  name: string;
  category: 'vip' | 'elders' | 'relatives' | 'friends' | 'colleagues';
  capacity: number;
  guests: string[];
  table_number: string;
  is_full: boolean;
}

const INITIAL_TABLES: TableItem[] = [
  {
    id: 0,
    name: 'Prezidium (Kelin-Kuyov Sahnasi)',
    category: 'vip',
    capacity: 2,
    guests: ['Jasurbek (Kuyov)', 'Madina (Kelin)'],
    table_number: 'VIP',
    is_full: true,
  },
  {
    id: 1,
    name: '1-Stol: Bosh Qudalar & Ota-Onasi',
    category: 'elders',
    capacity: 12,
    guests: [
      'Rustam Ota (Kuyovning Otasi)',
      'Dilorom Ona (Kuyovning Onasi)',
      'Botirjon Aka (Kelinning Otasi)',
      'Gulchehra Opa (Kelinning Onasi)',
      "Salim Tog'a",
      'Mavluda Xola',
    ],
    table_number: '1',
    is_full: false,
  },
  {
    id: 2,
    name: "2-Stol: Tog'alar & Qarindoshlar",
    category: 'relatives',
    capacity: 12,
    guests: [
      "Alisher Tog'a",
      'Nargiza Yangi',
      'Sanjar Amaki',
      'Feruza Kenoy',
      "Shohruh Tog'a",
      'Dilnoza Xola',
      'Muzaffar Aka',
      'Munira Yangi',
    ],
    table_number: '2',
    is_full: false,
  },
  {
    id: 3,
    name: "3-Stol: Kuyovning Eng Yaqin Do'stlari",
    category: 'friends',
    capacity: 10,
    guests: [
      'Sardorbek',
      'Bobur Mirzayev',
      'Javohir Saidov',
      'Sherzod',
      'Farrux',
      'Islom',
      'Otabek',
    ],
    table_number: '3',
    is_full: false,
  },
  {
    id: 4,
    name: '4-Stol: Kelinning Dugonalari',
    category: 'friends',
    capacity: 10,
    guests: [
      'Shahnoza (Bosh Dugona)',
      'Dildora Karimova',
      'Kamola',
      'Zilola',
      'Nafisa',
      'Sabina',
    ],
    table_number: '4',
    is_full: false,
  },
  {
    id: 5,
    name: '5-Stol: Hamkasblar & Hamkorlar',
    category: 'colleagues',
    capacity: 10,
    guests: [
      "Ulug'bek (Team Lead)",
      'Davron Aka',
      'Nodirbek',
      'Malika',
      'Azamat',
    ],
    table_number: '5',
    is_full: false,
  },
  {
    id: 6,
    name: '6-Stol: Hurmatli Oqsoqollar & Mehmonlar',
    category: 'vip',
    capacity: 12,
    guests: [
      'Rahmonberdi Hoji Ota',
      'Xadicha Hoji Ona',
      'Anvar Qori Aka',
      'Sobirjon Domla',
    ],
    table_number: '6',
    is_full: false,
  },
  {
    id: 7,
    name: '7-Stol: Yoshlar & Qarindosh Do\'stlar',
    category: 'friends',
    capacity: 10,
    guests: [
      'Behzod',
      'Humoyun',
      'Doston',
      'Akmal',
      'Jasur',
    ],
    table_number: '7',
    is_full: false,
  },
];

interface TablePlannerScreenProps {
  onBack: () => void;
}

export const TablePlannerScreen: React.FC<TablePlannerScreenProps> = ({ onBack }) => {
  const { colors, isKelin } = useAppTheme();
  const [tables, setTables] = useState<TableItem[]>(INITIAL_TABLES);
  const [selectedTableId, setSelectedTableId] = useState<number>(1);
  const [searchGuestQuery, setSearchGuestQuery] = useState('');
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const selectedTable = tables.find((t) => t.id === selectedTableId) || tables[0];
  const totalCapacity = tables.reduce((acc, t) => acc + t.capacity, 0);
  const totalSeated = tables.reduce((acc, t) => acc + t.guests.length, 0);

  const handleAddGuest = () => {
    if (!newGuestName.trim()) {
      Alert.alert('Xatolik', 'Iltimos, mehmon ismini kiriting');
      return;
    }

    if (selectedTable.guests.length >= selectedTable.capacity) {
      Alert.alert('Stol to‘lgan', 'Ushbu stolda bo‘sh o‘rin qolmagan!');
      return;
    }

    setTables((prev) =>
      prev.map((t) => {
        if (t.id === selectedTable.id) {
          const updatedGuests = [...t.guests, newGuestName.trim()];
          return {
            ...t,
            guests: updatedGuests,
            is_full: updatedGuests.length >= t.capacity,
          };
        }
        return t;
      })
    );

    setNewGuestName('');
    setShowAddGuestModal(false);
  };

  const handleRemoveGuest = (tableId: number, guestName: string) => {
    Alert.alert(
      "Mehmonni o'chirish",
      `"${guestName}"ni stoldan chiqarmoqchimisiz?`,
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: "O'chirish",
          style: 'destructive',
          onPress: () => {
            setTables((prev) =>
              prev.map((t) => {
                if (t.id === tableId) {
                  const updatedGuests = t.guests.filter((g) => g !== guestName);
                  return {
                    ...t,
                    guests: updatedGuests,
                    is_full: false,
                  };
                }
                return t;
              })
            );
          },
        },
      ]
    );
  };

  // Search filter
  const matchingGuests = searchGuestQuery.trim()
    ? tables.flatMap((t) =>
        t.guests
          .filter((g) => g.toLowerCase().includes(searchGuestQuery.toLowerCase()))
          .map((g) => ({ guest: g, table: t }))
      )
    : [];

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>Stollar & Mehmonlar Xaritasi</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textGoldOrPurple }]}>Smart Seating Chart • Versal Grand</Text>
        </View>

      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Overview Stats Bar */}
        <View style={styles.statsCard}>
          <LinearGradient
            colors={['#172238', '#0C1322']}
            style={styles.statsGradient}
          >
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{tables.length}</Text>
              <Text style={styles.statLabel}>Stollar</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalSeated}</Text>
              <Text style={styles.statLabel}>O'tirganlar</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#34D399' }]}>{totalCapacity - totalSeated}</Text>
              <Text style={styles.statLabel}>Bo'sh Joy</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: COLORS.gold[400] }]}>
                {Math.round((totalSeated / totalCapacity) * 100)}%
              </Text>
              <Text style={styles.statLabel}>To'ldirilgan</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Search Guest by Name */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Mehmon ismini izlang (masalan: Alisher, Sardor)..."
              placeholderTextColor="#64748B"
              value={searchGuestQuery}
              onChangeText={setSearchGuestQuery}
            />
            {searchGuestQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchGuestQuery('')}>
                <Ionicons name="close-circle" size={16} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* Search Result Dropdown */}
          {searchGuestQuery.trim().length > 0 && (
            <View style={styles.searchResultsContainer}>
              {matchingGuests.length === 0 ? (
                <Text style={styles.noSearchText}>Mehmon topilmadi</Text>
              ) : (
                matchingGuests.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.searchResultRow}
                    onPress={() => {
                      setSelectedTableId(item.table.id);
                      setSearchGuestQuery('');
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="person-circle" size={22} color={COLORS.gold[400]} style={{ marginRight: 8 }} />
                      <Text style={styles.resultGuestName}>{item.guest}</Text>
                    </View>
                    <View style={styles.tableBadgeResult}>
                      <Text style={styles.tableBadgeResultText}>{item.table.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>

        {/* Visual Hall Diagram / Stage & Floorplan */}
        <View style={styles.floorplanSection}>
          <Text style={styles.sectionHeaderTitle}>TO'YXONA ZALI JOYLANISHI</Text>

          {/* Prezidium Stage */}
          <TouchableOpacity
            style={[
              styles.presidiumStageCard,
              selectedTableId === 0 && styles.tableCardSelected,
            ]}
            onPress={() => setSelectedTableId(0)}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={['rgba(212, 175, 55, 0.25)', 'rgba(15, 22, 38, 0.95)']}
              style={styles.presidiumGradient}
            >
              <View style={styles.presidiumTopRow}>
                <View style={styles.presidiumBadge}>
                  <Text style={styles.presidiumBadgeText}>👑 SAHNA / PREZIDIUM</Text>
                </View>
                <Text style={styles.capacityPill}>2 / 2 kishi (To'la)</Text>
              </View>
              <Text style={styles.presidiumNames}>💍 Jasurbek & Madina</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Dance Floor Label */}
          <View style={styles.danceFloor}>
            <MaterialCommunityIcons name="party-popper" size={16} color={COLORS.gold[400]} style={{ marginRight: 6 }} />
            <Text style={styles.danceFloorText}>✦ RAQS MAYDONI & SHOU ✦</Text>
          </View>

          {/* Tables Grid (2 Columns) */}
          <View style={styles.tablesGrid}>
            {tables.filter((t) => t.id !== 0).map((table) => {
              const isSelected = selectedTableId === table.id;
              const fillPct = Math.round((table.guests.length / table.capacity) * 100);

              return (
                <TouchableOpacity
                  key={table.id}
                  style={[
                    styles.tableGridCard,
                    isSelected && styles.tableCardSelected,
                    table.is_full && styles.tableCardFull,
                  ]}
                  onPress={() => setSelectedTableId(table.id)}
                  activeOpacity={0.88}
                >
                  <LinearGradient
                    colors={isSelected ? ['#223254', '#111A2E'] : ['#141D30', '#0B111E']}
                    style={styles.tableGridGradient}
                  >
                    <View style={styles.tableCardHeader}>
                      <View style={[styles.tableNumCircle, isSelected && { backgroundColor: COLORS.gold[400] }]}>
                        <Text style={[styles.tableNumText, isSelected && { color: '#070B14' }]}>
                          {table.table_number}
                        </Text>
                      </View>
                      <View style={[styles.statusBadge, table.is_full ? styles.statusFull : styles.statusOpen]}>
                        <Text style={styles.statusText}>
                          {table.is_full ? "To'lgan" : `${table.capacity - table.guests.length} ta bo'sh`}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.tableNameText} numberOfLines={2}>
                      {table.name}
                    </Text>

                    {/* Mini progress bar */}
                    <View style={styles.miniProgressTrack}>
                      <View
                        style={[
                          styles.miniProgressFill,
                          {
                            width: `${fillPct}%`,
                            backgroundColor: table.is_full ? '#EF4444' : COLORS.gold[400],
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.tableCardFooter}>
                      <Text style={styles.tableFooterText}>
                        <Ionicons name="people" size={11} color="#94A3B8" /> {table.guests.length}/{table.capacity} kishi
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Table Guest Management Section */}
        <View style={styles.selectedTableSection}>
          <View style={styles.selectedTableHeader}>
            <View>
              <Text style={styles.selectedTableTitle}>{selectedTable.name}</Text>
              <Text style={styles.selectedTableSubtitle}>
                {selectedTable.guests.length} / {selectedTable.capacity} ta o'rin band qilingan
              </Text>
            </View>

            {selectedTable.id !== 0 && (
              <TouchableOpacity
                style={styles.addGuestBtn}
                onPress={() => setShowAddGuestModal(true)}
              >
                <Ionicons name="person-add" size={14} color="#070B14" style={{ marginRight: 4 }} />
                <Text style={styles.addGuestBtnText}>Qo'shish</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Guest List */}
          <View style={styles.guestListContainer}>
            {selectedTable.guests.map((guest, idx) => (
              <View key={idx} style={styles.guestRow}>
                <View style={styles.guestLeft}>
                  <View style={styles.guestAvatar}>
                    <Text style={styles.guestAvatarText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.guestName}>{guest}</Text>
                </View>

                {selectedTable.id !== 0 && (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => handleRemoveGuest(selectedTable.id, guest)}
                  >
                    <Ionicons name="close" size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Guest Modal */}
      <Modal visible={showAddGuestModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Mehmon Biriktirish</Text>
            <Text style={styles.modalSub}>{selectedTable.name}</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Mehmonning ism-familiyasi..."
              placeholderTextColor="#64748B"
              value={newGuestName}
              onChangeText={setNewGuestName}
              autoFocus
            />

            <View style={styles.modalBtnsRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => {
                  setShowAddGuestModal(false);
                  setNewGuestName('');
                }}
              >
                <Text style={styles.modalCancelText}>Bekor qilish</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalSubmitBtn} onPress={handleAddGuest}>
                <Text style={styles.modalSubmitText}>Saqlash</Text>
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.15)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleBox: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: COLORS.gold[400],
    fontSize: 11,
    marginTop: 2,
  },
  btn3D: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  btn3DText: {
    color: '#070B14',
    fontSize: 11,
    fontWeight: '800',
  },
  scrollBody: {
    padding: 16,
    paddingBottom: 40,
  },
  statsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    marginBottom: 16,
  },
  statsGradient: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchSection: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  noSearchText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    padding: 10,
  },
  searchResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  resultGuestName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  tableBadgeResult: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tableBadgeResultText: {
    color: COLORS.gold[400],
    fontSize: 10,
    fontWeight: '600',
  },
  floorplanSection: {
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  presidiumStageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(212, 175, 55, 0.45)',
    marginBottom: 10,
  },
  presidiumGradient: {
    padding: 14,
    alignItems: 'center',
  },
  presidiumTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 6,
  },
  presidiumBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  presidiumBadgeText: {
    color: COLORS.gold[400],
    fontSize: 10,
    fontWeight: '800',
  },
  capacityPill: {
    color: '#94A3B8',
    fontSize: 11,
  },
  presidiumNames: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  danceFloor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  danceFloorText: {
    color: COLORS.gold[400],
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tableGridCard: {
    width: (width - 42) / 2,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tableCardSelected: {
    borderColor: COLORS.gold[400],
    borderWidth: 1.5,
  },
  tableCardFull: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  tableGridGradient: {
    padding: 12,
  },
  tableCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tableNumCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableNumText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusOpen: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
  },
  statusFull: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tableNameText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    minHeight: 32,
    marginBottom: 6,
  },
  miniProgressTrack: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  tableCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableFooterText: {
    color: '#94A3B8',
    fontSize: 10,
  },
  selectedTableSection: {
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    borderRadius: 16,
    padding: 16,
  },
  selectedTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 10,
  },
  selectedTableTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  selectedTableSubtitle: {
    color: COLORS.gold[400],
    fontSize: 11,
    marginTop: 2,
  },
  addGuestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addGuestBtnText: {
    color: '#070B14',
    fontSize: 11,
    fontWeight: '800',
  },
  guestListContainer: {
    gap: 8,
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  guestLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  guestAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  guestAvatarText: {
    color: COLORS.gold[400],
    fontSize: 10,
    fontWeight: '700',
  },
  guestName: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  removeBtn: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  modalSub: {
    color: COLORS.gold[400],
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#070B14',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 20,
  },
  modalBtnsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  modalSubmitBtn: {
    flex: 1,
    backgroundColor: COLORS.gold[400],
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalSubmitText: {
    color: '#070B14',
    fontSize: 13,
    fontWeight: '800',
  },
});
