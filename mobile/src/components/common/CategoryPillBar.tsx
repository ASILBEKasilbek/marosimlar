import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeContext';

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface CategoryPillBarProps {
  categories: CategoryItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CategoryPillBar: React.FC<CategoryPillBarProps> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const { colors, isKelin } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isSelected = cat.id === selectedId;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            activeOpacity={0.8}
            style={[
              styles.pill,
              {
                borderColor: colors.borderColor,
                backgroundColor: isSelected ? colors.primaryLight : colors.bgCard,
              },
            ]}
          >
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text
              style={[
                styles.text,
                isSelected && {
                  color: isKelin ? '#FFFFFF' : '#070B14',
                  fontWeight: '800',
                },
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 22, 38, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 30,
    gap: 6,
  },
  selectedPill: {
    backgroundColor: COLORS.gold[400],
    borderColor: COLORS.gold[400],
  },
  icon: {
    fontSize: 15,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  selectedText: {
    color: '#070B14',
    fontWeight: '800',
  },
});
