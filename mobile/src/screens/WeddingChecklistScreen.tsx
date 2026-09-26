import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Vibration,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeContext';

interface TaskItem {
  id: number;
  stage: '30_days' | '15_days' | '3_days' | 'sarpo';
  title: string;
  category: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  cost_est: string;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: 1, stage: '30_days', title: "To'yxona zalini tanlash va bron qilish", category: "To'yxona", completed: true, priority: 'high', cost_est: '48,000,000' },
  { id: 2, stage: '30_days', title: "FHDYo (ZAGS) arizasi va tibbiy ko'rik", category: 'Hujjatlar', completed: true, priority: 'high', cost_est: '500,000' },
  { id: 3, stage: '30_days', title: "Boshlovchi va san'atkorlar bilan shartnoma", category: "San'atkor", completed: true, priority: 'high', cost_est: '15,000,000' },
  { id: 4, stage: '30_days', title: 'Fotograf va videograf (Love Story)', category: 'Media', completed: true, priority: 'medium', cost_est: '6,000,000' },
  { id: 5, stage: '30_days', title: 'Mehmonlar sonini va stollar rejasini tuzish', category: 'Reja', completed: true, priority: 'medium', cost_est: '0' },
  { id: 6, stage: '15_days', title: 'Raqamli taklifnomalarni mehmonlarga tarqatish', category: 'Taklifnoma', completed: true, priority: 'high', cost_est: '0' },
  { id: 7, stage: '15_days', title: "Kelin ko'ylak va fasonni yakuniy kiyib ko'rish", category: 'Kiyim', completed: false, priority: 'high', cost_est: '8,000,000' },
  { id: 8, stage: '15_days', title: 'Kuyov kostyum-shimi va poyabzali', category: 'Kiyim', completed: true, priority: 'medium', cost_est: '3,500,000' },
  { id: 9, stage: '15_days', title: 'Nikoh uzuklarini xarid qilish va o\'lchash', category: 'Zargarlik', completed: true, priority: 'high', cost_est: '12,000,000' },
  { id: 10, stage: '15_days', title: "To'y korteji (Malibu / Maybach) bron qilish", category: 'Avto', completed: false, priority: 'medium', cost_est: '4,000,000' },
  { id: 11, stage: '3_days', title: 'To\'y torti va desertlar buyurtmasini tasdiqlash', category: 'Oshxona', completed: false, priority: 'medium', cost_est: '3,000,000' },
  { id: 12, stage: '3_days', title: 'Nahor oshi uchun masalliqlarni tayyorlash', category: 'Osh', completed: false, priority: 'high', cost_est: '18,000,000' },
  { id: 13, stage: '3_days', title: 'Kelin dugonalar va kuyov jo\'ralar liboslari', category: 'Dress-kod', completed: false, priority: 'low', cost_est: '2,000,000' },
  { id: 14, stage: '3_days', title: 'Stollarga mehmonlarni joylashtirishni yakunlash', category: 'Seating', completed: false, priority: 'high', cost_est: '0' },
  { id: 15, stage: 'sarpo', title: 'Kelin sarposi (Mebel, pardalar, idishlar)', category: 'Sarpo', completed: true, priority: 'high', cost_est: '45,000,000' },
  { id: 16, stage: 'sarpo', title: 'Kuyov sarposi (To\'n, qishki/yozgi liboslar)', category: 'Sarpo', completed: true, priority: 'high', cost_est: '15,000,000' },
  { id: 17, stage: 'sarpo', title: 'Quda chaqiriq va Kelin salom hadyalari', category: 'Sovg\'alar', completed: false, priority: 'medium', cost_est: '6,000,000' },
];

interface WeddingChecklistScreenProps {
  onBack: () => void;
  onOpenBudget?: () => void;
}

export const WeddingChecklistScreen: React.FC<WeddingChecklistScreenProps> = ({ onBack, onOpenBudget }) => {
  const { colors, isKelin } = useAppTheme();
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [activeStage, setActiveStage] = useState<'all' | '30_days' | '15_days' | '3_days' | 'sarpo'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Kiyim');
  const [newCost, setNewCost] = useState('1000000');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const toggleTask = (id: number) => {
    // Taktil / Haptic tebranish
    if (Platform.OS !== 'web') {
      Vibration.vibrate(20);
    }

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            // Toast / Celebration
            Alert.alert('🎉 Ajoyib!', `"${t.title}" muvaffaqiyatli bajarildi!`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleAddNewTask = () => {
    if (!newTitle.trim()) {
      Alert.alert('Xatolik', 'Iltimos, vazifa nomini kiriting');
      return;
    }

    const newTask: TaskItem = {
      id: tasks.length + 1,
      stage: activeStage === 'all' ? '15_days' : activeStage,
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      priority: 'medium',
      cost_est: parseInt(newCost || '0').toLocaleString(),
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setShowAddModal(false);
    Alert.alert('Muvaffaqiyatli', 'Yangi to‘y vazifasi ro‘yxatga qo‘shildi!');
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeStage === 'all') return true;
    return t.stage === activeStage;
  });

  const stages = [
    { id: 'all', label: 'Barchasi', count: tasks.length },
    { id: '30_days', label: '30 kun oldin', count: tasks.filter((t) => t.stage === '30_days').length },
    { id: '15_days', label: '15 kun oldin', count: tasks.filter((t) => t.stage === '15_days').length },
    { id: '3_days', label: 'To\'y arafasida', count: tasks.filter((t) => t.stage === '3_days').length },
    { id: 'sarpo', label: 'Sarpo & An\'ana', count: tasks.filter((t) => t.stage === 'sarpo').length },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBase }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>To'y Rejasi & Cheklist</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textGoldOrPurple }]}>Jasurbek & Madina To'y Tayyorgarligi</Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={18} color={isKelin ? '#0F051D' : '#070B14'} />
          <Text style={[styles.addBtnText, isKelin && { color: '#0F051D' }]}>Qo'shish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Progress Card */}
        <View style={[styles.progressCard, { borderColor: colors.borderColor }]}>
          <LinearGradient
            colors={[colors.bgCardElevated, colors.bgCard]}
            style={styles.progressGradient}
          >
            <View style={styles.progressTopRow}>
              <View>
                <Text style={styles.progressTitle}>To'y Tayyorgarligi Holati</Text>
                <Text style={styles.progressSubtitle}>
                  {completedTasks} ta bajarildi • {totalTasks - completedTasks} ta vazifa qoldi
                </Text>
              </View>
              <View style={[styles.percentBadge, { backgroundColor: colors.primary }]}>
                <Text style={[styles.percentText, isKelin && { color: '#0F051D' }]}>{progressPercent}%</Text>
              </View>
            </View>

            {/* Progress Track */}
            <View style={styles.progressBarTrack}>
              <LinearGradient
                colors={colors.primaryGradient as [string, string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
              />
            </View>

            <View style={styles.progressFooter}>
              <Text style={styles.progressHint}>
                {progressPercent > 70
                  ? '🏆 Juda ajoyib natija! To\'yga deyarli barcha ishlar tayyor.'
                  : '⚡ Har kuni 1-2 ta vazifani bajaring va to\'y kunini xotirjam kutib oling.'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Stages Filter Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stageFilterScroll}>
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <TouchableOpacity
                key={stage.id}
                style={[
                  styles.stagePill,
                  isActive && [styles.stagePillActive, { borderColor: colors.primary, backgroundColor: colors.badgeBg }]
                ]}
                onPress={() => setActiveStage(stage.id as any)}
              >
                <Text style={[styles.stagePillText, isActive && [styles.stagePillTextActive, { color: colors.textGoldOrPurple }]]}>
                  {stage.label} ({stage.count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {filteredTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, task.completed && styles.taskCardCompleted]}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.88}
            >
              <View style={styles.taskLeftRow}>
                <View style={[styles.checkbox, task.completed && styles.checkboxActive]}>
                  {task.completed && <Ionicons name="checkmark" size={16} color="#070B14" />}
                </View>

                <View style={styles.taskTextCol}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted,
                    ]}
                  >
                    {task.title}
                  </Text>

                  <View style={styles.taskMetaRow}>
                    <View style={styles.categoryPill}>
                      <Text style={styles.categoryPillText}>{task.category}</Text>
                    </View>
                    {task.cost_est !== '0' && (
                      <Text style={styles.costText}>≈ {task.cost_est} so'm</Text>
                    )}
                    {task.priority === 'high' && (
                      <View style={styles.priorityHighBadge}>
                        <Text style={styles.priorityHighText}>Muhim</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Task Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Yangi To'y Vazifasi</Text>
            <Text style={styles.modalSub}>Rejangizga yangi topshiriq qo'shing</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Masalan: To'y kortejiga gullar buyurtma qilish..."
              placeholderTextColor="#64748B"
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Taxminiy xarajat (so'm)..."
              placeholderTextColor="#64748B"
              value={newCost}
              onChangeText={setNewCost}
              keyboardType="numeric"
            />

            <View style={styles.modalBtnsRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.modalCancelText}>Bekor qilish</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalSubmitBtn} onPress={handleAddNewTask}>
                <Text style={styles.modalSubmitText}>Qo'shish</Text>
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
    marginRight: 10,
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold[400],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#070B14',
    fontSize: 11,
    fontWeight: '800',
    marginLeft: 2,
  },
  scrollBody: {
    padding: 16,
    paddingBottom: 40,
  },
  progressCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 16,
  },
  progressGradient: {
    padding: 16,
  },
  progressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  progressSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
  },
  percentBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentText: {
    color: COLORS.gold[400],
    fontSize: 14,
    fontWeight: '800',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressFooter: {
    marginTop: 4,
  },
  progressHint: {
    color: '#CBD5E1',
    fontSize: 11,
    fontStyle: 'italic',
  },
  stageFilterScroll: {
    gap: 8,
    marginBottom: 16,
  },
  stagePill: {
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  stagePillActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderColor: COLORS.gold[400],
  },
  stagePillText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  stagePillTextActive: {
    color: COLORS.gold[400],
    fontWeight: '700',
  },
  tasksList: {
    gap: 10,
  },
  taskCard: {
    backgroundColor: '#0F1626',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 14,
  },
  taskCardCompleted: {
    opacity: 0.6,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  taskLeftRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.gold[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: COLORS.gold[400],
  },
  taskTextCol: {
    flex: 1,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 6,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryPillText: {
    color: '#94A3B8',
    fontSize: 10,
  },
  costText: {
    color: COLORS.gold[400],
    fontSize: 11,
    fontWeight: '600',
  },
  priorityHighBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  priorityHighText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '700',
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
    marginBottom: 14,
  },
  modalBtnsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
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
